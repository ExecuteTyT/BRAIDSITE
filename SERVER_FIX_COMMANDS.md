# Команды для исправления редиректов на сервере

Выполните эти команды на сервере для исправления редиректов www → без www.

## Вариант 1: Создать конфигурацию через cat (рекомендуется)

```bash
# Создать резервную копию текущей конфигурации
sudo cp /etc/nginx/sites-available/braidx.tech /etc/nginx/sites-available/braidx.tech.backup

# Создать новую конфигурацию
sudo tee /etc/nginx/sites-available/braidx.tech > /dev/null << 'EOF'
# Редирект HTTP → HTTPS (без www)
server {
    listen 80;
    listen [::]:80;
    server_name braidx.tech www.braidx.tech;
    return 301 https://braidx.tech$request_uri;
}

# Редирект HTTPS www → HTTPS без www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.braidx.tech;

    # SSL сертификаты
    ssl_certificate /etc/letsencrypt/live/braidx.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/braidx.tech/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Редирект 301 с www на без www
    return 301 https://braidx.tech$request_uri;
}

# Основной сервер (без www)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name braidx.tech;

    # SSL сертификаты
    ssl_certificate /etc/letsencrypt/live/braidx.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/braidx.tech/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /var/www/braidx.tech/dist;
    index index.html;

    access_log /var/log/nginx/braidx.tech.access.log;
    error_log /var/log/nginx/braidx.tech.error.log;

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
EOF

# Проверить конфигурацию
sudo nginx -t

# Если проверка успешна, перезагрузить Nginx
sudo systemctl reload nginx

# Проверить редиректы
echo "Проверка редиректов:"
echo "1. HTTP → HTTPS (без www):"
curl -I http://braidx.tech 2>&1 | grep -i "location\|http" | head -2
echo ""
echo "2. HTTP www → HTTPS (без www):"
curl -I http://www.braidx.tech 2>&1 | grep -i "location\|http" | head -2
echo ""
echo "3. HTTPS www → HTTPS (без www):"
curl -I https://www.braidx.tech 2>&1 | grep -i "location\|http" | head -2
```

## Вариант 2: Залить файлы с Git

```bash
# Перейти в директорию проекта (если есть)
cd /var/www/braidx.tech

# Или клонировать репозиторий
git clone https://github.com/ExecuteTyT/BRAIDSITE.git /tmp/braidsite
cd /tmp/braidsite

# Скопировать конфигурацию
sudo cp nginx-braidvpn.conf /etc/nginx/sites-available/braidx.tech

# Проверить и перезагрузить
sudo nginx -t
sudo systemctl reload nginx
```

## Вариант 3: Редактировать вручную через nano

```bash
sudo nano /etc/nginx/sites-available/braidx.tech
```

Добавьте отдельный server блок для www перед основным server блоком:

```nginx
# Редирект HTTPS www → HTTPS без www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.braidx.tech;

    ssl_certificate /etc/letsencrypt/live/braidx.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/braidx.tech/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    return 301 https://braidx.tech$request_uri;
}
```

И убедитесь, что в HTTP блоке редирект идет на `braidx.tech` (без www):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name braidx.tech www.braidx.tech;
    return 301 https://braidx.tech$request_uri;  # ← должно быть braidx.tech, а не $server_name
}
```

## После применения

Проверьте редиректы:

```bash
curl -I http://braidx.tech        # Должен: Location: https://braidx.tech/
curl -I http://www.braidx.tech   # Должен: Location: https://braidx.tech/
curl -I https://www.braidx.tech  # Должен: Location: https://braidx.tech/
```

Все три должны редиректить на `https://braidx.tech/` (без www).
