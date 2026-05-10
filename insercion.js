// ======================================================
//              ARRAY PRINCIPAL DE NOMBRES
// ======================================================

let nombres = [];






// ======================================================
//                  BOTÓN AGREGAR
// ======================================================

document.getElementById("agregar").addEventListener("click", () => {

    let input = document.getElementById("nombre");

    let nombre = input.value.trim();

    if(nombre !== ""){

        nombres.push(nombre);

        mostrarTabla();

        input.value = "";
    }

});







// ======================================================
//                  MOSTRAR TABLA
// ======================================================

function mostrarTabla(){

    let tabla = document.getElementById("tablaNombres");

    tabla.innerHTML = "";

    for(let i = 0; i < nombres.length; i++){

        let fila = `
            <tr>
                <td>${nombres[i]}</td>
            </tr>
        `;

        tabla.innerHTML += fila;
    }

}








// ======================================================
//                INSERTION SORT MANUAL
// ======================================================
//
// Este algoritmo toma un elemento
// y lo va insertando en la posición correcta.
//
// Funciona parecido a acomodar cartas en la mano.
//
// ======================================================

function insertionSort(arreglo){




    // --------------------------------------------------
    // RECORRER EL ARREGLO
    // --------------------------------------------------
    //
    // Empezamos desde el segundo elemento
    // porque el primero ya se considera ordenado.

    for(let i = 1; i < arreglo.length; i++){




        // --------------------------------------------------
        // ELEMENTO ACTUAL
        // --------------------------------------------------
        //
        // Guardamos el elemento actual
        // que queremos insertar correctamente.

        let actual = arreglo[i];




        // --------------------------------------------------
        // ÍNDICE ANTERIOR
        // --------------------------------------------------
        //
        // j representa el índice anterior.

        let j = i - 1;





        // --------------------------------------------------
        // DESPLAZAMIENTO DE ELEMENTOS
        // --------------------------------------------------
        //
        // Mientras:
        //
        // 1. j sea válido
        // 2. el elemento anterior sea mayor
        //
        // se moverán elementos hacia la derecha.

        while(

            j >= 0

            &&

            arreglo[j].toLowerCase()
            >
            actual.toLowerCase()

        ){




            // --------------------------------------------------
            // MOVER ELEMENTO
            // --------------------------------------------------
            //
            // El elemento mayor se mueve
            // una posición hacia la derecha.

            arreglo[j + 1] = arreglo[j];




            // Seguimos comparando hacia atrás
            j--;

        }





        // --------------------------------------------------
        // INSERTAR ELEMENTO
        // --------------------------------------------------
        //
        // Cuando encontramos la posición correcta,
        // insertamos el elemento actual.

        arreglo[j + 1] = actual;

    }




    // Retornamos el arreglo ordenado
    return arreglo;

}









// ======================================================
//                  BOTÓN ORDENAR
// ======================================================

document.getElementById("ordenar").addEventListener("click", () => {

    nombres = insertionSort(nombres);

    mostrarTabla();

});










// ======================================================
//                  BOTÓN ADIÓS
// ======================================================

document.getElementById("cerrar").addEventListener("click", () => {

    window.close();

});










// ======================================================
//                  FECHA Y HORA
// ======================================================

function actualizarFechaHora(){

    let ahora = new Date();

    let hora = ahora.toLocaleTimeString();

    let fecha = ahora.toLocaleDateString("es-ES");

    document.getElementById("fechaHora").textContent =
        fecha + " | " + hora;

}

setInterval(actualizarFechaHora, 1000);

actualizarFechaHora();