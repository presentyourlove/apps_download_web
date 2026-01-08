/**
 * CSP (Content Security Policy) 違規監控
 * 收集 CSP 違規報告並上報至指定端點。
 * 
 * 用法:
 * 1. 在 HTML <head> 中設定 CSP meta tag 的 report-uri
 * 2. 引入此腳本監聽 securitypolicyviolation 事件
 */
'use strict';

const CSPMonitor = (function () {
    // 報告端點 (可配置為自己的 API 或使用第三方服務如 report-uri.com)
    // 設為 null 時只在 console 輸出，不發送到遠端
    const REPORT_ENDPOINT = null;

    // 是否在 console 輸出違規資訊
    const LOG_TO_CONSOLE = true;

    // 儲存已報告的違規 (避免重複報告同樣的違規)
    const reportedViolations = new Set();

    /**
     * 產生違規識別碼
     * @param {Object} violation - 違規資訊
     * @returns {string}
     */
    function getViolationId(violation) {
        return `${violation.violatedDirective}:${violation.blockedURI}:${violation.sourceFile}:${violation.lineNumber}`;
    }

    /**
     * 處理 CSP 違規事件
     * @param {SecurityPolicyViolationEvent} event
     */
    function handleViolation(event) {
        const violation = {
            documentUri: event.documentURI,
            violatedDirective: event.violatedDirective,
            effectiveDirective: event.effectiveDirective,
            originalPolicy: event.originalPolicy,
            blockedUri: event.blockedURI,
            sourceFile: event.sourceFile,
            lineNumber: event.lineNumber,
            columnNumber: event.columnNumber,
            statusCode: event.statusCode,
            sample: event.sample,
            timestamp: new Date().toISOString()
        };

        const violationId = getViolationId(violation);

        // 避免重複報告
        if (reportedViolations.has(violationId)) {
            return;
        }
        reportedViolations.add(violationId);

        // 在 console 輸出
        if (LOG_TO_CONSOLE) {
            console.warn('🛡️ CSP 違規偵測:', {
                directive: violation.violatedDirective,
                blockedUri: violation.blockedUri,
                source: `${violation.sourceFile}:${violation.lineNumber}:${violation.columnNumber}`
            });
        }

        // 發送到遠端端點
        if (REPORT_ENDPOINT) {
            sendReport(violation);
        }
    }

    /**
     * 發送違規報告至遠端
     * @param {Object} violation
     */
    async function sendReport(violation) {
        try {
            await fetch(REPORT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/csp-report'
                },
                body: JSON.stringify({
                    'csp-report': violation
                }),
                // 使用 keepalive 確保頁面離開時也能送出
                keepalive: true
            });
        } catch (error) {
            // 靜默失敗，避免影響使用者體驗
            console.debug('CSP 報告發送失敗:', error);
        }
    }

    /**
     * 初始化 CSP 監控
     */
    function init() {
        // 監聽 CSP 違規事件
        document.addEventListener('securitypolicyviolation', handleViolation);

        if (LOG_TO_CONSOLE) {
            console.info('🛡️ CSP 監控已啟用');
        }
    }

    /**
     * 取得已收集的違規數量
     * @returns {number}
     */
    function getViolationCount() {
        return reportedViolations.size;
    }

    // 公開 API
    return {
        init,
        getViolationCount
    };
})();

// 自動初始化
if (typeof window !== 'undefined') {
    CSPMonitor.init();
}
