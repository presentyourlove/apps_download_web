import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getAppsData } from '../lib/data';

export async function GET(context) {
  const blogPosts = await getCollection('blog');
  const { apps } = await getAppsData();

  // 1. 處理部落格文章項目
  const blogItems = blogPosts.map((post) => ({
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
    link: `/blog/${post.id}/`,
    category: ['Blog'],
  }));

  // 2. 處理應用程式更新記錄項目
  const appUpdateItems = apps.flatMap((app) =>
    app.changelog.map((entry) => ({
      title: `[App 更新] ${app.displayName} v${entry.version}`,
      pubDate: new Date(entry.date),
      description: `<ul>${entry.changes.map(c => `<li>${c}</li>`).join('')}</ul>`,
      link: `/${app.id}/`,
      category: ['App Updates'],
    }))
  );

  // 3. 合併並按日期排序 (由新到舊)
  const allItems = [...blogItems, ...appUpdateItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: 'Presentyourlove - 最新消息與應用程式更新',
    description: '提供 FinanceApp, SubTrack 等應用程式的最新更新資訊與技術部落格',
    site: context.site,
    items: allItems,
    customData: `<language>zh-TW</language>`,
  });
}
