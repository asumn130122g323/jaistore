let files = [];

const products = [
  { id: 1, name: 'Naruto T-Shirt', price: 250, image: 'narutotsh.jpeg' },
  { id: 2, name: 'One Piece Hoodie', price: 799, image: 'onepieceh.jpeg' },
  { id: 3, name: 'Attack on Titan Shoes', price: 499, image: 'shoeaot.jpeg' },
  { id: 4, name: 'My Hero Academia Accessory', price: 200, image: 'acessmha.jpeg' },
  { id: 5, name: 'Dragon Ball Z Track Pants', price: 350, image: 'tra.jpeg' },
  { id: 6, name: 'Demon Slayer Shorts', price: 199, image: 'shorts.jpeg' },
  { id: 7, name: 'Jujutsu Kaisen Cotton Pants', price: 899, image: 'cottonpant.jpeg' },
];
const cart = [];
function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productElement);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const totalAmount = document.getElementById('total-amount');

  cartItems.innerHTML = '';
  cartCount.textContent = cart.length;

  let total = 0;
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <span>${item.name} - ₹${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(itemElement);
    total += item.price;
  });

  totalAmount.textContent = total.toFixed(2);
}

function showPaymentMethod() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  document.getElementById('payment').style.display = 'block';
}

function cancelPayment() {
  document.getElementById('payment').style.display = 'none';
}

function checkout() {
  const cardNumber = document.getElementById('card-number').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;

  if (!cardNumber || !expiryDate || !cvv) {
    alert('Please fill in all payment details.');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`Payment successful! Total amount: ₹${total.toFixed(2)}`);
  cart.length = 0;
  updateCart();
  cancelPayment();
}

function logout() {
  alert('You have been logged out.');
  // Additional logout functionality can be implemented here
}

// Initialize the page
displayProducts();
updateCart();

// Add event listener for payment form submission
document.getElementById('payment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  checkout();
});