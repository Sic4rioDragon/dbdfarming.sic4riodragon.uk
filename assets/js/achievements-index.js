const search=document.querySelector('#achievement-search');
const buttons=[...document.querySelectorAll('[data-side]')];
const cards=[...document.querySelectorAll('[data-achievement-card]')];
let side='all';
function render(){const q=(search?.value||'').trim().toLowerCase();let shown=0;for(const card of cards){const okSide=side==='all'||card.dataset.side===side;const okQ=!q||(card.dataset.search||'').includes(q);card.hidden=!(okSide&&okQ);if(!card.hidden)shown++;}const empty=document.querySelector('#achievement-empty');if(empty)empty.hidden=shown!==0;}
search?.addEventListener('input',render);buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');side=btn.dataset.side;render();}));