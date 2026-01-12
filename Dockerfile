# 使用輕量級的 Nginx Alpine 映像檔
FROM nginx:alpine

# 複製 Nginx 設定檔 (啟用 Gzip, 快取優化等)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 複製靜態網站檔案到 Nginx 預設目錄
COPY . /usr/share/nginx/html

# 開放 80 port
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
