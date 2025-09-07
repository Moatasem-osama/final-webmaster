const selectTag = document.getElementById("selectCategory");
const container = document.getElementById("cards");

async function selectCategory() {
    let response = await fetch("https://dummyjson.com/products/categories");
    let categories = await response.json();

    selectTag.innerHTML += categories
        .map((cat) => `<option value="${cat.url}">${cat.name}</option>`)
        .join("");

    let beauty = categories.find(cat => cat.slug === "beauty");
    if (beauty) {
        selectTag.value = beauty.url;
        loadProducts(beauty.url);
    }
}

async function loadProducts(url) {
  let response = await fetch(url);
  let data = await response.json();
  let products = data.products;

  container.innerHTML = products
    .map(
      (product) => `
        <div class="col-xl-3 col-md-6 col-sm-6 col-12 d-flex flex-column align-items-center product-card" data-id="${product.id}">
            <img src="${product.thumbnail}" class="rounded" alt="${product.title}" />
            <h6 class="text-center mt-3 fw-bold">${product.title}</h6>
            <p class="text-center fw-medium">$ ${product.price} USD</p>
            <div class="card-icons">
                <p class="icon cart-btn w-48" title="add to cart" data-id="${product.id}">
                    <i class="fa-solid fa-cart-shopping text-light"></i>
                    Add to Cart
                </p>
                <p class="icon wishlist-btn text-light w-48 fz-95" title="add to wishlist" data-id="${product.id}">
                    <i class="fa-solid fa-heart text-light"></i>
                    Add to Wishlist
                </p>
            </div>
            <button class="btn btn-warning text-light view-btn" data-id="${product.id}">View Details</button>
        </div>
      `
    )
    .join("");

  // ✅ هنا نضيف الأحداث بعد ما العناصر ظهرت
  document.querySelectorAll(".cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      let product = products.find((p) => p.id == id);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (!cart.find((item) => item.id === product.id)) {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  });

  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      let product = products.find((p) => p.id == id);
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!wishlist.find((item) => item.id === product.id)) {
        wishlist.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
    });
  });

  // ✅ View Details
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      let product = products.find((p) => p.id == id);

      document.getElementById("modalTitle").innerText = product.title;
      document.getElementById("modalDescription").innerText = product.description;
      document.getElementById("modalPrice").innerText = "$" + product.price + " USD";
      document.getElementById("modalRating").innerText = "⭐ " + product.rating;
      document.getElementById("modalImage").src = product.thumbnail;

      new bootstrap.Modal(document.getElementById("productModal")).show();
    });
  });
}


selectTag.addEventListener("change", () => {
    if (selectTag.value) loadProducts(selectTag.value);
});
selectCategory();



