const socket = io();

    const botones = document.querySelectorAll(".botones");
    console.log(`Found ${botones.length} buttons.`);
    botones.forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.getAttribute("data-product-id");
            console.log(`Product ID: ${productId}`);
            const cartId = "66da7543541f8dc13238ac2e"; 

            console.log(`Adding product ${productId} to cart ${cartId}`);

            try {
                const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                console.log(result);

                if (response.ok) {
                    alert(result.message); 
                } else {
                    alert(result.message); 
                }
            } catch (error) {
                console.error('Error al agregar el producto al carrito:', error);
                alert('Hubo un error al agregar el producto al carrito.');
            }
        });
    });


socket.emit("getProducts");
