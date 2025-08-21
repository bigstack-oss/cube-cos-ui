import fs from 'node:fs'
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import creds from './google-doc-api.json' with { type: 'json' }

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const googleSheetId = '1fHAjympbsWiAOsgYF84kOD7eKr5p3fREcQiP9I5WtJ0'
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

const jwt = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
})

const doc = new GoogleSpreadsheet(googleSheetId, jwt)

type TranslationRowData = {
  page: string
  key: string
  en: string
  'zh-tw': string
}

await doc.loadInfo() // loads document properties and worksheets
console.log(doc.title)

const cosI18nSheet = doc.sheetsByIndex[0] // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
const rows = await cosI18nSheet.getRows<TranslationRowData>()

const translations: TranslationRowData[] = []

const parseTranslation = (row: GoogleSpreadsheetRow<TranslationRowData>) => {
  const translation = {
    page: row.get('page'),
    key: row.get('key'),
    en: row.get('en'),
    'zh-tw': row.get('zh-tw'),
  }
  return translation
}

rows.forEach((row) => {
  const translation = parseTranslation(row)
  translations.push(translation)
})

const en = Object.fromEntries(translations.map((item) => [item.key, item.en]))
const zhTw = Object.fromEntries(
  translations.map((item) => [item.key, item['zh-tw']]),
)

const format = (record: Record<string, string>) =>
  JSON.stringify(record, null, 2)

fs.writeFileSync(__dirname + '/../src/i18n/locales/en.json', format(en))
fs.writeFileSync(__dirname + '/../src/i18n/locales/zh-tw.json', format(zhTw))
