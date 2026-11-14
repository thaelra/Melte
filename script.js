
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCart();
  initEventEstimator();
  initLocationModal();
  initMenuFilters();
  initNewsletter();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      toggleBtn.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);

  closeLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   2. SHOPPING CART SYSTEM (LOCALSTORAGE PERSISTENCE)
   ========================================================================== */
let cart = [];

function initCart() {
  const savedCart = localStorage.getItem('melte_cart') || localStorage.getItem('nectar_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }

  updateCartUI();

  // Cart trigger buttons
  const cartTriggers = document.querySelectorAll('.js-open-cart');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBackdrop = document.getElementById('cartBackdrop');

  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCartDrawer);
  }
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', closeCartDrawer);
  }

  // Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutModal');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Keranjangmu masih kosong!');
        return;
      }
      openCheckoutModal();
    });
  }

  if (closeCheckoutBtn && checkoutModal) {
    closeCheckoutBtn.addEventListener('click', () => {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Handle Checkout Form Submission
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      processOrder();
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const summaryEl = document.getElementById('checkoutOrderSummary');
  const totalEl = document.getElementById('checkoutFinalTotal');

  if (!modal) return;

  closeCartDrawer();

  let total = 0;
  let summaryHtml = '';

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    summaryHtml += `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
        <span>${item.qty}x ${item.name} (${item.variant})</span>
        <span style="font-weight:700;">${formatRupiah(itemTotal)}</span>
      </div>
    `;
  });

  if (summaryEl) summaryEl.innerHTML = summaryHtml;
  if (totalEl) totalEl.textContent = formatRupiah(total);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function processOrder() {
  const name = document.getElementById('custName')?.value || 'Pelanggan Manis';
  const phone = document.getElementById('custPhone')?.value || '';
  const address = document.getElementById('custAddress')?.value || '';
  const notes = document.getElementById('custNotes')?.value || '-';
  const payment = document.getElementById('custPayment')?.value || 'QRIS';

  let total = 0;
  let itemsListText = '';

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    itemsListText += `${idx + 1}. ${item.name} [${item.variant}] x${item.qty} = ${formatRupiah(itemTotal)}\n`;
  });

  const message = `🍨 *PESANAN BARU MELTÉ CREAMERY*\n` +
    `-----------------------------------------\n` +
    `👤 *Nama:* ${name}\n` +
    `📱 *WhatsApp:* ${phone}\n` +
    `📍 *Alamat:* ${address}\n` +
    `💳 *Metode Pembayaran:* ${payment}\n` +
    `📝 *Catatan:* ${notes}\n` +
    `-----------------------------------------\n` +
    `🛒 *DAFTAR ITEM:*\n${itemsListText}` +
    `-----------------------------------------\n` +
    `💰 *TOTAL PEMBAYARAN:* ${formatRupiah(total)}\n\n` +
    `Mohon info instruksi pembayaran & estimasi pengiriman. Terima kasih! ✨`;

  // Trigger Confetti
  triggerConfetti();

  // Reset Cart
  cart = [];
  saveCart();
  updateCartUI();

  // Close Checkout Modal
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';

  // Show Toast
  showToast('🎉 Pesananmu berhasil dibuat! Mengalihkan ke WhatsApp...');

  // Open WhatsApp in new tab
  setTimeout(() => {
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  }, 900);
}

/* ==========================================================================
   CONFETTI CELEBRATION
   ========================================================================== */
