// ======================================================
//              COLA CIRCULAR
// ======================================================

// Estructura de la cola circular
let cola = {
    arreglo: new Array(10).fill(null),  // Array de 10 posiciones
    frente: 0,                           // Índice del inicio
    final: -1,                           // Índice del final
    tamaño: 0                            // Cantidad de elementos
};




// ======================================================
//              MÉTODO ENQUEUE (AGREGAR)
// ======================================================

function enqueue(dato) {

    // Verificar si la cola está llena
    if(cola.tamaño === 10) {
        return false;  // No se puede agregar
    }

    // Si es el primer elemento
    if(cola.final === -1) {
        cola.final = 0;
        cola.frente = 0;
    } else {
        // Movemos final al siguiente índice (circular)
        cola.final = (cola.final + 1) % 10;
    }

    // Agregamos el dato
    cola.arreglo[cola.final] = dato;
    cola.tamaño++;

    return true;  // Agregado exitosamente
}




// ======================================================
//              MÉTODO DEQUEUE (ELIMINAR)
// ======================================================

function dequeue() {

    // Verificar si la cola está vacía
    if(cola.tamaño === 0) {
        return null;  // No hay nada que eliminar
    }

    // Obtenemos el dato del frente
    let dato = cola.arreglo[cola.frente];

    // Eliminamos el dato
    cola.arreglo[cola.frente] = null;

    // Si era el último elemento
    if(cola.tamaño === 1) {
        cola.frente = 0;
        cola.final = -1;
    } else {
        // Movemos frente al siguiente índice (circular)
        cola.frente = (cola.frente + 1) % 10;
    }

    cola.tamaño--;

    return dato;  // Retornamos el dato eliminado
}




// ======================================================
//              MOSTRAR TABLA
// ======================================================

function mostrarTabla() {

    let tabla = document.getElementById("tablaCola");

    tabla.innerHTML = "";

    // Recorremos todo el array
    for(let i = 0; i < 10; i++) {

        let clase = "";
        let valor = cola.arreglo[i] !== null ? cola.arreglo[i] : "-";
        let posicion = "-";

        // Marcar si es frente
        if(i === cola.frente && cola.tamaño > 0) {
            clase = "frente";
            posicion = "FRENTE";
        }

        // Marcar si es final
        if(i === cola.final && cola.tamaño > 0) {
            clase = "final";
            posicion = "FINAL";
        }

        let fila = `
            <tr class="${clase}">
                <td>${i}</td>
                <td>${posicion}</td>
                <td>${valor}</td>
            </tr>
        `;

        tabla.innerHTML += fila;
    }

    // Actualizar contador
    document.getElementById("contador").textContent = cola.tamaño;

}




// ======================================================
//              BOTÓN AGREGAR
// ======================================================

document.getElementById("agregar").addEventListener("click", () => {

    let input = document.getElementById("dato");

    let dato = input.value.trim();

    let mensaje = document.getElementById("mensaje");

    if(dato === "") {
        mensaje.textContent = "Por favor ingresa un dato";
        mensaje.style.color = "orange";
        return;
    }

    // Intentamos agregar
    if(enqueue(dato)) {
        mensaje.textContent = "✓ Dato agregado: " + dato;
        mensaje.style.color = "green";
        input.value = "";
        mostrarTabla();
    } else {
        mensaje.textContent = "✗ Cola llena (máximo 10 elementos)";
        mensaje.style.color = "red";
    }

});




// ======================================================
//              BOTÓN ELIMINAR
// ======================================================

document.getElementById("btnEliminar").addEventListener("click", () => {

    let mensaje = document.getElementById("mensaje");

    let dato = dequeue();

    if(dato !== null) {
        mensaje.textContent = "✓ Dato eliminado: " + dato;
        mensaje.style.color = "green";
        mostrarTabla();
    } else {
        mensaje.textContent = "✗ Cola vacía, no hay datos para eliminar";
        mensaje.style.color = "red";
    }

});




// ======================================================
//              BOTÓN ADIÓS
// ======================================================

document.getElementById("cerrar").addEventListener("click", () => {

    window.close();

});




// ======================================================
//              FECHA Y HORA
// ======================================================

function actualizarFechaHora() {

    let ahora = new Date();

    let hora = ahora.toLocaleTimeString();

    let fecha = ahora.toLocaleDateString("es-ES");

    document.getElementById("fechaHora").textContent =
        fecha + " | " + hora;

}

setInterval(actualizarFechaHora, 1000);

actualizarFechaHora();




// ======================================================
//              INICIALIZAR
// ======================================================

mostrarTabla();
