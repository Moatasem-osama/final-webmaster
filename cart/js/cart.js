 const cartContainer = document.getElementById("cart-container");
  const subtotalEl = document.getElementById("subtotal");
  const discountEl = document.getElementById("discount");
  const totalEl = document.getElementById("total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];



  async function renderCart() {
    if (cart.length === 0) {
    cartContainer.innerHTML = `
    <div class="wishlist-empty">
        <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="Empty Cart">
        <h2>Oops! Your cart is empty</h2>
        <p class="text-muted">Start adding items you love and save them for later.</p>
        <a href="shop.html" class="btn btn-primary mt-3 px-4 py-2">
          <i class="bi bi-shop me-2"></i> Continue Shopping
        </a>
    </div>`;
    subtotalEl.innerText = "$0.00";
    discountEl.innerText = "-$0.00";
    totalEl.innerText = "$0.00";
  return;
}
 cartContainer.innerHTML = ""; 
    let subtotal = 0;

    // لف على كل منتج في السلة وجيبه من الـ API وعرضه
    for (let item of cart) {
      const product = await fetchProductById(item.id);
      subtotal += product.price * item.quantity;

// عرض المنتجات
const productHTML = `
<div class="d-flex gap-3 w-100">
  <img src="${product.image}" class="product-img" alt="">
  <div class="w-100">
    <div class="d-flex justify-content-between align-items-center w-100 text-top">
      <h5 class="fw-bold">${product.title}</h5>
      <i class="bi bi-trash me-2" onclick="removeFromCart(${item.id})"></i>
    </div>
    <p class="mb-0">Category: ${product.category}</p>
    <p class="fw-bold" id="price-${item.id}">$${(product.price * item.quantity).toFixed(2)}</p>

    <div class="d-flex align-items-center gap-2 mt-2">
      <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${item.id})">-</button>
      <span class="px-2" id="quantity-${item.id}">${item.quantity}</span>
      <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${item.id})">+</button>
    </div><hr>
  </div>
</div>

`;


      cartContainer.innerHTML += productHTML;
    }

    const discount = subtotal * 0.2;
    const delivery = 15;
    const total = subtotal - discount + delivery;

    subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    discountEl.innerText = `-$${discount.toFixed(2)}`;
    totalEl.innerText = `$${total.toFixed(2)}`;
  }



// حساب الإجمالي والخصومات والتوصيل
function updateTotals() {
  let subtotal = 0;

  for (let item of cart) {
    subtotal += item.price * item.quantity;
  }

  const discountFromCart = subtotal * 0.2;
  const discountFromPromo = appliedPromo ? subtotal * appliedPromo : 0;
  const totalDiscount = discountFromCart + discountFromPromo;

  const delivery = 15;
  const total = subtotal - totalDiscount + delivery;

  document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("discount").innerText = `-$${totalDiscount.toFixed(2)}`;
  document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}

  renderCart();

function applyPromoCode() {
  const input = document.getElementById("promo-input");
  const code = input.value.trim().toLowerCase();
  const messageEl = document.getElementById("promo-message");

   // التحقق من الكود
  if (code === "shahd10") {
    appliedPromo = 0.1; // 10% خصم
    messageEl.innerText = "Promo code applied successfully! 10% off.";
    messageEl.classList.remove("text-danger");
    messageEl.classList.add("text-success");
  } else {
    appliedPromo = null;
    messageEl.innerText = "Invalid promo code.";
    messageEl.classList.remove("text-success");
    messageEl.classList.add("text-danger");
  }

  updateTotals(); // نعيد حساب الإجمالي بعد الخصم
}
