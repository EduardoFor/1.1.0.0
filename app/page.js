import { readFile } from 'fs/promises';
import path from 'path';
import PageShell from './PageShell';

export default async function HomePage() {
  const htmlPath = path.join(process.cwd(), 'index.html');
  const rawHtml = await readFile(htmlPath, 'utf8');

  const bodyContent = rawHtml
    .replace(/<!doctype html>/i, '')
    .replace(/<html[^>]*>/i, '')
    .replace(/<\/html>/i, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/i, '')
    .replace(/<body[^>]*>/i, '')
    .replace(/<\/body>/i, '');

  return <PageShell bodyContent={bodyContent} />;
}
