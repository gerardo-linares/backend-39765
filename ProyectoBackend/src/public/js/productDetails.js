


 document.querySelector('form').addEventListener('submit', function (e) {
     e.preventDefault();
    const cartId = document.getElementById('cartId').value;
    window.location.href = `/carts/${cartId}`;
  });


