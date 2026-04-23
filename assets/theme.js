/**
 * theme.js
 * Global JavaScript for the Gymshark Shopify theme clone.
 * Handles: header behaviour, mobile menu, cart drawer, quantity controls.
 */

/* ── Utility ──────────────────────────────────────────────────────────────── */

/**
 * Post JSON to Shopify AJAX API and return parsed JSON response.
 */
async function postJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
}

async function getJSON(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
}

/* ── Sticky / transparent header ─────────────────────────────────────────── */

(function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile menu toggle ───────────────────────────────────────────────────── */

(function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-header] .header__nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('header__nav--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
})();

/* ── Cart drawer ──────────────────────────────────────────────────────────── */

(function initCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const cartToggleBtns = document.querySelectorAll('[data-cart-toggle]');
  const cartCountEl = document.querySelector('[data-cart-count]');

  if (!drawer) return;

  function openDrawer() {
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    drawer.focus();
  }

  function closeDrawer() {
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', openDrawer));

  drawer.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* Update cart count badge */
  function updateCartCount(count) {
    if (!cartCountEl) return;
    cartCountEl.textContent = count > 0 ? String(count) : '';
    cartCountEl.setAttribute('data-cart-count', String(count));
  }

  /* Expose globally so other scripts can call it */
  window.CartDrawer = { open: openDrawer, close: closeDrawer, updateCount: updateCartCount };
})();

/* ── Add to cart ──────────────────────────────────────────────────────────── */

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-add-to-cart]');
  if (!btn) return;

  const variantId = btn.dataset.variantId;
  if (!variantId) return;

  btn.disabled = true;
  btn.textContent = 'Adding...';

  try {
    const cart = await postJSON('/cart/add.js', { id: variantId, quantity: 1 });
    const cartData = await getJSON('/cart.js');
    if (window.CartDrawer) {
      window.CartDrawer.updateCount(cartData.item_count);
      window.CartDrawer.open();
    }
  } catch (err) {
    console.error('Add to cart failed:', err);
    btn.textContent = 'Error – try again';
  } finally {
    btn.disabled = false;
    if (btn.textContent === 'Adding...') btn.textContent = 'Add to Bag';
  }
});

/* ── Cart quantity controls (cart page) ──────────────────────────────────── */

(function initCartQuantity() {
  const cartForm = document.getElementById('cart-form');
  if (!cartForm) return;

  cartForm.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const key = btn.dataset.key;
    const input = cartForm.querySelector('[data-key="' + key + '"]') ||
                  btn.closest('.cart-item__quantity-wrapper').querySelector('input');
    if (!input) return;

    let qty = parseInt(input.value, 10) || 0;
    qty = action === 'increase' ? qty + 1 : Math.max(0, qty - 1);
    input.value = qty;

    try {
      const cart = await postJSON('/cart/change.js', { id: key, quantity: qty });
      if (window.CartDrawer) window.CartDrawer.updateCount(cart.item_count);
      if (qty === 0) location.reload();
    } catch (err) {
      console.error('Cart update failed:', err);
    }
  });
})();

/* ── Search toggle ────────────────────────────────────────────────────────── */

(function initSearch() {
  const searchToggle = document.querySelector('[data-search-toggle]');
  if (!searchToggle) return;

  searchToggle.addEventListener('click', () => {
    const dest = '/search';
    window.location.href = dest;
  });
})();
