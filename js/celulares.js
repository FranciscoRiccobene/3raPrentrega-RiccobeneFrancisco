function dibujarCelulares(productosElegidos) {
    contenedorCelulares.innerHTML = `
        <section class="wrapper filters">
            <div class="filters-fix">
                <h2>
                    <strong>Teléfonos</strong>
                </h2>
                <span><b><strong>Marcas</strong></b></span>
                <ul>
                    <li>
                        <button id="todos" class="boton-filtro"> Todos (9) </button>
                    </li>
                    <li>
                        <button id="motorola" class="boton-filtro"> Motorola (3) </button>
                    </li>
                    <li>
                        <button id="samsung" class="boton-filtro"> Samsung (3) </button>
                    </li>
                    <li>
                        <button id="apple" class="boton-filtro"> Apple (3) </button>
                    </li>
                </ul>
            </div>
        </section>
    `;
    productosElegidos.forEach(producto => {
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
    botonesFiltro = document.querySelectorAll('.boton-filtro');
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if (e.target.id != 'todos') {
                let productosCelulares = productos.filter((el) => el.categoria.includes('celulares'));
                let productosBoton = productosCelulares.filter((el) => el.marca === e.target.id);
                dibujarCelulares(productosBoton);  
            }else {
                productosCelulares = productos.filter((el) => el.categoria.includes('celulares'));
                dibujarCelulares(productosCelulares);
            }   
        })
    })
}

async function cargarCelulares() {
    const response = await traerProductos();
    if(response.ok) {
        productos = await response.json();
        let productosCelulares = productos.filter((el) => el.categoria.includes('celulares'));
        dibujarCelulares(productosCelulares);     
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

cargarCelulares();