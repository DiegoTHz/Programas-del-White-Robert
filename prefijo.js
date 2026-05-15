// ======================================================
//          NOTACIÓN POLACA PREFIJA
// ======================================================




// ======================================================
//          PRECEDENCIA DE OPERADORES
// ======================================================

function obtenerPrecedencia(operador) {

    switch(operador) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
        default:
            return 0;
    }

}




// ======================================================
//          ASOCIATIVIDAD DE OPERADORES
// ======================================================

function esAsociativoIzquierda(operador) {

    // Todos excepto potencia (^) son asociativos por la izquierda
    if(operador === '^') {
        return false;  // Asociativo por la derecha
    }

    return true;  // Asociativo por la izquierda

}




// ======================================================
//          TOKENIZAR EXPRESIÓN
// ======================================================

function tokenizar(expresion) {

    let tokens = [];

    let operando = "";

    for(let i = 0; i < expresion.length; i++) {

        let char = expresion[i];

        // Ignorar espacios
        if(char === " ") {
            if(operando !== "") {
                tokens.push(operando);
                operando = "";
            }
            continue;
        }

        // Si es dígito, punto decimal o letra (variable)
        if(/[0-9.a-zA-Z]/.test(char)) {
            operando += char;
        } else {
            // Si no es número/variable, agregar operando anterior si existe
            if(operando !== "") {
                tokens.push(operando);
                operando = "";
            }

            // Agregar operador o paréntesis
            if(char === "+" || char === "-" || char === "*" || 
               char === "/" || char === "^" || char === "(" || char === ")") {
                tokens.push(char);
            }
        }

    }

    // Agregar último operando si existe
    if(operando !== "") {
        tokens.push(operando);
    }

    return tokens;

}




// ======================================================
//          VALIDAR EXPRESIÓN
// ======================================================

function validarExpresion(tokens) {

    if(tokens.length === 0) {
        return false;
    }

    let parenAbiertos = 0;

    for(let i = 0; i < tokens.length; i++) {

        let token = tokens[i];

        // Validar paréntesis
        if(token === "(") {
            parenAbiertos++;
        } else if(token === ")") {
            parenAbiertos--;
            if(parenAbiertos < 0) {
                return false;
            }
        }

    }

    // Validar que no hayan paréntesis sin cerrar
    if(parenAbiertos !== 0) {
        return false;
    }

    return true;

}




// ======================================================
//          CONVERTIR INFIJA A POSTFIJA
// ======================================================

function esOperando(token) {

    // Si es un número
    if(!isNaN(token)) {
        return true;
    }

    // Si es una variable (una o más letras)
    if(/^[a-zA-Z]+$/.test(token)) {
        return true;
    }

    return false;

}

function infijaAPostfija(tokens) {

    let salida = [];
    let pila = [];
    let pasos = [];

    for(let i = 0; i < tokens.length; i++) {

        let token = tokens[i];

        // Si es operando (número o variable)
        if(esOperando(token)) {
            salida.push(token);
            pasos.push(`Token "${token}" es operando → Agregar a salida`);
        }

        // Si es operador
        else if(token === "+" || token === "-" || token === "*" || 
                token === "/" || token === "^") {

            while(pila.length > 0) {

                let tope = pila[pila.length - 1];

                if(tope !== "(" &&
                   (obtenerPrecedencia(tope) > obtenerPrecedencia(token) ||
                    (obtenerPrecedencia(tope) === obtenerPrecedencia(token) && 
                     esAsociativoIzquierda(token)))) {

                    salida.push(pila.pop());
                    pasos.push(`Operador "${token}": desapilar "${tope}" a salida`);

                } else {
                    break;
                }

            }

            pila.push(token);
            pasos.push(`Apilar operador "${token}"`);

        }

        // Si es paréntesis abierto
        else if(token === "(") {
            pila.push(token);
            pasos.push(`Apilar paréntesis abierto "()"`);
        }

        // Si es paréntesis cerrado
        else if(token === ")") {

            while(pila.length > 0 && pila[pila.length - 1] !== "(") {
                salida.push(pila.pop());
                pasos.push(`Paréntesis cerrado: desapilar a salida`);
            }

            if(pila.length > 0) {
                pila.pop();  // Eliminar paréntesis abierto
                pasos.push(`Eliminar paréntesis abierto de la pila`);
            }

        }

    }

    // Desapilar todo lo que queda
    while(pila.length > 0) {
        salida.push(pila.pop());
        pasos.push(`Final: desapilar a salida`);
    }

    return {
        resultado: salida,
        pasos: pasos
    };

}




