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

function mostrarTabla(indiceEncontrado = -1){

    let tabla = document.getElementById("tablaNombres");

    tabla.innerHTML = "";




    for(let i = 0; i < nombres.length; i++){

        let clase = "";




        // Si es el elemento encontrado
        if(i === indiceEncontrado){

            clase = "encontrado";
        }




        let fila = `
            <tr class="${clase}">
                <td>${i + 1}</td>
                <td>${nombres[i]}</td>
            </tr>
        `;

        tabla.innerHTML += fila;

    }

}










// ======================================================
//              ORDENAMIENTO MANUAL
// ======================================================
//
// La búsqueda binaria SOLO funciona
// si los datos están ordenados.
//
// Aquí usamos Insertion Sort manual.
//
// ======================================================

function insertionSort(arreglo){

    for(let i = 1; i < arreglo.length; i++){

        let actual = arreglo[i];

        let j = i - 1;




        while(

            j >= 0

            &&

            arreglo[j].toLowerCase()
            >
            actual.toLowerCase()

        ){

            arreglo[j + 1] = arreglo[j];

            j--;

        }




        arreglo[j + 1] = actual;

    }




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
//              BÚSQUEDA BINARIA MANUAL
// ======================================================
//
// La búsqueda binaria NO revisa
// elemento por elemento.
//
// Va dividiendo el arreglo a la mitad.
//
// ======================================================

function busquedaBinaria(arreglo, objetivo){




    // --------------------------------------------------
    // VARIABLES INICIALES
    // --------------------------------------------------

    let izquierda = 0;

    let derecha = arreglo.length - 1;





    // --------------------------------------------------
    // BUCLE PRINCIPAL
    // --------------------------------------------------

    while(izquierda <= derecha){




        // --------------------------------------------------
        // CALCULAR MITAD
        // --------------------------------------------------

        let mitad = Math.floor((izquierda + derecha) / 2);




        // --------------------------------------------------
        // ELEMENTO DEL CENTRO
        // --------------------------------------------------

        let elementoMedio = arreglo[mitad];





        // --------------------------------------------------
        // COMPARAR
        // --------------------------------------------------

        if(

            elementoMedio.toLowerCase()

            ===

            objetivo.toLowerCase()

        ){




            // Elemento encontrado
            return mitad;

        }






        // --------------------------------------------------
        // BUSCAR EN LA MITAD IZQUIERDA
        // --------------------------------------------------

        else if(

            objetivo.toLowerCase()

            <

            elementoMedio.toLowerCase()

        ){

            derecha = mitad - 1;

        }






        // --------------------------------------------------
        // BUSCAR EN LA MITAD DERECHA
        // --------------------------------------------------

        else{

            izquierda = mitad + 1;

        }

    }






    // --------------------------------------------------
    // ELEMENTO NO ENCONTRADO
    // --------------------------------------------------

    return -1;

}










// ======================================================
//                  BOTÓN BUSCAR
// ======================================================

document.getElementById("buscarBtn").addEventListener("click", () => {

    let objetivo = document.getElementById("buscar").value.trim();




    // Ejecutar búsqueda binaria
    let posicion = busquedaBinaria(nombres, objetivo);




    let resultado = document.getElementById("resultado");





    // --------------------------------------------------
    // SI EXISTE
    // --------------------------------------------------

    if(posicion !== -1){

        mostrarTabla(posicion);




        resultado.textContent =
            "El nombre se encuentra en la posición #" + (posicion + 1);




        resultado.style.color = "green";

    }






    // --------------------------------------------------
    // SI NO EXISTE
    // --------------------------------------------------

    else{

        mostrarTabla();




        resultado.textContent =
            "El nombre no existe en la tabla";




        resultado.style.color = "red";

    }

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









// ======================================================
//              MOSTRAR TABLA INICIAL
// ======================================================

mostrarTabla();