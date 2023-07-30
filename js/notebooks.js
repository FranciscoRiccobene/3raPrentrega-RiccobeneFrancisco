function dibujarNotebooks(productosElegidos) {
    contenedorNotebooks.innerHTML = `
        <section class="wrapper filters">
            <div class="filters-fix">
                <h2>
                    <strong>Notebooks</strong>
                </h2>
                <span><b><strong>Marcas</strong></b></span>
                <ul>
                    <li>
                        <button id="todos" class="boton-filtro"> Todos (9) </button>
                    </li>
                    <li>
                        <button id="hp" class="boton-filtro"> HP (1) </button>
                    </li>
                    <li>
                        <button id="dell" class="boton-filtro"> Dell (1) </button>
                    </li>
                    <li>
                        <button id="lenovo" class="boton-filtro"> Lenovo (1) </button>
                    </li>
                    <li>
                        <button id="asus" class="boton-filtro"> Asus (2) </button>
                    </li>
                    <li>
                        <button id="gigabyte" class="boton-filtro"> Gigabyte (2) </button>
                    </li>
                    <li>
                        <button id="apple" class="boton-filtro"> Apple (2) </button>
                    </li>
                    <span><b><strong>Procesador</strong></b></span>
                    <li>
                        <button id="intel" class="boton-filtro boton-filtro-procesador"> Intel (5) </button>
                    </li>
                    <li>
                        <button id="amd" class="boton-filtro boton-filtro-procesador"> AMD (2) </button>
                    </li>
                </ul>
            </div>
        </section>
    `;
    productosElegidos.forEach(producto => {
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
    botonesFiltro = document.querySelectorAll('.boton-filtro');
    botonFiltroProcesador = document.querySelectorAll('.boton-filtro-procesador');
    botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                if (e.target.id != 'todos') {
                    let productosNotebooks = productos.filter((el) => el.categoria.includes('notebooks'));
                    let productosBoton = productosNotebooks.filter((el) => el.marca === e.target.id);
                    dibujarNotebooks(productosBoton);  
                }else {
                    productosNotebooks = productos.filter((el) => el.categoria.includes('notebooks'));
                    dibujarNotebooks(productosNotebooks);
                }   
            })
    })
    botonFiltroProcesador.forEach(boton => {
        boton.addEventListener('click', (e) => {
            let productosNotebooks = productos.filter((el) => el.categoria.includes('notebooks'));
            let productosBoton = productosNotebooks.filter((el) => el.procesador === e.target.id);
            dibujarNotebooks(productosBoton);
        })
    })
}

async function cargarNotebooks() {
    const response = await traerProductos();
    if(response.ok) {
        productos = await response.json();
        let productosNotebooks = productos.filter((el) => el.categoria.includes('notebooks'));
        dibujarNotebooks(productosNotebooks);    
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

cargarNotebooks();
