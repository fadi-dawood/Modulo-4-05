const params = new URLSearchParams(location.search);
const id = params.get("id");
console.log(id);

let generalContainer = document.getElementById("detail-sec")

fetch("https://striveschool-api.herokuapp.com/books/"+id)
    .then(response => response.json())
    .then(json => creatDetailPage(json))
    .catch(err => console.log(err))

function creatDetailPage(bookDetail) {
    let bookBox = document.createElement("div");
    bookBox.classList.add("card", "mb-3", "cart-item", "p-3", "m-5", "border-0");
    bookBox.innerHTML =
        `<div class="row g-0">
    <div class="col-md-4">
        <img src="${bookDetail.img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body d-flex flex-column justify-content-between align-items-start">
            <h5 class="card-title my-2">Title: ${bookDetail.title}</h5>
            <p class="card-text my-2">Book description:
            </p>
            <p class="card-text my-2">Price: ${bookDetail.price}
            </p>
        </div>
    </div>
</div>`
generalContainer.appendChild(bookBox);
}