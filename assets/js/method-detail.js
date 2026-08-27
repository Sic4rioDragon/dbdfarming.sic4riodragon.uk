import { loadData, escapeHtml, queryId, sideLabel } from './data.js';
const root=document.querySelector('#method-detail');
const list=(title,items)=>items?.length?`<div class="method-section"><h2>${escapeHtml(title)}</h2><div class="tag-list">${items.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></div>`:'';
const steps=(items)=>items?.length?`<ol class="method-steps">${items.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ol>`:'';
const variant=(v)=>`<div class="variant">
  <strong>${escapeHtml(v.name)}</strong>
  ${v.text?`<div>${escapeHtml(v.text)}</div>`:''}
  ${v.perks?.length?`<div class="variant-sub"><b>Perks:</b> ${v.perks.map(escapeHtml).join(' · ')}</div>`:''}
  ${v.addons?.length?`<div class="variant-sub"><b>Add-ons:</b> ${v.addons.map(escapeHtml).join(' · ')}</div>`:''}
  ${steps(v.steps)}
  ${v.needsCheck?'<div class="variant-check">Variant worth checking before treating it as the main recommendation.</div>':''}
</div>`;
loadData().then(({achievements,methods})=>{ const id=queryId(), m=methods[id]; if(!m) throw new Error('Method not found.'); document.title=`${m.name} | DBD Farming Guide`;
 const canonical=document.querySelector('link[rel="canonical"]'); if(canonical) canonical.href=`https://dbdfarming.sic4riodragon.uk/achievements/method.html?id=${encodeURIComponent(id)}`;
 const meta=document.querySelector('meta[name="description"]'); if(meta) meta.content=`${m.name}: ${m.summary}`;
 const achLinks=m.achievementIds.map(aid=>achievements[aid]?`<a class="link-pill" href="achievement.html?id=${encodeURIComponent(aid)}">${escapeHtml(achievements[aid].name)}</a>`:'').join('');
 const variants=(m.variants||[]).map(variant).join('');
 root.innerHTML=`<div class="breadcrumbs"><a href="methods.html">Methods</a> / ${escapeHtml(m.name)}</div>
 <section class="card intro"><div class="detail-kicker">${escapeHtml(sideLabel(m.side))}</div><h1>${escapeHtml(m.name)}</h1><p>${escapeHtml(m.summary)}</p><div class="link-group">${achLinks}</div></section>
 <section class="card">${list('Killer perks',m.killerPerks)}${list('Killer add-ons',m.killerAddons)}${list('Survivor perks / setup',m.survivorPerks)}
 ${m.steps?.length?`<div class="method-section"><h2>How to do it</h2>${steps(m.steps)}</div>`:''}
 ${m.notes?.length?`<div class="method-section"><h2>Notes</h2><ul class="bullet-list">${m.notes.map(n=>`<li>${escapeHtml(n)}</li>`).join('')}</ul></div>`:''}
 ${variants?`<div class="method-section"><h2>Options / variants</h2>${variants}</div>`:''}
 </section>`;
}).catch(err=>root.innerHTML=`<div class="card empty-state">${escapeHtml(err.message)} <a href="methods.html">Back to methods</a></div>`);
