// ======================================================
//          COLA LIGADA DE DOBLE ENTRADA
// ======================================================

class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.prev = null;
        this.next = null;
    }
}

class DequeLigada {
    constructor() {
        this.front = null;
        this.back = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    agregarFrente(dato) {
        const nuevoNodo = new Nodo(dato);
        if (this.isEmpty()) {
            this.front = this.back = nuevoNodo;
        } else {
            nuevoNodo.next = this.front;
            this.front.prev = nuevoNodo;
            this.front = nuevoNodo;
        }
        this.size++;
    }

    agregarFinal(dato) {
        const nuevoNodo = new Nodo(dato);
        if (this.isEmpty()) {
            this.front = this.back = nuevoNodo;
        } else {
            nuevoNodo.prev = this.back;
            this.back.next = nuevoNodo;
            this.back = nuevoNodo;
        }
        this.size++;
    }

    eliminarFrente() {
        if (this.isEmpty()) return null;
        const dato = this.front.dato;
        if (this.size === 1) {
            this.front = this.back = null;
        } else {
            this.front = this.front.next;
            this.front.prev = null;
        }
        this.size--;
        return dato;
    }

    eliminarFinal() {
        if (this.isEmpty()) return null;
        const dato = this.back.dato;
        if (this.size === 1) {
            this.front = this.back = null;
        } else {
            this.back = this.back.prev;
            this.back.next = null;
        }
        this.size--;
        return dato;
    }

    toArray() {
        const arr = [];
        let current = this.front;
        while (current) {
            arr.push(current.dato);
            current = current.next;
        }
        return arr;
    }
}

let deque = new DequeLigada();

// ======================================================
//          ACTUALIZAR DISPLAY
// ======================================================

function actualizarDisplay() {
    const contenedorCola = document.getElementById('cola');
    contenedorCola.innerHTML = '';

    if (deque.isEmpty()) {
        contenedorCola.innerHTML = '<div class="null">NULL ← FRONT | BACK → NULL</div>';
        return;
    }

    const elementos = deque.toArray();

    elementos.forEach((elemento, index) => {
        const nodoDiv = document.createElement('div');
        nodoDiv.className = 'nodo';

        if (index > 0) {
            const flechaIzq = document.createElement('span');
            flechaIzq.className = 'flecha';
            flechaIzq.textContent = '←';
            nodoDiv.appendChild(flechaIzq);
        }

        const elementoDiv = document.createElement('div');
        elementoDiv.className = 'elemento';
        elementoDiv.textContent = elemento;

        if (index === 0) {
            const frontLabel = document.createElement('div');
            frontLabel.className = 'front-label';
            frontLabel.textContent = 'FRONT';
            elementoDiv.appendChild(frontLabel);
        }

        if (index === elementos.length - 1) {
            const backLabel = document.createElement('div');
            backLabel.className = 'back-label';
            backLabel.textContent = 'BACK';
            elementoDiv.appendChild(backLabel);
        }

        nodoDiv.appendChild(elementoDiv);

        if (index < elementos.length - 1) {
            const flechaDer = document.createElement('span');
            flechaDer.className = 'flecha';
            flechaDer.textContent = '→';
            nodoDiv.appendChild(flechaDer);
        }

        contenedorCola.appendChild(nodoDiv);
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

    deque.agregarFrente(dato);
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

    deque.agregarFinal(dato);
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

    if (deque.isEmpty()) {
        mensaje.textContent = 'La cola está vacía. No hay elementos para eliminar.';
        mensaje.style.color = 'red';
        return;
    }

    const datoEliminado = deque.eliminarFrente();
    mensaje.textContent = `Dato "${datoEliminado}" eliminado del frente exitosamente.`;
    mensaje.style.color = 'orange';
    actualizarDisplay();
});

// ======================================================
//          ELIMINAR DEL FINAL
// ======================================================

document.getElementById('btnEliminarFinal').addEventListener('click', () => {
    const mensaje = document.getElementById('mensaje');

    if (deque.isEmpty()) {
        mensaje.textContent = 'La cola está vacía. No hay elementos para eliminar.';
        mensaje.style.color = 'red';
        return;
    }

    const datoEliminado = deque.eliminarFinal();
    mensaje.textContent = `Dato "${datoEliminado}" eliminado del final exitosamente.`;
    mensaje.style.color = 'orange';
    actualizarDisplay();
});

// ======================================================
//          LIMPIAR COLA
// ======================================================

document.getElementById('btnLimpiar').addEventListener('click', () => {
    deque = new DequeLigada();
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