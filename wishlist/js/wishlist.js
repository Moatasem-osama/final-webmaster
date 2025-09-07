let itemToRemove = null; // store which item to delete after confirmation

function removeItem(button) {
	const card = button.closest(".wishlist-item");
	const itemName = card.querySelector(".card-title").innerText;

	// Save the item reference for later removal
	itemToRemove = card;

	// Update modal text dynamically
	document.getElementById("removeModalText").innerText =
		`Are you sure you want to remove "${itemName}" from wishlist?`;

	// Show modal
	const modal = new bootstrap.Modal(document.getElementById("removeModal"));
	modal.show();
}

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
