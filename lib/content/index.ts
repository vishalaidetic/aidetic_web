/**
 * Content loader — reads page content JSON files from lib/content/data/.
 * Falls back to an empty object if the file doesn't exist.
 */

import path from 'path'
import fs from 'fs'

const DATA_DIR = path.join(process.cwd(), 'lib', 'content', 'data')

export async function getPageContent<T = Record<string, unknown>>(pageKey: string): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, `${pageKey}.json`)
    if (!fs.existsSync(filePath)) return {} as T
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return {} as T
  }
}

export async function setPageContent(pageKey: string, content: unknown): Promise<void> {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  const filePath = path.join(DATA_DIR, `${pageKey}.json`)
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8')
}
