import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const WS_DIR = path.join(ROOT, 'data/seo/wordstat');

// CSVs may be in root (initial) or already moved to data/seo/wordstat
function findCsvs() {
  const roots = [ROOT, WS_DIR];
  const out = [];
  for (const r of roots) {
    if (!fs.existsSync(r)) continue;
    for (const f of fs.readdirSync(r)) {
      if (/^wordstat_(top|similar)_queries.*\.csv$/.test(f)) out.push(path.join(r, f));
    }
  }
  return out;
}

const files = findCsvs();
const map = new Map();
for (const f of files) {
  let raw = fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
  raw = raw.replace(/Запросы со словами;Число запросов;[^;]*устройства/g, '');
  const toks = raw.split(/;|\r?\n/).map(s => s.trim()).filter(Boolean);
  for (let i = 0; i + 1 < toks.length; i += 2) {
    const q = toks[i]; const c = parseInt(toks[i + 1], 10);
    if (!q || isNaN(c)) { i -= 1; continue; }
    const key = q.toLowerCase();
    map.set(key, Math.max(map.get(key) || 0, c));
  }
}
const all = [...map.entries()].map(([q, c]) => ({ q, c })).sort((a, b) => b.c - a.c);

// Intent clusters -> each maps to a target landing URL on the site.
// Order matters: first matching cluster wins for "primary" assignment.
const CLUSTERS = [
  { id: 'browser',   url: '/vpn-dlya-brauzera',        re: /браузер|расширени|chrome|хром|opera|опера|edge|firefox|фаерфокс|яндекс браузер/ },
  { id: 'roblox',    url: '/roblox',                   re: /роблокс|roblox/ },
  { id: 'pc',        url: '/skachat-vpn-na-pk',        re: /на пк|для пк|на компьютер|для компьютера|на ноутбук|для ноутбука|на виндоус|для windows|на windows|виндовс/ },
  { id: 'android',   url: '/skachat-vpn-na-android',   re: /андроид|android/ },
  { id: 'iphone',    url: '/skachat-vpn-na-ayfon',     re: /айфон|iphone|ios|айпад|ipad/ },
  { id: 'phone',     url: '/vpn-na-telefon',           re: /на телефон|для телефона|на смартфон|мобильн/ },
  { id: 'free',      url: '/besplatnyy-vpn',           re: /беспл/ },
  { id: 'key',       url: '/kupit-klyuch-vpn',         re: /ключ/ },
  { id: 'buy',       url: '/kupit-vpn',                re: /купить|цена|стоимость|тариф|подписк|оплат|прайс/ },
  { id: 'telegram',  url: '/telegram',                 re: /телеграм|telegram| тг|^тг/ },
  { id: 'youtube',   url: '/youtube-bez-reklamy',      re: /ютуб|youtube/ },
  { id: 'discord',   url: '/discord',                  re: /дискорд|discord/ },
  { id: 'instagram', url: '/instagram',                re: /инстаграм|instagram|инст/ },
  { id: 'whatsapp',  url: '/whatsapp',                 re: /whatsapp|ватсап|вотсап/ },
  { id: 'tiktok',    url: '/tiktok',                   re: /тикток|tiktok/ },
  { id: 'chatgpt',   url: '/chatgpt',                  re: /chatgpt|чат гпт|gpt|чатгпт/ },
  { id: 'netflix',   url: '/netflix',                  re: /нетфликс|netflix/ },
  { id: 'steam',     url: '/steam',                    re: /стим|steam/ },
  { id: 'twitch',    url: '/twitch',                   re: /твич|twitch/ },
  { id: 'spotify',   url: '/spotify',                  re: /спотифай|spotify/ },
  { id: 'games',     url: '/dlya-igr',                 re: /игр|варзон|пабг|pubg|\bкс\b|cs2|кс2|дота|dota|valorant|валорант|фортнайт|fortnite|майнкрафт|minecraft|genshin|геншин|apex|апекс|варфейс|gta|гта|танк/ },
  { id: 'operator',  url: '/obhod-blokirovok',         re: /мтс|mts|мегафон|megafon|билайн|beeline|теле2|tele2|yota|йота|ростелеком/ },
  { id: 'blocks',    url: '/obhod-blokirovok',         re: /блокиров|обход|ркн|замедл|запрещ/ },
  { id: 'speed',     url: '/',                         re: /быстр|скорост|пинг|ping/ },
  { id: 'info',      url: '/blog',                     re: /что такое|как работает|зачем|для чего|как пользоваться|как настроить|как установить|как включить|какой|нужен ли|это/ },
];

const clusters = {};
for (const cl of CLUSTERS) clusters[cl.id] = { id: cl.id, url: cl.url, demand: 0, count: 0, top: [] };
const unmatched = [];

for (const { q, c } of all) {
  let matched = false;
  for (const cl of CLUSTERS) {
    if (cl.re.test(q)) {
      const bucket = clusters[cl.id];
      bucket.demand += c; bucket.count++;
      if (bucket.top.length < 60) bucket.top.push({ q, c });
      matched = true;
      break; // primary assignment
    }
  }
  if (!matched) unmatched.push({ q, c });
}

const summary = Object.values(clusters)
  .sort((a, b) => b.demand - a.demand)
  .map(c => ({ id: c.id, url: c.url, demand: c.demand, queries: c.count }));

const out = {
  generatedFrom: files.map(f => path.basename(f)),
  totalUniqueQueries: all.length,
  totalDemand: all.reduce((s, x) => s + x.c, 0),
  summary,
  clusters,
  unmatchedTop: unmatched.slice(0, 100),
};

fs.mkdirSync(path.join(ROOT, 'data/seo'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'data/seo/clusters.json'), JSON.stringify(out, null, 2), 'utf8');

console.log('Wrote data/seo/clusters.json');
console.log('Files parsed:', files.length, '| unique queries:', all.length);
console.log('\nCluster demand summary:');
for (const s of summary) console.log('  ' + s.id.padEnd(10), 'demand=' + String(s.demand).padStart(10), 'queries=' + s.queries, '->', s.url);
console.log('\nUnmatched top 15:');
unmatched.slice(0, 15).forEach(u => console.log('  ', String(u.c).padStart(8), u.q));
