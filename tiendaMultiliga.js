// ======================================================
//          TIENDA MULTILIGA
// ======================================================

class Producto {
    constructor(codigo, nombre, precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class ItemCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.next = null;
    }
}

class Carrito {
    constructor() {
        this.head = null;
        this.total = 0;
    }

    agregar(producto, cantidad) {
        const nuevoItem = new ItemCarrito(producto, cantidad);
        nuevoItem.next = this.head;
        this.head = nuevoItem;
        this.total += producto.precio * cantidad;
    }

    vaciar() {
        this.head = null;
        this.total = 0;
    }

    toArray() {
        const items = [];
        let current = this.head;
        while (current) {
            items.push(current);
            current = current.next;
        }
        return items;
    }
}

// Base de datos de productos (estructura multiliga simulada)
const productos = {
    lacteos: {
        leche: [
            new Producto("1101", "Leche LALA 1L", 25.50),
            new Producto("1102", "Leche Alpura 1L", 24.00),
            new Producto("1103", "Leche Santa Clara 1L", 23.50)
        ],
        queso: [
            new Producto("1201", "Queso Oaxaca 500g", 85.00),
            new Producto("1202", "Queso Panela 500g", 75.00),
            new Producto("1203", "Queso Manchego 500g", 95.00)
        ],
        yogurt: [
            new Producto("1301", "Yogurt Danone 1kg", 45.00),
            new Producto("1302", "Yogurt Yoplait 1kg", 42.00),
            new Producto("1303", "Yogurt Activia 1kg", 48.00)
        ]
    },
    vinosLicores: {
        vino: [
            new Producto("2101", "Vino Tinto 750ml", 120.00),
            new Producto("2102", "Vino Blanco 750ml", 115.00),
            new Producto("2103", "Vino Rosado 750ml", 125.00)
        ],
        cerveza: [
            new Producto("2201", "Cerveza Corona 12 pack", 180.00),
            new Producto("2202", "Cerveza Modelo 12 pack", 175.00),
            new Producto("2203", "Cerveza Tecate 12 pack", 160.00)
        ],
        licor: [
            new Producto("2301", "Tequila José Cuervo 750ml", 350.00),
            new Producto("2302", "Whisky Jack Daniel's 750ml", 450.00),
            new Producto("2303", "Ron Bacardi 750ml", 280.00)
        ]
    },
    miscelaneos: {
        pan: [
            new Producto("3101", "Pan Bimbo 500g", 35.00),
            new Producto("3102", "Pan Wonder 500g", 32.00),
            new Producto("3103", "Pan Tía Rosa 500g", 38.00)
        ],
        dulces: [
            new Producto("3201", "Chocolate Hershey 100g", 15.00),
            new Producto("3202", "Galletas Oreo 150g", 18.00),
            new Producto("3203", "Caramelos Halls 50g", 12.00)
        ],
        snacks: [
            new Producto("3301", "Papas Sabritas 200g", 22.00),
            new Producto("3302", "Cheetos 200g", 20.00),
            new Producto("3303", "Doritos 200g", 24.00)
        ]
    }
};

const carrito = new Carrito();

function cargarProductos() {
    const contenedor = document.getElementById('productos');

    for (const [categoria, subtipos] of Object.entries(productos)) {
        const divCategoria = document.createElement('div');
        divCategoria.className = 'categoria';

        const tituloCategoria = categoria === 'lacteos' ? 'Lácteos' :
                              categoria === 'vinosLicores' ? 'Vinos y Licores' : 'Misceláneos';
        divCategoria.innerHTML = `<h3>${tituloCategoria}</h3>`;

        for (const [subtipo, listaProductos] of Object.entries(subtipos)) {
            listaProductos.forEach(producto => {
                const divProducto = document.createElement('div');
                divProducto.className = 'producto';
                divProducto.textContent = `${producto.codigo} - ${producto.nombre} - $${producto.precio.toFixed(2)} MXN`;
                divCategoria.appendChild(divProducto);
            });
        }

        contenedor.appendChild(divCategoria);
    }
}

function actualizarCarrito() {
    const lista = document.getElementById('listaCarrito');
    lista.innerHTML = '';

    const items = carrito.toArray();
    if (items.length === 0) {
        lista.innerHTML = '<p style="color: #666; font-style: italic; text-align: center;">El carrito está vacío.</p>';
    } else {
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'itemCarrito';
            div.innerHTML = `
                <span>${item.producto.nombre} (x${item.cantidad})</span>
                <span>$${(item.producto.precio * item.cantidad).toFixed(2)} MXN</span>
            `;
            lista.appendChild(div);
        });
    }

    document.getElementById('total').textContent = `Total: $${carrito.total.toFixed(2)} MXN`;
}

function buscarProducto(codigo) {
    for (const categoria of Object.values(productos)) {
        for (const subtipo of Object.values(categoria)) {
            for (const producto of subtipo) {
                if (producto.codigo === codigo) {
                    return producto;
                }
            }
        }
    }
    return null;
}

function mostrarMensaje(texto, color) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.style.color = color;
}

// ======================================================
//          EVENTOS
// ======================================================

document.getElementById('btnAgregar').addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value.trim();
    const cantidad = parseInt(document.getElementById('cantidad').value, 10);

    if (!codigo || codigo.length !== 4 || isNaN(cantidad) || cantidad < 1) {
        mostrarMensaje('Ingresa un código válido de 4 dígitos y cantidad mayor a 0.', 'red');
        return;
    }

    const producto = buscarProducto(codigo);
    if (!producto) {
        mostrarMensaje('Producto no encontrado. Verifica el código.', 'red');
        return;
    }

    carrito.agregar(producto, cantidad);
    document.getElementById('codigo').value = '';
    document.getElementById('cantidad').value = '1';
    mostrarMensaje(`Agregado: ${producto.nombre} x${cantidad}`, 'green');
    actualizarCarrito();
});

document.getElementById('btnNuevaCompra').addEventListener('click', () => {
    carrito.vaciar();
    mostrarMensaje('Nueva compra iniciada.', 'blue');
    actualizarCarrito();
});

document.getElementById('cerrar').addEventListener('click', () => {
    window.close();
});

function actualizarFechaHora() {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString();
    const fecha = ahora.toLocaleDateString('es-ES');
    document.getElementById('fechaHora').textContent = `${fecha} | ${hora}`;
}

setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();

cargarProductos();
actualizarCarrito();