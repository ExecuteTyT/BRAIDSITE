// Idempotently creates Yandex.Metrika goals via the Management API.
// Run manually (NOT part of the build):
//   METRIKA_TOKEN=<oauth_token> npx vite-node scripts/metrika-goals.ts
// Requires the token to have the `metrika:write` scope. Read scope alone -> 403.
//
// Goals mirror the reachGoal() calls in utils/telegramTracking.ts + pages/Pricing.tsx.

const COUNTER_ID = 107083162;
const BASE = `https://api-metrika.yandex.net/management/v1/counter/${COUNTER_ID}/goals`;
const TOKEN = process.env.METRIKA_TOKEN || '';

interface GoalDef {
  name: string;
  identifier: string; // reachGoal id (JS-event goal)
}

const GOALS: GoalDef[] = [
  { name: 'Telegram — заявка', identifier: 'telegram_click' },
  { name: 'Клик «Скачать приложение»', identifier: 'download_click' },
  { name: 'Просмотр тарифов', identifier: 'pricing_view' },
  { name: 'Скролл 75%', identifier: 'scroll_75' },
  { name: '60 секунд на сайте', identifier: 'time_on_site_60s' },
];

async function main() {
  if (!TOKEN) {
    console.error('[metrika] METRIKA_TOKEN env var is required. Aborting.');
    process.exit(1);
  }
  const headers = { Authorization: `OAuth ${TOKEN}`, 'Content-Type': 'application/json' };

  // 1. Read existing goals (idempotency by name).
  const listRes = await fetch(`${BASE}`, { headers });
  if (!listRes.ok) {
    const body = await listRes.text();
    console.error(`[metrika] GET goals failed: ${listRes.status} ${body.slice(0, 300)}`);
    if (listRes.status === 403) console.error('[metrika] Token lacks metrika:write scope — create goals manually in the UI.');
    process.exit(1);
  }
  const existing: Array<{ name: string }> = (await listRes.json()).goals || [];
  const existingNames = new Set(existing.map((g) => g.name));
  console.log(`[metrika] ${existing.length} existing goals`);

  // 2. Create missing goals.
  let created = 0;
  for (const g of GOALS) {
    if (existingNames.has(g.name)) {
      console.log(`[metrika] skip (exists): ${g.name}`);
      continue;
    }
    const goal = {
      name: g.name,
      type: 'action',
      is_retargeting: 1,
      conditions: [{ type: 'exact', url: g.identifier }],
    };
    const res = await fetch(`${BASE}`, { method: 'POST', headers, body: JSON.stringify({ goal }) });
    if (res.ok) {
      created++;
      console.log(`[metrika] created: ${g.name} (${g.identifier})`);
    } else {
      const body = await res.text();
      console.error(`[metrika] create failed for ${g.name}: ${res.status} ${body.slice(0, 300)}`);
      if (res.status === 403) {
        console.error('[metrika] Token lacks metrika:write scope — create goals manually in the UI.');
        process.exit(1);
      }
    }
  }
  console.log(`[metrika] done — ${created} created, ${GOALS.length - created} already present.`);
}

main().catch((e) => {
  console.error('[metrika] error:', e);
  process.exit(1);
});
