/**
 * Web Push Client Logic
 */

const API_BASE_URL = 'http://localhost:3000'; // Change this for production

/**
 * 檢查通知權限
 */
export function checkPermission() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Push messaging is not supported');
        return false;
    }
    return Notification.permission;
}

/**
 * 請求通知權限
 */
export async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error('Notification permission not granted');
    }
    return permission;
}

/**
 * 訂閱推播
 */
export async function subscribeToPush() {
    try {
        const registration = await navigator.serviceWorker.ready;

        // 1. Get Public Key from Server
        const response = await fetch(`${API_BASE_URL}/vapid-key`);
        const data = await response.json();
        const publicVapidKey = data.publicKey;

        // 2. Subscribe using PushManager
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        console.log('User is subscribed:', subscription);

        // 3. Send Subscription to Server
        await fetch(`${API_BASE_URL}/subscribe`, {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        });

        return true;
    } catch (error) {
        console.error('Failed to subscribe the user: ', error);
        return false;
    }
}

/**
 * VAPID Key Converter
 */
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
