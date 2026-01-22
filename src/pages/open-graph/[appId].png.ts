import { getAppsData } from '../../lib/data';
import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  const { apps } = await getAppsData();
  return apps.map((app) => ({
    params: { appId: app.id },
    props: { app },
  }));
}

export const GET: APIRoute = async ({ params: _params, request }) => {
  // 由於 Resvg 在此環境下建置會發生 Panic，暫時停用動態生成
  // 改為重定向到預設的靜態 OG 圖片

  const defaultOgUrl = new URL('/assets/presentyourlove-logo-512.png', request.url).toString();

  // 使用手動構建 Response 以避免 Astro/Undici 可能的 Immutable Headers 錯誤
  return new Response(null, {
    status: 302,
    headers: {
      Location: defaultOgUrl,
    },
  });
};
