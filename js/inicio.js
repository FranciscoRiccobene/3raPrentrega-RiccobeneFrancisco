const productosDestacados = [pcEscritorio5,pcEscritorio7,notebook8,notebook6];
const nuevosIngresos = [celular7,celular4,notebook9,pcEscritorio6];

function cargarProductosPagInicio() {
    pcEscritorio5.imagen = "./img/productos/pcs-escritorio/pc-escritorio05.jpg";
    pcEscritorio7.imagen = "./img/productos/pcs-escritorio/pc-escritorio07.jpg";
    notebook8.imagen = "./img/productos/notebooks/notebook08.jpg";
    notebook6.imagen = "./img/productos/notebooks/notebook06.jpg";
    celular7.imagen = "./img/productos/celulares/celular07.webp";
    celular4.imagen = "./img/productos/celulares/celular04.jpg";
    notebook9.imagen = "./img/productos/notebooks/notebook09.jpg";
    pcEscritorio6.imagen = "./img/productos/pcs-escritorio/pc-escritorio06.jpg";

    productosDestacados.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card', 'card-index');
        div.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
            <div class="card-body bg-card">
                <h3 class="card-title fw-semibold">$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <button class="btn btn-cart" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorProdDestacados.append(div);
    })
    nuevosIngresos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card', 'card-index');
        div.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
            <div class="card-body bg-card">
                <h3 class="card-title fw-semibold">$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <button class="btn btn-cart" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorNuevosIngresos.append(div);
    })
    actualizarBotones();
}

cargarProductosPagInicio();

function numeritoActualizado() {
    let numerito = productosCarrito.reduce((acc, numerito) => acc + numerito.cantidad, 0);
    numeroCarrito.innerText = numerito;
}