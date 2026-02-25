# Исправление проблемы с HTTPS в Yandex Webmaster

## Проблема
Сайт доступен по HTTPS, но Yandex Webmaster показывает предупреждение "Главный адрес сайта не использует HTTPS-протокол".

## Решение

### Шаг 1: Проверить редирект HTTP → HTTPS

На сервере выполните:

```bash
# Проверить, что HTTP редиректит на HTTPS
curl -I http://braidx.tech

# Должен вернуть:
# HTTP/1.1 301 Moved Permanently
# Location: https://braidx.tech/
```

Если редирект не работает, проверьте конфигурацию Nginx:

```bash
# Посмотреть конфигурацию
cat /etc/nginx/sites-available/braidx.tech | grep -A 5 "listen 80"
```

Должен быть блок:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name braidx.tech www.braidx.tech;
    return 301 https://$server_name$request_uri;
}
```

### Шаг 2: Проверить конфигурацию Nginx

```bash
# Проверить синтаксис
sudo nginx -t

# Если есть ошибки, исправить
sudo nano /etc/nginx/sites-available/braidx.tech

# Перезагрузить Nginx
sudo systemctl reload nginx
```

### Шаг 3: Указать HTTPS как главный адрес в Yandex Webmaster

1. Зайдите в [Yandex Webmaster](https://webmaster.yandex.ru/)
2. Выберите сайт `braidx.tech`
3. Перейдите в **Настройки индексирования** → **Главное зеркало**
4. Убедитесь, что выбран **https://braidx.tech** (не http://)
5. Если выбран HTTP, измените на HTTPS и сохраните

### Шаг 4: Переиндексировать сайт

1. В Yandex Webmaster перейдите в **Индексирование** → **Переобход страниц**
2. Добавьте главную страницу: `https://braidx.tech/`
3. Нажмите **Добавить в очередь**

### Шаг 5: Проверить robots.txt на сервере

Убедитесь, что на сервере robots.txt использует HTTPS:

```bash
# Проверить robots.txt
cat /var/www/braidx.tech/dist/robots.txt | grep -i sitemap

# Должно быть:
# Sitemap: https://braidx.tech/sitemap.xml
```

### Шаг 6: Проверить sitemap.xml на сервере

```bash
# Проверить первые URL в sitemap
head -20 /var/www/braidx.tech/dist/sitemap.xml

# Все URL должны начинаться с https://
```

### Шаг 7: Запустить повторную проверку в Yandex Webmaster

1. В Yandex Webmaster перейдите в **Диагностика**
2. Нажмите **Запустить проверку** для рекомендации "Главный адрес сайта не использует HTTPS"
3. Подождите 1-2 часа

## Дополнительные проверки

### Проверить, что сайт доступен только по HTTPS

```bash
# Проверить HTTP (должен редиректить)
curl -I http://braidx.tech

# Проверить HTTPS (должен работать)
curl -I https://braidx.tech
```

### Проверить SSL сертификат

```bash
# Проверить срок действия сертификата
sudo certbot certificates

# Если сертификат истекает, обновить
sudo certbot renew
```

### Проверить логи Nginx

```bash
# Посмотреть последние запросы
sudo tail -f /var/log/nginx/braidx.tech.access.log

# Проверить ошибки
sudo tail -f /var/log/nginx/braidx.tech.error.log
```

## Если проблема не решается

1. **Очистить кеш Yandex:**
   - В Yandex Webmaster: **Индексирование** → **Исключенные страницы** → удалить все исключения
   - Запустить полную переиндексацию

2. **Проверить HSTS:**
   - Убедитесь, что в Nginx нет конфликтующих заголовков
   - Проверьте, что нет дублирующих конфигураций

3. **Подождать:**
   - Yandex может обновлять информацию с задержкой до 24 часов
   - После изменения главного зеркала подождите 1-2 дня

## Быстрая проверка всего

```bash
# Скрипт для проверки всех настроек
echo "=== Проверка редиректа HTTP ==="
curl -I http://braidx.tech 2>&1 | grep -i "location\|301\|302"

echo "=== Проверка HTTPS ==="
curl -I https://braidx.tech 2>&1 | grep -i "200\|301\|302"

echo "=== Проверка SSL сертификата ==="
sudo certbot certificates 2>&1 | grep -A 5 "braidx.tech"

echo "=== Проверка Nginx конфигурации ==="
sudo nginx -t

echo "=== Проверка robots.txt ==="
curl -s https://braidx.tech/robots.txt | grep -i sitemap

echo "=== Проверка sitemap.xml ==="
curl -s https://braidx.tech/sitemap.xml | head -15
```
