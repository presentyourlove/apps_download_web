import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getAppsByLang } from './data';
import { ui, defaultLang } from '../i18n/ui';

import type { APIContext } from 'astro';

export async function generateRSS(context: APIContext, lang: keyof typeof ui) {
  // 1. 取得對應語言的 Blog Posts
  const allPosts = await getCollection('blog');
  const blogPosts = allPosts.filter((post) => {
    // 假設 ID 格式為 "lang/slug"
    const [idLang] = post.id.split('/');
    return idLang === lang;
  });

  // 2. 取得對應語言的 Apps Data
  const apps = await getAppsByLang(lang);

  // 3. 處理部落格文章項目
  const blogItems = blogPosts.map((post) => ({
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
    link:
      lang === defaultLang
        ? `/blog/${post.id.split('/').slice(1).join('/')}/`
        : `/${lang}/blog/${post.id.split('/').slice(1).join('/')}/`,
    categories: ['Blog'],
  }));

  // 4. 處理應用程式更新記錄項目
  const appUpdateItems = apps.flatMap((app) =>
    app.changelog.map((entry) => ({
      title: `[App Update] ${app.displayName} v${entry.version}`,
      pubDate: new Date(entry.date),
      description: `<ul>${entry.changes.map((c) => `<li>${c}</li>`).join('')}</ul>`,
      link:
        lang === defaultLang
          ? `/${app._id.split('/').slice(1).join('/')}/`
          : `/${lang}/${app._id.split('/').slice(1).join('/')}/`,
      categories: ['App Updates'],
    }))
  );

  // 5. 合併並排序
  const allItems = [...blogItems, ...appUpdateItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: lang === 'zh-TW' ? 'Presentyourlove - 最新消息' : 'Presentyourlove - Latest Updates',
    description:
      lang === 'zh-TW'
        ? '提供 FinanceApp, SubTrack 等應用程式的最新更新資訊與技術部落格'
        : 'Latest updates regarding FinanceApp, SubTrack and technical blog posts.',
    site: context.site,
    items: allItems,
    customData: `<language>${lang}</language>`,
  });
}
