// ======================================================
//          COLA DE DOBLE ENTRADA
// ======================================================

let cola = [];
const MAX_COLA = 20;

// ======================================================
//          ACTUALIZAR DISPLAY
// ======================================================

function actualizarDisplay() {
    const contenedorCola = document.getElementById('cola');
    contenedorCola.innerHTML = '';

    if (cola.length === 0) {
        contenedorCola.innerHTML = '<p style="color: #666; font-style: italic;">La cola está vacía</p>';
        return;
    }

    cola.forEach((elemento, index) => {
        const div = document.createElement('div');
        div.className = 'elemento';
        div.textContent = elemento;
        contenedorCola.appendChild(div);
    });
}

// ======================================================
//          AGREGAR AL FRENTE
// ======================================================

document.getElementById('agregarFrente').addEventListener('click', () => {
    const dato = document.getElementById('dato').value.trim();
    const mensaje = document.getElementById('mensaje');

    if (dato === '') {
        mensaje.textContent = 'Por favor, ingresa un dato.';
        mensaje.style.color = 'red';
        return;
    }

    if (cola.length >= MAX_COLA) {
        mensaje.textContent = 'Cola llena. No se puede agregar más elementos.';
        mensaje.style.color = 'red';
        return;
    }

    cola.unshift(dato);
    document.getElementById('dato').value = '';
    mensaje.textContent = `Dato "${dato}" agregado al frente exitosamente.`;
    mensaje.style.color = 'green';
    actualizarDisplay();
});

// ======================================================
//          AGREGAR AL FINAL
// ======================================================

document.getElementById('agregarFinal').addEventListener('click', () => {
    const dato = document.getElementById('dato').value.trim();
    const mensaje = document.getElementById('mensaje');

    if (dato === '') {
        mensaje.textContent = 'Por favor, ingresa un dato.';
        mensaje.style.color = 'red';
        return;
    }

    if (cola.length >= MAX_COLA) {
        mensaje.textContent = 'Cola llena. No se puede agregar más elementos.';
        mensaje.style.color = 'red';
        return;
    }

    cola.push(dato);
    document.getElementById('dato').value = '';
    mensaje.textContent = `Dato "${dato}" agregado al final exitosamente.`;
    mensaje.style.color = 'green';
    actualizarDisplay();
});

// ======================================================
//          ELIMINAR DEL FRENTE
// ======================================================

document.getElementById('btnEliminarFrente').addEventListener('click', () => {
    const mensaje = document.getElementById('mensaje');

    if (cola.length === 0) {
        mensaje.textContent = 'La cola está vacía. No hay elementos para eliminar.';
        mensaje.style.color = 'red';
        return;
    }

    const datoEliminado = cola.shift();
    mensaje.textContent = `Dato "${datoEliminado}" eliminado del frente exitosamente.`;
    mensaje.style.color = 'orange';
    actualizarDisplay();
});

// ======================================================
//          ELIMINAR DEL FINAL
// ======================================================

document.getElementById('btnEliminarFinal').addEventListener('click', () => {
    const mensaje = document.getElementById('mensaje');

    if (cola.length === 0) {
        mensaje.textContent = 'La cola está vacía. No hay elementos para eliminar.';
        mensaje.style.color = 'red';
        return;
    }

    const datoEliminado = cola.pop();
    mensaje.textContent = `Dato "${datoEliminado}" eliminado del final exitosamente.`;
    mensaje.style.color = 'orange';
    actualizarDisplay();
});

// ======================================================
//          LIMPIAR COLA
// ======================================================

document.getElementById('btnLimpiar').addEventListener('click', () => {
    cola = [];
    document.getElementById('dato').value = '';
    document.getElementById('mensaje').textContent = 'Cola limpiada.';
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