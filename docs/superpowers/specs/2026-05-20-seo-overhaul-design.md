# SEO-переработка BRAID VPN — Design Spec

**Дата:** 2026-05-20
**Автор:** Claude (Opus 4.7)
**Контекст:** Переезд на новый домен `braidpro.tech` + большая SEO-программа для ранжирования в Яндексе по VPN-запросам и закрытия клиентов через Telegram-бот.

## Цели
1. Перевести продакшен на домен `braidpro.tech` (DNS уже обновлён).
2. Закрыть основные кластеры запросов из Wordstat (11 815 уникальных запросов за май 2026): высокую, среднюю и низкую частотность.
3. Создать инфраструктуру для масштабирования блога до 80+ статей без дальнейшего «спагетти-кода».
4. Все CTA ведут в Telegram-бот `@braidvpn_bot`.

## Принятые решения
- **Домен:** полная замена `braidx.tech → braidpro.tech` в коде. Без 301-редиректа. Без вынесения в константу (по запросу — везде по файлам).
- **Блог:** data-driven архитектура. Каждая статья — отдельный `.ts` в `data/blog/articles/`. Реестр в `data/blog/index.ts`. `ArticlePage.tsx` рендерит структурированные секции через switch.
- **Объём:** 80 статей всего, две волны. Волна A (этот заход) — 30 приоритетных статей + вся инфраструктура. Волна B — 50 оставшихся.
- **Новые лендинги:** 14 страниц.
  - Сервисы (6): `/discord`, `/tiktok`, `/instagram`, `/whatsapp`, `/telegram`, `/netflix`
  - Игры (5): `/dlya-igr` хаб + `/dlya-igr/dota`, `/dlya-igr/cs2`, `/dlya-igr/valorant`, `/dlya-igr/pubg`
  - Коммерческие (3): `/besplatno`, `/kupit-vpn`, `/obhod-blokirovok`
- **Переработка существующих страниц:** полная замена контента на Home, /pricing, /technology, /youtube-bez-reklamy, /pri-blokirovkah, /chatgpt, /android, /ios, /windows, /mac.

## Архитектура

### Data-driven блог
```
data/
  blog/
    articles/
      bypass-blocks-2026.ts
      youtube-no-ads.ts
      vpn-gaming.ts
      ...
    index.ts          # реестр + типы
  landings/
    discord.ts
    tiktok.ts
    ...
    games/
      dota.ts
      cs2.ts
      ...
```

Тип статьи:
```ts
type ArticleSection =
  | { type: 'p'; text: string }
  | { type: 'lead'; text: string }
  | { type: 'h2' | 'h3' | 'h4'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'info'; variant?: 'success' | 'warning'; title: string; text: string }
  | { type: 'cta'; title?: string; text?: string }
  | { type: 'related'; slugs: string[] };

type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  sections: ArticleSection[];
};
```

`ArticlePage.tsx` принимает `Article` из реестра и рендерит каждую секцию через типизированный switch. Один компонент = безопасно масштабируется.

### Лендинги через общий компонент
`pages/ServiceLanding.tsx` принимает `LandingConfig` со структурой:
- hero (badge, h1, lead, primary CTA, image/icon)
- pain (h2 + список проблем)
- solution (h2 + список решений + объяснение почему BRAID)
- howItWorks (нумерованные шаги 1–4)
- comparison (таблица сравнения)
- faq (массив Q/A с JSON-LD FAQ schema)
- related (ссылки на статьи и другие лендинги)

Конфиги — в `data/landings/*.ts`.

### Sitemap
Регенерируем `public/sitemap.xml` целиком. Список URL формируется из:
- статических маршрутов (10 шт.)
- лендингов (14 шт.)
- статей блога (30 в Волне A, ещё 50 в Волне B)

Дата `lastmod = 2026-05-20` для новых страниц.

## План Волны A

### Фаза 1 — Миграция домена (P0, sync)
- Заменить `braidx.tech → braidpro.tech` в [index.html](../../../index.html), [public/sitemap.xml](../../../public/sitemap.xml), [pages/ArticlePage.tsx](../../../pages/ArticlePage.tsx), [api/robots.js](../../../api/robots.js), `nginx-braidvpn.conf`, `vercel.json`, `CHECK_YANDEX.md`.
- Обновить `yandex-verification` (оставить placeholder + комментарий — пользователь сам заменит).

### Фаза 2 — Data-driven блог (P1)
- Создать тип `Article` и реестр `data/blog/index.ts`.
- Создать рендерер секций (компонент `ArticleRenderer`).
- Мигрировать 5 существующих статей в новый формат.
- Переписать `ArticlePage.tsx` и `Blog.tsx` на чтение из реестра.

### Фаза 3 — Общий компонент лендингов (P1)
- Создать `ServiceLanding.tsx` + типы `LandingConfig`.
- Создать 14 конфигов лендингов в `data/landings/`.
- Зарегистрировать роуты в `App.tsx`.

### Фаза 4 — Переработка существующих страниц (P1)
- Home: новый героический текст под «впн / vpn для россии / vpn 2026», блок SEO-текста снизу под СЧ-запросы.
- Pricing, Technology — полное обновление текстов.
- YouTubeNoAds, PriBlockirovkah, ChatGPT — расширение SEO-блоков.
- Platform pages — расширение конфигов в translations.

### Фаза 5 — 30 приоритетных статей (P1)
- 10 «Сервисы»: TikTok, Instagram, WhatsApp, Telegram, Discord (deep dive), Netflix, Spotify, Twitch, Steam, ChatGPT (deep dive)
- 6 «Платформы/инструкции»: Android Samsung, Android Xiaomi, iPhone установка, Windows 11, macOS, iPad
- 5 «Технические»: что такое VPN, как работает VPN, что такое VLESS, что такое Reality, что такое DPI
- 5 «Сравнения»: Лучший VPN 2026, VLESS vs WireGuard, Топ-5 VPN для РФ, BRAID vs NordVPN, Платный vs Бесплатный
- 4 «География/операторы»: Крым, ДНР/ЛНР, VPN для МТС, VPN для МегаФон

### Фаза 6 — Перелинковка и Sitemap (P1)
- Обновить Navbar с dropdown «Решения» и «Платформы».
- Обновить Footer с категориями ссылок.
- Перегенерировать sitemap.xml.
- Обновить noscript-блок в index.html.

## План Волны B (отдельный заход)
- 50 оставшихся статей: остальные сервисы, технические, длинно-хвостовые long-tail инструкции, специфика по играм, проблемные запросы.

## Что НЕ делаем в этой сессии
- Не делаем редирект со старого домена.
- Не делаем константу домена (всё инлайн).
- Не делаем Markdown-парсер — секции уже структурированы как массив объектов.
- Не делаем IndexNow интеграцию (отдельная задача).
- Не делаем визуальные правки/редизайн.

## Метрики успеха (для Волны A)
- 100% ссылок ведут на `braidpro.tech`.
- `npm run build` собирается без ошибок.
- Sitemap содержит 60+ URL.
- Каждая новая страница имеет уникальный title, description, H1, canonical, JSON-LD.
- Все CTA ведут на `https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==`.
