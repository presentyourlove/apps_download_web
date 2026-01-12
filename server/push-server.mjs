import express from 'express';
import webpush from 'web-push';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// In a real application, you should generate these keys once and store them safely.
// For this demo, we generate them on startup if not provided.
// You can generate keys using: ./node_modules/.bin/web-push generate-vapid-keys
const vapidKeys = webpush.generateVAPIDKeys();

const publicVapidKey = vapidKeys.publicKey;
const privateVapidKey = vapidKeys.privateKey;

// console.log('Public VAPID Key:', publicVapidKey);
// console.log('Private VAPID Key:', privateVapidKey);

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicVapidKey,
    privateVapidKey
);

// Store subscriptions in memory (Note: will be lost on server restart)
const subscriptions = [];

// Endpoint to get Public VAPID Key
app.get('/vapid-key', (req, res) => {
    res.json({ publicKey: publicVapidKey });
});

// Endpoint to Subscribe
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    // console.log('New Subscription:', subscription);
    res.status(201).json({});
});

// Endpoint to trigger Push Notification
app.post('/send-notification', (req, res) => {
    const notificationPayload = {
        notification: {
            title: 'Presentyourlove Apps',
            body: '這是一則來自伺服器的推播通知測試！',
            icon: 'assets/presentyourlove-logo-192.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
                url: 'https://presentyourlove.github.io/apps_download_web/'
            },
            actions: [
                { action: 'explore', title: '前往查看' }
            ]
        }
    };

    const promises = [];
    subscriptions.forEach(subscription => {
        promises.push(
            webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
        );
    });

    Promise.all(promises)
        .then(() => res.status(200).json({ message: 'Notification sent successfully.' }))
        .catch(() => {
            // console.error('Error sending notification, reason: ', err);
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    // console.log(`Push Server started on port ${port}`);
});
