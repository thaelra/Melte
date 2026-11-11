# 🍨 Nectar Artisan Ice Cream & Creamery — Website Frontend

Website frontend 2 halaman (*Page 1: Beranda / Cart & Event*, *Page 2: Menu Rasa & Toko Pint*) dengan estetika **retro-editorial whimsical boutique** terinspirasi dari referensi gerobak candy/gelato vintage Eropa.

---

## ✨ Fitur Utama & Kesesuaian Referensi

1. **Estetika Desain & Palet Warna (Sesuai Referensi Gambar)**:
   - **Graph Paper Grid**: Background bergaris kotak-kotak halus khas vintage stationery.
   - **Notebook Binder Cutout**: Kalender pop-up mingguan dengan lubang spiral binder berlubang (*punched holes*), header tebal, dan highlight lingkaran spidol hand-drawn pada hari aktif (Rabu).
   - **Candy Awning Stripes**: Pola garis-garis vertikal pink & krem pada bagian *Catering & Events*.
   - **3 Price Cloud Badges**: Tiga lencana harga berbentuk bunga/awan bergelombang (*Cart Fee 2 Jam*, *Per Tamu*, dan *Per Jam Tambahan*).
   - **Polaroid Frame & Washi Tape**: Foto gerobak dengan efek selotip washi miring, stempel bundar *"designed to delight!"*, dan caption tulisan tangan.
   - **Periwinkle Scalloped Section**: Bagian *The Scoop Club* dengan kartu bertepi renda bergelombang (*scalloped card*), stiker hati *"Sweetest Perks"*, dan ilustrasi doodle mengambang.
   - **Crenellated Sawtooth Trim**: Pita pembatas bergigi khas awning retro antara bagian catering dan subscription.
   - **Typografi Editorial**: Font serif berkarakter *Fraunces*, font santai *Plus Jakarta Sans*, aksen *Fredoka*, dan coretan tulisan tangan *Reenie Beanie* (*"catch me if you melt! 🍦"*).

2. **2 Halaman Lengkap**:
   - **Page 1 (`index.html`)**:
     - Announcement Bar & Header Nav (Find the Cart, Book an Event, Logo, Menu, Scoop Club, Keranjang Belanja).
     - Hero Section dengan ilustrasi gerobak vintage, panah melengkung beranotasi, dan stiker buah ceri/gummy.
     - Jadwal mingguan 7 hari gerobak pop-up + form langganan email.
     - Section Katering Pesta & Pernikahan + kalkulator estimasi biaya.
     - Section Keanggotaan *The Scoop Club* (Paket 4 pint bulanan).
     - Ulasan & testimoni pelanggan.
     - Footer lengkap.
   - **Page 2 (`menu.html`)**:
     - Koleksi 12 rasa es cream artisan (Klasik, Musiman, Vegan Sorbet, Paket Hemat Pint).
     - Filter kategori instan dengan animasi transisi halus.
     - Fitur interaktif **The Sundae Studio** (Pilih cone/wadah, 2 scoop rasa, dan aneka gourmet topping dengan kalkulasi harga langsung).
     - Accordion FAQ seputar pengiriman beku dengan *dry ice*, alergen, dan daya tahan freezer.

3. **Interaktivitas JavaScript (Tanpa Framework Luar / Zero Dependency)**:
   - **Shopping Cart Drawer**: Slide-over keranjang belanja dari samping kanan, counter otomatis di badge navigasi, tombol tambah/kurang kuantitas, kalkulasi subtotal, dan penyimpanan di `localStorage` (data tidak hilang saat ganti halaman).
   - **Interactive Catering Estimator Modal**: Slider jumlah tamu (30-400 orang) dan slider durasi (2-6 jam) dengan kalkulasi biaya langsung + tombol kirim pesanan otomatis ke WhatsApp.
   - **Location Modal ("Cek Titik Lokasi Hari Ini")**: Menampilkan titik operasional aktif, menu harian, dan integrasi Google Maps.
   - **Toast Notifications**: Notifikasi pop-up cantik setiap kali ada item yang ditambahkan ke keranjang.
   - **Mobile Drawer Navigation**: Menu responsif untuk layar smartphone dan tablet dengan backdrop blur.

4. **Responsif di Semua Perangkat**:
   - Mobile (< 640px)
   - Tablet (641px - 1024px)
   - Laptop / Desktop (1025px - 1360px)
   - Layar Ultra-Wide (> 1440px) dengan side ribbon margin khas majalah editorial.

---

## 🚀 Cara Menjalankan

Website ini dibuat dengan **HTML5 murni, CSS3 modern, dan Vanilla JavaScript**, sehingga dapat langsung dibuka tanpa perlu build tools atau compiler:

### Opsi 1: Buka Langsung di Browser
Cukup klik dua kali (*double-click*) file `index.html` atau buka melalui browser apa saja (Google Chrome, Safari, Firefox, Edge).

### Opsi 2: Menggunakan Local Server (Opsional)
Jika ingin menjalankan melalui local server:
```bash
python3 -m http.server 8000
```
Buka browser di alamat `http://localhost:8000`.

---

## 📁 Struktur File

```
├── index.html       # Halaman Beranda (Hero, Jadwal Notebook, Catering, Scoop Club, Reviews)
├── menu.html        # Halaman Menu (Filter Rasa, 12 Flavor Cards, Sundae Studio, FAQ)
├── style.css        # Desain Sistem Lengkap, Animasi, Efek Retro, & Media Queries
├── script.js        # Logic Keranjang Belanja, Modal Estimator, Filter Kategori, & Toast
└── README.md        # Panduan Dokumentasi
```

