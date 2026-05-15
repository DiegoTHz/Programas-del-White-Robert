// ======================================================
//          MEMORIA DINÁMICA
// ======================================================

let pila1 = [];
let pila2 = [];
let pila3 = [];

const MAX_PILA = 10;

// ======================================================
//          ACTUALIZAR DISPLAY
// ======================================================

function actualizarDisplay() {
    // Actualizar contadores
    document.querySelector('.pilas .pila:nth-child(1) h3').textContent = `Pila 1 (${pila1.length}/10)`;
    document.querySelector('.pilas .pila:nth-child(2) h3').textContent = `Pila 2 (${pila2.length}/10)`;
    document.querySelector('.pilas .pila:nth-child(3) h3').textContent = `Pila 3 (${pila3.length}/10)`;

    // Limpiar y mostrar pila1
    const contenedorPila1 = document.getElementById('pila1');
    contenedorPila1.innerHTML = '';
    pila1.forEach((elemento, index) => {
        const div = document.createElement('div');
        div.className = 'elemento';
        div.textContent = elemento;
        contenedorPila1.appendChild(div);
    });

    // Limpiar y mostrar pila2
    const contenedorPila2 = document.getElementById('pila2');
    contenedorPila2.innerHTML = '';
    pila2.forEach((elemento, index) => {
        const div = document.createElement('div');
        div.className = 'elemento';
        div.textContent = elemento;
        contenedorPila2.appendChild(div);
    });

    // Limpiar y mostrar pila3
    const contenedorPila3 = document.getElementById('pila3');
    contenedorPila3.innerHTML = '';
    pila3.forEach((elemento, index) => {
        const div = document.createElement('div');
        div.className = 'elemento';
        div.textContent = elemento;
        contenedorPila3.appendChild(div);
    });
}

// ======================================================
//          AGREGAR DATO
// ======================================================

document.getElementById('agregar').addEventListener('click', () => {
    const dato = document.getElementById('dato').value.trim();
    const mensaje = document.getElementById('mensaje');

    if (dato === '') {
        mensaje.textContent = 'Por favor, ingresa un dato.';
        mensaje.style.color = 'red';
        return;
    }

    // Verificar si hay espacio
    if (pila1.length < MAX_PILA) {
        pila1.push(dato);
    } else if (pila2.length < MAX_PILA) {
        pila2.push(dato);
    } else if (pila3.length < MAX_PILA) {
        pila3.push(dato);
    } else {
        mensaje.textContent = 'Memoria llena. No se puede agregar más datos.';
        mensaje.style.color = 'red';
        return;
    }

    document.getElementById('dato').value = '';
    mensaje.textContent = `Dato "${dato}" agregado exitosamente.`;
    mensaje.style.color = 'green';
    actualizarDisplay();
});

// ======================================================
//          ELIMINAR DATO
// ======================================================

document.getElementById('btnEliminar').addEventListener('click', () => {
    const mensaje = document.getElementById('mensaje');

    let datoEliminado = null;

    // Eliminar del último stack que tenga elementos
    if (pila3.length > 0) {
        datoEliminado = pila3.pop();
    } else if (pila2.length > 0) {
        datoEliminado = pila2.pop();
    } else if (pila1.length > 0) {
        datoEliminado = pila1.pop();
    } else {
        mensaje.textContent = 'No hay datos para eliminar.';
        mensaje.style.color = 'red';
        return;
    }

    mensaje.textContent = `Dato "${datoEliminado}" eliminado exitosamente.`;
    mensaje.style.color = 'orange';
    actualizarDisplay();
});

// ======================================================
//          LIMPIAR TODO
// ======================================================

document.getElementById('btnLimpiar').addEventListener('click', () => {
    pila1 = [];
    pila2 = [];
    pila3 = [];
    document.getElementById('dato').value = '';
    document.getElementById('mensaje').textContent = 'Memoria limpiada.';
    document.getElementById('mensaje').style.color = 'blue';
    actualizarDisplay();
});

// ======================================================
//          BOTÓN ADIÓS
// ======================================================

document.getElementById("cerrar").addEventListener("click", () => {
    window.close();
});

// ======================================================
//          FECHA Y HORA
// ======================================================

function actualizarFechaHora() {
    let ahora = new Date();
    let hora = ahora.toLocaleTimeString();
    let fecha = ahora.toLocaleDateString("es-ES");
    document.getElementById("fechaHora").textContent = fecha + " | " + hora;
}

setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();

// Inicializar display
actualizarDisplay();