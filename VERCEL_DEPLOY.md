# Инструкция по деплою на Vercel

## Текущая ситуация

Ваш сайт развернут на Vercel по адресу:
- **Preview домен**: `https://braidsite-iss-projects-5d0a08b3.vercel.app/`
- **Production домен**: `https://braidvpn.com` (после подключения кастомного домена)

## Проблема с индексацией

### ❌ Текущие проблемы:

1. **robots.txt** - обновлен, теперь использует относительный путь к sitemap ✅
2. **sitemap.xml** - содержит абсолютные URL с доменом `braidvpn.com`
3. **Preview домены Vercel** - не должны индексироваться поисковыми системами

### ✅ Решение:

1. **robots.txt** уже обновлен - использует относительный путь `/sitemap.xml`
2. **Для preview доменов** - поисковики не будут индексировать (это нормально)
3. **Для production** - нужно подключить кастомный домен `braidvpn.com`

---

## Подключение кастомного домена на Vercel

### Шаг 1: Добавить домен в Vercel

1. Зайдите в настройки проекта на [vercel.com](https://vercel.com)
2. Перейдите в раздел **Settings** → **Domains**
3. Добавьте домен `braidvpn.com`
4. Добавьте поддомен `www.braidvpn.com` (опционально)

### Шаг 2: Настройка DNS

Vercel покажет вам записи DNS, которые нужно добавить:

**Вариант A: Использовать A-записи (рекомендуется)**
```
Тип    Имя    Значение
A      @      76.76.21.21
A      www   76.76.21.21
```

**Вариант B: Использовать CNAME**
```
Тип     Имя    Значение
CNAME   @      cname.vercel-dns.com
CNAME   www    cname.vercel-dns.com
```

### Шаг 3: Проверка

После добавления DNS записей:
1. Подождите 5-60 минут (распространение DNS)
2. Vercel автоматически проверит и активирует домен
3. SSL сертификат будет выдан автоматически

---

## Настройка для правильной индексации

### 1. robots.txt

✅ **Уже настроен правильно:**
```
User-agent: *
Allow: /

Sitemap: /sitemap.xml
```

### 2. sitemap.xml

**Вариант A: Статический sitemap (текущий)**
- Работает только для production домена `braidvpn.com`
- Для preview доменов будет показывать неправильные URL

**Вариант B: Динамический sitemap (рекомендуется)**
- Создан API route `api/sitemap.xml.js`
- Автоматически определяет текущий домен
- Работает и на preview, и на production

### 3. Canonical URL в index.html

Убедитесь, что canonical URL указывает на production домен:
```html
<link rel="canonical" href="https://braidvpn.com/" />
```

---

## Рекомендации по индексации

### ✅ Что делать:

1. **Подключить кастомный домен** `braidvpn.com` в Vercel
2. **Использовать динамический sitemap** (уже создан в `api/sitemap.xml.js`)
3. **Добавить сайт в Google Search Console** с доменом `braidvpn.com`
4. **Отправить sitemap** в Search Console: `https://braidvpn.com/sitemap.xml`

### ❌ Что НЕ делать:

1. **Не индексировать preview домены** Vercel (vercel.app)
2. **Не использовать несколько доменов** одновременно для индексации
3. **Не забывать про canonical URL** - должен указывать на основной домен

---

## Проверка после подключения домена

### 1. Проверка доступности

```bash
# Проверка основного домена
curl -I https://braidvpn.com

# Проверка sitemap
curl https://braidvpn.com/sitemap.xml

# Проверка robots.txt
curl https://braidvpn.com/robots.txt
```

### 2. Проверка SSL

- Vercel автоматически выдает SSL сертификат через Let's Encrypt
- Проверка: [SSL Labs](https://www.ssllabs.com/ssltest/)

### 3. Проверка индексации

1. **Google Search Console**
   - Добавить сайт: `https://braidvpn.com`
   - Отправить sitemap: `https://braidvpn.com/sitemap.xml`
   - Проверить покрытие индексации

2. **Проверка robots.txt**
   - [Google Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)

3. **Проверка структурированных данных**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Важные замечания

### Preview домены Vercel

- **НЕ индексируются** поисковыми системами (это нормально)
- Используются только для тестирования и preview
- После подключения кастомного домена они не нужны для индексации

### Production домен

- **Должен быть единственным** доменом для индексации
- Все canonical URL должны указывать на него
- Sitemap должен содержать URL с этим доменом

### Обновление sitemap

Если используете статический sitemap (`public/sitemap.xml`):
- Обновляйте `lastmod` при изменении контента
- Или используйте динамический sitemap через API route

---

## Быстрая проверка

После подключения домена проверьте:

1. ✅ Сайт доступен по `https://braidvpn.com`
2. ✅ SSL сертификат активен (зеленый замочек)
3. ✅ `robots.txt` доступен: `https://braidvpn.com/robots.txt`
4. ✅ `sitemap.xml` доступен: `https://braidvpn.com/sitemap.xml`
5. ✅ Все страницы открываются корректно
6. ✅ Canonical URL указывает на правильный домен

---

## Поддержка

Если возникли проблемы:
1. Проверьте DNS записи (может занять до 24 часов)
2. Проверьте настройки домена в Vercel
3. Проверьте логи деплоя в Vercel Dashboard
4. Убедитесь, что домен правильно делегирован

Успешного деплоя! 🚀
