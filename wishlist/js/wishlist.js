let itemIdToRemove = null;

function confirmRemoveFromWishlist(id, title) {
	itemIdToRemove = id;
	document.getElementById("removeModalText").innerText =
		`Are you sure you want to remove "${title}" from wishlist?`;

	const modal = new bootstrap.Modal(document.getElementById("removeModal"));
	modal.show();
}

document.getElementById("confirmRemove").addEventListener("click", () => {
	if (itemIdToRemove !== null) {
		removeFromWishlist(itemIdToRemove);
		itemIdToRemove = null;
	}

	const modal = bootstrap.Modal.getInstance(document.getElementById("removeModal"));
	modal.hide();
});



// Handle confirm remove button in modal
document.getElementById("confirmRemove").addEventListener("click", function () {
	if (itemToRemove) {
		itemToRemove.remove();
		itemToRemove = null;

		// If wishlist is empty, show empty state
		const grid = document.getElementById("wishlist-grid");
		if (grid.children.length === 0) {
			document.getElementById("wishlist-empty").classList.remove("d-none");
		}
	}

	// Hide modal
	const modal = bootstrap.Modal.getInstance(document.getElementById("removeModal"));
	modal.hide();
});

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Save wishlist to localStorage
function saveWishlist() {
	localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
function addToWishlist(product) {
	// check if already exists
	const exists = wishlist.find(item => item.id === product.id);
	if (!exists) {
		wishlist.push(product);
		saveWishlist();
		renderWishlist();
	}
}
function removeFromWishlist(id) {
	wishlist = wishlist.filter(item => item.id !== id);
	saveWishlist();
	renderWishlist();
}
function renderWishlist() {
	const wishlistContainer = document.getElementById("wishlist-grid");

	if (wishlist.length === 0) {
		wishlistContainer.innerHTML = `
      <div class="wishlist-empty" id="wishlist-empty">
      <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="Empty Wishlist">
      <h2>Oops! Your wishlist is empty</h2>
      <p class="text-muted">Start adding items you love and save them for later.</p>
      <a href="../categories/index.html" class="btn btn-primary mt-3 px-4 py-2">
        <i class="bi bi-shop me-2"></i> Continue Shopping
      </a>
    </div>`;
		return;
	}

	wishlistContainer.innerHTML = ""; // clear first

	wishlist.forEach(item => {
		const card = `
      <div class="wishlist-item card p-2 mb-3">
        <img src="${item.thumbnail}" class="card-img-top w-25" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h5 class="card-title">${item.category}</h5>
          <p class="card-text">$${item.price}</p>
          <button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${item.id})">
            <i class="bi bi-trash"></i> Remove
          </button>
        </div>
      </div>
    `;
		wishlistContainer.innerHTML += card;
	});
}
document.addEventListener("DOMContentLoaded", () => {
	renderWishlist();
});

