import type { Article } from '../types';

export const article: Article = {
  slug: 'vpn-na-router',
  title: 'VPN на роутере 2026 — Keenetic, Asus, MikroTik, OpenWRT',
  metaDescription: 'Настройка BRAID VPN на роутере для всей домашней сети. Keenetic с Xkeen, Asus Merlin, MikroTik RouterOS 7, OpenWRT 23.05 — пошаговые инструкции 2026.',
  keywords: ['VPN на роутере', 'VPN router', 'Keenetic VPN', 'Asus VPN', 'MikroTik VPN', 'OpenWRT VPN'],
  category: 'Инструкция',
  date: '08 Мая 2026',
  readTime: '9 мин',
  excerpt: 'Настройка VPN на роутере для всей домашней сети: Keenetic с Xkeen, Asus Merlin, MikroTik, OpenWRT.',
  sections: [
    { type: 'lead', text: 'VPN на роутере — самое мощное решение для дома. Один раз настроил — и весь трафик из квартиры идёт через VPN автоматически: смартфоны, ноутбуки, Smart TV, PlayStation 5, Xbox Series X, умные колонки, лампочки, пылесос — всё. Разбираем настройку BRAID VPN (протокол VLESS Reality) на четырёх популярных платформах: Keenetic с Xkeen, Asus Merlin, MikroTik RouterOS, OpenWRT.' },

    { type: 'h2', text: 'Зачем ставить VPN на роутер' },
    { type: 'ul', items: [
      [{ type: 'b', text: 'Один VPN для всей семьи' }, ' — не нужно ставить Happ на 8 устройств: телевизор, приставку, консоли, гирлянду и т. д.'],
      [{ type: 'b', text: 'Поддержка Samsung Tizen, LG WebOS, PS5, Xbox' }, ' — устройства, на которые нельзя установить VPN-клиент напрямую, через роутер работают автоматически.'],
      [{ type: 'b', text: 'Не нужно тратить лимит устройств' }, ' — роутер считается одним подключением в BRAID VPN, а через него идут все.'],
      [{ type: 'b', text: 'Split tunneling по устройствам' }, ' — настраиваете, чтобы Сбербанк и Госуслуги шли напрямую, а остальное — через VPN.'],
      [{ type: 'b', text: 'Защита IoT' }, ' — умные колонки, камеры, лампочки получают шифрование без настроек.'],
    ]},
    { type: 'info', variant: 'warning', title: 'Поддержка VLESS Reality на роутерах', text: 'Reality — современный протокол. Из коробки его поддерживает только OpenWRT (через sing-box) и Keenetic с прошивкой Xkeen. На Asus и MikroTik потребуется альтернативная прошивка или ручная установка sing-box на USB-диск роутера.' },

    { type: 'h2', text: 'Способ 1: Keenetic с Xkeen (самый простой)' },
    { type: 'p', text: 'Xkeen — кастомное решение для роутеров Keenetic, добавляющее поддержку sing-box и протоколов VLESS, Trojan, Shadowsocks. Работает на роутерах с MIPS-архитектурой (Hopper, Hero, Giga, Ultra) и ARM (Peak, Titan).' },
    { type: 'ol', items: [
      'Обновите KeeneticOS до версии 4.0 или новее («Настройки» → «Обновление компонентов»).',
      'В «Управление» → «Параметры системы» → «Профиль работы Entware» → активируйте OPKG-репозиторий.',
      'Подключите USB-флешку (от 4 ГБ) к Keenetic, отформатируйте в ext4 через веб-интерфейс.',
      'Установите Entware: «Приложения» → «Менеджер пакетов» → entware.',
      'Через SSH подключитесь к роутеру (включите SSH в «Параметры системы» → «Доступ»).',
      'Установите Xkeen командой: curl -fsSL https://xkeen.ru/install.sh | sh',
      'Скопируйте VLESS-ссылку BRAID VPN из Telegram-бота.',
      'Откройте веб-панель Xkeen (http://192.168.1.1:9090) → «Импорт» → вставьте ссылку → «Сохранить и запустить».',
    ]},
    { type: 'info', variant: 'success', title: 'Проверка работы', text: 'На любом устройстве в локальной сети откройте 2ip.ru — IP-адрес должен показывать страну выбранного сервера BRAID (например, Нидерланды). Скорость через Keenetic Giga 7 — до 700 Мбит/с, через Hopper — до 300 Мбит/с.' },

    { type: 'h2', text: 'Способ 2: Asus с прошивкой Merlin + sing-box' },
    { type: 'p', text: 'Asus-Merlin — кастомная прошивка для роутеров Asus (RT-AX86U, RT-AX88U, ZenWiFi). Stock-прошивка Asus не поддерживает VLESS Reality, поэтому Merlin обязателен.' },
    { type: 'ol', items: [
      'Скачайте Merlin для вашей модели Asus с asuswrt.lostrealm.ca.',
      'Прошейте через веб-интерфейс роутера: «Администрирование» → «Обновление микропрограммы» → выберите .trx-файл.',
      'После перезагрузки включите JFFS: «Администрирование» → «Система» → «Скрипты JFFS» → ВКЛ.',
      'Подключите USB-флешку и установите Entware: amtm → ep → Entware → install.',
      'Установите sing-box: opkg update && opkg install sing-box',
      'Создайте конфиг /opt/etc/sing-box/config.json по шаблону от BRAID VPN (отправляется ботом).',
      'Запустите: /opt/etc/init.d/S99sing-box start',
      'Настройте маршруты iptables: трафик с LAN → в туннель sing-box.',
    ]},

    { type: 'h2', text: 'Способ 3: MikroTik RouterOS 7' },
    { type: 'p', text: 'MikroTik RouterOS 7 (с версии 7.13+) добавил поддержку WireGuard, но VLESS Reality напрямую он не делает. Решение — установить контейнер с sing-box.' },
    { type: 'ol', items: [
      'Обновите RouterOS до 7.15 или новее.',
      'Активируйте «container»: /system/device-mode/update container=yes (требуется физическая кнопка-подтверждение на корпусе).',
      'Создайте mount для конфигурации: /container/mounts/add name=sb-conf src=/sb-conf dst=/etc/sing-box',
      'Запустите контейнер sing-box: /container/add remote-image=ghcr.io/sagernet/sing-box:latest mounts=sb-conf interface=veth1',
      'Скопируйте ваш конфиг в /sb-conf/config.json через WinBox.',
      'Запустите контейнер: /container/start [find]',
      'Настройте mangle и routes: трафик LAN → mark route → таблица с gateway = veth1.',
    ]},
    { type: 'info', variant: 'warning', title: 'Требования к MikroTik', text: 'Контейнеры в RouterOS 7 требуют ARM или ARM64 архитектуру: hAP ax2, hAP ax3, hEX S (gen 3+), CCR2004/2116, RB5009. Старые MIPS-модели (hAP ac²) не поддерживают.' },

    { type: 'h2', text: 'Способ 4: OpenWRT 23.05+' },
    { type: 'p', text: 'OpenWRT — наиболее гибкая платформа. Из коробки доступен пакет sing-box, есть веб-интерфейс luci-app-sing-box.' },
    { type: 'ol', items: [
      'Установите OpenWRT 23.05 или 24.10 на ваш роутер (Xiaomi 4A Gigabit, GL.iNet Beryl AX, Netgear R7800 — популярные варианты).',
      'Подключитесь по SSH: ssh root@192.168.1.1',
      'Обновите пакеты: opkg update',
      'Установите: opkg install sing-box luci-app-sing-box-server',
      'Перезагрузите роутер.',
      'Откройте веб-интерфейс LuCI → «Services» → «sing-box» → «Subscription».',
      'Вставьте ссылку BRAID VPN из Telegram-бота → «Update Subscription».',
      'В разделе «Routing» включите режим TProxy для всего LAN-трафика.',
      'Сохраните и применить.',
    ]},
    { type: 'info', variant: 'success', title: 'Лучший роутер под OpenWRT для VPN в 2026', text: 'GL.iNet Beryl AX (GL-MT3000) или Flint 2 (GL-MT6000) — флагманы со встроенной поддержкой sing-box из коробки, без танцев с компиляцией. Цена 8–15 тыс. ₽. Скорость через VLESS Reality — до 900 Мбит/с на Flint 2.' },

    { type: 'h2', text: 'Сравнение платформ — что выбрать' },
    { type: 'table', headers: ['Платформа', 'Сложность', 'Скорость VPN', 'Цена роутера'], rows: [
      ['Keenetic + Xkeen', 'Низкая', 'до 700 Мбит/с', '6–18 тыс. ₽'],
      ['GL.iNet Flint 2 (OpenWRT)', 'Очень низкая', 'до 900 Мбит/с', '14 тыс. ₽'],
      ['Asus Merlin + sing-box', 'Средняя', 'до 500 Мбит/с', '12–25 тыс. ₽'],
      ['MikroTik + container', 'Высокая', 'до 600 Мбит/с', '8–40 тыс. ₽'],
      ['Stock OpenWRT', 'Средняя', 'до 400 Мбит/с', '3–10 тыс. ₽'],
    ]},

    { type: 'h2', text: 'Split tunneling — что пускать в обход VPN' },
    { type: 'p', text: 'Не всё нужно пропускать через VPN. Российские сервисы лучше идут напрямую — быстрее и без блокировок «у них». Что выпускать в обход:' },
    { type: 'ul', items: [
      'Сбербанк, Тинькофф, ВТБ, Альфа-Банк (банки требуют российский IP).',
      'Госуслуги, ФНС, mos.ru.',
      'Яндекс (Карты, Такси, Маркет, Музыка).',
      'Wildberries, Ozon, Avito.',
      'Стриминг — Кинопоиск, Иви, Okko, START.',
      'Доставка — Самокат, Купер, Delivery Club.',
    ]},
    { type: 'p', text: 'В Xkeen и OpenWRT sing-box настраивается через geosite:ru или ручной список доменов в секции «routing». В Merlin/MikroTik — через ip-route с GeoIP RU.' },

    { type: 'h2', text: 'Тарифы BRAID VPN для домашнего роутера' },
    { type: 'table', headers: ['Тариф', 'Цена', 'Устройств', 'Что покрывает через роутер'], rows: [
      ['Пробный', '0₽ / 7 дней', '5', 'Тестовая настройка Keenetic/OpenWRT'],
      ['Месяц', '199₽', '5', 'Роутер + 4 устройства вне дома'],
      ['Год', 'от 163₽/мес', '5', 'Роутер + смартфоны + ноутбуки в поездках'],
    ]},
    { type: 'info', variant: 'default', title: 'Сколько устройств на роутере', text: 'Один ключ BRAID = 5 одновременных подключений на сервере. Но через роутер с подменой исходного IP считается только одно подключение к BRAID — а сколько устройств за роутером (хоть 50) — это уже ваша внутренняя сеть. Так что в реальности вы получаете безлимит устройств в доме.' },

    { type: 'h2', text: 'FAQ — VPN на роутере в 2026' },
    { type: 'h3', text: 'Какой роутер купить специально под BRAID VPN?' },
    { type: 'p', text: 'GL.iNet Flint 2 (GL-MT6000) — 900 Мбит/с через VPN, Wi-Fi 6, цена около 14 тыс. ₽. Альтернативы: Keenetic Hopper (для бюджета), Keenetic Giga 7 (для высокоскоростного канала), Beryl AX (компактный, для путешествий).' },
    { type: 'h3', text: 'Замедлит ли VPN на роутере домашний интернет?' },
    { type: 'p', text: 'Зависит от роутера. На бюджетных моделях (Keenetic Speedster) VPN режет скорость до 200 Мбит/с. На Flint 2 или Giga 7 — едва заметно, до 900 Мбит/с. Канал 1 Гбит/с не везде упирается.' },
    { type: 'h3', text: 'Можно ли исключить из VPN отдельное устройство (например, ТВ)?' },
    { type: 'p', text: 'Да, в OpenWRT и Keenetic Xkeen есть «policy by source IP» — трафик с MAC-адреса ТВ можно пускать напрямую, остальное — через VPN.' },
    { type: 'h3', text: 'Что делать, если Сбербанк не работает через VPN на роутере?' },
    { type: 'p', text: 'Добавьте sberbank.ru, online.sberbank.ru и связанные IP в обход VPN (direct route). В Xkeen есть готовый geosite:sberbank.' },

    { type: 'p', text: [
      'Получите ключ в ',
      { type: 'a', href: 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==', text: 'Telegram-боте BRAID VPN' },
      ' — 7 дней бесплатно. Если хотите узнать почему VLESS лучше OpenVPN — читайте ',
      { type: 'a', href: '/blog/vless-vs-openvpn', text: 'сравнение протоколов' },
      '. Для Windows-ПК отдельно — ',
      { type: 'a', href: '/blog/vpn-na-windows-11', text: 'инструкция по Windows 11' },
      '. Все варианты — на ',
      { type: 'a', href: '/technology', text: 'странице технологии' },
      '.',
    ]},
  ],
  relatedSlugs: ['vpn-na-windows-11', 'vless-vs-openvpn'],
};

export default article;
