import fs from 'node:fs/promises'
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

import { fileURLToPath } from 'url'
import path from 'path'

const scriptsFolderPath = path.dirname(fileURLToPath(import.meta.url))
const projectRootPath = path.normalize(scriptsFolderPath + '/..')

const credentialsFileName = 'i18nSheetCredentials.json.local'
const configFileName = 'i18nSheetConfig.json.local'

const credentialsPath = path.resolve(projectRootPath, credentialsFileName)
const configPath = path.resolve(projectRootPath, configFileName)

const cosI18nFolderPath = path.resolve(
  projectRootPath,
  'packages/cube-frontend-web-app/src/i18n/locales',
)
const uiLibraryI18nFolderPath = path.resolve(
  projectRootPath,
  'packages/cube-frontend-ui-library/src/i18n/locales',
)

const supportedLanguage = ['en', 'zh-TW'] as const

type SupportedLanguage = (typeof supportedLanguage)[number]

type Translation = { key: string } & Record<SupportedLanguage, string>

const readJsonFile = async (path: string) => {
  const content = await fs.readFile(path, 'utf-8')
  return JSON.parse(content)
}

const writeJsonFile = async (path: string, data: Record<string, unknown>) => {
  const format = (record: Record<string, unknown>) =>
    JSON.stringify(record, null, 2) + '\n'

  const content = format(data)
  await fs.writeFile(path, content, 'utf-8')
}

const parseTranslationRow = (
  row: GoogleSpreadsheetRow<Translation>,
): Translation => {
  const cols = ['key', ...supportedLanguage] as const
  return cols.reduce(
    (translation, col) => ({ ...translation, [col]: row.get(col) }),
    {} as Translation,
  )
}

const getJsonByLanguage = (
  translations: Translation[],
  language: SupportedLanguage,
) => {
  return Object.fromEntries(
    translations.map((item) => [item.key, item[language]]),
  )
}

const parseWorksheet = async ({
  workSheet,
  folderPath,
}: {
  workSheet: GoogleSpreadsheetWorksheet
  folderPath: string
}) => {
  const rows = await workSheet.getRows<Translation>()
  const translations = rows.map(parseTranslationRow)

  const parseLanguageTasks = supportedLanguage.map((lang) => {
    const jsonContent = getJsonByLanguage(translations, lang)
    const filepath = path.resolve(folderPath, `${lang}.json`)
    return writeJsonFile(filepath, jsonContent)
  })

  await Promise.all(parseLanguageTasks)
}

const main = async () => {
  const [credentials, config] = await Promise.all(
    [credentialsPath, configPath].map(readJsonFile),
  )

  const sheetId = config.googleSheetId
  const jwt = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(sheetId, jwt)
  await doc.loadInfo()

  const parseWorksheetTasks = [
    {
      workSheet: doc.sheetsByTitle['COS 3.1'],
      folderPath: cosI18nFolderPath,
    },
    {
      workSheet: doc.sheetsByTitle['COS 3.1 UI Library'],
      folderPath: uiLibraryI18nFolderPath,
    },
  ].map(parseWorksheet)

  await Promise.all(parseWorksheetTasks)
}

main()
