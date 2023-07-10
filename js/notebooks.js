/*
function cargarNotebooks() {
    productosNotebooks.forEach(producto => {
        const divN = document.createElement('div');
        divN.classList.add('card');
        divN.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
            <div class="card-body bg-card">
                <h3 class="card-title fw-semibold">$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <button class="btn btn-cart" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorNotebooks.append(divN);
    })
    actualizarBotones();
}

cargarNotebooks();
*/