# COS i18n Translation Workflow

This project manages all i18n translations in **Google Sheets**, making it easy for both developers and non-developers to collaborate on translations.

This workflow ensures a single source of truth for translations and keeps localization changes synchronized across the codebase.

## Syncing Translations to the Codebase

### Authentication Setup

Before syncing translations to the codebase, you need to set up Google Cloud authentication and create a project with Google Sheet API enabled.

1. Install [Google Cloud SDK](https://docs.cloud.google.com/sdk/docs/install-sdk) on your local machine.
2. Set up Application Default Credentials (ADC) by running the following command. When prompted, make sure to log in with **your Bigstack Google Workspace account**. Personal Google accounts do not have access to the required spreadsheet:

   ```bash
   gcloud auth application-default login \
     --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/spreadsheets.readonly"
   ```

3. Create a Google Cloud project if you don't already have one. The following command creates a project with ID `cos-i18n`:

   ```bash
   gcloud projects create cos-i18n
   ```

4. Set the created project as the active project for Google Cloud SDK:

   ```bash
   gcloud config set project cos-i18n
   ```

5. Enable Google Sheets API for the active project:

   ```bash
   gcloud services enable sheets.googleapis.com
   ```

6. Configure ADC to use the created project for API billing and quota limits:

   ```bash
   gcloud auth application-default set-quota-project cos-i18n
   ```

### Syncing Translations

Duplicate `i18nSheetConfig.json.local.example` and rename it to `i18nSheetConfig.json.local`, which is ignored by Git, then
set up google sheet id and target version in the `i18nSheetConfig.json.local`.

A script is provided to sync translations from Google Sheets to local JSON files that should be pushed to the remote:

- Script location:

  ```bash
  scripts/syncI18n.ts
  ```

- How to run:

  From the i18n directory, execute:

  ```bash
  pnpm run sync
  ```

  From the root directory, execute:

  ```bash
  pnpm run i18n:sync
  ```

### Google Sheet Structure

Each release version contains **two worksheets**, each with a distinct purpose:

1. **{version} web-app**: Used for web-app translations
2. **{version} ui-library**: Used for shared UI components and common elements

Please place translation strings in the correct worksheet based on their purpose and version.

## i18n Key Naming Conventions

### General Rules

- Keep keys short, clear, and readable
- For nested structures, use dot notation (e.g., `home.overview.chart.instance`)
- Use abbreviations only when they are widely understood and unambiguous, e.g., `vm`.

## I18n Key Format

### Web app

1. `page + place/context (optional) + label/function`
2. `layout (sidebar/header) + place/context (optional) + label/function`

Examples:

`home.overview.chart.vmSummary`

1. Page: `home.overview`
2. Place/context: `chart`
3. label/function: `vmSummary`

`home.overview.chart.title`

1. Page: `home.overview`
2. Place/context: `chart`
3. label/function: `title`

`sidebar.events`

1. Layout: `sidebar`
2. Place/context: N/A
3. Label/function: `events`

### UI Library

1. `component prefix + component name + label/function`

Examples:

1. `component.modal.ok`
2. `component.panel.viewAll`

### Use Camel Case

1. ✅ `home.overview.chart.vmSummary`
2. ❌ `home.overview.chart.vmsummary`
3. ❌ `home.overview.chart.vm-summary`
4. ❌ `home.overview.chart.vm_summary`

### Interpolation

Fill dynamic data into the i18n translation.
Example: `Failed to remove OSD {{osd}} from {{node}}.`

reference: [Interpolation | i18next documentation](https://www.i18next.com/translation-function/interpolation)

### Singular/Plural

In order to support English plurals

1. We have to define another i18n key with `_{others}` suffix.
2. We must defined the name of the placeholder as `count`

| Key                                   | en                          | zh-TW                     |
| ------------------------------------- | --------------------------- | ------------------------- |
| home.overview.instanceCount           | We have {{count} instance.  | 我們有 {{count}} 個虛擬機 |
| home.overview.instanceCount\_{others} | We have {{count}} instances | 我們有 {{count}} 個虛擬機 |

1. `home.overview.instanceCount` => singular
2. `home.overview.instanceCount_{other}` => plural

Reference: [Plurals | i18next documentation](https://www.i18next.com/translation-function/plurals)

### Embedded Styles

We can use `<bold>target text</bold>` or `<italic>target text</italic>` to highlight target text.

Examples:

1. `Successfully reweighted OSD <bold>{{osd}}</bold> in <bold>{{node}}</bold>.`
2. `Successfully reweighted OSD <italic>{{osd}}</italic> in <bold>{{node}}</bold>.`

More styles and formats are possible, but we need to discuss with frontend developers to confirm details.

Reference: [i18next - Trans Component](https://react.i18next.com/latest/trans-component)

### Embedded Link

1. Use `<hyperlink>target text</hyperlink>` to add link to the target text.
2. We can embed multiples link in 1 sentence by individual `hyperlink1, hyperlink2…`.

Examples:

1. `About our license, please check out <hyperlink>documentation</hyperlink>`.
2. `About our license, please check out <hyperlink1>documentation</hyperlink1> or <hyperlink2>reach us</hyperlink2> by email.`

More styles and formats are possible, but we need to discuss with frontend developers to confirm details.

> [!WARNING]
> Existing self-closing HTML tag names are reserved keys and won't work. Examples: link: `<Link />`, img: `<img src="" />`, media: `<img src="" />`

Reference: [i18next - Trans Component](https://react.i18next.com/latest/trans-component)

### API I18n

Notifications i18n format:

1. `notifications.{id}.title`
2. `notifications.{id}.message`

Currently, COS API response does not have `businessCode` , so this format just a draft, need to discuss with the backend developers.

1. `api.{businessCode}.title`
2. `api.{businessCode}.message`

---

## Should We Translate It?

1. Prefer not to translate company names or platforms such as `Rancher`, `Openstack`, `Google` and `Amazon`
2. Prefer not to translate terms like `CPU`, `vCPU`, `IP`, `API`, `GiB`, `GB`, `MB`
3. Prefer not to translate service names like `nginx`, `HACluster`…
4. Prefer not to translate COS platform terms like `Control`, `Compute`, `Edge`, `Moderator`, `Event ID` at first. We can make adjustments later once the documents translate these terms.
5. Only translate backend responses when the field has an enum definition.
6. Currently, we don't have plans to translate Keycloak login page and other integrated platforms like Grafana, Skyline, Rancher, and Ceph. We will discuss this in the future phase.
7. If you are unsure if a term should be translated, consult a domain expert.

---

## Additional Information/Tools

1. [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)
2. [openCC](https://github.com/BYVoid/OpenCC) [開放中文轉換 Open Chinese Convert \(OpenCC\)](https://opencc.byvoid.com/)
