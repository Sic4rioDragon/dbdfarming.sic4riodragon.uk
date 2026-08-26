import { loadData, escapeHtml, sideLabel } from './data.js';
const grid = document.querySelector('#achievement-grid');
const search = document.querySelector('#achievement-search');
const buttons = [...document.querySelectorAll('[data-side]')];
let currentSide = 'all';
let all = [];

function render() {
  const q = search.value.trim().toLowerCase();
  const filtered = all.filter(({id,a,m}) => {
    const sideOk = currentSide === 'all' || a.side === currentSide;
    const hay = [a.name,a.killer,a.category,a.requirement,m?.name].filter(Boolean).join(' ').toLowerCase();
    return sideOk && (!q || hay.includes(q));
  });
  grid.innerHTML = filtered.length ? filtered.map(({id,a,m}) => `
    <a class="card collection-card" href="achievement.html?id=${encodeURIComponent(id)}">
      <div class="card-meta"><span>${escapeHtml(sideLabel(a.side))}</span>${a.killer?`<span>· ${escapeHtml(a.killer)}</span>`:''}<span>· ${escapeHtml(a.category||'Achievement')}</span></div>
      <h2>${escapeHtml(a.name)}</h2>
      <p class="card-requirement">${escapeHtml(a.requirement)}</p>
      ${m?`<div class="method-name">Recommended: ${escapeHtml(m.name)} →</div>`:''}
    </a>`).join('') : '<div class="card empty-state">Nothing matched that filter.</div>';
}

loadData().then(({achievements,methods}) => {
  all = Object.entries(achievements).map(([id,a]) => ({id,a,m:methods[(a.methodIds||[])[0]]})).sort((x,y)=>(x.a.priority||999)-(y.a.priority||999));
  render();
}).catch(err => grid.innerHTML = `<div class="card empty-state">${escapeHtml(err.message)}</div>`);
search.addEventListener('input', render);
buttons.forEach(btn => btn.addEventListener('click', () => { buttons.forEach(b=>b.classList.remove('active')); btn.classList.add('active'); currentSide=btn.dataset.side; render(); }));
