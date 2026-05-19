# Инструкция по деплою BRAID VPN на сервер

## Подготовка проекта

### 1. Сборка проекта

```bash
# Установка зависимостей
npm install

# Сборка production версии
npm run build
```

После сборки будет создана папка `dist/` с готовыми файлами для деплоя.

### 2. Проверка сборки локально

```bash
# Предпросмотр собранного проекта
npm run preview
```

---

## Деплой на сервер с Nginx

### Шаг 1: Подготовка сервера

**Требования:**
- Ubuntu/Debian сервер
- Nginx установлен
- Домен `braidpro.tech` настроен и указывает на IP сервера

### Шаг 2: Загрузка файлов на сервер

**Вариант A: Через SCP**

```bash
# С вашего локального компьютера
scp -r dist/* user@your-server-ip:/var/www/braidpro.tech/html/
```

**Вариант B: Через Git (рекомендуется)**

```bash
# На сервере
cd /var/www/
git clone https://github.com/ExecuteTyT/BRAIDSITE.git braidpro.tech
cd braidpro.tech
npm install
npm run build
```

### Шаг 3: Настройка Nginx

Создайте файл конфигурации `/etc/nginx/sites-available/braidpro.tech`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name braidpro.tech www.braidpro.tech;

    # Редирект на HTTPS (после настройки SSL)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name braidpro.tech www.braidpro.tech;

    # SSL сертификаты (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/braidpro.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/braidpro.tech/privkey.pem;
    
    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Корневая директория
    root /var/www/braidpro.tech/dist;
    index index.html;

    # Логи
    access_log /var/log/nginx/braidpro.tech.access.log;
    error_log /var/log/nginx/braidpro.tech.error.log;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Кеширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Sitemap и robots.txt
    location ~ ^/(sitemap\.xml|robots\.txt)$ {
        expires 1d;
        add_header Cache-Control "public";
    }

    # Основная конфигурация для SPA
    location / {
        try_files $uri $uri/ /index.html;
        
        # Security headers
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    }

    # Блокировка доступа к служебным файлам
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### Шаг 4: Активация конфигурации

```bash
# Создать символическую ссылку
sudo ln -s /etc/nginx/sites-available/braidpro.tech /etc/nginx/sites-enabled/

# Проверить конфигурацию
sudo nginx -t

# Перезагрузить Nginx
sudo systemctl reload nginx
```

### Шаг 5: Настройка SSL (Let's Encrypt)

```bash
# Установка Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d braidpro.tech -d www.braidpro.tech

# Автоматическое обновление (добавится в cron)
sudo certbot renew --dry-run
```

---

## Деплой на сервер с Apache

### Шаг 1: Настройка Apache

Создайте файл `/etc/apache2/sites-available/braidpro.tech.conf`:

```apache
<VirtualHost *:80>
    ServerName braidpro.tech
    ServerAlias www.braidpro.tech
    Redirect permanent / https://braidpro.tech/
</VirtualHost>

<VirtualHost *:443>
    ServerName braidpro.tech
    ServerAlias www.braidpro.tech
    DocumentRoot /var/www/braidpro.tech/dist

    # SSL настройки
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/braidpro.tech/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/braidpro.tech/privkey.pem

    # Логи
    ErrorLog ${APACHE_LOG_DIR}/braidpro.tech_error.log
    CustomLog ${APACHE_LOG_DIR}/braidpro.tech_access.log combined

    # Gzip
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>

    # Кеширование
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
    </IfModule>

    # SPA routing
    <Directory /var/www/braidpro.tech/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Fallback на index.html для SPA
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Security headers
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</VirtualHost>
```

### Шаг 2: Активация модулей и сайта

```bash
# Включить необходимые модули
sudo a2enmod ssl
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate

# Активировать сайт
sudo a2ensite braidpro.tech.conf

# Проверить конфигурацию
sudo apache2ctl configtest

# Перезагрузить Apache
sudo systemctl reload apache2
```

---