function triggerConfetti() {
  const colors = ['#7A192A', '#EE6A86', '#FAD4A8', '#BAC8F8', '#CBEAD8'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = Math.floor(Math.random() * 8 + 6) + 'px';
    el.style.height = Math.floor(Math.random() * 14 + 8) + 'px';
    el.style.animationDuration = (Math.random() * 2 + 1.8) + 's';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 3800);
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function saveCart() {
  localStorage.setItem('melte_cart', JSON.stringify(cart));
}

function addToCart(item) {
  const existingIndex = cart.findIndex(c => c.id === item.id && c.variant === item.variant);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: item.id || Date.now().toString(),
      name: item.name,
      variant: item.variant || 'Single Scoop',
      price: item.price,
      img: item.img || 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=150&auto=format&fit=crop&q=80',
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
  showToast(`🍦 "${item.name}" ditambahkan ke keranjang!`);
}

function changeQty(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
}

function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function updateCartUI() {
  // Update badge count
  const countBadges = document.querySelectorAll('.cart-count');
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  countBadges.forEach(badge => {
    badge.textContent = totalCount;
  });

  // Render items in drawer
  const itemsContainer = document.getElementById('cartDrawerItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="icon">🍨</div>
        <p style="font-weight: 700; margin-bottom: 6px; color: var(--color-maroon);">Keranjangmu Masih Kosong</p>
        <p style="font-size: 0.85rem;">Pilih rasa favoritmu dari menu dan rasakan kelezatan artisan kami!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Rp 0';
    return;
  }

  let total = 0;
  itemsContainer.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `
      <div class="cart-item-row">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${item.variant} • ${formatRupiah(item.price)}</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-maroon);">
          ${formatRupiah(itemTotal)}
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = formatRupiah(total);
  }
}

// Make changeQty accessible globally
window.changeQty = changeQty;
window.addToCart = addToCart;

/* ==========================================================================
   3. TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
window.showToast = showToast;

/* ==========================================================================
   4. EVENT CATERING CALCULATOR MODAL
   ========================================================================== */
function initEventEstimator() {
  const modalOverlay = document.getElementById('cateringModal');
  const openBtns = document.querySelectorAll('.js-open-catering-modal');
  const closeBtn = document.getElementById('closeCateringModal');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      calculateQuote();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Slider controls
  const guestsInput = document.getElementById('calcGuests');
  const hoursInput = document.getElementById('calcHours');
  const guestsVal = document.getElementById('valGuests');
  const hoursVal = document.getElementById('valHours');
  const totalDisplay = document.getElementById('calcTotalEstimate');

  function calculateQuote() {
    if (!guestsInput || !hoursInput || !totalDisplay) return;

    const guests = parseInt(guestsInput.value, 10);
    const hours = parseInt(hoursInput.value, 10);

    if (guestsVal) guestsVal.textContent = guests + ' Orang';
    if (hoursVal) hoursVal.textContent = hours + ' Jam';

    // Pricing formulas inspired by reference:
    // Base 2-hour cart fee: Rp 3.500.000 ($350)
    // Extra hour fee: Rp 850.000/hr ($85)
    // Per guest fee: Rp 35.000/guest ($6)
    const baseCartFee = 3500000;
    const additionalHours = Math.max(0, hours - 2);
    const extraHoursCost = additionalHours * 850000;
    const guestCost = guests * 35000;

    const grandTotal = baseCartFee + extraHoursCost + guestCost;
    totalDisplay.textContent = formatRupiah(grandTotal);
  }

  if (guestsInput) guestsInput.addEventListener('input', calculateQuote);
  if (hoursInput) hoursInput.addEventListener('input', calculateQuote);

  // Send WhatsApp booking inquiry
  const sendInquiryBtn = document.getElementById('sendBookingInquiry');
  if (sendInquiryBtn) {
    sendInquiryBtn.addEventListener('click', () => {
      const guests = guestsInput ? guestsInput.value : '50';
      const hours = hoursInput ? hoursInput.value : '2';
      const eventType = document.getElementById('calcEventType') ? document.getElementById('calcEventType').value : 'Pernikahan';
      const eventDate = document.getElementById('calcDate') ? document.getElementById('calcDate').value : 'Segera';

      const waMsg = `Halo Melté Ice Cream! Saya ingin memesan Ice Cream Cart untuk acara ${eventType} (${guests} tamu, ${hours} jam). Tanggal acara: ${eventDate}. Mohon info ketersediaan slotnya. Terima kasih!`;
      const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');
    });
  }
}

/* ==========================================================================
   5. POP-UP LOCATION / "FIND US TODAY" MODAL
   ========================================================================== */
function initLocationModal() {
  const modal = document.getElementById('locationModal');
  const openBtns = document.querySelectorAll('.js-open-location-modal');
  const closeBtn = document.getElementById('closeLocationModal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   6. MENU PAGE: CATEGORY FILTERS
   ========================================================================== */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab');
  const flavorCards = document.querySelectorAll('.flavor-card');

  if (!filterBtns.length || !flavorCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      flavorCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory.includes(category)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. NEWSLETTER SIGNUP
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.js-newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('💌 Terima kasih! Jadwal mingguan akan dikirim ke ' + input.value);
        input.value = '';
      }
    });
  });
}

