let productos = [];

async function traerProductos() {
    return await fetch('../js/productos.json');
}

const contenedorPcs = document.querySelector('#contenedor-pcs');
const contenedorNotebooks = document.querySelector('#contenedor-notebooks');
const contenedorCelulares = document.querySelector('#contenedor-celulares');
const contenedorProdDestacados = document.querySelector('#productos-destacados');
const contenedorNuevosIngresos = document.querySelector('#nuevos-ingresos');
let botonesFiltro = document.querySelectorAll('.boton-filtro');
let botonFiltroProcesador = document.querySelectorAll('.boton-filtro-procesador');
let botonesAgregar = document.querySelectorAll('.btn-cart');
const numeroCarrito = document.querySelector('#numerito');

///Carrito de compras 

let productosCarrito;
let productosCarritosLS = localStorage.getItem("productos-carrito");

if (productosCarritosLS) {
    productosCarrito = JSON.parse(productosCarritosLS);
    numeritoActualizado();
} else {
    productosCarrito = [];
}

function actualizarBotones() {
    botonesAgregar = document.querySelectorAll('.btn-cart');

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click",agregarCarrito);
    })
}

function agregarCarrito(e) {
    Toastify({
        text: "Producto agregado",
        duration: 1000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #023859, #0081d2)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem",
          width: "11%",
          textAlign: "center",
        },
        offset: {
            x: ".8rem",
            y: ".8rem"
        },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find((el) => el.id === idBoton);

    if(productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }
    numeritoActualizado();
    localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito));
}

function numeritoActualizado() {
    const numerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = numerito;
}