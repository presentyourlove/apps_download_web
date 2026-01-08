/**
 * PNG to WebP Converter Script
 * 將 assets/ 目錄中的 PNG 圖片批次轉換為 WebP 格式
 * 
 * 用法: node scripts/convert-images.js
 */

const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const QUALITY = 85; // WebP 品質 (0-100)

/**
 * 遞迴搜尋目錄中的所有 PNG 檔案
 * @param {string} dir - 目錄路徑
 * @returns {Promise<string[]>} PNG 檔案路徑陣列
 */
async function findPngFiles(dir) {
    const files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const subFiles = await findPngFiles(fullPath);
            files.push(...subFiles);
        } else if (entry.name.toLowerCase().endsWith('.png')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

/**
 * 將單一 PNG 檔案轉換為 WebP
 * @param {string} pngPath - PNG 檔案路徑
 */
async function convertToWebP(pngPath) {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    
    try {
        const pngStats = await fs.stat(pngPath);
        
        await sharp(pngPath)
            .webp({ quality: QUALITY })
            .toFile(webpPath);
        
        const webpStats = await fs.stat(webpPath);
        const reduction = ((1 - webpStats.size / pngStats.size) * 100).toFixed(1);
        
        console.log(`✅ ${path.basename(pngPath)}`);
        console.log(`   PNG: ${(pngStats.size / 1024).toFixed(1)} KB → WebP: ${(webpStats.size / 1024).toFixed(1)} KB (減少 ${reduction}%)`);
        
        return { pngPath, webpPath, pngSize: pngStats.size, webpSize: webpStats.size };
    } catch (error) {
        console.error(`❌ ${path.basename(pngPath)}: ${error.message}`);
        return null;
    }
}

/**
 * 主程式
 */
async function main() {
    console.log('🖼️  PNG to WebP 轉換工具\n');
    console.log(`📁 目標目錄: ${ASSETS_DIR}`);
    console.log(`🎯 WebP 品質: ${QUALITY}\n`);
    
    const pngFiles = await findPngFiles(ASSETS_DIR);
    
    if (pngFiles.length === 0) {
        console.log('⚠️  找不到 PNG 檔案');
        return;
    }
    
    console.log(`📷 找到 ${pngFiles.length} 個 PNG 檔案\n`);
    
    const results = [];
    for (const pngPath of pngFiles) {
        const result = await convertToWebP(pngPath);
        if (result) {
            results.push(result);
        }
    }
    
    // 統計結果
    const totalPngSize = results.reduce((sum, r) => sum + r.pngSize, 0);
    const totalWebpSize = results.reduce((sum, r) => sum + r.webpSize, 0);
    const totalReduction = ((1 - totalWebpSize / totalPngSize) * 100).toFixed(1);
    
    console.log('\n📊 轉換完成統計:');
    console.log(`   轉換成功: ${results.length}/${pngFiles.length} 個檔案`);
    console.log(`   總計大小: ${(totalPngSize / 1024 / 1024).toFixed(2)} MB → ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   節省空間: ${totalReduction}%`);
}

main().catch(console.error);
