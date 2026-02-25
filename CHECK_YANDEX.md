# Проверка настроек для Yandex Webmaster

## ✅ Редирект работает правильно
HTTP → HTTPS редирект настроен корректно (301 Moved Permanently).

## Что нужно сделать в Yandex Webmaster

### 1. Установить HTTPS как главное зеркало

1. Зайдите в [Yandex Webmaster](https://webmaster.yandex.ru/)
2. Выберите сайт `braidx.tech`
3. Перейдите: **Настройки индексирования** → **Главное зеркало**
4. **ВАЖНО:** Убедитесь, что выбран `https://braidx.tech` (не `http://`)
5. Если там указан `http://braidx.tech`, измените на `https://braidx.tech` и сохраните

### 2. Проверить robots.txt на сервере

Выполните на сервере:

```bash
# Проверить robots.txt
curl -s https://braidx.tech/robots.txt

# Должно быть:
# Sitemap: https://braidx.tech/sitemap.xml
```

### 3. Проверить sitemap.xml на сервере

```bash
# Проверить первые URL в sitemap
curl -s https://braidx.tech/sitemap.xml | head -20

# Все URL должны начинаться с https://
```

### 4. Отправить sitemap в Yandex Webmaster

1. В Yandex Webmaster: **Индексирование** → **Файлы Sitemap**
2. Добавьте: `https://braidx.tech/sitemap.xml`
3. Нажмите **Добавить**

### 5. Запустить повторную проверку

1. **Диагностика** → найдите рекомендацию "Главный адрес сайта не использует HTTPS"
2. Нажмите **Запустить проверку**
3. Подождите 1-2 часа

### 6. (Опционально) Запросить переиндексацию

1. **Индексирование** → **Переобход страниц**
2. Добавьте: `https://braidx.tech/`
3. Нажмите **Добавить в очередь**

## Быстрая проверка всех настроек

Выполните на сервере:

```bash
echo "=== Проверка robots.txt ==="
curl -s https://braidx.tech/robots.txt | grep -i sitemap

echo ""
echo "=== Проверка sitemap.xml (первые URL) ==="
curl -s https://braidx.tech/sitemap.xml | grep -o '<loc>https://[^<]*</loc>' | head -5

echo ""
echo "=== Проверка HTTPS ==="
curl -I https://braidx.tech 2>&1 | head -5
```

## После изменений в Yandex Webmaster

- Подождите **1-2 часа** для обновления данных
- Рекомендация должна исчезнуть автоматически
- Если не исчезла через 24 часа, запустите повторную проверку вручную
