import { generateRSS } from '../lib/rss';

export async function GET(context) {
  return generateRSS(context, 'zh-TW');
}
