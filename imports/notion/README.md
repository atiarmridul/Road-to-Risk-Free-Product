# Notion Import

## Script

Run:

```bash
node scripts/import-notion-page.mjs \
  --token "$NOTION_TOKEN" \
  --page-url "https://www.notion.so/Jmeter-02cfb561876c43b3bdbde4b6e8b10e6f?pvs=28" \
  --out-dir imports/notion
```

Output:
- `imports/notion/<page-slug>.md`
- `imports/notion/<page-slug>.meta.json`

## Required Notion Access

The page must be shared with your integration.

Notion error seen during this run:
- `object_not_found`
- Message: page not found for integration `SQA Study Sync`

Fix:
1. Open the Notion page.
2. Click `...` (top-right) -> `Connections`.
3. Add `SQA Study Sync` integration.
4. Re-run the command above.