// ======================================================
//          CONVERTIR INFIJA A PREFIJA
// ======================================================

function infijaAPrefija(tokens) {

    // 1. Invertir los tokens
    let tokensInvertidos = tokens.reverse();

    // 2. Cambiar paréntesis
    for(let i = 0; i < tokensInvertidos.length; i++) {
        if(tokensInvertidos[i] === "(") {
            tokensInvertidos[i] = ")";
        } else if(tokensInvertidos[i] === ")") {
            tokensInvertidos[i] = "(";
        }
    }

    // 3. Convertir a postfija
    let resultadoPostfija = infijaAPostfija(tokensInvertidos);

    // 4. Invertir el resultado
    let prefija = resultadoPostfija.resultado.reverse();

    return {
        resultado: prefija,
        pasos: resultadoPostfija.pasos
    };

}




// ======================================================
//          BOTÓN CONVERTIR
// ======================================================

document.getElementById("convertir").addEventListener("click", () => {

    let inputEcuacion = document.getElementById("ecuacion");
    let ecuacion = inputEcuacion.value.trim();
    let mensaje = document.getElementById("mensaje");
    let resultadosDiv = document.getElementById("resultados");

    mensaje.textContent = "";
    mensaje.style.color = "black";

    // Validar que no esté vacío
    if(ecuacion === "") {
        mensaje.textContent = "Por favor ingresa una ecuación";
        mensaje.style.color = "orange";
        resultadosDiv.style.display = "none";
        return;
    }

    // Tokenizar
    let tokens = tokenizar(ecuacion);

    // Validar expresión
    if(!validarExpresion(tokens)) {
        mensaje.textContent = "✗ Expresión inválida (verifica paréntesis y operadores)";
        mensaje.style.color = "red";
        resultadosDiv.style.display = "none";
        return;
    }

    // Convertir
    let resultadoPrefija = infijaAPrefija(tokens);
    let resultadoPostfija = infijaAPostfija(tokens);

    // Mostrar resultados
    document.getElementById("infija").textContent = ecuacion;
    document.getElementById("prefija").textContent = resultadoPrefija.resultado.join(" ");
    document.getElementById("postfija").textContent = resultadoPostfija.resultado.join(" ");

    // Mostrar pasos (limitados a 10)
    let pasosHTML = "";
    for(let i = 0; i < Math.min(resultadoPrefija.pasos.length, 10); i++) {
        pasosHTML += (i + 1) + ". " + resultadoPrefija.pasos[i] + "<br>";
    }
    if(resultadoPrefija.pasos.length > 10) {
        pasosHTML += "... y " + (resultadoPrefija.pasos.length - 10) + " pasos más";
    }

    document.getElementById("pasos").innerHTML = pasosHTML;

    // Mostrar sección de resultados
    resultadosDiv.style.display = "block";

    // Mensaje de éxito
    mensaje.textContent = "✓ Conversión exitosa";
    mensaje.style.color = "green";

});




// ======================================================
//          BOTÓN LIMPIAR
// ======================================================

document.getElementById("btnLimpiar").addEventListener("click", () => {

    document.getElementById("ecuacion").value = "";
    document.getElementById("mensaje").textContent = "";
    document.getElementById("resultados").style.display = "none";
    document.getElementById("ecuacion").focus();

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

    document.getElementById("fechaHora").textContent =
        fecha + " | " + hora;

}

setInterval(actualizarFechaHora, 1000);

actualizarFechaHora();
