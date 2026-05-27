// ======================================================
//  Matriz Dispersa - Lógica
// ======================================================

let filas = 0;
let columnas = 0;
let entradas = []; // {r, c, val}


// ------------------------------------------------------
// ELEMENTOS
// ------------------------------------------------------

const elFilas = document.getElementById("filas");
const elColumnas = document.getElementById("columnas");
const btnCrear = document.getElementById("crearMatriz");

const elFilaEntrada = document.getElementById("filaEntrada");
const elColEntrada = document.getElementById("colEntrada");
const elValorEntrada = document.getElementById("valorEntrada");
const btnAgregar = document.getElementById("agregarEntrada");

const btnMostrarDispersa = document.getElementById("mostrarDispersa");
const btnMostrarCompleta = document.getElementById("mostrarCompleta");
const btnLimpiar = document.getElementById("limpiar");

const tablaDispersa = document.getElementById("tablaDispersa");
const tbodyDispersa = tablaDispersa.querySelector("tbody");

const tablaCompleta = document.getElementById("tablaCompleta");
const theadCompleta = document.getElementById("theadCompleta");
const tbodyCompleta = document.getElementById("tbodyCompleta");

const mensaje = document.getElementById("mensaje");


// ------------------------------------------------------
// CREAR MATRIZ (definir tamaño)
// ------------------------------------------------------

btnCrear.addEventListener("click", () => {

	const f = parseInt(elFilas.value, 10);
	const c = parseInt(elColumnas.value, 10);

	if(Number.isInteger(f) && Number.isInteger(c) && f > 0 && c > 0){

		filas = f;
		columnas = c;
		entradas = [];
		actualizarMensaje(`Matriz definida: ${filas} x ${columnas}`);
		ocultarTablas();
		limpiarEntradasForm();

	}else{
		actualizarMensaje("Ingresa filas y columnas válidas (enteros > 0)", true);
	}

});


// ------------------------------------------------------
// AGREGAR ENTRADA (fila, columna, valor)
// ------------------------------------------------------

btnAgregar.addEventListener("click", () => {

	if(filas === 0 || columnas === 0){
		actualizarMensaje("Primero define el tamaño de la matriz.", true);
		return;
	}

	const r = parseInt(elFilaEntrada.value, 10);
	const c = parseInt(elColEntrada.value, 10);
	const v = Number(elValorEntrada.value);

	if(!Number.isInteger(r) || !Number.isInteger(c) || r < 0 || c < 0){
		actualizarMensaje("Fila y columna deben ser índices enteros >= 0", true);
		return;
	}

	if(r >= filas || c >= columnas){
		actualizarMensaje("Índices fuera de rango según el tamaño definido", true);
		return;
	}

	if(v === 0 || isNaN(v)){
		// Si el valor es 0 o no numérico, eliminamos cualquier entrada previa en esa celda
		entradas = entradas.filter(e => !(e.r === r && e.c === c));
		actualizarMensaje("Entrada 0 o inválida: se eliminó la celda si existía.");
		actualizarTablas();
		return;
	}

	// Si ya existe, actualizamos
	const idx = entradas.findIndex(e => e.r === r && e.c === c);

	if(idx !== -1){
		entradas[idx].val = v;
		actualizarMensaje(`Entrada actualizada en (${r}, ${c}) = ${v}`);
	}else{
		entradas.push({r: r, c: c, val: v});
		actualizarMensaje(`Entrada agregada en (${r}, ${c}) = ${v}`);
	}

	limpiarEntradasForm();
	actualizarTablas();

});


// ------------------------------------------------------
// MOSTRAR MATRIZ DISPERSA
// ------------------------------------------------------

btnMostrarDispersa.addEventListener("click", () => {

	if(entradas.length === 0){
		actualizarMensaje("No hay entradas en la matriz dispersa.", true);
		return;
	}

	tablaDispersa.style.display = "table";
	tablaCompleta.style.display = "none";
	renderDispersa();

});


// ------------------------------------------------------
// MOSTRAR MATRIZ COMPLETA
// ------------------------------------------------------

btnMostrarCompleta.addEventListener("click", () => {

	if(filas === 0 || columnas === 0){
		actualizarMensaje("Define tamaño antes de mostrar la matriz.", true);
		return;
	}

	tablaCompleta.style.display = "table";
	tablaDispersa.style.display = "none";
	renderCompleta();

});


// ------------------------------------------------------
// LIMPIAR
// ------------------------------------------------------

btnLimpiar.addEventListener("click", () => {
	entradas = [];
	filas = 0;
	columnas = 0;
	elFilas.value = "";
	elColumnas.value = "";
	limpiarEntradasForm();
	ocultarTablas();
	actualizarMensaje("Matriz limpiada.");
});


// ------------------------------------------------------
// RENDER: MATRIZ DISPERSA
// ------------------------------------------------------

function renderDispersa(){

	tbodyDispersa.innerHTML = "";

	entradas.forEach((e, i) => {

		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${i + 1}</td>
			<td>${e.r}</td>
			<td>${e.c}</td>
			<td>${e.val}</td>
		`;

		tbodyDispersa.appendChild(tr);
	});

}


// ------------------------------------------------------
// RENDER: MATRIZ COMPLETA
// ------------------------------------------------------

function renderCompleta(){

	// Generamos matriz llena de ceros
	const M = [];
	for(let i = 0; i < filas; i++){
		const row = new Array(columnas).fill(0);
		M.push(row);
	}

	// Colocamos valores
	entradas.forEach(e => {
		if(e.r >= 0 && e.r < filas && e.c >= 0 && e.c < columnas){
			M[e.r][e.c] = e.val;
		}
	});

	// Cabecera
	theadCompleta.innerHTML = "";
	let head = '<tr><th></th>';
	for(let j = 0; j < columnas; j++) head += `<th>c${j}</th>`;
	head += '</tr>';
	theadCompleta.innerHTML = head;

	// Cuerpo
	tbodyCompleta.innerHTML = "";
	for(let i = 0; i < filas; i++){
		let filaHtml = `<tr><th>f${i}</th>`;
		for(let j = 0; j < columnas; j++){
			filaHtml += `<td>${M[i][j]}</td>`;
		}
		filaHtml += '</tr>';
		tbodyCompleta.innerHTML += filaHtml;
	}

}


// ------------------------------------------------------
// HELPERS
// ------------------------------------------------------

function limpiarEntradasForm(){
	elFilaEntrada.value = "";
	elColEntrada.value = "";
	elValorEntrada.value = "";
}

function actualizarMensaje(txt, esError = false){
	mensaje.textContent = txt;
	mensaje.style.color = esError ? 'red' : 'green';
}

function ocultarTablas(){
	tablaDispersa.style.display = 'none';
	tablaCompleta.style.display = 'none';
}

function actualizarTablas(){
	if(tablaDispersa.style.display !== 'none') renderDispersa();
	if(tablaCompleta.style.display !== 'none') renderCompleta();
}


// ------------------------------------------------------
// CERRAR Y FECHA
// ------------------------------------------------------

document.getElementById("cerrar").addEventListener("click", () => {
	window.close();
});

function actualizarFechaHora(){
	const ahora = new Date();
	const hora = ahora.toLocaleTimeString();
	const fecha = ahora.toLocaleDateString('es-ES');
	document.getElementById('fechaHora').textContent = fecha + ' | ' + hora;
}

setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();

