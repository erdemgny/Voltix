
/* ── VOLTIX SHOPIFY THEME JS ── */

// Cursor
const cur = document.getElementById('cur');
if(cur){
  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
  document.querySelectorAll('a,button,.v-pc,.v-pc-sz,.pp-sz').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
  });
}

// Nav scroll
const vNav = document.getElementById('vNav');
if(vNav) window.addEventListener('scroll',()=>vNav.classList.toggle('scrolled',scrollY>60));

// Toast
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove('show'), 3200);
}

// Cart helpers
function money(cents){
  return (cents/100).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2}) + ' TL';
}

// Fetch cart from Shopify
async function fetchCart(){
  const r = await fetch('/cart.js');
  return r.json();
}

// Render cart drawer
async function renderCart(){
  const cart = await fetchCart();
  const listEl = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotalVal');
  const countEl = document.getElementById('cartCount');
  if(!listEl) return;

  // Update count
  const qty = cart.item_count;
  if(countEl){
    countEl.textContent = qty;
    countEl.classList.toggle('has', qty>0);
  }

  // Update total
  if(totalEl) totalEl.textContent = money(cart.total_price);

  // Render items
  if(cart.items.length === 0){
    listEl.innerHTML = '<div class="cart-empty-msg"><div class="cart-empty-icon">○</div><div class="cart-empty-text">Sepetiniz boş</div></div>';
    return;
  }

  listEl.innerHTML = cart.items.map((item,i) => `
    <div class="cart-item" data-key="${item.key}">
      <div class="ci-img">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width:72px;height:88px;object-fit:cover">` : `<span style="font-size:28px">👕</span>`}
      </div>
      <div>
        <div class="ci-name">${item.product_title}</div>
        <div class="ci-meta">${item.variant_title && item.variant_title !== 'Default Title' ? item.variant_title : ''}</div>
        <div class="ci-qty">
          <button class="ci-qbtn" onclick="changeQty('${item.key}', ${item.quantity - 1})">−</button>
          <span class="ci-qnum">${item.quantity}</span>
          <button class="ci-qbtn" onclick="changeQty('${item.key}', ${item.quantity + 1})">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <button class="ci-remove" onclick="changeQty('${item.key}',0)">✕</button>
        <div class="ci-price">${money(item.final_line_price)}</div>
      </div>
    </div>
  `).join('');
}

async function changeQty(key, qty){
  await fetch('/cart/change.js',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({id: key, quantity: qty})
  });
  await renderCart();
}

// Cart drawer open/close
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer  = document.getElementById('cartDrawer');
function openCart(){
  if(cartOverlay) cartOverlay.classList.add('open');
  if(cartDrawer)  cartDrawer.classList.add('open');
  document.body.style.overflow='hidden';
  renderCart();
}
function closeCart(){
  if(cartOverlay) cartOverlay.classList.remove('open');
  if(cartDrawer)  cartDrawer.classList.remove('open');
  document.body.style.overflow='';
}
const cartBtn = document.getElementById('cartBtn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
if(cartBtn) cartBtn.addEventListener('click', openCart);
if(cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
if(cartOverlay) cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeCart(); });

// Add to cart via AJAX
async function addToCart(variantId, quantity, size){
  const properties = size ? {'Beden': size} : {};
  const r = await fetch('/cart/add.js',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({id: variantId, quantity: quantity||1, properties})
  });
  if(!r.ok){ showToast('Ürün eklenemedi, tekrar deneyin.'); return; }
  const data = await r.json();
  const countEl = document.getElementById('cartCount');
  if(countEl){ countEl.classList.remove('bump'); requestAnimationFrame(()=>countEl.classList.add('bump')); }
  openCart();
  showToast(`"${data.product_title}" sepete eklendi!`);
}

// Size selection on product cards
document.querySelectorAll('.v-pc-sz').forEach(sz=>{
  sz.addEventListener('click',function(e){
    e.stopPropagation();
    this.closest('.v-pc-sizes').querySelectorAll('.v-pc-sz').forEach(s=>s.classList.remove('active'));
    this.classList.add('active');
  });
});

// Product card add buttons
document.querySelectorAll('.v-pc-add').forEach(btn=>{
  btn.addEventListener('click', async function(e){
    e.stopPropagation();
    const card  = this.closest('.v-pc');
    const vid   = card.dataset.variantId;
    const name  = card.dataset.name;
    const szEl  = card.querySelector('.v-pc-sz.active');
    const size  = szEl ? szEl.dataset.size : null;
    if(!vid){ showToast('Ürün yapılandırılamadı.'); return; }
    const orig = this.textContent;
    this.textContent = '✓';
    this.style.background = '#2d6a4f';
    this.style.color = '#fff';
    await addToCart(vid, 1, size);
    setTimeout(()=>{ this.textContent = orig; this.style.background=''; this.style.color=''; }, 1800);
  });
});

// Product detail page
const ppQtyNum  = document.getElementById('ppQtyNum');
const ppDecBtn  = document.getElementById('ppDecBtn');
const ppIncBtn  = document.getElementById('ppIncBtn');
const ppAddBtn  = document.getElementById('ppAddBtn');
if(ppQtyNum){
  let ppQty = 1;
  ppDecBtn.addEventListener('click',()=>{ if(ppQty>1){ppQty--;ppQtyNum.textContent=ppQty;} });
  ppIncBtn.addEventListener('click',()=>{ ppQty++;ppQtyNum.textContent=ppQty; });
}
document.querySelectorAll('.pp-sz').forEach(sz=>{
  sz.addEventListener('click',function(){
    document.querySelectorAll('.pp-sz').forEach(s=>s.classList.remove('active'));
    this.classList.add('active');
  });
});
if(ppAddBtn){
  ppAddBtn.addEventListener('click', async function(){
    const vid  = this.dataset.variantId;
    const szEl = document.querySelector('.pp-sz.active');
    const size = szEl ? szEl.dataset.size : null;
    const qty  = ppQtyNum ? parseInt(ppQtyNum.textContent)||1 : 1;
    if(!vid){ showToast('Lütfen bir varyant seçin.'); return; }
    this.textContent = 'Ekleniyor...';
    this.disabled = true;
    await addToCart(vid, qty, size);
    this.textContent = '✓ Sepete Eklendi';
    setTimeout(()=>{ this.textContent = 'Sepete Ekle'; this.disabled=false; }, 2000);
  });
}

// Scroll reveal
const obs = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); obs.unobserve(e.target); } });
},{threshold:.08});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const t = document.querySelector(this.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// Initial cart count
renderCart();
