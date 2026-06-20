import type { Article } from '../types';

export const article: Article = {
  slug: 'vpn-na-huawei',
  title: 'VPN для Huawei в 2026 — установка без сервисов Google',
  metaDescription: 'Как установить VPN на смартфоны Huawei P60, Mate 60, Nova 12 без Google Play. Happ через AppGallery, APK и Petal Search на EMUI и HarmonyOS 4.',
  keywords: ['VPN для Huawei', 'VPN Huawei без Google', 'VPN на Huawei HarmonyOS', 'Huawei VPN', 'EMUI VPN'],
  category: 'Инструкция',
  date: '13 Мая 2026',
  readTime: '6 мин',
  excerpt: 'Установка VPN на смартфоны Huawei без Google Play: AppGallery, APK, обход блокировок и YouTube без рекламы.',
  sections: [
    { type: 'lead', text: 'Huawei с 2020 года поставляется без сервисов Google: ни Google Play, ни YouTube, ни Gmail. Это создаёт сложность с установкой VPN-клиентов — большинство популярных приложений живут только в Play Market. Разбираем, как поставить Happ на Huawei P60, Mate 60 Pro, Nova 12 и Honor (старые модели до 2020) тремя способами и почему BRAID VPN работает на EMUI 14 и HarmonyOS 4 без проблем.' },

    { type: 'h2', text: 'Что особенного в Huawei 2026 года' },
    { type: 'p', text: 'Huawei Mate 60 Pro, Pura 70 и P60 работают на собственном HarmonyOS 4.2, а более старые модели — на EMUI 12, 13, 14 (это форк Android без GMS). Внутри — отсутствие Google Mobile Services: нет Google Play, Maps, YouTube-приложения, Pay. Вместо этого — AppGallery, Petal Search и Petal Maps.' },
    { type: 'p', text: 'Для VPN это означает одно: придётся искать альтернативные источники установки. Хорошая новость — Happ распространяется в AppGallery и в виде APK с официального сайта, поэтому проблема решается за 5 минут.' },
    { type: 'info', variant: 'success', title: 'Совместимость BRAID VPN с Huawei', text: 'Протестировано на Mate 60 Pro, Pura 70 Ultra, P60 Pro, Nova 12, MatePad 11.5. Поддержка EMUI 12, 13, 14 и HarmonyOS 4.0–4.2. Время первого подключения — 2 секунды, расход батареи — менее 3% за час просмотра видео.' },

    { type: 'h2', text: 'Способ 1: установка Happ через AppGallery (рекомендуется)' },
    { type: 'p', text: 'AppGallery — официальный магазин Huawei, предустановлен на всех устройствах. Happ опубликован там официально, обновления приходят автоматически.' },
    { type: 'ol', items: [
      'Откройте AppGallery (значок с буквой A).',
      'В поиске введите «Happ» или «Happ Proxy».',
      'Нажмите «Установить». Размер — около 30 МБ.',
      'AppGallery попросит подтвердить установку VPN-приложения — нажмите «Разрешить».',
      'После установки откройте Happ — он сразу готов к импорту ключа.',
    ]},

    { type: 'h2', text: 'Способ 2: установка APK напрямую' },
    { type: 'p', text: 'Если приложение временно недоступно в AppGallery (бывает при смене политики Huawei), скачайте APK с официального сайта Happ.' },
    { type: 'ol', items: [
      'Откройте браузер Huawei или Chrome (если ставили вручную) → перейдите на сайт happ.su.',
      'Нажмите «Скачать для Android» — загрузится файл .apk.',
      'При первой попытке HarmonyOS заблокирует установку — нажмите «Настройки» → «Разрешить установку из этого источника».',
      'Вернитесь к файлу → «Установить».',
      'Готово — иконка Happ появится на рабочем столе.',
    ]},
    { type: 'info', variant: 'warning', title: 'Безопасность APK', text: 'Скачивайте APK только с happ.su или из ссылок в нашем Telegram-боте. Сторонние сайты вроде «apkpure» иногда подкладывают изменённые сборки с рекламой и трекерами. Проверяйте подпись через AppGallery — оригинальный Happ имеет издателя Happ Inc.' },

    { type: 'h2', text: 'Способ 3: установка Google Play через GBox (для старых моделей)' },
    { type: 'p', text: 'Если у вас старый Huawei (P30, Mate 20, до отключения GMS) — Google Play уже стоит. Если же модель новая, можно поставить GBox — песочницу, имитирующую Google-сервисы внутри одного приложения. Это нужно для пользователей, которые хотят и YouTube-приложение, и банковский клиент Сбера.' },
    { type: 'ol', items: [
      'В AppGallery найдите «GBox» → установите.',
      'Откройте GBox — он автоматически развернёт Google Play внутри песочницы.',
      'Войдите в Google-аккаунт.',
      'В Google Play внутри GBox установите Happ.',
      'Запустите Happ из GBox (или из главного экрана, если GBox прокинул ярлык).',
    ]},

    { type: 'h2', text: 'Подключение к BRAID VPN на Huawei — пошагово' },
    { type: 'ol', items: [
      [
        { type: 'b', text: 'Получите ключ.' },
        ' Откройте ',
        { type: 'a', href: 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA__blog_vpn_na_huawei', text: 'Telegram-бота BRAID VPN' },
        ' и нажмите «Получить ключ». 7 дней бесплатно, без карты. Telegram на Huawei работает через AppGallery.',
      ],
      [
        { type: 'b', text: 'Скопируйте ключ.' },
        ' В боте тап по строке ключа — копирование в буфер обмена.',
      ],
      [
        { type: 'b', text: 'Импортируйте в Happ.' },
        ' Откройте Happ → «+» → «Добавить из буфера обмена». Появится список из 5 серверов.',
      ],
      [
        { type: 'b', text: 'Разрешите VPN.' },
        ' EMUI/HarmonyOS попросит разрешение на создание VPN-туннеля — «ОК».',
      ],
      [
        { type: 'b', text: 'Подключитесь.' },
        ' Выберите сервер (Нидерланды для YouTube, США для ChatGPT) → большая круглая кнопка.',
      ],
    ]},

    { type: 'h2', text: 'Как смотреть YouTube на Huawei через VPN' },
    { type: 'p', text: 'Поскольку приложения YouTube нет в AppGallery, используются три варианта:' },
    { type: 'ul', items: [
      [{ type: 'b', text: 'YouTube через браузер' }, ' — откройте youtube.com в Huawei Browser или Chrome. Через BRAID VPN — без рекламы и без скоростных ограничений.'],
      [{ type: 'b', text: 'YT Music через PWA' }, ' — установите music.youtube.com как иконку на рабочий стол через «Добавить на главный экран».'],
      [{ type: 'b', text: 'SmartTube или NewPipe' }, ' — APK-клиенты YouTube без рекламы. Работают вместе с VPN.'],
    ]},

    { type: 'h2', text: 'Особенности EMUI и HarmonyOS: фоновый запуск' },
    { type: 'p', text: 'EMUI и HarmonyOS даже жёстче, чем One UI, ограничивают фоновые приложения. Если не настроить — VPN отвалится через 5–10 минут после блокировки экрана.' },
    { type: 'ol', items: [
      'Откройте «Настройки» → «Приложения» → «Happ».',
      'Перейдите в «Батарея» → отключите «Автозапуск» (это парадокс — выключение даёт ручной контроль).',
      'Включите «Вторичный запуск» и «Работа в фоне».',
      'В разделе «Запуск приложений» поставьте Happ в режим «Управлять вручную» и включите все три опции.',
      'В «Настройки» → «Батарея» → «Подробности использования батареи» → Happ → «Энергоинтенсивные приложения» = ВКЛ.',
    ]},
    { type: 'info', variant: 'warning', title: 'Режим Ultra Power Saving', text: 'В этом режиме HarmonyOS полностью выключает все фоновые приложения, включая Happ. Если вы любите этот режим — VPN придётся включать вручную после каждого включения экрана. Альтернатива — «Обычное энергосбережение», где VPN продолжает работать.' },

    { type: 'h2', text: 'Тарифы BRAID VPN на Huawei' },
    { type: 'table', headers: ['Тариф', 'Цена', 'Устройств', 'Кому подойдёт'], rows: [
      ['Пробный', '0₽ / 7 дней', '5', 'Тест на Mate 60 или P60'],
      ['Месяц', '199₽', '5', 'Один Huawei + планшет MatePad'],
      ['Год', 'от 163₽/мес', '5', 'Семья на Huawei — смартфон, планшет, ноутбук MateBook'],
    ]},

    { type: 'h2', text: 'Какой сервер выбрать для Huawei' },
    { type: 'ul', items: [
      [{ type: 'b', text: 'Нидерланды (Амстердам)' }, ' — YouTube без рекламы, EU-стриминг. Пинг 45 мс.'],
      [{ type: 'b', text: 'Армения (Ереван)' }, ' — самый быстрый для россиян, 30 мс. Игры, Discord.'],
      [{ type: 'b', text: 'США (Нью-Йорк)' }, ' — ChatGPT, Claude, американские сайты.'],
      [{ type: 'b', text: 'Финляндия (Хельсинки)' }, ' — стабильный канал для рабочих задач.'],
      [{ type: 'b', text: 'Россия (Москва)' }, ' — защита публичного Wi-Fi без обхода блокировок.'],
    ]},

    { type: 'h2', text: 'FAQ — частые вопросы про VPN на Huawei' },
    { type: 'h3', text: 'Работает ли BRAID VPN на HarmonyOS 4?' },
    { type: 'p', text: 'Да. HarmonyOS 4 совместим с Android APK, а Happ — Android-приложение. На Mate 60 Pro и Pura 70 проверено, скорость и стабильность те же, что на EMUI.' },
    { type: 'h3', text: 'Можно ли установить Google Play на Huawei 2026 года?' },
    { type: 'p', text: 'Официально нет — Huawei под санкциями США без GMS. Неофициально — через GBox (см. способ 3) или GSpace. Но для VPN это не нужно: Happ есть в AppGallery.' },
    { type: 'h3', text: 'Что делать, если AppGallery не открывается без VPN?' },
    { type: 'p', text: 'Иногда AppGallery в России работает медленно. Решение: первый раз скачайте Happ через APK с happ.su, подключитесь к BRAID VPN, а потом установите AppGallery-версию для автообновлений.' },
    { type: 'h3', text: 'VPN сажает батарею Huawei?' },
    { type: 'p', text: 'Расход с активным VPN на Mate 60 Pro — около 2–3% в час при просмотре видео. Это в пределах нормы, на уровне обычного 4G-серфинга.' },

    { type: 'p', text: [
      'Получите ключ в ',
      { type: 'a', href: 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA__blog_vpn_na_huawei', text: 'Telegram-боте BRAID VPN' },
      ' — 7 дней бесплатно. Если у вас другой смартфон, посмотрите инструкции для ',
      { type: 'a', href: '/blog/vpn-na-samsung', text: 'Samsung Galaxy' },
      ' или ',
      { type: 'a', href: '/blog/vpn-na-xiaomi', text: 'Xiaomi' },
      '. Всё про обход блокировок — на ',
      { type: 'a', href: '/pri-blokirovkah', text: 'странице о блокировках' },
      '.',
    ]},
  ],
  relatedSlugs: ['vpn-na-samsung', 'vpn-na-xiaomi'],
};

export default article;
