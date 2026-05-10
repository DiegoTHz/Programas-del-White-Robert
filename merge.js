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
//                  FUNCIÓN MERGE
// ======================================================
//
// Esta función une dos arreglos YA ORDENADOS
// en un solo arreglo ordenado.
//
// Ejemplo:
//
// izquierda = ["Ana", "Carlos"]
// derecha   = ["Luis", "Pedro"]
//
// Resultado:
// ["Ana", "Carlos", "Luis", "Pedro"]
//
// ======================================================

function merge(izquierda, derecha){

    // Aquí guardaremos el resultado final
    let resultado = [];


    // Índices para recorrer ambos arreglos
    let i = 0;
    let j = 0;



    // --------------------------------------------------
    // COMPARACIÓN DE ELEMENTOS
    // --------------------------------------------------
    //
    // Mientras ambos arreglos tengan elementos,
    // compararemos letra por letra.

    while(i < izquierda.length && j < derecha.length){


        // Comparación alfabética
        if(
            izquierda[i].toLowerCase()
            <
            derecha[j].toLowerCase()
        ){

            // Si izquierda es menor,
            // se agrega al resultado
            resultado.push(izquierda[i]);

            // Avanzamos al siguiente elemento
            i++;

        }else{

            // Si derecha es menor,
            // se agrega al resultado
            resultado.push(derecha[j]);

            // Avanzamos al siguiente
            j++;
        }

    }




    // --------------------------------------------------
    // AGREGAR SOBRANTES
    // --------------------------------------------------
    //
    // Cuando un arreglo termina,
    // el otro puede seguir teniendo elementos.
    //
    // Estos se agregan automáticamente.


    while(i < izquierda.length){

        resultado.push(izquierda[i]);

        i++;
    }



    while(j < derecha.length){

        resultado.push(derecha[j]);

        j++;
    }



    // Retornamos el arreglo combinado
    return resultado;

}







// ======================================================
//                  MÉTODO MERGE SORT
// ======================================================

function mergeSort(arreglo){




    // --------------------------------------------------
    // CASO BASE
    // --------------------------------------------------
    //
    // Si el arreglo tiene 1 o 0 elementos,
    // ya está ordenado.

    if(arreglo.length <= 1){

        return arreglo;
    }




    // --------------------------------------------------
    // DIVISIÓN DEL ARREGLO
    // --------------------------------------------------
    //
    // Se divide el arreglo a la mitad.

    let mitad = Math.floor(arreglo.length / 2);




    // Parte izquierda
    let izquierda = arreglo.slice(0, mitad);




    // Parte derecha
    let derecha = arreglo.slice(mitad);





    // --------------------------------------------------
    // RECURSIVIDAD
    // --------------------------------------------------
    //
    // Se vuelve a dividir cada mitad
    // hasta que solo quede 1 elemento.

    izquierda = mergeSort(izquierda);

    derecha = mergeSort(derecha);





    // --------------------------------------------------
    // UNIÓN ORDENADA
    // --------------------------------------------------
    //
    // Finalmente ambas partes
    // se unen ordenadamente.

    return merge(izquierda, derecha);

}








// ======================================================
//                  BOTÓN ORDENAR
// ======================================================

document.getElementById("ordenar").addEventListener("click", () => {

    nombres = mergeSort(nombres);

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