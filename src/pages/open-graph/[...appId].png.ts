/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAppsData } from '../../lib/data';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  const { apps } = await getAppsData();
  return apps.map((app) => ({
    params: { appId: app.id },
    props: { app },
  }));
}

// Load fonts
async function loadGoogleFont() {
  // Use a local font file from node_modules
  // This is more stable than fetching at build time
  const fontPath = path.resolve(
    'node_modules/@fontsource/noto-sans-tc/files/noto-sans-tc-latin-700-normal.woff'
  );
  return await fs.readFile(fontPath);
}

export const GET: APIRoute = async ({ props }) => {
  const { app } = props;

  if (!app) {
    return new Response('App not found', { status: 404 });
  }

  // Load font data
  const fontData = await loadGoogleFont();

  // Create markup using satori-html or pure objects
  // Using simple object style for better type safety and performance
  const markup = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        fontFamily: 'Noto Sans TC',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '60px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            },
            children: [
              // Icon Placeholder (Simulated since we can't easily load local images in build without fs)
              // In production, we might fetch the image or just use text/svg
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    width: '160px',
                    height: '160px',
                    borderRadius: '32px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '80px',
                    marginRight: '48px',
                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                  },
                  children: (app.displayName[0] || 'A').toUpperCase(),
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                  children: [
                    {
                      type: 'h1',
                      props: {
                        style: {
                          fontSize: '72px',
                          fontWeight: 'bold',
                          margin: '0 0 16px 0',
                          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        },
                        children: app.displayName,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontSize: '32px',
                          color: '#94a3b8',
                          gap: '24px',
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              children: `v${app.version}`,
                            },
                          },
                          {
                            type: 'span',
                            props: {
                              children: '|',
                            },
                          },
                          {
                            type: 'span',
                            props: {
                              children: app.releaseDate,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // Branding Footer
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.4)',
              fontWeight: 600,
            },
            children: 'Presentyourlove',
          },
        },
      ],
    },
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svg = await satori(markup as any, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans TC',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: fontData as any,
          weight: 700,
          style: 'normal',
        },
      ],
    });

    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });

    const image = resvg.render();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Response(image.asPng() as any, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    // Error generating OG image
    // Fallback to error text or static image redirect if generation fails
    return new Response('Error generating image', { status: 500 });
  }
};
