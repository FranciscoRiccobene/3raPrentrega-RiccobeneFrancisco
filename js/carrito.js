let productosEnCarrito = localStorage.getItem("productos-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);  

const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const productosDelCarrito = document.querySelector('#contenedor-carrito');
const carritoAcciones = document.querySelector('#carrito-acciones');
const carritoComprado = document.querySelector('#carrito-comprado');
const botonVaciarCarrito = document.querySelector('#boton-vaciar-carrito');
const botonComprar = document.querySelector('#boton-comprar');
let botonesEliminar = document.querySelectorAll('.carrito-boton');
let totalCarrito = document.querySelector('#total');

function cargarProductosCarrito() {
    if(productosEnCarrito && productosEnCarrito.length > 0) {
    
    contenedorCarritoVacio.classList.add('disabled');
    productosDelCarrito.classList.remove('disabled');
    carritoAcciones.classList.remove('disabled');
    carritoComprado.classList.add('disabled');

    productosDelCarrito.innerHTML = '';

    productosCarrito.forEach(producto => {

        const div = document.createElement('div');
        div.classList.add('carrito-productos');
        div.innerHTML = `
            <div class="carrito-descripcion">
                <h3>Producto</h3>
                <img class="carrito-imagen" src="${producto.imagen}" alt="${producto.alt}">
            </div>
            <p class="align-self-end p-fix">${producto.alt}</p>
            <div class="carrito-precio">
                <h3>Precio</h3>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-cantidad">
                <h3>Cantidad</h3>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-subtotal">
                <h3>Subtotal</h3>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button id="${producto.id}" class="carrito-boton">
                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                </svg>
            </button>
            </div>
        `;

        productosDelCarrito.append(div);
    })
    } else {
        contenedorCarritoVacio.classList.remove('disabled');
        productosDelCarrito.classList.add('disabled');
        carritoAcciones.classList.add('disabled');
        carritoComprado.classList.add('disabled');
    }
    actualizarBotonesEliminar();
    totalEnCarrito();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.carrito-boton');

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click',eliminarProductosCarrito); 
    });
}

function eliminarProductosCarrito(e) {
    let idBtn = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBtn);
    productosCarrito.splice(index,1);
    cargarProductosCarrito();
    numeritoActualizado();
    localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito));
}

botonVaciarCarrito.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Se eliminarán ${productosCarrito.reduce((acc, el) => acc + el.cantidad, 0)} productos.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#024772',
        cancelButtonColor: '#808080',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if(result.isConfirmed) {
            productosCarrito = [];
            localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito));
            cargarProductosCarrito();
            numeritoActualizado();
            contenedorCarritoVacio.classList.remove('disabled');
            productosDelCarrito.classList.add('disabled');
            carritoAcciones.classList.add('disabled');
            carritoComprado.classList.add('disabled');
        }
    }) 
}

function totalEnCarrito() {
    totalCarrito.innerText = '$ ' + productosCarrito.reduce((acc,total) => acc + (total.precio * total.cantidad), 0);
}

botonComprar.addEventListener('click', comprarCarrito);

function comprarCarrito() {
    productosCarrito = [];
    localStorage.setItem('productos-carrito', JSON.stringify(productosCarrito));
    contenedorCarritoVacio.classList.add('disabled');
    productosDelCarrito.classList.add('disabled');
    carritoAcciones.classList.add('disabled');
    carritoComprado.classList.remove('disabled');
    numeritoActualizado();
}