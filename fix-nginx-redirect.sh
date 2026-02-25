#!/bin/bash
# Скрипт для настройки правильных редиректов в Nginx
# - HTTP → HTTPS (без www)
# - HTTPS www → HTTPS без www

CONFIG_FILE="/etc/nginx/sites-available/braidx.tech"
BACKUP_FILE="${CONFIG_FILE}.backup.$(date +%Y%m%d_%H%M%S)"

echo "🔧 Настройка редиректов для правильной индексации..."
echo ""

# Создать резервную копию
if [ -f "$CONFIG_FILE" ]; then
    sudo cp "$CONFIG_FILE" "$BACKUP_FILE"
    echo "✅ Создана резервная копия: $BACKUP_FILE"
else
    echo "❌ Файл конфигурации не найден: $CONFIG_FILE"
    exit 1
fi

# Проверить, есть ли SSL сертификат для www
echo "🔍 Проверка SSL сертификата..."
if [ -f "/etc/letsencrypt/live/braidx.tech/fullchain.pem" ]; then
    echo "✅ SSL сертификат найден"
    
    # Проверить, включает ли сертификат www
    CERT_DOMAINS=$(openssl x509 -in /etc/letsencrypt/live/braidx.tech/fullchain.pem -text -noout | grep -oP 'DNS:\K[^\s,]+' || echo "")
    if [[ "$CERT_DOMAINS" == *"www.braidx.tech"* ]]; then
        echo "✅ Сертификат включает www.braidx.tech"
    else
        echo "⚠️  Сертификат не включает www.braidx.tech"
        echo "   Рекомендуется обновить: sudo certbot certonly --nginx --expand -d braidx.tech -d www.braidx.tech"
    fi
else
    echo "⚠️  SSL сертификат не найден"
    echo "   Установите через: sudo certbot certonly --nginx -d braidx.tech -d www.braidx.tech"
fi

echo ""
echo "📝 Обновление конфигурации Nginx..."

# Использовать правильную конфигурацию из nginx-braidvpn.conf
if [ -f "nginx-braidvpn.conf" ]; then
    echo "✅ Используется конфигурация из nginx-braidvpn.conf"
    sudo cp nginx-braidvpn.conf "$CONFIG_FILE"
else
    echo "⚠️  Файл nginx-braidvpn.conf не найден, применяю базовые исправления..."
    
    # Исправить HTTP редирект (убрать $server_name, использовать braidx.tech)
    sudo sed -i 's/return 301 https:\/\/\$server_name\$request_uri;/return 301 https:\/\/braidx.tech$request_uri;/' "$CONFIG_FILE"
    
    # Заменить return 404 на правильный редирект
    sudo sed -i 's/return 404; # managed by Certbot/return 301 https:\/\/braidx.tech$request_uri;/' "$CONFIG_FILE"
    
    # Добавить отдельный server блок для www (если его нет)
    if ! grep -q "server_name www.braidx.tech" "$CONFIG_FILE"; then
        echo "⚠️  Рекомендуется добавить отдельный server блок для www"
        echo "   См. файл nginx-braidvpn.conf для полной конфигурации"
    fi
fi

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
    curl -I http://braidx.tech 2>&1 | grep -i "location\|http" | head -2
    echo ""
    echo "2. HTTP www → HTTPS (без www):"
    curl -I http://www.braidx.tech 2>&1 | grep -i "location\|http" | head -2
    echo ""
    echo "3. HTTPS www → HTTPS (без www):"
    curl -I https://www.braidx.tech 2>&1 | grep -i "location\|http" | head -2 || echo "⚠️  SSL сертификат для www может отсутствовать"
    echo ""
    echo "✅ Настройка завершена!"
    echo ""
    echo "📋 Следующие шаги:"
    echo "   1. Убедитесь, что SSL сертификат включает www: sudo certbot certonly --nginx --expand -d braidx.tech -d www.braidx.tech"
    echo "   2. В Yandex Webmaster укажите главное зеркало: https://braidx.tech"
    echo "   3. Проверьте редиректы через браузер"
else
    echo ""
    echo "❌ Ошибка в конфигурации! Восстановление из резервной копии..."
    sudo cp "$BACKUP_FILE" "$CONFIG_FILE"
    echo "✅ Восстановлено из резервной копии"
    exit 1
fi
