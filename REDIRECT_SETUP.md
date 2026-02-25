# Настройка редиректов для правильной индексации

## Цель
Настроить правильные редиректы для SEO-оптимизации:
- **Канонический домен**: `braidx.tech` (без www)
- Все варианты должны редиректиться на `https://braidx.tech`

## Схема редиректов

```
http://braidx.tech          → 301 → https://braidx.tech
http://www.braidx.tech      → 301 → https://braidx.tech
https://www.braidx.tech     → 301 → https://braidx.tech
https://braidx.tech         → (основной сайт)
```

## Настройка Nginx

### 1. Обновить конфигурацию

Файл: `/etc/nginx/sites-available/braidx.tech`

Конфигурация включает:
- Редирект HTTP → HTTPS (без www)
- Редирект HTTPS www → HTTPS без www
- Основной server блок для `braidx.tech`

### 2. SSL сертификат для www

Для редиректа с `www.braidx.tech` на HTTPS нужен SSL сертификат, который включает оба домена.

**Если используете Certbot:**
```bash
sudo certbot certonly --nginx -d braidx.tech -d www.braidx.tech
```

Или обновить существующий:
```bash
sudo certbot certonly --nginx --expand -d braidx.tech -d www.braidx.tech
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
curl -I http://braidx.tech
curl -I http://www.braidx.tech

# HTTPS www → без www
curl -I https://www.braidx.tech

# Должен вернуть: Location: https://braidx.tech/...
```

### Проверка через браузер

1. Откройте `http://braidx.tech` → должен редиректиться на `https://braidx.tech`
2. Откройте `http://www.braidx.tech` → должен редиректиться на `https://braidx.tech`
3. Откройте `https://www.braidx.tech` → должен редиректиться на `https://braidx.tech`

## Настройка в Yandex Webmaster

1. **Добавить оба домена:**
   - `braidx.tech`
   - `www.braidx.tech`

2. **Указать главное зеркало:**
   - В настройках сайта выберите "Главное зеркало"
   - Укажите: `https://braidx.tech` (без www)

3. **Проверить редиректы:**
   - В разделе "Индексирование" → "Переобход страниц"
   - Проверьте, что все варианты редиректятся правильно

## Настройка в Google Search Console

1. **Добавить оба домена:**
   - `braidx.tech`
   - `www.braidx.tech`

2. **Указать предпочтительный домен:**
   - В настройках → "Предпочтительный домен"
   - Выберите: `braidx.tech` (без www)

## Проверка canonical URLs

Убедитесь, что все canonical URLs указывают на домен без www:

- ✅ `index.html`: `<link rel="canonical" href="https://braidx.tech/" />`
- ✅ `sitemap.xml`: все `<loc>` теги с `https://braidx.tech`
- ✅ `robots.txt`: `Sitemap: https://braidx.tech/sitemap.xml`
- ✅ Open Graph: `og:url` с `https://braidx.tech`
- ✅ Schema.org: `url` с `https://braidx.tech`

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
sudo certbot certonly --nginx --expand -d braidx.tech -d www.braidx.tech
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
2. Убедитесь, что в Yandex Webmaster указано главное зеркало `https://braidx.tech`
3. Подождите 24-48 часов для обновления индекса
