// ======================================================
//          COLA CIRCULAR LIGADA
// ======================================================

class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.next = null;
    }
}

class ColaCircularLigada {
    constructor() {
        this.back = null;  // Referencia al último nodo
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    // Agregar al final (enqueue)
    enqueue(dato) {
        const nuevoNodo = new Nodo(dato);

        if (this.isEmpty()) {
            // Si está vacía, el nuevo nodo apunta a sí mismo
            nuevoNodo.next = nuevoNodo;
            this.back = nuevoNodo;
        } else {
            // El nuevo nodo apunta al frente (que es back.next)
            nuevoNodo.next = this.back.next;
            // El back actual apunta al nuevo nodo
            this.back.next = nuevoNodo;
            // Actualizar back al nuevo nodo
            this.back = nuevoNodo;
        }

        this.size++;
    }

    // Eliminar del frente (dequeue)
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const dato = this.back.next.dato;  // El frente es back.next

        if (this.size === 1) {
            // Si solo hay un elemento, vaciar la cola
            this.back = null;
        } else {
            // El back apunta al siguiente del frente
            this.back.next = this.back.next.next;
        }

        this.size--;
        return dato;
    }

    // Obtener array de elementos para visualización
    toArray() {
        if (this.isEmpty()) return [];

        const arr = [];
        let current = this.back.next;  // Empezar desde el frente
        for (let i = 0; i < this.size; i++) {
            arr.push(current.dato);
            current = current.next;
        }
        return arr;
    }
}

let colaCircular = new ColaCircularLigada();

// ======================================================
//          ACTUALIZAR DISPLAY
// ======================================================

function actualizarDisplay() {
    const contenedorCola = document.getElementById('cola');
    contenedorCola.innerHTML = '';

    if (colaCircular.isEmpty()) {
        contenedorCola.innerHTML = '<div class="null">NULL</div>';
        return;
    }

    const elementos = colaCircular.toArray();

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

            // Agregar flecha circular del último al primero
            const flechaCircular = document.createElement('span');
            flechaCircular.className = 'flecha-circular';
            flechaCircular.textContent = '↻';
            elementoDiv.appendChild(flechaCircular);
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
//          AGREGAR (ENQUEUE)
// ======================================================

document.getElementById('agregar').addEventListener('click', () => {
    const dato = document.getElementById('dato').value.trim();
    const mensaje = document.getElementById('mensaje');

    if (dato === '') {
        mensaje.textContent = 'Por favor, ingresa un dato.';
        mensaje.style.color = 'red';
        return;
    }

    colaCircular.enqueue(dato);
    document.getElementById('dato').value = '';
    mensaje.textContent = `Dato "${dato}" agregado exitosamente.`;
    mensaje.style.color = 'green';
    actualizarDisplay();
});

// ======================================================
//          ELIMINAR (DEQUEUE)
// ======================================================

document.getElementById('btnEliminar').addEventListener('click', () => {
    const mensaje = document.getElementById('mensaje');

    if (colaCircular.isEmpty()) {
        mensaje.textContent = 'La cola está vacía. No hay elementos para eliminar.';
        mensaje.style.color = 'red';
        return;
    }

    const datoEliminado = colaCircular.dequeue();
    mensaje.textContent = `Dato "${datoEliminado}" eliminado exitosamente.`;
    mensaje.style.color = 'orange';
    actualizarDisplay();
});

// ======================================================
//          LIMPIAR COLA
// ======================================================

document.getElementById('btnLimpiar').addEventListener('click', () => {
    colaCircular = new ColaCircularLigada();
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