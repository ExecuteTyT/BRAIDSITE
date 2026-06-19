# Настройка редиректов для правильной индексации

## Цель
Настроить правильные редиректы для SEO-оптимизации:
- **Канонический домен**: `braidvpn.com` (без www)
- Все варианты должны редиректиться на `https://braidvpn.com`

## Схема редиректов

```
http://braidvpn.com          → 301 → https://braidvpn.com
http://www.braidvpn.com      → 301 → https://braidvpn.com
https://www.braidvpn.com     → 301 → https://braidvpn.com
https://braidvpn.com         → (основной сайт)
```

## Настройка Nginx

### 1. Обновить конфигурацию

Файл: `/etc/nginx/sites-available/braidvpn.com`

Конфигурация включает:
- Редирект HTTP → HTTPS (без www)
- Редирект HTTPS www → HTTPS без www
- Основной server блок для `braidvpn.com`

### 2. SSL сертификат для www

Для редиректа с `www.braidvpn.com` на HTTPS нужен SSL сертификат, который включает оба домена.

**Если используете Certbot:**
```bash
sudo certbot certonly --nginx -d braidvpn.com -d www.braidvpn.com
```

Или обновить существующий:
```bash
sudo certbot certonly --nginx --expand -d braidvpn.com -d www.braidvpn.com
```

### 3. Применить конфигурацию

```bash
# Проверить конфигурацию
sudo nginx -t

# Применить изменения
sudo systemctl reload nginx
```

## Проверка редиректов

### Проверка через curl

```bash
# HTTP → HTTPS
curl -I http://braidvpn.com
curl -I http://www.braidvpn.com

# HTTPS www → без www
curl -I https://www.braidvpn.com

# Должен вернуть: Location: https://braidvpn.com/...
```

### Проверка через браузер

1. Откройте `http://braidvpn.com` → должен редиректиться на `https://braidvpn.com`
2. Откройте `http://www.braidvpn.com` → должен редиректиться на `https://braidvpn.com`
3. Откройте `https://www.braidvpn.com` → должен редиректиться на `https://braidvpn.com`

## Настройка в Yandex Webmaster

1. **Добавить оба домена:**
   - `braidvpn.com`
   - `www.braidvpn.com`

2. **Указать главное зеркало:**
   - В настройках сайта выберите "Главное зеркало"
   - Укажите: `https://braidvpn.com` (без www)

3. **Проверить редиректы:**
   - В разделе "Индексирование" → "Переобход страниц"
   - Проверьте, что все варианты редиректятся правильно

## Настройка в Google Search Console

1. **Добавить оба домена:**
   - `braidvpn.com`
   - `www.braidvpn.com`

2. **Указать предпочтительный домен:**
   - В настройках → "Предпочтительный домен"
   - Выберите: `braidvpn.com` (без www)

## Проверка canonical URLs

Убедитесь, что все canonical URLs указывают на домен без www:

- ✅ `index.html`: `<link rel="canonical" href="https://braidvpn.com/" />`
- ✅ `sitemap.xml`: все `<loc>` теги с `https://braidvpn.com`
- ✅ `robots.txt`: `Sitemap: https://braidvpn.com/sitemap.xml`
- ✅ Open Graph: `og:url` с `https://braidvpn.com`
- ✅ Schema.org: `url` с `https://braidvpn.com`

## Автоматизация

Используйте скрипт `fix-nginx-redirect.sh` для автоматической настройки редиректов:

```bash
chmod +x fix-nginx-redirect.sh
sudo ./fix-nginx-redirect.sh
```

## Важные моменты

1. **Всегда используйте редирект 301** (постоянный редирект) для SEO
2. **Сохраняйте путь и параметры** при редиректе: `$request_uri`
3. **Проверьте SSL сертификат** - он должен включать оба домена
4. **Укажите главное зеркало** в Yandex Webmaster и Google Search Console
5. **Используйте один канонический домен** везде (без www)

## Troubleshooting

### Проблема: SSL ошибка для www

**Решение:** Обновите SSL сертификат, включив www:
```bash
sudo certbot certonly --nginx --expand -d braidvpn.com -d www.braidvpn.com
```

### Проблема: Редирект не работает

**Решение:** Проверьте конфигурацию:
```bash
sudo nginx -t
sudo nginx -T | grep -A 10 "server_name"
```

### Проблема: Yandex не видит HTTPS

**Решение:** 
1. Проверьте редирект HTTP → HTTPS
2. Убедитесь, что в Yandex Webmaster указано главное зеркало `https://braidvpn.com`
3. Подождите 24-48 часов для обновления индекса
