function dibujarPcs(productosElegidos) {
    contenedorPcs.innerHTML = `
        <section class="wrapper filters">
            <div class="filters-fix">
                <h2>
                    <strong>PCs Armadas</strong>
                </h2>
                <span><b><strong>Procesador</strong></b></span>
                <ul>
                    <li>
                        <button id="todos" class="boton-filtro"> Todos (9) </button>
                    </li>
                    <li>
                        <button id="intel" class="boton-filtro"> Intel (5) </button>
                    </li>
                    <li>
                        <button id="amd" class="boton-filtro"> Amd (4) </button>
                    </li>
                </ul>
            </div>
        </section>
    `;
    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
            <div class="card-body bg-card">
                <h3 class="card-title fw-semibold">$${producto.precio}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <button class="btn btn-cart" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorPcs.append(div);
    })
    actualizarBotones();
    botonesFiltro = document.querySelectorAll('.boton-filtro');
    botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                if (e.target.id != 'todos') {
                    let productosPcs = productos.filter((el) => el.categoria.includes('pcs'));
                    let productosBoton = productosPcs.filter((el) => el.procesador === e.target.id);
                    dibujarPcs(productosBoton);  
                }else {
                    productosPcs = productos.filter((el) => el.categoria.includes('pcs'));
                    dibujarPcs(productosPcs);
                }   
            })
    })
}
    
async function cargarPcs() {
    const response = await traerProductos();
    if(response.ok) {
        productos = await response.json();
        let productosPcs = productos.filter((el) => el.categoria.includes('pcs'));
        dibujarPcs(productosPcs);  
    }else {
        Toastify({
            text: "¡Lo sentimos, hubo un problema en el servidor!",
            duration: 4000,
            destination: "../error404.html",
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #ff0000, #ff3232)",
              borderRadius: "1rem"
            },
            onClick: function(){}
          }).showToast();
    }
}

cargarPcs();



    
    
