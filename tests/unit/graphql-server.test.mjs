/**
 * GraphQL Server 單元測試
 * 
 * 測試 GraphQL API 的 Resolvers 邏輯是否正確
 * 
 * @vitest-environment node
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 從 graphql-server.mjs 複製 typeDefs 和 resolvers
const typeDefs = `#graphql
  type Platform {
    type: String!
    version: String!
    downloadUrl: String
    storeUrl: String
    minSdk: Int
    minOS: String
    size: String
    url: String
  }

  type Changelog {
    version: String!
    date: String!
    changes: [String!]!
  }

  type App {
    id: ID!
    name: String!
    displayName: String!
    version: String!
    releaseDate: String!
    platforms: [Platform!]!
    changelog: [Changelog!]!
  }

  type Query {
    apps: [App!]!
    app(id: String!): App
    appsByPlatform(platform: String!): [App!]!
    lastUpdated: String!
  }
`;

// 載入測試資料
async function loadAppsData() {
    const dataPath = join(__dirname, '../../api/versions.json');
    const fileContent = await readFile(dataPath, 'utf-8');
    return JSON.parse(fileContent);
}

const resolvers = {
    Query: {
        apps: async () => {
            const data = await loadAppsData();
            return data.apps;
        },
        app: async (_, { id }) => {
            const data = await loadAppsData();
            return data.apps.find(app => app.id === id) || null;
        },
        appsByPlatform: async (_, { platform }) => {
            const data = await loadAppsData();
            return data.apps.filter(app =>
                Object.keys(app.platforms).includes(platform)
            );
        },
        lastUpdated: async () => {
            const data = await loadAppsData();
            return data.lastUpdated;
        }
    },
    App: {
        platforms: (parent) => {
            return Object.entries(parent.platforms).map(([type, details]) => ({
                type,
                ...details
            }));
        }
    }
};

describe('GraphQL Server - Resolvers', () => {
    let server;

    beforeAll(() => {
        server = new ApolloServer({
            typeDefs,
            resolvers
        });
    });

    describe('Query: apps', () => {
        it('應該回傳所有應用程式清單', async () => {
            const response = await server.executeOperation({
                query: `
          query {
            apps {
              id
              name
              displayName
            }
          }
        `
            });

            expect(response.body.kind).toBe('single');
            expect(response.body.singleResult.errors).toBeUndefined();
            expect(response.body.singleResult.data.apps).toBeDefined();
            expect(response.body.singleResult.data.apps.length).toBeGreaterThan(0);

            // 驗證資料結構
            const firstApp = response.body.singleResult.data.apps[0];
            expect(firstApp).toHaveProperty('id');
            expect(firstApp).toHaveProperty('name');
            expect(firstApp).toHaveProperty('displayName');
        });

        it('應該包含三個應用程式 (financeapp, subtrack, sub-buddy)', async () => {
            const response = await server.executeOperation({
                query: `
          query {
            apps {
              id
            }
          }
        `
            });

            const appIds = response.body.singleResult.data.apps.map(app => app.id);
            expect(appIds).toContain('financeapp');
            expect(appIds).toContain('subtrack');
            expect(appIds).toContain('sub-buddy');
        });
    });

    describe('Query: app(id)', () => {
        it('應該回傳指定 ID 的應用程式', async () => {
            const response = await server.executeOperation({
                query: `
          query GetApp($id: String!) {
            app(id: $id) {
              id
              name
              displayName
              version
            }
          }
        `,
                variables: { id: 'financeapp' }
            });

            expect(response.body.singleResult.errors).toBeUndefined();
            const app = response.body.singleResult.data.app;
            expect(app).toBeDefined();
            expect(app.id).toBe('financeapp');
            expect(app.name).toBe('FinanceApp');
            expect(app.displayName).toBe('智慧理財助手');
        });

        it('應該回傳完整的 platforms 資訊', async () => {
            const response = await server.executeOperation({
                query: `
          query {
            app(id: "financeapp") {
              platforms {
                type
                version
              }
            }
          }
        `
            });

            const platforms = response.body.singleResult.data.app.platforms;
            expect(platforms).toBeDefined();
            expect(Array.isArray(platforms)).toBe(true);
            expect(platforms.length).toBeGreaterThan(0);
            expect(platforms[0]).toHaveProperty('type');
            expect(platforms[0]).toHaveProperty('version');
        });

        it('應該回傳 null 當應用程式不存在時', async () => {
            const response = await server.executeOperation({
                query: `
          query {
            app(id: "nonexistent") {
              id
              name
            }
          }
        `
            });

            expect(response.body.singleResult.errors).toBeUndefined();
            expect(response.body.singleResult.data.app).toBeNull();
        });
    });

    describe('Query: appsByPlatform', () => {
        it('應該篩選出 Android 平台的應用程式', async () => {
            const response = await server.executeOperation({
                query: `
          query GetAppsByPlatform($platform: String!) {
            appsByPlatform(platform: $platform) {
              id
              name
            }
          }
        `,
                variables: { platform: 'android' }
            });

            expect(response.body.singleResult.errors).toBeUndefined();
            const apps = response.body.singleResult.data.appsByPlatform;
            expect(apps).toBeDefined();
            expect(Array.isArray(apps)).toBe(true);

            // financeapp 有 android 平台
            const appIds = apps.map(app => app.id);
            expect(appIds).toContain('financeapp');
        });

        it('應該篩選出 iOS 平台的應用程式', async () => {
            const response = await server.executeOperation({
                query: `
          query {
            appsByPlatform(platform: "ios") {
              id
            }
          }
        `
            });

            const apps = response.body.singleResult.data.appsByPlatform;
            const appIds = apps.map(app => app.id);

            // subtrack 有 ios 平台
            expect(appIds).toContain('subtrack');
        });

        it('應該回傳空陣列當沒有應用程式支援該平台時', async () => {
            const response = await server.executeOperation({
                query: `
          query {
            appsByPlatform(platform: "nonexistent") {
              id
            }
          }
        `
            });

            expect(response.body.singleResult.errors).toBeUndefined();
            expect(response.body.singleResult.data.appsByPlatform).toEqual([]);
        });
    });

    describe('Query: lastUpdated', () => {
        it('應該回傳最後更新時間', async () => {
            const response = await server.executeOperation({
                query: `
          query {
            lastUpdated
          }
        `
            });

            expect(response.body.singleResult.errors).toBeUndefined();
            const lastUpdated = response.body.singleResult.data.lastUpdated;
            expect(lastUpdated).toBeDefined();
            expect(typeof lastUpdated).toBe('string');

            // 驗證日期格式 (ISO 8601)
            expect(() => new Date(lastUpdated)).not.toThrow();
        });
    });
});
