async function cargarProductosPagInicio() {
    const response = await traerProductos();
    if(response.ok) {
        productos = await response.json();
        let productosDestacados = productos.filter((el) => el.seccion === 'productos-destacados');
        let nuevosIngresos = productos.filter((el) => el.seccion === 'nuevos-ingresos');

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
    }else {
        console.log('Hubo un error en el servidor...');
    }
}

cargarProductosPagInicio();