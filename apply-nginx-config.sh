#!/bin/bash
# Скрипт для применения правильной конфигурации Nginx

CONFIG_FILE="/etc/nginx/sites-available/braidvpn.com"
BACKUP_FILE="${CONFIG_FILE}.backup.$(date +%Y%m%d_%H%M%S)"

echo "🔧 Применение конфигурации Nginx для правильных редиректов..."
echo ""

# Создать резервную копию
if [ -f "$CONFIG_FILE" ]; then
    sudo cp "$CONFIG_FILE" "$BACKUP_FILE"
    echo "✅ Создана резервная копия: $BACKUP_FILE"
fi

# Применить конфигурацию
cat > /tmp/nginx-braidvpn.conf << 'NGINX_EOF'
# Редирект HTTP → HTTPS (без www)
server {
    listen 80;
    listen [::]:80;
    server_name braidvpn.com www.braidvpn.com;
    return 301 https://braidvpn.com$request_uri;
}

# Редирект HTTPS www → HTTPS без www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.braidvpn.com;

    ssl_certificate /etc/letsencrypt/live/braidvpn.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/braidvpn.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    return 301 https://braidvpn.com$request_uri;
}

# Основной сервер (без www)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name braidvpn.com;

    ssl_certificate /etc/letsencrypt/live/braidvpn.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/braidvpn.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /var/www/braidvpn.com/dist;
    index index.html;

    access_log /var/log/nginx/braidvpn.com.access.log;
    error_log /var/log/nginx/braidvpn.com.error.log;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~ ^/(sitemap\.xml|robots\.txt)$ {
        expires 1d;
        add_header Cache-Control "public";
    }

    location / {
        try_files $uri $uri/ /index.html;
        
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX_EOF

sudo cp /tmp/nginx-braidvpn.conf "$CONFIG_FILE"
echo "✅ Конфигурация применена"

# Проверить конфигурацию
echo ""
echo "🔍 Проверка конфигурации Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Конфигурация корректна. Перезагрузка Nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx перезагружен"
    
    # Проверить редиректы
    echo ""
    echo "🔍 Проверка редиректов:"
    echo ""
    echo "1. HTTP → HTTPS (без www):"
    curl -I http://braidvpn.com 2>&1 | grep -i "location\|http" | head -2
    echo ""
    echo "2. HTTP www → HTTPS (без www):"
    curl -I http://www.braidvpn.com 2>&1 | grep -i "location\|http" | head -2
    echo ""
    echo "3. HTTPS www → HTTPS (без www):"
    curl -I https://www.braidvpn.com 2>&1 | grep -i "location\|http" | head -2
    echo ""
    echo "✅ Готово! Все редиректы должны вести на https://braidvpn.com"
else
    echo ""
    echo "❌ Ошибка в конфигурации! Восстановление из резервной копии..."
    if [ -f "$BACKUP_FILE" ]; then
        sudo cp "$BACKUP_FILE" "$CONFIG_FILE"
        echo "✅ Восстановлено из резервной копии"
    fi
    exit 1
fi
