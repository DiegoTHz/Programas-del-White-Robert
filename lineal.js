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

        // Agregamos el nombre al arreglo
        nombres.push(nombre);

        // Actualizamos tabla
        mostrarTabla();

        // Limpiamos input
        input.value = "";

    }

});








// ======================================================
//                  MOSTRAR TABLA
// ======================================================

function mostrarTabla(indiceEncontrado = -1){

    let tabla = document.getElementById("tablaNombres");

    tabla.innerHTML = "";



    // Recorremos el arreglo completo
    for(let i = 0; i < nombres.length; i++){




        // --------------------------------------------------
        // VERIFICAR SI ES EL NOMBRE ENCONTRADO
        // --------------------------------------------------

        let clase = "";

        if(i === indiceEncontrado){

            clase = "encontrado";
        }




        // --------------------------------------------------
        // CREAR FILA
        // --------------------------------------------------

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
//              BÚSQUEDA LINEAL MANUAL
// ======================================================
//
// Este algoritmo recorre el arreglo
// elemento por elemento.
//
// Va comparando hasta encontrar el dato.
//
// ======================================================

function busquedaLineal(arreglo, objetivo){




    // --------------------------------------------------
    // RECORRER TODO EL ARREGLO
    // --------------------------------------------------

    for(let i = 0; i < arreglo.length; i++){




        // --------------------------------------------------
        // COMPARACIÓN
        // --------------------------------------------------
        //
        // toLowerCase() evita problemas
        // entre mayúsculas y minúsculas.

        if(

            arreglo[i].toLowerCase()

            ===

            objetivo.toLowerCase()

        ){




            // --------------------------------------------------
            // ELEMENTO ENCONTRADO
            // --------------------------------------------------
            //
            // Retornamos la posición.

            return i;

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




    // Nombre que el usuario quiere buscar
    let objetivo = document.getElementById("buscar").value.trim();




    // Ejecutamos la búsqueda lineal
    let posicion = busquedaLineal(nombres, objetivo);




    // Div donde aparecerá el resultado
    let resultado = document.getElementById("resultado");





    // --------------------------------------------------
    // SI EL NOMBRE EXISTE
    // --------------------------------------------------

    if(posicion !== -1){




        // Pintamos la fila encontrada
        mostrarTabla(posicion);




        // Mostramos mensaje
        resultado.textContent =
            "El nombre se encuentra en la posición #" + (posicion + 1);




        resultado.style.color = "green";

    }else{




        // --------------------------------------------------
        // SI EL NOMBRE NO EXISTE
        // --------------------------------------------------

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