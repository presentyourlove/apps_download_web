import { getAppsData } from '../../lib/data';

export async function GET() {
    const data = await getAppsData();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function getStaticPaths() {
    return [
        { params: { path: 'versions.json' } }
    ];
}
