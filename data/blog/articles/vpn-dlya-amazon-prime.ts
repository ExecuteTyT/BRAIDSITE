import type { Article } from '../types';

export const article: Article = {
  slug: 'vpn-dlya-amazon-prime',
  title: 'VPN для Amazon Prime Video в России 2026',
  metaDescription: 'Amazon Prime Video из России: VPN США, оформление подписки, доступ к The Boys, Reacher, Wheel of Time. Гайд 2026.',
  keywords: ['VPN для Amazon Prime', 'Amazon Prime Video Россия', 'Prime Video VPN', 'Amazon стриминг'],
  category: 'Сервисы',
  date: '22 Апр 2026',
  readTime: '6 мин',
  excerpt: 'Amazon Prime Video из России: VPN США, оформление подписки, доступ к The Boys, Reacher, Wheel of Time.',
  sections: [
    { type: 'lead', text: 'Amazon Prime Video — третий по величине стриминг после Netflix и Disney+. На платформе сосредоточены «The Boys», «Reacher», «The Wheel of Time», «Fallout», «Rings of Power» и эксклюзивы Amazon Studios. В России Prime Video никогда не запускался — но через BRAID VPN с серверами США открывается полный каталог, включая 4K HDR и Dolby Atmos.' },

    { type: 'h2', text: 'Что такое Amazon Prime Video' },
    { type: 'p', text: 'Prime Video — это часть подписки Amazon Prime (бесплатная доставка, музыка, книги, игры), но в большинстве стран продаётся отдельно как самостоятельный стриминг. Конкурирует с Netflix и Disney+ за оригинальный контент: студия Amazon вкладывает в производство $13+ млрд в год, что больше бюджета Netflix.' },

    { type: 'h2', text: 'Главные сериалы и фильмы 2026' },
    { type: 'ul', items: [
      'The Boys — финальный 5 сезон (премьера весной 2026)',
      'Reacher — 4 сезон',
      'Fallout — 2 сезон (премьера лето 2026)',
      'The Rings of Power — 3 сезон',
      'Citadel — глобальная шпионская франшиза',
      'Mr. & Mrs. Smith — 2 сезон с Гленн Пауэлл',
      'Road House (2024) — ремейк с Джейком Джилленхолом',
      'The Wheel of Time — финальный 4 сезон',
    ]},

    { type: 'h2', text: 'Почему Prime Video не работает в России' },
    { type: 'p', text: 'Amazon никогда не запускал сервис в РФ официально. С российского IP сайт primevideo.com показывает базовую витрину без возможности подписки, либо ошибку «Prime Video is not available in your country». При попытке оплаты российской картой — ошибка «Your card was declined».' },
    { type: 'p', text: 'Amazon ведёт чёрный список IP датацентровых VPN — массовые провайдеры (NordVPN, ExpressVPN на популярных серверах) детектятся в 80% случаев и плеер выдаёт ошибку «Your device is connected to the internet using a VPN or proxy service».' },

    { type: 'h2', text: 'Какой регион выбрать' },
    { type: 'table', headers: ['Регион', 'Сервер BRAID', 'Цена', 'Каталог'],
      rows: [
        ['США', 'Нью-Йорк', '$8,99 (Prime Video only) / $14,99 (Prime)', 'Полный, премьеры в день релиза'],
        ['Великобритания', 'нет сервера', '£8,99', 'Британская версия с BBC'],
        ['Нидерланды', 'Амстердам', '€5,99', 'Сокращён, релизы с задержкой'],
        ['Финляндия', 'Хельсинки', '€5,99', 'Северная локализация'],
        ['Армения', 'Ереван', 'Не работает', 'Сервис недоступен'],
      ],
    },
    { type: 'p', text: 'Для максимума контента и 4K — США. Европейские версии дешевле, но каталог уже на 30–40%: например, «The Boys» 4 сезон в ЕС вышел через 2 месяца после США.' },

    { type: 'h2', text: 'Шаг 1. Настройка BRAID' },
    { type: 'ol', items: [
      [
        { type: 'b', text: 'Получите ключ.' },
        ' Активируйте пробный период 7 дней в ',
        { type: 'a', href: 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==', text: 'Telegram-боте BRAID' },
        '.',
      ],
      [
        { type: 'b', text: 'Установите Happ' },
        ' на устройство со ',
        { type: 'a', href: '/download', text: 'страницы загрузки' },
        '.',
      ],
      [
        { type: 'b', text: 'Подключитесь к Нью-Йорку.' },
        ' Сервер должен быть постоянно активен — Prime Video проверяет IP при каждом запросе.',
      ],
      [
        { type: 'b', text: 'Очистите cookies primevideo.com' },
        ' перед регистрацией нового аккаунта — иначе Amazon запомнит старый российский регион.',
      ],
    ]},

    { type: 'h2', text: 'Шаг 2. Регистрация Amazon-аккаунта в США' },
    { type: 'p', text: 'Если у вас уже есть Amazon-аккаунт в России (от Kindle, AWS, чего-то ещё) — оставьте его. Регистрируем новый под Prime Video:' },
    { type: 'ol', items: [
      'Включите VPN (сервер NY)',
      'Откройте amazon.com → Create your Amazon account',
      'Введите имя, email, пароль',
      'При первой покупке потребуется адрес доставки — указывайте фиктивный американский (генератор адресов: fakenamegenerator.com)',
      'Подтвердите email через ссылку Amazon',
    ]},
    { type: 'p', text: 'Аккаунт сразу готов к покупке подписки Prime Video. Адрес доставки нужен только для физических товаров — для стриминга Amazon его не проверяет.' },

    { type: 'h2', text: 'Шаг 3. Оплата подписки' },
    { type: 'p', text: 'Российские Visa/Mastercard/МИР отклоняются. Рабочие варианты:' },
    { type: 'h3', text: 'Зарубежная банковская карта' },
    { type: 'p', text: 'Карты Армении (Ameriabank, ВТБ Армения), Казахстана (Kaspi, Freedom Finance), Грузии (TBC Bank), Турции (Ziraat) — принимаются Amazon без вопросов. Открыть виртуальную карту можно дистанционно через посредников за 2000–5000 ₽.' },
    { type: 'h3', text: 'Amazon Gift Card' },
    { type: 'p', text: 'Продаются на Eneba, Kupikod, российских сервисах. Номиналы $25, $50, $100. Активируются на amazon.com/redeem — баланс хранится в аккаунте и автоматически списывается при покупке подписки.' },
    { type: 'h3', text: 'PayPal' },
    { type: 'p', text: 'PayPal-аккаунт в США можно привязать к Amazon как способ оплаты. Главное — баланс должен быть положительным или связан с зарубежной картой.' },

    { type: 'info', variant: 'success', title: 'Совет: пробный месяц Prime', text: 'Amazon даёт бесплатный пробный период 30 дней на полную подписку Prime ($14,99/мес) — включая Prime Video, музыку, бесплатную доставку. Если зарегистрироваться с новой картой — можно потестировать месяц без списания. Отмена за день до окончания триала.' },

    { type: 'h2', text: 'Тарифы Prime Video' },
    { type: 'table', headers: ['Тариф', 'Цена США', 'Что входит', 'Реклама'],
      rows: [
        ['Prime Video only', '$8,99/мес', 'Стриминг 4K + Atmos', 'Есть с 2024'],
        ['Prime Video без рекламы', '+$2,99/мес', 'Тот же + ad-free', 'Нет'],
        ['Amazon Prime (полный)', '$14,99/мес', 'Video + Music + доставка + Kindle', 'Есть в Video'],
        ['Prime годовая', '$139/год', 'Полный пакет', 'Есть в Video'],
      ],
    },
    { type: 'p', text: 'С января 2024 Amazon добавил рекламу в базовый Prime Video. Чтобы отключить — нужна доплата $2,99/мес. Годовая подписка экономит $40 в год.' },

    { type: 'h2', text: 'Качество 4K HDR и Dolby Atmos' },
    { type: 'p', text: 'Prime Video отдаёт 4K HDR10+ и Dolby Vision (на части контента) с Dolby Atmos. Доступно без доплат для подписчиков — 4K включён в базовый тариф, в отличие от Netflix Premium.' },
    { type: 'table', headers: ['Устройство', 'Максимум Prime Video', 'Требования'],
      rows: [
        ['Apple TV 4K', '4K Dolby Vision + Atmos', 'Приложение Prime Video tvOS'],
        ['Fire TV Stick 4K Max', '4K HDR10+ + Atmos', 'Стандартный (от Amazon)'],
        ['ПК (Edge)', '4K HDR10', 'Edge + HEVC'],
        ['ПК (Chrome)', '1080p', 'Ограничение Amazon'],
        ['iPhone 15+', '4K HDR + Atmos', 'Приложение Prime Video'],
        ['LG/Samsung Smart TV', '4K HDR10+', 'Приложение в Smart Hub (US-регион)'],
      ],
    },

    { type: 'h2', text: 'Просмотр на разных устройствах' },
    { type: 'h3', text: 'iPhone и Android' },
    { type: 'p', text: 'Приложение Prime Video есть в US App Store и Google Play. Установка через смену региона аккаунта. Через VPN BRAID работает стабильно — никаких дополнительных настроек.' },
    { type: 'h3', text: 'Smart TV' },
    { type: 'p', text: 'На LG/Samsung нужно сменить регион телевизора на США через сброс настроек. На Apple TV — проще: переключаете App Store на US-аккаунт и качаете Prime Video напрямую.' },
    { type: 'h3', text: 'Fire TV Stick' },
    { type: 'p', text: 'Купить Fire TV Stick 4K Max ($60) — самый удобный вариант. Через VPN на роутере он подключается к US-региону Amazon и работает как родной — приложение Prime Video в Atmos+Dolby Vision из коробки.' },

    { type: 'info', variant: 'warning', title: 'Регион аккаунта и VPN', text: 'Если зарегистрировались в США — подключайтесь только через сервер NY. При входе с европейским IP Amazon может «переключить» ваш аккаунт на ЕС-каталог и пересчитать подписку. Восстановить обратно — через службу поддержки, минимум сутки.' },

    { type: 'h2', text: 'Эксклюзивы Amazon MGM' },
    { type: 'p', text: 'В 2022 Amazon купила студию MGM за $8,5 млрд. Теперь на Prime Video доступны: вся франшиза James Bond (25 фильмов), Rocky, Pink Panther, Hannibal, RoboCop, Stargate. Это эксклюзив Amazon, на других стримингах этих фильмов нет.' },

    { type: 'h2', text: 'Частые вопросы' },
    { type: 'h3', text: 'Можно ли купить Fallout без подписки?' },
    { type: 'p', text: 'Нет, сериалы Amazon Studios доступны только по подписке. Купить отдельный эпизод нельзя.' },
    { type: 'h3', text: 'Prime Video в Армении работает?' },
    { type: 'p', text: 'Нет, в Армении Prime Video формально не запущен. Армянские IP получают доступ к ограниченному каталогу через серую зону, но 4K и оригиналы Amazon недоступны. Используйте сервер NY.' },
    { type: 'h3', text: 'Сколько устройств можно подключить?' },
    { type: 'p', text: 'Prime Video — 3 одновременных потока, но только 2 одного и того же фильма. С BRAID — до 5 устройств с ключом.' },

    { type: 'h2', text: 'Итог' },
    { type: 'p', text: 'Amazon Prime Video в России в 2026 — это VPN BRAID + Amazon-аккаунт США + зарубежная карта или Gift Card. За $8,99/мес получаете 4K HDR10+ Dolby Atmos, эксклюзивы Amazon Studios и архив MGM. Для семьи Prime ($14,99) выгоднее — бонусом музыка и Kindle.' },
    { type: 'p', text: [
      'Связанные материалы: ',
      { type: 'a', href: '/blog/netflix-iz-rossii', text: 'Netflix из России' },
      ', ',
      { type: 'a', href: '/blog/vpn-dlya-hbo', text: 'HBO Max в России' },
      '. Полный список сервисов после блокировок — ',
      { type: 'a', href: '/pri-blokirovkah', text: 'BRAID при блокировках' },
      '.',
    ]},
    { type: 'info', variant: 'success', title: 'Пробный период 7 дней', text: 'Заберите бесплатный ключ BRAID в Telegram-боте перед оформлением Prime Video. Карта не нужна, серверы NY и Амстердам доступны на пробном периоде без ограничений.' },
  ],
  relatedSlugs: ['netflix-iz-rossii', 'vpn-dlya-hbo'],
};

export default article;
