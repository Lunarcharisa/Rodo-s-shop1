function formatRupiah(angka){
    return "Rp" + angka.toLocaleString("id-ID");
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalHarga = document.getElementById("totalHarga");

function simpanCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function tampilkanKeranjang(){

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
            <h3 style="text-align:center;padding:30px;">
                🛒 Keranjang masih kosong
            </h3>
        `;

        totalHarga.innerHTML = "Rp0";
        return;
    }

    cart.forEach((item,index)=>{

        const subtotal = item.price * item.qty;
        total += subtotal;

        cartItems.innerHTML += `

        <div class="item">

            <img src="${item.image}" class="cart-img">

            <div class="item-action">

                <button onclick="tambah(${index})">+</button>

                <span>${item.qty}</span>

                <button onclick="kurang(${index})">−</button>

                <button class="hapus-btn"
                        onclick="hapusItem(${index})">
                    🗑️
                </button>

            </div>

            <div class="item-info">

                <h3>${item.name}</h3>

                <p>${formatRupiah(item.price)}</p>

                <small>
                    Subtotal :
                    <b>${formatRupiah(subtotal)}</b>
                </small>

            </div>

        </div>

        `;

    });

    totalHarga.innerHTML = formatRupiah(total);

}

function tambah(index){

    cart[index].qty++;

    simpanCart();

    tampilkanKeranjang();

}

function kurang(index){

    cart[index].qty--;

    if(cart[index].qty <= 0){

        cart.splice(index,1);

    }

    simpanCart();

    tampilkanKeranjang();

}

function hapusItem(index){

    if(confirm("Hapus produk ini?")){

        cart.splice(index,1);

        simpanCart();

        tampilkanKeranjang();

    }

}

function hapusSemua(){

    if(confirm("Kosongkan seluruh keranjang?")){

        cart = [];

        localStorage.removeItem("cart");

        tampilkanKeranjang();

    }

}

function checkout(){

    if(cart.length===0){

        alert("Keranjang masih kosong!");

        return;

    }

    window.location.href="checkout.html";

}

tampilkanKeranjang();