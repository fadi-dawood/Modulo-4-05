//& endpoint: https://striveschool-api.herokuapp.com/books
const endPoint = "https://striveschool-api.herokuapp.com/books";

// Number of the items inside the cart: 
let cartItems = 0;

//& chiamata HTTP
fetch("https://striveschool-api.herokuapp.com/books")
.then(response => response.json())
.then(json => {
    caricaLibri(json);
    search(json, caricaLibri);
})
.catch(err => console.log(err));



//& chiamare containers dal DOM
// search's result container
let bookContainer = document.getElementById("books-container");

// Cart container
let cartContainer = document.getElementById("cart-items");



//& carica i prodotti
function caricaLibri(booksArray) {
    const allBooks = [...booksArray];
    allBooks.forEach((element) => {

        // Creare un nuovo card:
        let newBookCard = document.createElement("div");
        newBookCard.classList.add("card", "book", "shadow-sm", "p-3", "mb-4", "bg-body-tertiary", "rounded", "mx-2");
        newBookCard.id = element.asin;
        newBookCard.style.width = "18rem";
        bookContainer.appendChild(newBookCard);

        let newBookImg = document.createElement("img");
        newBookImg.classList.add("card-img-top");
        newBookImg.src = element.img;
        newBookCard.appendChild(newBookImg);

        let newBookInfo = document.createElement("div");
        newBookInfo.classList.add("card-body");
        newBookCard.appendChild(newBookInfo);

        let newBookTitle = document.createElement("h5");
        newBookTitle.classList.add("card-title");
        newBookTitle.innerText = element.title;
        newBookInfo.appendChild(newBookTitle);

        let newBookPrice = document.createElement("p");
        newBookPrice.classList.add("card-text");
        newBookPrice.innerText = element.price + " €";
        newBookInfo.appendChild(newBookPrice);

        let btnsBox = document.createElement("div");
        btnsBox.classList.add("d-flex", "justify-content-between", "align-items-center");
        newBookCard.appendChild(btnsBox);

        let cartBtn = document.createElement("button");
        cartBtn.classList.add("fw-bolder", "btn", "btn-dark", "add-to-cart-btn");
        cartBtn.innerText = "Add to Cart";
        btnsBox.appendChild(cartBtn);

        let skipBtn = document.createElement("button");
        skipBtn.classList.add("fw-bolder", "btn", "btn-secondary");
        skipBtn.innerText = "Skip";
        btnsBox.appendChild(skipBtn);

        let ancorDetail = document.createElement("a");
        ancorDetail.href = `/detail-page/detail.html?id=${element.asin}`
        btnsBox.appendChild(ancorDetail);

        let detailBtn = document.createElement("i");
        detailBtn.classList.add("fas", "fa-info-circle");
        ancorDetail.appendChild(detailBtn);

        // add to the cart:
        cartBtn.addEventListener("click", () => {
            newBookCard.classList.toggle("added-to-cart");
            addToCart(element);
        });

        // Skip this card:
        skipBtn.addEventListener("click", () => {
            skipBtn.parentNode.parentNode.classList.add("d-none");
        });
    });
};



//& Search function:
let searchBtn = document.getElementById("search-btn");

function search(booksArray, callback) {
    const filteredBooks = [...booksArray];

    // eventListener on click:
    searchBtn.addEventListener("click", () => {
        let searchValue = document.getElementById("search-value").value;

        // filtrare l'array con il value della ricerca
        let searchResualt = filteredBooks.filter(element => {
            return element.title.includes(searchValue);
        })

        //delete all cards:
        document.querySelectorAll(".book").forEach(card => card.remove());

        //show filtered cards: 
        callback(searchResualt)
    });
};



//& add product to the cart:
function addToCart(element) {
    // aggiornare il numero dei prodotti nel carello
    cartItems ++;
    console.log(cartItems);

    // mostrare il prodotto aggiunto
    let cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add("card", "mb-3", "cart-item");
    cartItemContainer.id = "card-" + element.asin;
    cartItemContainer.style.maxWidth = "540px";
    cartItemContainer.innerHTML = `
        <div class="row g-0">
           <div class="col-md-4">
               <img src="${element.img}" class="img-fluid rounded-start" alt="...">
            </div>
           <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.price} €</p>
                </div>
                <button type="button"
                class="fw-bolder btn btn-dark delete-from-cart-btn">Delete</button>
            </div>
        </div>`

    cartContainer.appendChild(cartItemContainer);

    // attivare il tasto: cancella dal carello
    deleteItemCart();

    // numero items dentro il carello:
    document.getElementById("NumOfItemsCart").innerText = cartItems;
};



//& Empty your cart:
document.getElementById("empty-cart").addEventListener("click", () => {
    document.querySelectorAll(".cart-item").forEach(element => {
        element.remove();
    });
    // numero items dentro il carello:
    cartItems = 0;
    document.getElementById("NumOfItemsCart").innerText = cartItems;
});




//& Delete all elemento of cart
function deleteItemCart() {
    document.querySelectorAll(".delete-from-cart-btn").forEach((btn) => {
        btn.addEventListener("click", (event) => {

            // Seleziona l'indice del pulsante "Delete" cliccato
            let index = Array.from(document.querySelectorAll(".delete-from-cart-btn")).indexOf(event.target);

            // Rimuovi l'elemento corrispondente nell'elenco degli elementi del carrello
            document.querySelectorAll(".cart-item")[index].remove();

            // cancella lo stile:
            let cartId = event.target.parentNode.parentNode.parentNode.getAttribute("id").substring(5);
            document.getElementById(cartId).classList.toggle("added-to-cart");

            // aggiornare il numero dei prodotti nel carello
            cartItems = cartItems - 1;
            document.getElementById("NumOfItemsCart").innerText = cartItems;
        });
    });
};

