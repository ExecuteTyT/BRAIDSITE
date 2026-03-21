import React, { useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Send, Check, ArrowRight, Shield, Zap, Globe, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { updateMeta } from '../utils/meta';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

// Полные статьи с SEO-оптимизированным контентом
const fullArticles: Record<string, {
  title: string;
  metaDescription: string;
  keywords: string[];
  content: React.ReactNode;
}> = {
  'bypass-blocks-2026': {
    title: 'Как обойти блокировки РКН в 2026 году — полное руководство',
    metaDescription: 'Подробная инструкция по обходу блокировок Роскомнадзора в 2026 году. Узнайте, как настроить VPN с протоколом VLESS Reality для стабильного доступа к заблокированным сайтам.',
    keywords: ['обход блокировок РКН', 'VPN для России', 'VLESS Reality', 'обойти блокировку сайта', 'РКН блокировка'],
    content: (
      <>
        <p className="lead">
          В 2026 году Роскомнадзор значительно усилил блокировки VPN-сервисов. Классические протоколы OpenVPN и WireGuard
          больше не справляются с обходом ограничений. В этой статье расскажем, как настроить VPN, который работает
          даже в условиях жёстких блокировок.
        </p>

        <h2>Почему обычные VPN перестали работать?</h2>
        <p>
          Роскомнадзор использует технологию DPI (Deep Packet Inspection) — глубокий анализ пакетов данных. 
          Эта система анализирует ваш интернет-трафик и определяет характерные «отпечатки» VPN-протоколов:
        </p>
        <ul>
          <li><strong>OpenVPN</strong> — легко детектируется по уникальным заголовкам пакетов</li>
          <li><strong>WireGuard</strong> — использует фиксированные порты и легко блокируется</li>
          <li><strong>IKEv2/IPSec</strong> — также имеет характерные признаки в трафике</li>
        </ul>
        <p>
          Когда DPI обнаруживает VPN-трафик, соединение просто обрывается или замедляется до неприемлемых скоростей.
        </p>

        <h2>Решение: протокол VLESS + Reality</h2>
        <p>
          <strong>VLESS с технологией Reality</strong> — это новое поколение VPN-протоколов, разработанное специально 
          для обхода DPI-блокировок. Принцип работы:
        </p>
        <ol>
          <li>Ваш трафик маскируется под обычное HTTPS-соединение с популярным сайтом (например, samsung.com или microsoft.com)</li>
          <li>DPI-система видит только зашифрованный HTTPS-трафик к легитимному ресурсу</li>
          <li>Провайдер не может отличить VPN от обычного веб-сёрфинга</li>
        </ol>

        <div className="info-box">
          <h4>💡 Как это выглядит для провайдера</h4>
          <p>
            Когда вы подключаетесь через VLESS Reality, провайдер видит, что вы заходите на samsung.com по HTTPS. 
            На самом деле это VPN-соединение, но отличить его от настоящего трафика невозможно.
          </p>
        </div>

        <h2>Преимущества VLESS Reality перед другими протоколами</h2>
        <table>
          <thead>
            <tr>
              <th>Параметр</th>
              <th>OpenVPN</th>
              <th>WireGuard</th>
              <th>VLESS Reality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Обход DPI</td>
              <td>❌ Нет</td>
              <td>❌ Нет</td>
              <td>✅ Да</td>
            </tr>
            <tr>
              <td>Скорость</td>
              <td>Средняя</td>
              <td>Высокая</td>
              <td>Высокая</td>
            </tr>
            <tr>
              <td>Расход батареи</td>
              <td>Высокий</td>
              <td>Низкий</td>
              <td>Низкий</td>
            </tr>
            <tr>
              <td>Работа в РФ 2026</td>
              <td>❌ Блокируется</td>
              <td>❌ Блокируется</td>
              <td>✅ Работает</td>
            </tr>
          </tbody>
        </table>

        <h2>Как подключиться к BRAID VPN</h2>
        <p>
          BRAID VPN использует протокол VLESS Reality из коробки. Подключение занимает меньше минуты:
        </p>
        <ol>
          <li>Запустите Telegram-бота <a href={TELEGRAM_BOT_URL}>@braidvpn_bot</a></li>
          <li>Получите бесплатный ключ на 7 дней (без карты)</li>
          <li><NavLink to="/download" className="text-brand-primary hover:underline">Скачайте приложение Happ</NavLink> для вашей платформы</li>
          <li>Вставьте ключ в приложение и подключитесь</li>
        </ol>

        <h2>Что делать, если VPN всё равно не работает?</h2>
        <p>
          В редких случаях даже VLESS Reality может временно блокироваться на уровне конкретного провайдера. Вот что можно сделать:
        </p>
        <ul>
          <li><strong>Сменить сервер</strong> — попробуйте подключиться к другой локации</li>
          <li><strong>Перезагрузить роутер</strong> — иногда помогает сброс DNS-кэша</li>
          <li><strong>Использовать мобильный интернет</strong> — разные операторы блокируют по-разному</li>
          <li><strong>Написать в поддержку</strong> — мы оперативно добавляем новые серверы при блокировках</li>
        </ul>

        <p>
          Узнайте больше о <NavLink to="/technology" className="text-brand-primary hover:underline">технологии VLESS Reality</NavLink> и как она защищает ваше соединение.
        </p>
      </>
    )
  },
  'youtube-no-ads': {
    title: 'YouTube без рекламы через VPN — как это работает в 2026',
    metaDescription: 'Узнайте, как смотреть YouTube без рекламы без Premium подписки. Подключение через VPN-сервер в Армении или Нидерландах полностью убирает рекламу на YouTube.',
    keywords: ['YouTube без рекламы', 'VPN YouTube', 'как убрать рекламу YouTube', 'YouTube Premium бесплатно', 'YouTube Армения', 'YouTube Нидерланды'],
    content: (
      <>
        <p className="lead">
          Надоела реклама на YouTube? Есть легальный способ смотреть видео без рекламных вставок —
          и для этого не нужна подписка Premium за 399₽/месяц. Достаточно подключиться к VPN-серверу
          в правильной стране.
        </p>

        <h2>Почему YouTube показывает меньше рекламы в некоторых странах?</h2>
        <p>
          YouTube зарабатывает на рекламе. Но количество рекламы зависит от страны просмотра:
        </p>
        <ul>
          <li><strong>Россия, США, Германия</strong> — много рекламодателей, много рекламы</li>
          <li><strong>Армения, Нидерланды, Грузия</strong> — меньше рекламодателей, меньше рекламы</li>
          <li><strong>Небольшие страны СНГ</strong> — рекламы может не быть совсем</li>
        </ul>
        <p>
          Подключаясь через VPN к серверу в Армении или Нидерландах, вы «переезжаете» в страну с минимальным
          количеством рекламы. YouTube видит IP-адрес этих стран и показывает контент без рекламных вставок.
        </p>

        <div className="info-box success">
          <h4>✅ Проверено: серверы в Армении и Нидерландах</h4>
          <p>
            По нашим тестам, при подключении через Ереван или Амстердам реклама на YouTube пропадает полностью
            или сокращается до 1-2 коротких вставок за час просмотра.
          </p>
        </div>

        <h2>Пошаговая инструкция</h2>
        <ol>
          <li>
            <strong>Получите VPN-ключ</strong>
            <p>Запустите <a href={TELEGRAM_BOT_URL}>Telegram-бота BRAID VPN</a> и получите бесплатный ключ на 7 дней.</p>
          </li>
          <li>
            <strong>Установите приложение</strong>
            <p>Скачайте Happ для iOS, Android или Windows.</p>
          </li>
          <li>
            <strong>Подключитесь к Армении или Нидерландам</strong>
            <p>В приложении выберите сервер «Армения (Ереван)» или «Нидерланды (Амстердам)» и нажмите «Подключить».</p>
          </li>
          <li>
            <strong>Откройте YouTube</strong>
            <p>Запустите YouTube — реклама исчезнет автоматически. Никаких дополнительных настроек не нужно.</p>
          </li>
        </ol>

        <h2>Это легально?</h2>
        <p>
          Да, использование VPN для смены региона полностью легально. Вы не нарушаете правила YouTube — 
          платформа просто определяет вашу локацию по IP-адресу и показывает соответствующий контент.
        </p>

        <h2>Сравнение: VPN vs YouTube Premium</h2>
        <table>
          <thead>
            <tr>
              <th>Параметр</th>
              <th>YouTube Premium</th>
              <th>BRAID VPN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Цена</td>
              <td>399₽/мес</td>
              <td>от 163₽/мес</td>
            </tr>
            <tr>
              <td>Реклама на YouTube</td>
              <td>Нет</td>
              <td>Нет (через Армению/Нидерланды)</td>
            </tr>
            <tr>
              <td>Фоновое воспроизведение</td>
              <td>Да</td>
              <td>Нет</td>
            </tr>
            <tr>
              <td>Обход блокировок</td>
              <td>Нет</td>
              <td>Да</td>
            </tr>
            <tr>
              <td>Защита приватности</td>
              <td>Нет</td>
              <td>Да</td>
            </tr>
          </tbody>
        </table>

        <h2>Дополнительные бонусы</h2>
        <p>
          Кроме YouTube без рекламы, подключение через Армению или Нидерланды даёт:
        </p>
        <ul>
          <li>Низкий пинг — серверы близко к России (Армения ~35ms, Нидерланды ~45ms)</li>
          <li>Разблокировку сервисов, недоступных в РФ</li>
          <li>Стабильное соединение без ограничений</li>
          <li>Доступ к Netflix EU (через Нидерланды)</li>
        </ul>

        <p>
          Подробная инструкция со всеми FAQ — на странице <NavLink to="/youtube-bez-reklamy" className="text-brand-primary hover:underline">YouTube без рекламы через VPN</NavLink>.
        </p>
      </>
    )
  },
  'vpn-gaming': {
    title: 'VPN для онлайн-игр: как снизить пинг и защититься от DDoS',
    metaDescription: 'Руководство по выбору VPN для геймеров. Узнайте, как снизить пинг в играх, защититься от DDoS-атак и получить доступ к серверам других регионов.',
    keywords: ['VPN для игр', 'снизить пинг VPN', 'VPN gaming', 'DDoS защита', 'VPN для CS2', 'VPN для Dota'],
    content: (
      <>
        <p className="lead">
          VPN для игр — это не только обход блокировок, но и способ улучшить качество соединения. 
          Правильно настроенный VPN может снизить пинг, защитить от DDoS-атак и открыть доступ к серверам 
          других регионов.
        </p>

        <h2>Зачем геймерам VPN?</h2>
        <h3>1. Снижение пинга</h3>
        <p>
          Как ни странно, VPN может уменьшить задержку. Это работает, когда ваш провайдер использует 
          неоптимальный маршрут до игрового сервера. VPN может проложить более короткий путь через свои серверы.
        </p>
        
        <div className="info-box">
          <h4>📊 Пример из практики</h4>
          <p>
            Игрок из Москвы жаловался на пинг 80ms до серверов Dota 2 в Люксембурге. 
            После подключения через наш финский сервер пинг упал до 45ms — провайдер вёл трафик 
            через Стокгольм вместо прямого маршрута.
          </p>
        </div>

        <h3>2. Защита от DDoS</h3>
        <p>
          Стримеры и киберспортсмены часто становятся жертвами DDoS-атак. Злоумышленник узнаёт IP-адрес 
          и заваливает его мусорным трафиком. VPN скрывает ваш реальный IP — атаковать просто нечего.
        </p>

        <h3>3. Доступ к региональным серверам</h3>
        <p>
          Хотите поиграть на американских серверах с друзьями из США? Или попасть на азиатский сервер, 
          где меньше читеров? VPN открывает доступ к любому региону.
        </p>

        <h2>Какой сервер выбрать для игр?</h2>
        <table>
          <thead>
            <tr>
              <th>Игровой регион</th>
              <th>Рекомендуемый сервер</th>
              <th>Ожидаемый пинг</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EU West (Dota 2, CS2)</td>
              <td>Финляндия / Нидерланды</td>
              <td>30-50ms</td>
            </tr>
            <tr>
              <td>EU East</td>
              <td>Финляндия</td>
              <td>25-40ms</td>
            </tr>
            <tr>
              <td>Russia</td>
              <td>Россия / Армения</td>
              <td>20-35ms</td>
            </tr>
            <tr>
              <td>US East</td>
              <td>США</td>
              <td>100-130ms</td>
            </tr>
          </tbody>
        </table>

        <h2>Почему BRAID VPN подходит для игр</h2>
        <ul>
          <li><strong>Протокол VLESS</strong> — минимальный оверхед, нет потерь скорости</li>
          <li><strong>UDP-акселерация</strong> — оптимизация для игрового трафика</li>
          <li><strong>Гигабитные серверы</strong> — никаких узких мест в скорости</li>
          <li><strong>Стабильное соединение</strong> — нет разрывов во время матча</li>
        </ul>

        <h2>Настройка для популярных игр</h2>
        <h3>CS2 / Counter-Strike</h3>
        <p>
          Для EU-серверов подключайтесь к Финляндии или Нидерландам. Пинг обычно составляет 35-50ms, 
          что вполне комфортно для соревновательной игры.
        </p>

        <h3>Dota 2</h3>
        <p>
          Европейские серверы Dota находятся в Люксембурге и Австрии. Оптимальный выбор — Нидерланды 
          (ближе географически) или Финляндия (стабильнее маршрут).
        </p>

        <h3>World of Warcraft / MMORPG</h3>
        <p>
          Для MMO критичнее стабильность, чем минимальный пинг. Выбирайте сервер ближе к дата-центру игры.
        </p>

        <p>
          Смотрите полный список доступных серверов на странице <NavLink to="/locations" className="text-brand-primary hover:underline">локации</NavLink>.
        </p>
      </>
    )
  },
  'vless-vs-openvpn': {
    title: 'VLESS vs OpenVPN — какой VPN-протокол выбрать в 2026 году',
    metaDescription: 'Подробное сравнение VPN-протоколов VLESS Reality и OpenVPN. Узнайте, какой протокол лучше для обхода блокировок, скорости и безопасности.',
    keywords: ['VLESS vs OpenVPN', 'VPN протоколы', 'VLESS Reality', 'сравнение VPN', 'лучший VPN протокол'],
    content: (
      <>
        <p className="lead">
          Выбор VPN-протокола напрямую влияет на скорость, безопасность и возможность обхода блокировок.
          В 2026 году классический OpenVPN уступает место новым технологиям — и вот почему.
        </p>

        <h2>OpenVPN — проверенная классика</h2>
        <p>
          OpenVPN появился в 2001 году и долгое время был золотым стандартом VPN-индустрии. 
          Его преимущества:
        </p>
        <ul>
          <li>Открытый исходный код, проверен аудитами безопасности</li>
          <li>Работает на любой платформе</li>
          <li>Гибкая настройка шифрования</li>
        </ul>
        <p>
          Однако у OpenVPN есть критические недостатки для использования в 2026 году:
        </p>
        <ul>
          <li><strong>Легко детектируется DPI</strong> — характерные заголовки пакетов выдают VPN-трафик</li>
          <li><strong>Высокое потребление CPU</strong> — значительная нагрузка на процессор</li>
          <li><strong>Большой оверхед</strong> — снижение скорости на 20-30%</li>
        </ul>

        <h2>VLESS + Reality — протокол нового поколения</h2>
        <p>
          VLESS (V2Ray Less) с технологией Reality — это современный протокол, разработанный специально 
          для обхода интернет-цензуры. Ключевые особенности:
        </p>
        <ul>
          <li><strong>Маскировка под HTTPS</strong> — трафик неотличим от обычного веб-сёрфинга</li>
          <li><strong>Нулевой оверхед</strong> — скорость практически не снижается</li>
          <li><strong>TLS 1.3</strong> — современное шифрование</li>
          <li><strong>Reality</strong> — дополнительный уровень маскировки через SNI популярных сайтов</li>
        </ul>

        <h2>Техническое сравнение</h2>
        <table>
          <thead>
            <tr>
              <th>Параметр</th>
              <th>OpenVPN</th>
              <th>VLESS Reality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Год создания</td>
              <td>2001</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>Обход DPI</td>
              <td>❌ Нет</td>
              <td>✅ Да</td>
            </tr>
            <tr>
              <td>Потеря скорости</td>
              <td>20-30%</td>
              <td>1-3%</td>
            </tr>
            <tr>
              <td>Расход батареи</td>
              <td>Высокий (&gt;10%)</td>
              <td>Низкий (&lt;2%)</td>
            </tr>
            <tr>
              <td>Работа в Китае/Иране/РФ</td>
              <td>❌ Блокируется</td>
              <td>✅ Работает</td>
            </tr>
            <tr>
              <td>Шифрование</td>
              <td>AES-256-GCM</td>
              <td>TLS 1.3</td>
            </tr>
          </tbody>
        </table>

        <h2>Как работает маскировка Reality</h2>
        <p>
          Технология Reality — это «фишка» VLESS, которая делает обнаружение VPN практически невозможным:
        </p>
        <ol>
          <li>Клиент начинает TLS-соединение, указывая SNI популярного сайта (например, microsoft.com)</li>
          <li>DPI видит обычное HTTPS-соединение к легитимному ресурсу</li>
          <li>VPN-сервер распознаёт «своего» клиента по специальному ключу и пропускает трафик</li>
          <li>Весь обмен данными выглядит как обычный веб-трафик</li>
        </ol>

        <div className="info-box">
          <h4>🔐 Безопасность Reality</h4>
          <p>
            Даже если злоумышленник перехватит трафик, он увидит только зашифрованные данные, 
            неотличимые от HTTPS. Расшифровать их без приватного ключа невозможно.
          </p>
        </div>

        <h2>Когда выбрать OpenVPN?</h2>
        <p>
          OpenVPN всё ещё актуален в нескольких сценариях:
        </p>
        <ul>
          <li>Корпоративные сети с уже настроенной инфраструктурой</li>
          <li>Страны без активной интернет-цензуры</li>
          <li>Устаревшие устройства без поддержки современных протоколов</li>
        </ul>

        <h2>Когда выбрать VLESS Reality?</h2>
        <p>
          VLESS Reality — лучший выбор для:
        </p>
        <ul>
          <li>Пользователей из России, Китая, Ирана и других стран с цензурой</li>
          <li>Мобильных устройств (экономия батареи)</li>
          <li>Требовательных к скорости задач (стриминг, игры)</li>
          <li>Защиты от обнаружения VPN провайдером или работодателем</li>
        </ul>

        <p>
          Подробнее о реализации VLESS Reality в BRAID VPN — на странице <NavLink to="/technology" className="text-brand-primary hover:underline">технологии</NavLink>.
        </p>
      </>
    )
  },
  'vpn-comparison-2026': {
    title: 'Лучший VPN для России в 2026 году — честное сравнение сервисов',
    metaDescription: 'Объективное сравнение VPN-сервисов для России в 2026 году. Узнайте, какой VPN реально работает при блокировках РКН, сравните цены и функции.',
    keywords: ['лучший VPN для России', 'VPN сравнение 2026', 'какой VPN работает в России', 'VPN рейтинг', 'VPN обзор'],
    content: (
      <>
        <p className="lead">
          Рынок VPN в 2026 году переполнен предложениями, но далеко не все сервисы реально работают в России.
          Мы протестировали популярные VPN и составили честное сравнение — без рекламы и партнёрских ссылок.
        </p>

        <h2>Критерии оценки</h2>
        <p>
          При выборе VPN для России в 2026 году важны следующие параметры:
        </p>
        <ol>
          <li><strong>Работа при блокировках</strong> — VPN должен обходить DPI Роскомнадзора</li>
          <li><strong>Скорость</strong> — достаточная для стриминга 4K и онлайн-игр</li>
          <li><strong>Стабильность</strong> — отсутствие обрывов соединения</li>
          <li><strong>Цена</strong> — адекватная стоимость за предоставляемые функции</li>
          <li><strong>Количество устройств</strong> — сколько девайсов можно подключить одновременно</li>
        </ol>

        <h2>Проблемы популярных VPN в России</h2>
        <h3>NordVPN, ExpressVPN, Surfshark</h3>
        <p>
          Крупные международные сервисы испытывают серьёзные проблемы:
        </p>
        <ul>
          <li>Официальные приложения удалены из российского App Store и Google Play</li>
          <li>Серверы периодически блокируются РКН</li>
          <li>Протоколы OpenVPN и WireGuard детектируются DPI</li>
          <li>Высокая цена в долларах (8-15$ в месяц)</li>
        </ul>

        <h3>Бесплатные VPN</h3>
        <p>
          Бесплатные VPN несут серьёзные риски:
        </p>
        <ul>
          <li>Продажа данных пользователей рекламодателям</li>
          <li>Встроенная реклама и майнеры</li>
          <li>Ограничения скорости и трафика</li>
          <li>Нестабильная работа</li>
        </ul>

        <div className="info-box warning">
          <h4>⚠️ Внимание</h4>
          <p>
            Бесплатный VPN — это не благотворительность. Если вы не платите за продукт, 
            то продуктом являетесь вы. Ваши данные о посещённых сайтах продаются третьим лицам.
          </p>
        </div>

        <h2>Почему BRAID VPN работает в России</h2>
        <p>
          BRAID VPN изначально создавался для работы в условиях интернет-цензуры:
        </p>
        <ul>
          <li><strong>Протокол VLESS Reality</strong> — невидим для DPI, не блокируется</li>
          <li><strong>Серверы в России</strong> — работают даже при ограничениях сотовой связи</li>
          <li><strong>Оплата в рублях</strong> — картой РФ, СБП, криптовалютой</li>
          <li><strong>До 5 устройств</strong> — на любом тарифе</li>
          <li><strong>YouTube без рекламы</strong> — бонус при подключении через Армению или Нидерланды</li>
        </ul>

        <h2>Сравнительная таблица</h2>
        <table>
          <thead>
            <tr>
              <th>Параметр</th>
              <th>BRAID VPN</th>
              <th>NordVPN</th>
              <th>Бесплатные</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Работа в РФ 2026</td>
              <td>✅ Стабильно</td>
              <td>⚠️ С перебоями</td>
              <td>❌ Редко</td>
            </tr>
            <tr>
              <td>Обход DPI</td>
              <td>✅ VLESS Reality</td>
              <td>⚠️ Частично</td>
              <td>❌ Нет</td>
            </tr>
            <tr>
              <td>Цена/мес</td>
              <td>от 163₽</td>
              <td>от 800₽</td>
              <td>0₽ (но с рисками)</td>
            </tr>
            <tr>
              <td>Устройств</td>
              <td>До 5</td>
              <td>До 6</td>
              <td>1</td>
            </tr>
            <tr>
              <td>YouTube без рекламы</td>
              <td>✅ Да</td>
              <td>❌ Нет</td>
              <td>❌ Нет</td>
            </tr>
            <tr>
              <td>Оплата картой РФ</td>
              <td>✅ Да</td>
              <td>❌ Нет</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>

        <h2>Вывод</h2>
        <p>
          Для российских пользователей в 2026 году оптимальный выбор — VPN с поддержкой протоколов 
          обхода DPI (VLESS Reality, Shadowsocks). Международные сервисы работают нестабильно, 
          а бесплатные VPN несут риски для приватности.
        </p>

        <p>
          Ознакомьтесь с <NavLink to="/pricing" className="text-brand-primary hover:underline">тарифами BRAID VPN</NavLink> или <NavLink to="/download" className="text-brand-primary hover:underline">скачайте приложение</NavLink> и попробуйте 7 дней бесплатно.
        </p>
      </>
    )
  }
};

export const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { content } = useLanguage();
  const navigate = useNavigate();
  
  const post = content.blog.posts.find(p => p.id === articleId);
  const fullArticle = articleId ? fullArticles[articleId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const article = articleId ? fullArticles[articleId] : null;
    if (article && articleId) {
      updateMeta({
        title: `${article.title} | BRAID VPN`,
        description: article.metaDescription,
        path: `/blog/${articleId}`,
        keywords: article.keywords.join(', '),
      });

      // JSON-LD Article structured data
      const existingJsonLd = document.querySelector('script[data-article-jsonld]');
      if (existingJsonLd) existingJsonLd.remove();
      const jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      jsonLd.setAttribute('data-article-jsonld', 'true');
      jsonLd.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.metaDescription,
        keywords: article.keywords.join(', '),
        author: { '@type': 'Organization', name: 'BRAID VPN' },
        publisher: { '@type': 'Organization', name: 'BRAID VPN', url: 'https://braidx.tech' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://braidx.tech/blog/${articleId}` }
      });
      document.head.appendChild(jsonLd);
    }
    return () => {
      const el = document.querySelector('script[data-article-jsonld]');
      if (el) el.remove();
    };
  }, [articleId]);

  if (!post || !fullArticle) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Статья не найдена</h1>
        <NavLink to="/blog" className="text-brand-primary hover:underline">
          Вернуться к блогу
        </NavLink>
      </div>
    );
  }

  const otherPosts = content.blog.posts.filter(p => p.id !== articleId).slice(0, 3);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к блогу
        </button>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {post.category}
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4 sm:mb-6">
          {fullArticle.title}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
          {fullArticle.metaDescription}
        </p>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none
          prose-headings:font-display prose-headings:font-bold prose-headings:text-white
          prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:sm:mt-12 prose-h2:mb-4 prose-h2:sm:mb-6
          prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:sm:mt-8 prose-h3:mb-3 prose-h3:sm:mb-4
          prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4 prose-p:sm:mb-6
          prose-li:text-gray-400 prose-li:my-1 prose-li:sm:my-2
          prose-strong:text-white prose-strong:font-semibold
          prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
          prose-table:w-full prose-table:text-sm prose-table:sm:text-base
          prose-th:bg-white/5 prose-th:px-3 prose-th:sm:px-4 prose-th:py-2 prose-th:sm:py-3 prose-th:text-left prose-th:text-white prose-th:font-semibold prose-th:border-b prose-th:border-white/10
          prose-td:px-3 prose-td:sm:px-4 prose-td:py-2 prose-td:sm:py-3 prose-td:border-b prose-td:border-white/5 prose-td:text-gray-400
          [&_.lead]:text-lg [&_.lead]:sm:text-xl [&_.lead]:text-gray-300 [&_.lead]:leading-relaxed [&_.lead]:mb-6 [&_.lead]:sm:mb-8
          [&_.info-box]:bg-brand-primary/10 [&_.info-box]:border [&_.info-box]:border-brand-primary/30 [&_.info-box]:rounded-xl [&_.info-box]:sm:rounded-2xl [&_.info-box]:p-4 [&_.info-box]:sm:p-6 [&_.info-box]:my-6 [&_.info-box]:sm:my-8
          [&_.info-box.success]:bg-green-500/10 [&_.info-box.success]:border-green-500/30
          [&_.info-box.warning]:bg-yellow-500/10 [&_.info-box.warning]:border-yellow-500/30
          [&_.info-box_h4]:text-base [&_.info-box_h4]:sm:text-lg [&_.info-box_h4]:font-bold [&_.info-box_h4]:text-white [&_.info-box_h4]:mb-2 [&_.info-box_h4]:mt-0
          [&_.info-box_p]:text-sm [&_.info-box_p]:sm:text-base [&_.info-box_p]:text-gray-400 [&_.info-box_p]:mb-0
        ">
          {fullArticle.content}
        </div>
      </article>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-3 sm:mb-4">
              Попробуйте BRAID VPN бесплатно
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
              7 дней полного доступа без оплаты. Без данных карты. До 5 устройств одновременно.
              Протокол VLESS Reality — обходит любые блокировки.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 sm:mb-8">
              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                  Получить бесплатный ключ
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                Работает в России
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                YouTube без рекламы
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                Скорость 10 Гбит/с
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {otherPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-20">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 sm:mb-8 text-center">
            Читайте также
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherPosts.map((relatedPost, index) => (
              <NavLink
                key={index}
                to={`/blog/${relatedPost.id}`}
                className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-brand-primary/50 transition-all group"
              >
                <div className="text-[10px] sm:text-xs text-gray-500 mb-2">{relatedPost.date}</div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-primary transition-colors mb-2 line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{relatedPost.excerpt}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
