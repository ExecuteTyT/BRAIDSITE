# Настройка SSL для braidx.tech

## Проблема
Yandex Webmaster видит сайт по HTTP, а не HTTPS. Нужно настроить SSL сертификат.

## Решение

### Шаг 1: Проверить текущую конфигурацию Nginx

```bash
# Проверить, что Nginx работает
sudo systemctl status nginx

# Посмотреть текущую конфигурацию
cat /etc/nginx/sites-available/braidx.tech
```

### Шаг 2: Установить Certbot (если не установлен)

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

### Шаг 3: Получить SSL сертификат

**ВАЖНО:** Перед получением сертификата убедитесь, что:
- Домен `braidx.tech` указывает на IP вашего сервера
- Nginx работает и доступен на порту 80
- Файрвол разрешает порты 80 и 443

```bash
# Получить сертификат (Certbot автоматически настроит Nginx)
sudo certbot --nginx -d braidx.tech -d www.braidx.tech

# Следуйте инструкциям:
# - Введите email для уведомлений
# - Согласитесь с условиями (A)
# - Выберите редирект HTTP на HTTPS (2)
```

### Шаг 4: Проверить, что сертификат получен

```bash
# Проверить наличие сертификатов
ls -la /etc/letsencrypt/live/braidx.tech/

# Должны быть файлы:
# - fullchain.pem
# - privkey.pem
```

### Шаг 5: Проверить конфигурацию Nginx

```bash
# Проверить синтаксис
sudo nginx -t

# Если есть ошибки, исправить их
# Затем перезагрузить Nginx
sudo systemctl reload nginx
```

### Шаг 6: Проверить работу HTTPS

```bash
# Проверить, что сайт доступен по HTTPS
curl -I https://braidx.tech

# Должен вернуть статус 200 или 301/302
```

### Шаг 7: Настроить автообновление сертификата

```bash
# Проверить, что автообновление работает
sudo certbot renew --dry-run
```

## Если сертификат уже есть, но редирект не работает

Проверьте конфигурацию Nginx. Должен быть блок для HTTP с редиректом:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name braidx.tech www.braidx.tech;
    return 301 https://$server_name$request_uri;
}
```

## Проверка в браузере

После настройки SSL:
1. Откройте `https://braidx.tech` в браузере
2. Должен быть зеленый замочек (HTTPS)
3. HTTP должен автоматически редиректить на HTTPS

## Проверка в Yandex Webmaster

После настройки SSL:
1. Подождите 1-2 часа
2. Запустите повторную проверку в Yandex Webmaster
3. Рекомендация "Главный адрес сайта не использует HTTPS" должна исчезнуть

## Возможные проблемы

### Проблема: "Failed to obtain certificate"
**Решение:** Убедитесь, что:
- Домен указывает на IP сервера
- Порт 80 открыт в файрволе
- Nginx работает

### Проблема: "Nginx configuration test failed"
**Решение:** 
```bash
# Проверить ошибки
sudo nginx -t

# Исправить конфигурацию
sudo nano /etc/nginx/sites-available/braidx.tech
```

### Проблема: "Certificate exists but site still shows HTTP"
**Решение:**
```bash
# Проверить, что редирект настроен
grep "return 301" /etc/nginx/sites-available/braidx.tech

# Перезагрузить Nginx
sudo systemctl reload nginx
```
