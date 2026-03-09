# ⚡ VOLTIX — Shopify Theme

> **Power Meets Style.** — Lüks & Premium Giyim Mağazası Teması

![Voltix Theme](https://img.shields.io/badge/Shopify-Theme-96bf48?style=flat&logo=shopify)
![Version](https://img.shields.io/badge/Version-1.0.0-b8976a)
![License](https://img.shields.io/badge/License-MIT-black)

---

## 🖤 Özellikler

- **Tam Shopify Entegrasyonu** — Liquid şablonları, AJAX sepet, ürün varyantları
- **Lüks Tasarım** — Siyah & altın renk paleti, Cormorant Garamond tipografisi
- **AJAX Sepet Çekmecesi** — Sayfa yenilenmeden sepet yönetimi
- **Ürün Varyantları** — Beden seçimi, stok takibi, varyant ID yönetimi
- **Shopify Theme Editor** — Tüm içerikler kod yazmadan özelleştirilebilir
- **Responsive** — Mobil uyumlu tasarım
- **Performanslı** — Minimal JS, CSS-first animasyonlar
- **SEO Hazır** — Semantic HTML, meta etiketleri

---

## 📁 Dosya Yapısı

```
voltix-theme/
├── assets/
│   ├── voltix.css          # Tüm stiller
│   └── voltix.js           # AJAX sepet, etkileşimler
├── layout/
│   └── theme.liquid        # Ana layout (nav, footer, cart drawer)
├── sections/
│   ├── hero.liquid         # Hero bölümü (özelleştirilebilir)
│   ├── marquee.liquid      # Kayan yazı bandı
│   ├── features.liquid     # Özellikler (4 kart)
│   ├── product-grid.liquid # Ürün grid (koleksiyondan çeker)
│   ├── editorial.liquid    # Marka hikayesi bölümü
│   ├── testimonials.liquid # Müşteri yorumları
│   ├── cta.liquid          # Call-to-action bölümü
│   └── footer.liquid       # Footer
├── templates/
│   ├── index.json          # Ana sayfa section sırası
│   ├── product.liquid      # Ürün detay sayfası
│   ├── collection.liquid   # Koleksiyon sayfası
│   ├── cart.liquid         # Sepet sayfası
│   └── 404.liquid          # 404 sayfası
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
└── locales/
    └── en.default.json
```

---

## 🚀 Kurulum

### Yöntem 1: Shopify Admin'den Yükleme

1. [Shopify Admin](https://admin.shopify.com) → **Online Store → Themes**
2. **"Add theme" → "Upload zip file"**
3. `voltix-shopify-theme.zip` dosyasını yükle
4. **"Publish"** ile yayına al

### Yöntem 2: Shopify CLI ile

```bash
# Shopify CLI kurulumu
npm install -g @shopify/cli @shopify/theme

# Store'a bağlan
shopify auth login --store your-store.myshopify.com

# Temayı yükle
shopify theme push --store your-store.myshopify.com

# Geliştirme modu (canlı önizleme)
shopify theme dev --store your-store.myshopify.com
```

---

## ⚙️ Özelleştirme

**Shopify Admin → Online Store → Customize** üzerinden:

| Bölüm | Özelleştirilebilen |
|-------|-------------------|
| Hero | Başlık, açıklama, butonlar, görsel |
| Ürün Grid | Koleksiyon seçimi, ürün sayısı |
| Özellikler | 4 adet ikon, başlık, açıklama |
| Editorial | Görsel, metin, liste öğeleri |
| Yorumlar | 3 müşteri yorumu, isim, konum |
| CTA | Başlık, açıklama, buton linkleri |
| Footer | Sosyal medya linkleri |

---

## 🎨 Tasarım Sistemi

```css
:root {
  --black:  #060607;   /* Ana arka plan */
  --black2: #0d0d10;   /* İkincil arka plan */
  --black3: #141418;   /* Üçüncül arka plan */
  --gold:   #b8976a;   /* Ana vurgu rengi */
  --gold2:  #d4af80;   /* Açık altın */
  --white:  #f8f5f0;   /* Ana metin */
  --grey:   #6a6a70;   /* İkincil metin */
}
```

**Fontlar:**
- `Cormorant Garamond` — Display / Başlıklar
- `Montserrat` — Body / UI elementleri
- `EB Garamond` — Yorumlar / İtalik metin

---

## 🛒 Shopify Entegrasyonu

Tema tam Shopify API entegrasyonu ile gelir:

```javascript
// AJAX ile sepete ürün ekleme
await fetch('/cart/add.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: variantId, quantity: 1 })
});

// Sepet miktarı güncelleme
await fetch('/cart/change.js', {
  method: 'POST',
  body: JSON.stringify({ id: itemKey, quantity: newQty })
});
```

---

## 📝 Ürün Ekleme

1. **Shopify Admin → Products → Add product**
2. Ürün başlığı, fiyat ve açıklamayı gir
3. **Variants** → Beden seçeneği ekle (XS, S, M, L, XL)
4. Ürün görseli yükle
5. **Koleksiyona ekle** → Ana sayfada otomatik görünür

---

## 📋 Gereksinimler

- Shopify hesabı (Basic plan ve üzeri)
- Shopify CLI (opsiyonel, geliştirme için)

---

## 📄 Lisans

MIT License — Ticari kullanım serbesttir.

---

**VOLTIX** — Power Meets Style. ⚡
