// ======================================================
//          LOTE CIRCULAR DE COCHES
// ======================================================

class Coche {
    constructor(tamano, color, modelo, anio) {
        this.tamano = tamano;
        this.color = color;
        this.modelo = modelo;
        this.anio = anio;
        this.next = null;
    }
}

class LoteCircular {
    constructor(capacidad) {
        this.back = null;
        this.size = 0;
        this.capacidad = capacidad;
        this.totalComprados = 0;
        this.totalVendidos = 0;
        this.contadores = {
            Grande: 0,
            Mediano: 0,
            Chico: 0
        };
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size >= this.capacidad;
    }

    comprar(coche) {
        if (this.isFull()) return false;

        if (this.isEmpty()) {
            coche.next = coche;
            this.back = coche;
        } else {
            coche.next = this.back.next;
            this.back.next = coche;
            this.back = coche;
        }

        this.size++;
        this.totalComprados++;
        this.contadores[coche.tamano]++;
        return true;
    }

    vender(color, modelo, anio) {
        if (this.isEmpty()) return null;

        let anterior = this.back;
        let actual = this.back.next;

        for (let i = 0; i < this.size; i++) {
            if (actual.color.toLowerCase() === color.toLowerCase() &&
                actual.modelo.toLowerCase() === modelo.toLowerCase() &&
                actual.anio === anio) {

                if (this.size === 1) {
                    this.back = null;
                } else {
                    anterior.next = actual.next;
                    if (actual === this.back) {
                        this.back = anterior;
                    }
                }

                this.size--;
                this.totalVendidos++;
                this.contadores[actual.tamano]--;
                return actual;
            }

            anterior = actual;
            actual = actual.next;
        }

        return null;
    }

    toArray() {
        const lista = [];
        if (this.isEmpty()) return lista;

        let actual = this.back.next;
        for (let i = 0; i < this.size; i++) {
            lista.push(actual);
            actual = actual.next;
        }

        return lista;
    }
}

const lote = new LoteCircular(100);

function actualizarResumen() {
    document.getElementById('totalComprados').textContent = lote.totalComprados;
    document.getElementById('totalVendidos').textContent = lote.totalVendidos;
    document.getElementById('inventario').textContent = lote.size;
    document.getElementById('contadorGrande').textContent = lote.contadores.Grande;
    document.getElementById('contadorMediano').textContent = lote.contadores.Mediano;
    document.getElementById('contadorChico').textContent = lote.contadores.Chico;
}

function actualizarLista() {
    const contenedor = document.getElementById('contenedorCoches');
    contenedor.innerHTML = '';

    const coches = lote.toArray();
    if (coches.length === 0) {
        contenedor.innerHTML = '<p style="color: #666; font-style: italic;">No hay coches en el lote.</p>';
        return;
    }

    coches.forEach((coche, index) => {
        const div = document.createElement('div');
        div.className = 'itemCoche';
        div.innerHTML = `#${index + 1} <strong>${coche.tamano}</strong> - ${coche.color} / ${coche.modelo} / ${coche.anio}`;
        contenedor.appendChild(div);
    });
}

function mostrarMensaje(texto, color) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.style.color = color;
}

function leerCampos() {
    const tamano = document.getElementById('tamano').value;
    const color = document.getElementById('color').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const anio = parseInt(document.getElementById('anio').value, 10);
    return { tamano, color, modelo, anio };
}

function validarCampos({ color, modelo, anio }) {
    if (!color || !modelo || isNaN(anio)) return false;
    return anio >= 1900 && anio <= 2100;
}

// ======================================================
//          EVENTOS
// ======================================================

document.getElementById('btnComprar').addEventListener('click', () => {
    const datos = leerCampos();
    if (!validarCampos(datos)) {
        mostrarMensaje('Por favor, completa color, modelo y año válido.', 'red');
        return;
    }

    const coche = new Coche(datos.tamano, datos.color, datos.modelo, datos.anio);
    if (!lote.comprar(coche)) {
        mostrarMensaje('El lote está lleno. No se pueden comprar más coches.', 'red');
        return;
    }

    document.getElementById('color').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('anio').value = '';
    mostrarMensaje(`Coche comprado: ${datos.color} ${datos.modelo} ${datos.anio}`, 'green');
    actualizarResumen();
    actualizarLista();
});

document.getElementById('btnVender').addEventListener('click', () => {
    const datos = leerCampos();
    if (!validarCampos(datos)) {
        mostrarMensaje('Por favor, completa color, modelo y año válido para vender.', 'red');
        return;
    }

    const cocheVendido = lote.vender(datos.color, datos.modelo, datos.anio);
    if (!cocheVendido) {
        mostrarMensaje('No se encontró ningún coche que coincida con esos datos.', 'red');
        return;
    }

    mostrarMensaje(`Coche vendido: ${cocheVendido.color} ${cocheVendido.modelo} ${cocheVendido.anio}`, 'orange');
    actualizarResumen();
    actualizarLista();
});

document.getElementById('btnLimpiar').addEventListener('click', () => {
    while (!lote.isEmpty()) {
        lote.vender(lote.back.next.color, lote.back.next.modelo, lote.back.next.anio);
    }
    mostrarMensaje('Lote limpiado.', 'blue');
    actualizarResumen();
    actualizarLista();
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

actualizarResumen();
actualizarLista();