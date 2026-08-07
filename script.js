let bundleData = {
    name: "Original Bundle",
    price: 14000,
    image: "bundling-original.jpg"
};

let bundleQty = 1;

function changeQty(change){

    bundleQty += change;

    if(bundleQty < 1) bundleQty = 1;

    document.getElementById("bundleQty").textContent = bundleQty;

}

function changeBundle(type){

    const image = document.getElementById("bundleImage");
    const title = document.getElementById("bundleTitle");
    const price = document.getElementById("bundlePrice");

    document.querySelectorAll(".tab-btn").forEach(tab=>{
        tab.classList.remove("active");
    });

    if(type==="original"){

        bundleData={
            name:"Original Bundle",
            price:14000,
            image:"bundling-original.jpg"
        };

        title.innerHTML="🍪 Original Bundle";
        price.innerHTML="Rp14.000";
        image.src=bundleData.image;

        document.querySelectorAll(".tab-btn")[0].classList.add("active");

    }

    if(type==="coklat"){

        bundleData={
            name:"Chocolate Bundle",
            price:18000,
            image:"bundling-coklat.jpg"
        };

        title.innerHTML="🍫 Chocolate Bundle";
        price.innerHTML="Rp18.000";
        image.src=bundleData.image;

        document.querySelectorAll(".tab-btn")[1].classList.add("active");

    }

    if(type==="combo"){

        bundleData={
            name:"Combo Bundle (Original + Chocolate)",
            price:15000,
            image:"bundling-combo.jpg"
        };

        title.innerHTML="🍪 Combo Bundle";
        price.innerHTML="Rp15.000";
        image.src=bundleData.image;

        document.querySelectorAll(".tab-btn")[2].classList.add("active");

    }

    bundleQty=1;

    document.getElementById("bundleQty").textContent=bundleQty;

}

function showToast(text){

    const toast=document.getElementById("toast");

    if(!toast) return;

    toast.innerHTML=text;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

function updateCartButton(){

    const btn=document.getElementById("cartButton");

    if(!btn) return;

    let cart=JSON.parse(localStorage.getItem("cart")) || [];

    let total=0;

    cart.forEach(item=>{

        total += item.qty;

    });

    btn.innerHTML=`🛒 Keranjang (${total})`;

}

function addToCart(name,price,image,button=null,qty=1){

    let cart=JSON.parse(localStorage.getItem("cart")) || [];

    const existing=cart.find(item=>item.name===name);

    if(existing){

        existing.qty += qty;

    }else{

        cart.push({

            name:name,
            price:price,
            image:image,
            qty:qty

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartButton();

    showToast("🛒 "+name+" berhasil ditambahkan!");

    if(button){

        button.disabled=true;

        button.innerHTML="✅ Ditambahkan";

        setTimeout(()=>{

            button.disabled=false;

            button.innerHTML="🛒 Tambah";

        },1200);

    }

}

function addBundleToCart(button){

    addToCart(

        bundleData.name,
        bundleData.price,
        bundleData.image,
        button,
        bundleQty

    );

}

function buyNow(name,price,image,qty=1){

    const cart=[{

        name:name,
        price:price,
        image:image,
        qty:qty

    }];

    localStorage.setItem("cart",JSON.stringify(cart));

    window.location.href="checkout.html";

}

function buyBundleNow(){

    buyNow(

        bundleData.name,
        bundleData.price,
        bundleData.image,
        bundleQty

    );

}

window.onload=function(){

    updateCartButton();

};