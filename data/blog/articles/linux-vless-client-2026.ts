import type { Article } from '../types';

export const article: Article = {
  slug: 'linux-vless-client-2026',
  title: 'VLESS-клиент для Linux: установка и настройка в 2026',
  metaDescription: 'Лучшие VLESS-клиенты для Linux 2026: Hiddify, Nekoray, v2rayN. Установка через apt и AppImage, импорт ключа от BRAID VPN за 5 минут.',
  keywords: ['linux vless vpn client', 'vless клиент linux', 'vpn для линукс vless', 'hiddify linux', 'nekoray linux', 'vless reality linux'],
  category: 'Инструкция',
  date: '19 Июн 2026',
  readTime: '7 мин',
  excerpt: 'Как поставить VLESS-клиент на Linux (Ubuntu, Debian, Fedora, Arch) и подключиться к BRAID VPN с протоколом Reality.',
  sections: [
    { type: 'lead', text: 'Linux — это про контроль и эффективность. Но с VPN на Linux исторически сложно: GUI-клиентов мало, доки разрозненные, а половина инструкций в сети — про устаревший OpenVPN. Рассказываем, какие VLESS-клиенты реально работают в 2026 году, как их поставить на Ubuntu, Debian, Fedora и Arch, и как импортировать ключ от BRAID VPN.' },

    { type: 'h2', text: 'Какие VLESS-клиенты есть для Linux' },
    { type: 'p', text: 'В 2026 году выбор стабильно держится на пяти проектах. Все они поддерживают VLESS Reality — современную обёртку, которая маскирует VPN-трафик под обычный HTTPS:' },
    { type: 'ul', items: [
      [{ type: 'b', text: 'Hiddify Next' }, ' — кроссплатформенный GUI на Flutter, проще всего для новичков'],
      [{ type: 'b', text: 'Nekoray' }, ' — мощный Qt-клиент с продвинутыми настройками маршрутизации'],
      [{ type: 'b', text: 'v2rayN-Linux' }, ' — Linux-порт популярного Windows-клиента, форк v2rayN-Core'],
      [{ type: 'b', text: 'Sing-box' }, ' — универсальное ядро без GUI, лучший выбор для серверов и роутеров'],
      [{ type: 'b', text: 'xray-core CLI' }, ' — голое ядро для тех, кто любит конфиги в JSON'],
    ]},

    { type: 'h2', text: 'Сравнение клиентов: что выбрать' },
    { type: 'table', headers: ['Клиент', 'GUI', 'Установка', 'Сложность', 'Память (MB)', 'Лучше для'],
      rows: [
        ['Hiddify Next', 'Да (Flutter)', 'AppImage / .deb', 'Простая', '~150', 'Десктоп с GUI'],
        ['Nekoray', 'Да (Qt)', 'AppImage / pacman', 'Средняя', '~120', 'Продвинутые юзеры'],
        ['v2rayN-Linux', 'Да (WPF/Avalonia)', 'AppImage', 'Средняя', '~200', 'Привыкшим к Windows'],
        ['Sing-box', 'Нет (CLI)', 'apt / dnf', 'Сложная', '~30', 'Серверы, OpenWrt, systemd'],
        ['xray-core CLI', 'Нет (CLI)', 'install скрипт', 'Сложная', '~25', 'VPS, автоматизация'],
      ],
    },
    { type: 'p', text: 'Если вы только начинаете — берите Hiddify Next: он понимает ключ vless://... из буфера обмена и не требует никаких ручных конфигов. Если хотите выжать максимум — Nekoray с гибкими правилами маршрутизации.' },

    { type: 'h2', text: 'Установка Hiddify Next' },
    { type: 'h3', text: 'Ubuntu / Debian' },
    { type: 'p', text: 'Самый простой путь — AppImage с GitHub Releases. Скачайте .AppImage, дайте права на запуск и запустите:' },
    { type: 'ol', items: [
      ['Откройте репозиторий: github.com/hiddify/hiddify-next/releases'],
      ['Скачайте файл вида Hiddify-Linux-x64.AppImage'],
      ['В терминале: chmod +x Hiddify-Linux-x64.AppImage'],
      ['Запуск: ./Hiddify-Linux-x64.AppImage'],
    ]},
    { type: 'p', text: 'Альтернативно — .deb пакет: sudo dpkg -i hiddify-next_*.deb && sudo apt -f install.' },
    { type: 'h3', text: 'Fedora' },
    { type: 'p', text: 'AppImage запускается на Fedora 39+ без дополнительных пакетов. Для нативной интеграции можно установить RPM:' },
    { type: 'ol', items: [
      ['sudo dnf install fuse-libs (если AppImage не запускается)'],
      ['Или: sudo rpm -i hiddify-next-*.rpm'],
    ]},
    { type: 'h3', text: 'Arch / Manjaro' },
    { type: 'p', text: 'В AUR есть готовый пакет hiddify-next-bin:' },
    { type: 'ol', items: [
      ['yay -S hiddify-next-bin (через yay)'],
      ['Или: paru -S hiddify-next-bin (через paru)'],
    ]},

    { type: 'info', variant: 'success', title: 'Получите ключ в @braidvpn_bot', text: 'Перед настройкой клиента возьмите пробный ключ на 7 дней. Откройте @braidvpn_bot, нажмите "Получить пробный ключ", выберите локацию (для Linux-разработки рекомендуем Нидерланды — близко к Docker Hub, GitHub, npm) и скопируйте строку vless://...' },

    { type: 'h2', text: 'Импорт ключа в Hiddify Next' },
    { type: 'ol', items: [
      [{ type: 'b', text: 'Скопируйте ключ' }, ' из чата с @braidvpn_bot.'],
      [{ type: 'b', text: 'Откройте Hiddify.' }, ' Нажмите "+" в правом верхнем углу.'],
      [{ type: 'b', text: 'Выберите "Add from clipboard".' }, ' Конфиг подтянется автоматически.'],
      [{ type: 'b', text: 'Нажмите большую кнопку Connect.' }, ' Через 1-2 секунды появится статус "Connected".'],
      [{ type: 'b', text: 'Проверьте IP:' }, ' откройте 2ip.ru — должен показать страну выбранного сервера.'],
    ]},

    { type: 'h2', text: 'Установка Nekoray' },
    { type: 'p', text: 'Nekoray распространяется как AppImage и tar.gz архив:' },
    { type: 'ol', items: [
      ['Скачайте nekoray-*-2025-x86_64-linux.AppImage с github.com/MatsuriDayo/nekoray/releases'],
      ['chmod +x nekoray-*.AppImage'],
      ['./nekoray-*.AppImage'],
    ]},
    { type: 'p', text: 'Для Arch — AUR-пакет nekoray-bin. Для Ubuntu можно создать .desktop файл для запуска из меню приложений.' },

    { type: 'h2', text: 'Импорт ключа в Nekoray' },
    { type: 'ol', items: [
      [{ type: 'b', text: 'Скопируйте ключ в буфер обмена.' }],
      [{ type: 'b', text: 'В Nekoray:' }, ' Server → Add profile from clipboard (Ctrl+V).'],
      [{ type: 'b', text: 'В списке появится профиль.' }, ' Кликните по нему правой кнопкой → Set as default.'],
      [{ type: 'b', text: 'Включите системный прокси:' }, ' Start (горячая клавиша F1).'],
      [{ type: 'b', text: 'Активируйте режим TUN' }, ' (Preferences → System proxy → TUN mode) — это даст системный VPN, а не только прокси для браузера.'],
    ]},

    { type: 'h2', text: 'Установка xray-core CLI (без GUI)' },
    { type: 'p', text: 'Для серверов, контейнеров и тех, кто живёт в терминале — голое ядро Xray. Установка одной командой:' },
    { type: 'ol', items: [
      ['bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install'],
      ['Конфиг создаётся в /usr/local/etc/xray/config.json'],
      ['Запуск: systemctl enable --now xray'],
    ]},
    { type: 'p', text: 'Чтобы превратить vless://... в JSON-конфиг, удобнее всего поставить sing-box или экспортировать config из Hiddify (есть кнопка "Export to xray-core").' },

    { type: 'h2', text: 'Автозапуск через systemd' },
    { type: 'p', text: 'Чтобы VPN включался при старте системы — добавьте unit-файл /etc/systemd/system/braidvpn.service:' },
    { type: 'info', variant: 'default', title: 'Пример unit-файла', text: '[Unit]\nDescription=BRAID VPN via xray-core\nAfter=network.target\n\n[Service]\nExecStart=/usr/local/bin/xray run -config /etc/braidvpn/config.json\nRestart=on-failure\nUser=nobody\n\n[Install]\nWantedBy=multi-user.target' },
    { type: 'p', text: 'Активация: sudo systemctl daemon-reload && sudo systemctl enable --now braidvpn. Логи смотреть через journalctl -u braidvpn -f.' },

    { type: 'h2', text: 'Что выбрать под свой дистрибутив' },
    { type: 'table', headers: ['Дистрибутив', 'Лучший вариант', 'Команда установки'],
      rows: [
        ['Ubuntu 22.04+', 'Hiddify Next (.deb)', 'sudo dpkg -i hiddify-next.deb'],
        ['Debian 12+', 'Hiddify AppImage', 'chmod +x *.AppImage && ./*.AppImage'],
        ['Fedora 39+', 'Hiddify RPM', 'sudo rpm -i hiddify-next.rpm'],
        ['Arch / Manjaro', 'Nekoray из AUR', 'yay -S nekoray-bin'],
        ['Pop!_OS, Mint', 'Hiddify .deb', 'sudo dpkg -i hiddify-next.deb'],
        ['Сервер без GUI', 'xray-core + systemd', 'install-release.sh'],
        ['OpenWrt роутер', 'sing-box', 'opkg install sing-box'],
      ],
    },

    { type: 'h2', text: 'FAQ' },
    { type: 'h3', text: 'Работает ли VLESS Reality на Linux так же, как на Windows?' },
    { type: 'p', text: 'Да, ядро Xray идентично на всех платформах. Скорость и стабильность отличаются только из-за версии клиента и драйверов сетевой карты.' },
    { type: 'h3', text: 'Можно ли использовать BRAID VPN на сервере VPS?' },
    { type: 'p', text: 'Да. Установите xray-core или sing-box, импортируйте ключ — и весь исходящий трафик с VPS пойдёт через VPN. Удобно для скрейпинга и работы с API, которые блокируют облачные провайдеры.' },
    { type: 'h3', text: 'Конфликтует ли VPN с Docker?' },
    { type: 'p', text: 'Если использовать режим TUN — нужно настроить исключения для docker0 и сетей контейнеров. В Hiddify это делается в Settings → Routing → Bypass LAN + кастомные правила.' },
    { type: 'h3', text: 'Сколько устройств можно подключить?' },
    { type: 'p', text: 'По одному ключу — до 5 устройств одновременно: например, ноутбук на Linux, телефон, рабочий ПК и сервер.' },
    { type: 'h3', text: 'Почему AppImage не запускается?' },
    { type: 'p', text: 'Чаще всего — нет FUSE: установите libfuse2 (Ubuntu/Debian) или fuse-libs (Fedora). На Arch FUSE есть из коробки.' },
    { type: 'h3', text: 'Можно ли поставить Happ на Linux?' },
    { type: 'p', text: 'Официальной Linux-сборки Happ нет — он есть только для iOS, Android, Windows и macOS. На Linux используйте Hiddify или Nekoray.' },

    { type: 'p', text: [
      'Готовы попробовать? ',
      { type: 'a', href: 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA__blog_linux_vless_client_2026', text: 'Получите ключ в @braidvpn_bot' },
      ' и подключайтесь. Технические подробности — на странице ',
      { type: 'a', href: '/technology', text: 'технологии BRAID VPN' },
      '. Связанные статьи: ',
      { type: 'a', href: '/blog/chto-takoe-vless', text: 'Что такое VLESS' },
      ', ',
      { type: 'a', href: '/blog/chto-takoe-reality', text: 'Что такое Reality' },
      ', ',
      { type: 'a', href: '/blog/vless-vs-openvpn', text: 'VLESS vs OpenVPN' },
      '.',
    ]},
  ],
  relatedSlugs: ['chto-takoe-vless', 'chto-takoe-reality', 'vless-vs-openvpn'],
};

export default article;
