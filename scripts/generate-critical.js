/**
 * Critical CSS Generator Script
 * 提取首屏關鍵 CSS 並內嵌至 HTML
 * 
 * 用法: node scripts/generate-critical.js
 */

const critical = require('critical');
const fs = require('fs/promises');
const path = require('path');

const HTML_FILES = [
    'index.html',
    'financeapp-content.html',
    'subtrack-content.html',
    'sub-buddy-content.html',
    'links.html',
    'offline.html'
];

const BASE_DIR = path.join(__dirname, '..');
const CSS_FILE = path.join(BASE_DIR, 'css', 'style.css');

/**
 * 為單一 HTML 檔案產生 Critical CSS
 * @param {string} htmlFile - HTML 檔案名稱
 */
async function generateCriticalCSS(htmlFile) {
    const htmlPath = path.join(BASE_DIR, htmlFile);

    try {
        // 檢查檔案是否存在
        await fs.access(htmlPath);

        console.log(`⏳ 處理中: ${htmlFile}`);

        const result = await critical.generate({
            // 來源 HTML
            src: htmlPath,
            // CSS 檔案
            css: [CSS_FILE],
            // 視窗大小 (首屏範圍)
            dimensions: [
                { width: 375, height: 667 },   // iPhone SE
                { width: 768, height: 1024 },  // iPad
                { width: 1440, height: 900 }   // Desktop
            ],
            // 僅提取 Critical CSS，不修改 HTML
            extract: true,
            // 輸出為字串
            inline: false
        });

        // 儲存 Critical CSS
        const criticalCssPath = path.join(BASE_DIR, 'css', `critical-${htmlFile.replace('.html', '')}.css`);
        await fs.writeFile(criticalCssPath, result.css);

        console.log(`✅ 完成: ${htmlFile} → critical-${htmlFile.replace('.html', '')}.css`);
        console.log(`   大小: ${(result.css.length / 1024).toFixed(1)} KB`);

        return { file: htmlFile, size: result.css.length };
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`⏭️  跳過: ${htmlFile} (檔案不存在)`);
        } else {
            console.error(`❌ 錯誤: ${htmlFile}: ${error.message}`);
        }
        return null;
    }
}

/**
 * 主程式
 */
async function main() {
    console.log('🎨 Critical CSS 產生器\n');
    console.log('此腳本會為每個頁面提取首屏關鍵 CSS');
    console.log('產生的 CSS 可手動內嵌至各頁面 <head> 中\n');

    const results = [];

    for (const file of HTML_FILES) {
        const result = await generateCriticalCSS(file);
        if (result) {
            results.push(result);
        }
    }

    console.log('\n📊 完成統計:');
    console.log(`   成功: ${results.length}/${HTML_FILES.length} 個頁面`);

    if (results.length > 0) {
        const totalSize = results.reduce((sum, r) => sum + r.size, 0);
        console.log(`   總大小: ${(totalSize / 1024).toFixed(1)} KB`);
    }

    console.log('\n💡 下一步:');
    console.log('   1. 將 css/critical-*.css 內容內嵌至對應 HTML 的 <head>');
    console.log('   2. 將完整 CSS 改為延遲載入');
}

main().catch(console.error);
