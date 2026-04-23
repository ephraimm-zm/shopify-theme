/**
 * cart.js
 * Cart page specific JavaScript (quantity stepper, item removal).
 */

(function initCartPage() {
  const cartPage = document.querySelector('[data-cart-page]');
  if (!cartPage) return;

  async function updateLineItem(key, quantity) {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity }),
    });
    if (!response.ok) throw new Error('Cart update failed');
    return response.json();
  }

  cartPage.addEventListener('click', async (e) => {
    const removeBtn = e.target.closest('.cart-item__remove');
    if (removeBtn) {
      const key = removeBtn.dataset.key;
      try {
        await updateLineItem(key, 0);
        location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  });
})();
