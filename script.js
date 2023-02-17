(async () => {

    const productContainerEl = document.getElementById("productContainer");
    const searchInputEl = document.getElementById("searchInput");

    const url = "https://fakestoreapi.com/products"
    const fetchProduct = async () => {
        try {
            const res = await fetch(url);
            return await res.json();

        } catch (error) {
            return error;
        }
    };

    const products = await fetchProduct();

    const generateproduct = (product) => {
        return `
        <div class="product_card">
        <div class="image_container">
            <img src="${product.image}" alt="">
        </div>
        <div class="product_content">
            <h2>
                ${product.title}
            </h2>
            <p>
               ${product.description} 
            </p>
            <button>${product.price} $</button>
        </div>
    </div>
        `
    }

    const renderProducts = (products) => {
        productContainerEl.innerHTML = "";
        products.forEach(product => {
            productContainerEl.innerHTML += generateproduct(product);
        });
    };


    const checkTextContain = (text, searchText) => {
        return text.toString().toLowerCase().includes(searchText); 
    };
    const filterHandler = (event) => {
        const searchText = event.target.value.toLowerCase();

        const filterproducts = products.filter((product) => {
            return (
                checkTextContain(product.description, searchText) ||  
                checkTextContain(product.title, searchText) ||
                checkTextContain(product.price, searchText)
            );            
        });

        renderProducts(filterproducts);
    };

    
    searchInputEl.addEventListener("keyup", filterHandler)
    renderProducts(products);
})();

