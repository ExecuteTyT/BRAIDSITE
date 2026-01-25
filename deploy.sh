#!/bin/bash

# Скрипт автоматического деплоя BRAID VPN на сервер
# Использование: ./deploy.sh

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Конфигурация (измените под ваш сервер)
SERVER_USER="${DEPLOY_USER:-your-username}"
SERVER_IP="${DEPLOY_IP:-your-server-ip}"
SERVER_PATH="${DEPLOY_PATH:-/var/www/braidvpn.ru}"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   BRAID VPN - Автоматический деплой    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Проверка переменных окружения
if [ "$SERVER_USER" = "your-username" ] || [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${YELLOW}⚠️  Внимание: Используются значения по умолчанию${NC}"
    echo -e "${YELLOW}   Установите переменные окружения:${NC}"
    echo -e "${YELLOW}   export DEPLOY_USER=your-username${NC}"
    echo -e "${YELLOW}   export DEPLOY_IP=your-server-ip${NC}"
    echo -e "${YELLOW}   export DEPLOY_PATH=/var/www/braidvpn.ru${NC}"
    echo ""
    read -p "Продолжить с текущими настройками? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Шаг 1: Сборка проекта
echo -e "${GREEN}📦 Шаг 1: Собираем проект...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при сборке проекта${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Сборка завершена успешно${NC}"
echo ""

# Шаг 2: Проверка размера dist
DIST_SIZE=$(du -sh dist | cut -f1)
echo -e "${BLUE}📊 Размер собранных файлов: ${DIST_SIZE}${NC}"
echo ""

# Шаг 3: Загрузка на сервер
echo -e "${GREEN}📤 Шаг 2: Загружаем файлы на сервер...${NC}"
echo -e "${BLUE}   Сервер: ${SERVER_USER}@${SERVER_IP}${NC}"
echo -e "${BLUE}   Путь: ${SERVER_PATH}/dist${NC}"
echo ""

# Проверка наличия rsync
if ! command -v rsync &> /dev/null; then
    echo -e "${RED}❌ rsync не установлен. Установите: sudo apt install rsync${NC}"
    exit 1
fi

# Создание backup на сервере (опционально)
echo -e "${YELLOW}💾 Создаем backup текущей версии...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${SERVER_PATH}/backups && cp -r ${SERVER_PATH}/dist ${SERVER_PATH}/backups/dist-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true"

# Загрузка файлов
rsync -avz --delete --progress \
    --exclude='.git' \
    --exclude='node_modules' \
    dist/ ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/dist/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при загрузке файлов${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Файлы успешно загружены${NC}"
echo ""

# Шаг 4: Установка прав доступа
echo -e "${GREEN}🔐 Шаг 3: Устанавливаем права доступа...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "sudo chown -R www-data:www-data ${SERVER_PATH}/dist && sudo chmod -R 755 ${SERVER_PATH}/dist"

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Не удалось установить права доступа (может потребоваться sudo)${NC}"
fi

# Шаг 5: Перезагрузка веб-сервера
echo -e "${GREEN}🔄 Шаг 4: Перезагружаем веб-сервер...${NC}"

# Определение веб-сервера
if ssh ${SERVER_USER}@${SERVER_IP} "systemctl is-active --quiet nginx"; then
    echo -e "${BLUE}   Обнаружен Nginx${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "sudo systemctl reload nginx"
    WEB_SERVER="nginx"
elif ssh ${SERVER_USER}@${SERVER_IP} "systemctl is-active --quiet apache2"; then
    echo -e "${BLUE}   Обнаружен Apache${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "sudo systemctl reload apache2"
    WEB_SERVER="apache2"
else
    echo -e "${YELLOW}⚠️  Веб-сервер не обнаружен автоматически${NC}"
    echo -e "${YELLOW}   Перезагрузите веб-сервер вручную${NC}"
    WEB_SERVER="unknown"
fi

if [ $? -eq 0 ] && [ "$WEB_SERVER" != "unknown" ]; then
    echo -e "${GREEN}✅ ${WEB_SERVER} перезагружен${NC}"
else
    echo -e "${YELLOW}⚠️  Не удалось перезагрузить веб-сервер автоматически${NC}"
fi

echo ""

# Шаг 6: Проверка доступности
echo -e "${GREEN}🔍 Шаг 5: Проверяем доступность сайта...${NC}"
sleep 2

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://braidvpn.ru)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Сайт доступен (HTTP ${HTTP_CODE})${NC}"
else
    echo -e "${YELLOW}⚠️  Сайт вернул код ${HTTP_CODE}${NC}"
fi

# Финальное сообщение
echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Деплой завершен! ✅           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}🌐 Сайт доступен: https://braidvpn.ru${NC}"
echo -e "${GREEN}📋 Sitemap: https://braidvpn.ru/sitemap.xml${NC}"
echo -e "${GREEN}🤖 Robots: https://braidvpn.ru/robots.txt${NC}"
echo ""
