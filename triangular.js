// ==================================================
// Matriz Triangular - lógica
// ==================================================

let filas = 0;
let columnas = 0;
let entradas = []; // {r,c,val}
let matrizTriangular = null;

const elFilas = document.getElementById('filas');
const elColumnas = document.getElementById('columnas');
const btnCrear = document.getElementById('crearMatriz');

const elFilaEntrada = document.getElementById('filaEntrada');
const elColEntrada = document.getElementById('colEntrada');
const elValorEntrada = document.getElementById('valorEntrada');
const btnAgregar = document.getElementById('agregarEntrada');

const btnMostrarOriginal = document.getElementById('mostrarOriginal');
const btnTriSuperior = document.getElementById('triSuperior');
const btnTriInferior = document.getElementById('triInferior');
const btnTransponer = document.getElementById('transponer');
const btnLimpiar = document.getElementById('limpiar');

const mensaje = document.getElementById('mensaje');

const tablaOriginal = document.getElementById('tablaOriginal');
const theadOriginal = document.getElementById('theadOriginal');
const tbodyOriginal = document.getElementById('tbodyOriginal');

const tablaTri = document.getElementById('tablaTriangular');
const theadTri = document.getElementById('theadTri');
const tbodyTri = document.getElementById('tbodyTri');

const tablaTrans = document.getElementById('tablaTranspuesta');
const theadTrans = document.getElementById('theadTrans');
const tbodyTrans = document.getElementById('tbodyTrans');

// Crear tamaño
btnCrear.addEventListener('click', () => {
    const f = parseInt(elFilas.value,10);
    const c = parseInt(elColumnas.value,10);
    if(!Number.isInteger(f) || !Number.isInteger(c) || f <= 0 || c <= 0){
        actualizarMensaje('Filas y columnas válidas (>0).', true);
        return;
    }
    filas = f; columnas = c; entradas = []; matrizTriangular = null;
    ocultarTablas(); actualizarMensaje(`Matriz definida: ${filas} x ${columnas}`);
    elFilaEntrada.value=''; elColEntrada.value=''; elValorEntrada.value='';
});

// Agregar entrada
btnAgregar.addEventListener('click', () => {
    if(filas===0 || columnas===0){ actualizarMensaje('Define tamaño primero.', true); return; }
    const r = parseInt(elFilaEntrada.value,10);
    const c = parseInt(elColEntrada.value,10);
    const v = Number(elValorEntrada.value);
    if(!Number.isInteger(r) || !Number.isInteger(c) || r<0 || c<0){ actualizarMensaje('Índices válidos >=0', true); return; }
    if(r>=filas || c>=columnas){ actualizarMensaje('Índices fuera de rango', true); return; }
    // si valor 0 o NaN, removemos
    if(v===0 || isNaN(v)){
        entradas = entradas.filter(e=>!(e.r===r && e.c===c));
        actualizarMensaje('Valor 0 o inválido: celda eliminada si existía.');
        actualizarTablas(); return;
    }
    const idx = entradas.findIndex(e=>e.r===r && e.c===c);
    if(idx!==-1){ entradas[idx].val = v; actualizarMensaje(`Actualizado (${r},${c})=${v}`); }
    else { entradas.push({r,c,val:v}); actualizarMensaje(`Agregado (${r},${c})=${v}`); }
    elFilaEntrada.value=''; elColEntrada.value=''; elValorEntrada.value='';
    actualizarTablas();
});

// Mostrar original
btnMostrarOriginal.addEventListener('click', ()=>{
    if(filas===0||columnas===0){ actualizarMensaje('Define tamaño primero.', true); return; }
    tablaOriginal.style.display='table'; tablaTri.style.display='none'; tablaTrans.style.display='none';
    renderMatrix(buildFullMatrix(), theadOriginal, tbodyOriginal);
});

