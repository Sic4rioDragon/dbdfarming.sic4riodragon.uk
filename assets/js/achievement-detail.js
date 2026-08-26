import { loadData, escapeHtml, queryId, sideLabel } from './data.js';
const root = document.querySelector('#achievement-detail');
loadData().then(({achievements,methods}) => {
  const id=queryId(), a=achievements[id];
  if(!a) throw new Error('Achievement not found.');
  document.title = `${a.name} | DBD Farming Guide`;
  const canonical = document.querySelector('link[rel=\"canonical\"]');
  if (canonical) canonical.href = `https://dbdfarming.sic4riodragon.uk/achievements/achievement.html?id=${encodeURIComponent(id)}`;
  const meta = document.querySelector('meta[name=\"description\"]');
  if (meta) meta.content = `${a.name}: ${a.requirement} Farming methods and setup for organized DBD achievement hunting.`;
  const methodCards=(a.methodIds||[]).map(mid=>methods[mid] ? `<a class="card collection-card" href="method.html?id=${encodeURIComponent(mid)}"><div class="card-meta"><span>${escapeHtml(sideLabel(methods[mid].side))}</span></div><h2>${escapeHtml(methods[mid].name)}</h2><p class="card-requirement">${escapeHtml(methods[mid].summary)}</p><div class="method-name">View full method →</div></a>`:'').join('');
  root.innerHTML = `
    <div class="breadcrumbs"><a href="index.html">Achievements</a> / ${escapeHtml(a.name)}</div>
    <section class="card intro">
      <div class="detail-head"><div><div class="detail-kicker">${escapeHtml(sideLabel(a.side))}${a.killer?` · ${escapeHtml(a.killer)}`:''} · ${escapeHtml(a.category||'Achievement')}</div><h1>${escapeHtml(a.name)}</h1></div></div>
      <p>${escapeHtml(a.requirement)}</p>
    </section>
    <section><h2>Farming method${(a.methodIds||[]).length>1?'s':''}</h2><div class="collection-grid">${methodCards || '<div class="card empty-state">No dedicated farming method yet.</div>'}</div></section>`;
}).catch(err => root.innerHTML = `<div class="card empty-state">${escapeHtml(err.message)} <a href="index.html">Back to achievements</a></div>`);
