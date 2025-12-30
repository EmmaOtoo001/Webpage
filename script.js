function showNotification(message) {
  const notification = document.getElementById("notification");
  if (!notification) return; // skip if no notification div
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Add item to cart
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));

  showNotification(`🍵 ${name} added to the cart`);

  // Refresh cart display if on cart page
  displayCart();
}

// Remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Display cart items
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';

    // Name
    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;
    div.appendChild(nameSpan);

    // Price
    const priceSpan = document.createElement('span');
    priceSpan.textContent = `₵${item.price.toFixed(2)}`;
    div.appendChild(priceSpan);

    // Remove button wrapped in a span
    const actionSpan = document.createElement('span');
    actionSpan.style.textAlign = 'center'; // ensures it centers under "Action"
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => removeFromCart(index));
    actionSpan.appendChild(removeBtn);
    div.appendChild(actionSpan);

    cartItems.appendChild(div);
    total += item.price;
  });

  document.getElementById('total').textContent = total.toFixed(2);
}


function filterItems() { 
  const input = document.getElementById("search").value.toLowerCase();
  const items = document.getElementsByClassName("item");
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = items[i].innerText.toLowerCase().includes(input) ? "" : "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayCart();
});
