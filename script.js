document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
  
    let cartData = [];
  
   
    fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
      .then(response => response.json())
      .then(data => {
        cartData = data.items;
        displayCartItems(cartData);
        updateCartTotals();
      });
  
   
    function displayCartItems(items) {
      cartItemsContainer.innerHTML = ''; 
      items.forEach(item => {
        cartItemsContainer.innerHTML += `
          <tr class="cart-item">
            <td>
              <img src="${item.image}" alt="${item.title}">
            </td>
            <td>${item.title}</td>
            <td>Rs.${(item.price / 100).toFixed(2)}</td>
            <td>
              <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
            </td>
            <td>Rs.${(item.line_price / 100).toFixed(2)}</td>
            <td>
              <button class="remove-btn" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>`;
      });
  
   
      document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
      });
  
      document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
      });
    }
  
   
    function updateQuantity(e) {
      const id = e.target.getAttribute('data-id');
      const newQuantity = parseInt(e.target.value);
      const item = cartData.find(item => item.id == id);
      item.quantity = newQuantity;
      item.line_price = item.price * newQuantity;
      displayCartItems(cartData);
      updateCartTotals();
    }
  
    
    function removeItem(e) {
      const id = e.target.getAttribute('data-id');
      cartData = cartData.filter(item => item.id != id);
      displayCartItems(cartData);
      updateCartTotals();
    }

    function updateCartTotals() {
      const subtotal = cartData.reduce((acc, item) => acc + item.line_price, 0);
      subtotalElement.textContent = `₹${(subtotal / 100).toFixed(2)}`;
      totalElement.textContent = `₹${(subtotal / 100).toFixed(2)}`;
    }
  });
  