// Triangular superior
btnTriSuperior.addEventListener('click', ()=>{
    if(filas===0||columnas===0){ actualizarMensaje('Define tamaño primero.', true); return; }
    const full = buildFullMatrix();
    const tri = full.map((row,i)=> row.map((v,j)=> j>=i? v: 0));
    matrizTriangular = tri;
    tablaTri.style.display='table'; tablaOriginal.style.display='none'; tablaTrans.style.display='none';
    renderMatrix(tri, theadTri, tbodyTri);
    actualizarMensaje('Triangular superior generada.');
});

// Triangular inferior
btnTriInferior.addEventListener('click', ()=>{
    if(filas===0||columnas===0){ actualizarMensaje('Define tamaño primero.', true); return; }
    const full = buildFullMatrix();
    const tri = full.map((row,i)=> row.map((v,j)=> j<=i? v: 0));
    matrizTriangular = tri;
    tablaTri.style.display='table'; tablaOriginal.style.display='none'; tablaTrans.style.display='none';
    renderMatrix(tri, theadTri, tbodyTri);
    actualizarMensaje('Triangular inferior generada.');
});

// Transponer la matriz triangular actual
btnTransponer.addEventListener('click', ()=>{
    if(!matrizTriangular){ actualizarMensaje('Genera una matriz triangular primero.', true); return; }
    const t = transpose(matrizTriangular);
    tablaTrans.style.display='table'; tablaTri.style.display='none'; tablaOriginal.style.display='none';
    renderMatrix(t, theadTrans, tbodyTrans);
    actualizarMensaje('Transpuesta mostrada.');
});

// Limpiar
btnLimpiar.addEventListener('click', ()=>{
    filas=0; columnas=0; entradas=[]; matrizTriangular=null; elFilas.value=''; elColumnas.value=''; ocultarTablas(); actualizarMensaje('Limpio.');
});

// Helpers
function buildFullMatrix(){
    const M=[]; for(let i=0;i<filas;i++){ M.push(new Array(columnas).fill(0)); }
    entradas.forEach(e=>{ if(e.r>=0 && e.r<filas && e.c>=0 && e.c<columnas) M[e.r][e.c]=e.val; });
    return M;
}

function renderMatrix(M, thead, tbody){
    thead.innerHTML=''; tbody.innerHTML='';
    // header
    let h = '<tr><th></th>';
    for(let j=0;j<M[0].length;j++) h += `<th>c${j}</th>`;
    h += '</tr>'; thead.innerHTML = h;
    // body
    for(let i=0;i<M.length;i++){
        let row = `<tr><th>f${i}</th>`;
        for(let j=0;j<M[i].length;j++) row += `<td>${M[i][j]}</td>`;
        row += '</tr>'; tbody.innerHTML += row;
    }
}

function transpose(M){
    const r = M.length, c = M[0].length; const T = [];
    for(let i=0;i<c;i++){ T[i]=[]; for(let j=0;j<r;j++) T[i][j]=M[j][i]; }
    return T;
}

function ocultarTablas(){ tablaOriginal.style.display='none'; tablaTri.style.display='none'; tablaTrans.style.display='none'; }
function actualizarTablas(){ if(tablaOriginal.style.display!=='none') renderMatrix(buildFullMatrix(), theadOriginal, tbodyOriginal); if(tablaTri.style.display!=='none' && matrizTriangular) renderMatrix(matrizTriangular, theadTri, tbodyTri); if(tablaTrans.style.display!=='none' && matrizTriangular) renderMatrix(transpose(matrizTriangular), theadTrans, tbodyTrans); }

function actualizarMensaje(txt, esError=false){ mensaje.textContent = txt; mensaje.style.color = esError? 'red':'green'; }

// Cerrar y fecha
document.getElementById('cerrar').addEventListener('click', ()=> window.close());
function actualizarFechaHora(){ const ahora=new Date(); document.getElementById('fechaHora').textContent = ahora.toLocaleDateString('es-ES') + ' | ' + ahora.toLocaleTimeString(); }
setInterval(actualizarFechaHora,1000); actualizarFechaHora();
