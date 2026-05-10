// ======================================================
//              ARRAY PRINCIPAL DE NOMBRES
// ======================================================

// Aquí se guardarán todos los nombres que escriba el usuario.
let nombres = [];



// ======================================================
//                  BOTÓN AGREGAR
// ======================================================

// Cuando el usuario presione el botón "Agregar"
document.getElementById("agregar").addEventListener("click", () => {

    // Obtenemos el input donde el usuario escribe
    let input = document.getElementById("nombre");

    // Guardamos el texto quitando espacios innecesarios
    let nombre = input.value.trim();


    // Verificamos que no esté vacío
    if(nombre !== ""){

        // Agregamos el nombre al arreglo
        nombres.push(nombre);

        // Actualizamos la tabla en pantalla
        mostrarTabla();

        // Limpiamos el input
        input.value = "";
    }

});




// ======================================================
//                  MOSTRAR TABLA
// ======================================================

// Esta función imprime todos los nombres en la tabla HTML
function mostrarTabla(){

    // Obtenemos el tbody de la tabla
    let tabla = document.getElementById("tablaNombres");

    // Limpiamos la tabla antes de volver a dibujarla
    tabla.innerHTML = "";



    // Recorremos el arreglo nombre por nombre
    for(let i = 0; i < nombres.length; i++){

        // Creamos una fila HTML
        let fila = `
            <tr>
                <td>${nombres[i]}</td>
            </tr>
        `;

        // Agregamos la fila a la tabla
        tabla.innerHTML += fila;
    }

}





// ======================================================
//                MÉTODO QUICK SORT
// ======================================================


// Esta función ordenará los nombres alfabéticamente
function quickSort(arreglo){


    // --------------------------------------------------
    // CASO BASE
    // --------------------------------------------------
    // Si el arreglo tiene 0 o 1 elementos,
    // ya está ordenado automáticamente.
    // Entonces lo devolvemos sin cambios.

    if(arreglo.length <= 1){

        return arreglo;
    }



    // --------------------------------------------------
    // SELECCIÓN DEL PIVOTE
    // --------------------------------------------------
    // El pivote será el último elemento del arreglo.

    let pivote = arreglo[arreglo.length - 1];



    // --------------------------------------------------
    // ARREGLOS AUXILIARES
    // --------------------------------------------------
    // izquierda = elementos menores al pivote
    // derecha = elementos mayores o iguales al pivote

    let izquierda = [];
    let derecha = [];



    // --------------------------------------------------
    // RECORRIDO DEL ARREGLO
    // --------------------------------------------------
    // Recorremos todos los elementos excepto el pivote

    for(let i = 0; i < arreglo.length - 1; i++){


        // --------------------------------------------------
        // COMPARACIÓN ALFABÉTICA
        // --------------------------------------------------
        // toLowerCase() evita problemas con mayúsculas

        if(arreglo[i].toLowerCase() < pivote.toLowerCase()){


            // Si el elemento es menor,
            // va al arreglo izquierda
            izquierda.push(arreglo[i]);

        }else{


            // Si es mayor o igual,
            // va al arreglo derecha
            derecha.push(arreglo[i]);
        }

    }



    // --------------------------------------------------
    // PROCESO RECURSIVO
    // --------------------------------------------------
    //
    // Se vuelve a aplicar QuickSort:
    //
    // 1. A la parte izquierda
    // 2. Luego se coloca el pivote
    // 3. Después la parte derecha
    //
    // Esto se repetirá automáticamente
    // hasta que todos los arreglos
    // tengan solamente 1 elemento.

    return [

        ...quickSort(izquierda),

        pivote,

        ...quickSort(derecha)

    ];

}






// ======================================================
//                BOTÓN ORDENAR
// ======================================================

// Cuando el usuario presione "Ordenar"
document.getElementById("ordenar").addEventListener("click", () => {


    // Aplicamos QuickSort al arreglo nombres
    nombres = quickSort(nombres);


    // Mostramos el arreglo ya ordenado
    mostrarTabla();

});







// ======================================================
//                  BOTÓN ADIÓS
// ======================================================

// Cierra la ventana emergente
document.getElementById("cerrar").addEventListener("click", () => {

    window.close();

});







// ======================================================
//                  FECHA Y HORA
// ======================================================

// Función que actualiza reloj y fecha
function actualizarFechaHora(){

    // Obtenemos fecha y hora actuales
    let ahora = new Date();

    // Hora actual
    let hora = ahora.toLocaleTimeString();

    // Fecha actual
    let fecha = ahora.toLocaleDateString("es-ES");



    // Mostramos fecha y hora en pantalla
    document.getElementById("fechaHora").textContent =
        fecha + " | " + hora;

}



// Actualiza cada segundo
setInterval(actualizarFechaHora, 1000);


// Ejecutamos una vez inmediatamente
actualizarFechaHora();