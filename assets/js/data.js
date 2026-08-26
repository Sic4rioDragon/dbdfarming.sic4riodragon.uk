export async function loadData() {
  const [achRes, methodRes] = await Promise.all([
    fetch('../data/achievements.json'),
    fetch('../data/methods.json')
  ]);
  if (!achRes.ok || !methodRes.ok) throw new Error('Could not load achievement data.');
  return { achievements: await achRes.json(), methods: await methodRes.json() };
}
export function escapeHtml(value='') {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}
export function queryId() { return new URLSearchParams(location.search).get('id'); }
export function sideLabel(side) { return side === 'both' ? 'Killer + Survivor' : side.charAt(0).toUpperCase()+side.slice(1); }