## Автоматизация деплоя (опционально)

### Скрипт для автоматического деплоя

Создайте файл `deploy.sh` в корне проекта:

```bash
#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Начинаем деплой BRAID VPN...${NC}"

# Переменные
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/braidpro.tech"

# Сборка проекта
echo -e "${GREEN}📦 Собираем проект...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при сборке проекта${NC}"
    exit 1
fi

# Загрузка на сервер
echo -e "${GREEN}📤 Загружаем файлы на сервер...${NC}"
rsync -avz --delete dist/ ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/dist/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при загрузке файлов${NC}"
    exit 1
fi

# Перезагрузка Nginx на сервере
echo -e "${GREEN}🔄 Перезагружаем Nginx...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "sudo systemctl reload nginx"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при перезагрузке Nginx${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Деплой успешно завершен!${NC}"
echo -e "${GREEN}🌐 Сайт доступен: https://braidpro.tech${NC}"
```

Сделайте скрипт исполняемым:

```bash
chmod +x deploy.sh
```

Использование:

```bash
./deploy.sh
```

---

## Настройка DNS

### Записи DNS для домена braidpro.tech

```
Тип    Имя    Значение              TTL
A      @      YOUR_SERVER_IP        3600
A      www    YOUR_SERVER_IP        3600
```

---

## Проверка после деплоя

### 1. Проверка доступности

```bash
# Проверка HTTP
curl -I http://braidpro.tech

# Проверка HTTPS
curl -I https://braidpro.tech

# Проверка sitemap
curl https://braidpro.tech/sitemap.xml

# Проверка robots.txt
curl https://braidpro.tech/robots.txt
```

### 2. Проверка SSL

- [SSL Labs Test](https://www.ssllabs.com/ssltest/) - проверка SSL сертификата
- [Security Headers](https://securityheaders.com/) - проверка security headers

### 3. Проверка SEO

- [Google Search Console](https://search.google.com/search-console) - добавить сайт и отправить sitemap
- [Google Rich Results Test](https://search.google.com/test/rich-results) - проверка структурированных данных
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) - проверка OG тегов

---

## Мониторинг и обслуживание

### Логи

```bash
# Nginx логи
tail -f /var/log/nginx/braidpro.tech.access.log
tail -f /var/log/nginx/braidpro.tech.error.log

# Apache логи
tail -f /var/log/apache2/braidpro.tech_access.log
tail -f /var/log/apache2/braidpro.tech_error.log
```

### Обновление сайта

```bash
# На сервере
cd /var/www/braidpro.tech
git pull origin main
npm install
npm run build
sudo systemctl reload nginx  # или apache2
```

### Автоматическое обновление SSL

Let's Encrypt сертификаты обновляются автоматически через cron, но можно проверить:

```bash
sudo certbot renew --dry-run
```

---

## Troubleshooting

### Проблема: 404 на всех страницах кроме главной

**Решение:** Убедитесь, что настроен fallback на `index.html` для SPA роутинга.

### Проблема: Статические файлы не загружаются

**Решение:** Проверьте права доступа:
```bash
sudo chown -R www-data:www-data /var/www/braidpro.tech/dist
sudo chmod -R 755 /var/www/braidpro.tech/dist
```

### Проблема: SSL сертификат не работает

**Решение:** 
1. Проверьте, что порт 443 открыт в firewall
2. Убедитесь, что домен правильно указывает на сервер
3. Проверьте логи: `sudo tail -f /var/log/letsencrypt/letsencrypt.log`

---

## Дополнительные настройки

### Настройка Firewall (UFW)

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### Оптимизация производительности

1. **Включить HTTP/2** (уже в конфигурации Nginx)
2. **Включить Brotli сжатие** (опционально)
3. **Настроить CDN** для статических файлов (опционально)

---

## Контакты и поддержка

При возникновении проблем проверьте:
- Логи сервера
- Конфигурацию веб-сервера
- DNS настройки
- SSL сертификаты

Успешного деплоя! 🚀
