/*
function cargarCelulares() {
    productosCelulares.forEach(producto => {
        const divC = document.createElement('div');
        divC.classList.add('card');
        divC.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top img-fix" alt="${producto.alt}">
            <div class="card-body bg-card">
                <h3 class="card-title fw-semibold">$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <button class="btn btn-cart" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorCelulares.append(divC);
    })
    actualizarBotones();
}

cargarCelulares();

*/