# Настройка редиректов для правильной индексации

## Цель
Настроить правильные редиректы для SEO-оптимизации:
- **Канонический домен**: `braidvpn.ru` (без www)
- Все варианты должны редиректиться на `https://braidvpn.ru`

## Схема редиректов

```
http://braidvpn.ru          → 301 → https://braidvpn.ru
http://www.braidvpn.ru      → 301 → https://braidvpn.ru
https://www.braidvpn.ru     → 301 → https://braidvpn.ru
https://braidvpn.ru         → (основной сайт)
```

## Настройка Nginx

### 1. Обновить конфигурацию

Файл: `/etc/nginx/sites-available/braidvpn.ru`

Конфигурация включает:
- Редирект HTTP → HTTPS (без www)
- Редирект HTTPS www → HTTPS без www
- Основной server блок для `braidvpn.ru`

### 2. SSL сертификат для www

Для редиректа с `www.braidvpn.ru` на HTTPS нужен SSL сертификат, который включает оба домена.

**Если используете Certbot:**
```bash
sudo certbot certonly --nginx -d braidvpn.ru -d www.braidvpn.ru
```

Или обновить существующий:
```bash
sudo certbot certonly --nginx --expand -d braidvpn.ru -d www.braidvpn.ru
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
curl -I http://braidvpn.ru
curl -I http://www.braidvpn.ru

# HTTPS www → без www
curl -I https://www.braidvpn.ru

# Должен вернуть: Location: https://braidvpn.ru/...
```

### Проверка через браузер

1. Откройте `http://braidvpn.ru` → должен редиректиться на `https://braidvpn.ru`
2. Откройте `http://www.braidvpn.ru` → должен редиректиться на `https://braidvpn.ru`
3. Откройте `https://www.braidvpn.ru` → должен редиректиться на `https://braidvpn.ru`

## Настройка в Yandex Webmaster

1. **Добавить оба домена:**
   - `braidvpn.ru`
   - `www.braidvpn.ru`

2. **Указать главное зеркало:**
   - В настройках сайта выберите "Главное зеркало"
   - Укажите: `https://braidvpn.ru` (без www)

3. **Проверить редиректы:**
   - В разделе "Индексирование" → "Переобход страниц"
   - Проверьте, что все варианты редиректятся правильно

## Настройка в Google Search Console

1. **Добавить оба домена:**
   - `braidvpn.ru`
   - `www.braidvpn.ru`

2. **Указать предпочтительный домен:**
   - В настройках → "Предпочтительный домен"
   - Выберите: `braidvpn.ru` (без www)

## Проверка canonical URLs

Убедитесь, что все canonical URLs указывают на домен без www:

- ✅ `index.html`: `<link rel="canonical" href="https://braidvpn.ru/" />`
- ✅ `sitemap.xml`: все `<loc>` теги с `https://braidvpn.ru`
- ✅ `robots.txt`: `Sitemap: https://braidvpn.ru/sitemap.xml`
- ✅ Open Graph: `og:url` с `https://braidvpn.ru`
- ✅ Schema.org: `url` с `https://braidvpn.ru`

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
sudo certbot certonly --nginx --expand -d braidvpn.ru -d www.braidvpn.ru
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
2. Убедитесь, что в Yandex Webmaster указано главное зеркало `https://braidvpn.ru`
3. Подождите 24-48 часов для обновления индекса
