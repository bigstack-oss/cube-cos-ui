import fs from 'node:fs/promises'
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet'
import { GoogleAuth } from 'google-auth-library'

import { fileURLToPath } from 'url'
import path from 'path'

const scriptsFolderPath = path.dirname(fileURLToPath(import.meta.url))
const projectRootPath = path.normalize(scriptsFolderPath + '/..')

const configFileName = 'i18nSheetConfig.json.local'

const configPath = path.resolve(projectRootPath, configFileName)

const cosI18nFolderPath = path.resolve(projectRootPath, 'src/resources/web-app')
const uiLibraryI18nFolderPath = path.resolve(
  projectRootPath,
  'src/resources/ui-library',
)

const supportedLanguage = ['en-US', 'zh-TW'] as const

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

const syncWorksheet = async ({
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
  const config = await readJsonFile(configPath)
  const { googleSheetId: sheetId, version } = config

  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const client = await auth.getClient()

  const doc = new GoogleSpreadsheet(sheetId, client)
  await doc.loadInfo()

  const syncWorksheetTasks = [
    {
      workSheet: doc.sheetsByTitle[`${version} web-app`],
      folderPath: cosI18nFolderPath,
    },
    {
      workSheet: doc.sheetsByTitle[`${version} ui-library`],
      folderPath: uiLibraryI18nFolderPath,
    },
  ].map(syncWorksheet)

  await Promise.all(syncWorksheetTasks)
}

main()
