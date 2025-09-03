/*************** Datos ***************/
const menu = {
  "Desayunos": [
    "Desayuno del comal", "Desayuno Especial", "Desayuno Ranchero", "Desayuno Light"
  ],
  "Jugos y Licuados": [
    "Rehabilitantes", "Refrescantes", "Jugos Delicias", "Reductivos", "Licuados"
  ],
  "Del Comal": [
    "Orden de picaditas", "Huaraches", "Picada 4 estaciones"
  ],
  "De la granja": [
    "Huevo adicional", "Salsa de huevo", "Revueltos o fritos",
    "Con tocino, Jamon, Chorizo o Longaniza",
    "A la Mexicana, Rancheros o tirados",
    "Huevos divorciados", "Huevos motuleños",
    "Chilaquiles con huevos estrellados", "Omelete Combinado",
    "Huevos estrellados con entomatadas", "Huevos con picaditas preparadas"
  ],
  "Light": [
    "Cocktel de frutas natural chico", "Cocktel de frutas natural grande",
    "Cocktel de frutas preparado chico", "Cocktel de frutas preparado grande"
  ],
  "Tortas y sandwich": [
    "Tortas de milanesa, res o pollo", "Hamburguesa sencilla",
    "Club sandwich", "Hamburguesa gratinada", "Pepito de arrachera"
  ],
  "Caldos y sopas": [
    "Consome delicias", "Caldo tlalpeño", "Tezmole de panza"
  ],
  "Ensaladas": [
    "Del chef", "Delicias", "De atun"
  ],
  "Carnes": [
    "Carnes asada con picadas", "Carnes asada con chilaquiles",
    "Carnes asada con enfrijoladas", "Carnes asada con entomatadas"
  ],
  "Carnes Rojas": [
    "Milanesa de res a la tampiqueña", "Carne asada a la tampiqueña",
    "Milanesa de res", "Bistec encebollado o a la mexicana"
  ],
  "Aves": [
    "Filete de pechuga asado", "Fajitas de pollo a la mexicana",
    "Milanesa de pollo empanizada", "Milanesa de pollo a la tampiqueña"
  ],
  "Varios": [
    "Pieza de pan Dulce", "Orden de frijoles refritos", "Orden de guacamole",
    "Orde de papas a la francesa", "Quesadillas", "Queso fundido",
    "Enchiladas verdes o rojas", "Entomatadas o enfrijoladas",
    "Costilla de cerdo en salsa verde", "Taquitos con pollo preparados",
    "Chilaquiles con pollo", "Enchiladas suizas", "Tostadas delicias"
  ],
  "Especialidades": [
    "Arrachera a la tampiqueña", "Tacos de arrachera", "Pozole estilo jalisco",
    "Arrachera a la parrilla", "Milanesa de pollo gratinada", "Fajitas de arrachera",
    "Hamburguesa a la BBQ", "Parrilla para 2 personas", "Enchiladas de mole con pollo"
  ],
  "Menu Infantil": [
    "Milanesa infantil", "Nugetts de pollo", "Mini club sandwich"
  ],
  "Postres": [
    "Torta de Elote", "Duraznos en almibar", "Flan napolitano", "Pay de queso",
    "Pastel de tres leches", "Platanos fritos", "Gelatina de Agua", "Gelatina de leche"
  ],
  "Cafeteria": [
    "Americano", "Te de manzananilla", "Leche para nescafe", "Lechero chico", "Lechero Grande",
    "Capuchino sencillo", "Capuchino de cajeta, rompope, vainilla o chocolate"
  ],
  "Fuentes de sodas y bebidas": [
    "Vaso de agua grande", "Refresco", "1/2 jarra de agua de frutas", "1 Jarra de agua de frutas",
    "Cervezas (Corona, Victoria, Negra Modelo)", "Jugo de naranja chico", "Jugo de naranja grande",
    "Chocomilk chico", "Chocomilk grande", "Malteada de fresa chica", "Malteada de fresa grande",
    "Agua mineral", "Botella de agua", "Boing"
  ],
  "Preparados": [
    "Michelada o chelada", "Limonada o naranja preparada", "Jarra de limonada o naranjada preparada",
    "Clericot Copa", "Clericot Jarra"
  ],
  "Barra de licores": [
    "Torres X", "Etiqueta Roja", "Jimador", "Hornitos", "Cazadores"
  ]
};

/*************** Ventas iniciales y charts cache ***************/
const ventas = {};
Object.values(menu).flat().forEach(p => ventas[p] = 0);

const charts = {}; // guardará instancias Chart.js

/*************** Helpers ***************/
const slug = str =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const celdaIdDe = producto => `cnt-${slug(producto)}`;

/*************** Construcción dinámica de la tabla ***************/
function construirTabla() {
  const tbody = document.getElementById("menuBody");
  tbody.innerHTML = "";

  Object.entries(menu).forEach(([categoria, productos]) => {
    // fila cabecera de categoría
    const trHead = document.createElement("tr");
    trHead.classList.add("category-header");
    trHead.dataset.catSlug = slug(categoria);
    const th = document.createElement("th");
    th.colSpan = 4;
    th.textContent = categoria;
    trHead.appendChild(th);
    tbody.appendChild(trHead);

    // filas de productos
    productos.forEach(prod => {
      const tr = document.createElement("tr");
      tr.dataset.prod = prod;
      tr.dataset.cat = categoria;
      tr.dataset.catSlug = slug(categoria);

      const tdProd = document.createElement("td");
      tdProd.textContent = prod;

      const tdCat = document.createElement("td");
      tdCat.textContent = categoria;

      const tdCnt = document.createElement("td");
      tdCnt.id = celdaIdDe(prod);
      tdCnt.textContent = ventas[prod];

      const tdAcc = document.createElement("td");
      const btnAdd = document.createElement("button");
      btnAdd.className = "btn-add";
      btnAdd.textContent = "➕";
      btnAdd.addEventListener("click", () => { sumar(prod); });

      const btnRem = document.createElement("button");
      btnRem.className = "btn-remove";
      btnRem.textContent = "❌";
      btnRem.addEventListener("click", () => { restar(prod); });

      tdAcc.appendChild(btnAdd);
      tdAcc.appendChild(btnRem);

      tr.appendChild(tdProd);
      tr.appendChild(tdCat);
      tr.appendChild(tdCnt);
      tr.appendChild(tdAcc);

      tbody.appendChild(tr);
    });
  });
}

/*************** Actualizar contador en UI ***************/
function actualizarCelda(producto) {
  const id = celdaIdDe(producto);
  const el = document.getElementById(id);
  if (el) el.textContent = ventas[producto];
}

/*************** Acciones sumar/restar ***************/
function sumar(producto) {
  ventas[producto] += 1;
  actualizarCelda(producto);
}
function restar(producto) {
  if (ventas[producto] > 0) {
    ventas[producto] -= 1;
    actualizarCelda(producto);
  }
}

/*************** Filtrado en tiempo real ***************/
function filtrarTabla() {
  const filtro = document.getElementById("busqueda").value.trim().toLowerCase();
  const tbody = document.getElementById("menuBody");
  const filas = Array.from(tbody.querySelectorAll("tr"));

  // Mostrar/ocultar filas de producto
  filas.forEach(fila => {
    if (fila.classList.contains("category-header")) return; // cabeceras las manejamos después
    const nombre = (fila.dataset.prod || "").toLowerCase();
    const cat = (fila.dataset.cat || "").toLowerCase();
    const mostrar = !filtro || nombre.includes(filtro) || cat.includes(filtro);
    fila.style.display = mostrar ? "" : "none";
  });

  // Mostrar/ocultar cabeceras según si hay productos visibles en la categoría
  const cabeceras = Array.from(tbody.querySelectorAll(".category-header"));
  cabeceras.forEach(h => {
    const catSlug = h.dataset.catSlug;
    // buscar al menos una fila visible con ese catSlug
    const anyVisible = filas.some(f =>
      !f.classList.contains("category-header") &&
      f.dataset.catSlug === catSlug &&
      f.style.display !== "none"
    );
    h.style.display = anyVisible ? "" : "none";
  });
}

/*************** Gráficas (Chart.js) ***************/
function destruirChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

function graficaBarras(idCanvas, etiquetas, datos, titulo) {
  const ctx = document.getElementById(idCanvas).getContext("2d");
  destruirChart(idCanvas);
  charts[idCanvas] = new Chart(ctx, {
    type: "bar",
    data: { labels: etiquetas, datasets: [{ label: titulo, data: datos }] },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

function graficaPie(idCanvas, etiquetas, datos, titulo) {
  const ctx = document.getElementById(idCanvas).getContext("2d");
  destruirChart(idCanvas);
  charts[idCanvas] = new Chart(ctx, {
    type: "pie",
    data: { labels: etiquetas, datasets: [{ label: titulo, data: datos }] },
    options: { responsive: true }
  });
}

function mostrarResultados() {
  // Validar datos
  const productos = Object.keys(ventas);
  if (productos.length === 0) return;

  // Top y low
  const maxProd = productos.reduce((a, b) => ventas[a] >= ventas[b] ? a : b);
  const minProd = productos.reduce((a, b) => ventas[a] <= ventas[b] ? a : b);

  const fechaCaptura = document.getElementById("fecha").value || "Sin fecha";
  document.getElementById("resultados").innerHTML =
    `📅 ${fechaCaptura} &nbsp;&nbsp; ✅ Más vendido: <b>${maxProd}</b> (${ventas[maxProd]}) &nbsp; | &nbsp; ⚠️ Menos vendido: <b>${minProd}</b> (${ventas[minProd]})`;

  // Grafica por producto (todos)
  graficaBarras("graficaProductos", productos, productos.map(p => ventas[p]), "Ventas por producto");

  // Totales por categoria
  const etiquetasCat = Object.keys(menu);
  const datosCat = etiquetasCat.map(cat => menu[cat].reduce((acc, p) => acc + ventas[p], 0));
  graficaPie("graficaCategorias", etiquetasCat, datosCat, "Ventas por categoría");

  // Gráficas individuales por categoría (dinámicas)
  const cont = document.getElementById("graficasIndividuales");
  cont.innerHTML = "";
  etiquetasCat.forEach(cat => {
    const h3 = document.createElement("h3"); h3.textContent = `📈 ${cat}`;
    cont.appendChild(h3);
    const canvas = document.createElement("canvas");
    const canvasId = `chart-${slug(cat)}`;
    canvas.id = canvasId; canvas.width = 800; canvas.height = 360;
    canvas.className = "category-chart";
    cont.appendChild(canvas);

    graficaBarras(
      canvasId,
      menu[cat],
      menu[cat].map(p => ventas[p]),
      `Ventas ${cat}`
    );
  });
}

/*************** Excel (ExcelJS) - incluye fecha ***************/
async function generarExcel() {
  // Asegurar gráficas actualizadas (necesarias para capturar canvas)
  if (!charts["graficaProductos"] || !charts["graficaCategorias"]) {
    mostrarResultados();
  }

  const wb = new ExcelJS.Workbook();

  // Hoja Ventas (detalle)
  const ws = wb.addWorksheet("Ventas");
  ws.addRow(["Producto", "Categoría", "Ventas"]);
  Object.entries(menu).forEach(([cat, items]) => {
    items.forEach(p => ws.addRow([p, cat, ventas[p]]));
  });
  ws.columns = [{ width: 60 }, { width: 30 }, { width: 12 }];
  ws.getRow(1).font = { bold: true };

  // Hoja Resumen (incluye fecha)
  const fechaCaptura = document.getElementById("fecha").value || new Date().toISOString().split("T")[0];
  const etiquetasCat = Object.keys(menu);
  const totalesCat = etiquetasCat.map(cat => menu[cat].reduce((acc, p) => acc + ventas[p], 0));
  const productos = Object.keys(ventas);
  const maxProd = productos.reduce((a, b) => ventas[a] >= ventas[b] ? a : b);
  const minProd = productos.reduce((a, b) => ventas[a] <= ventas[b] ? a : b);

  const wr = wb.addWorksheet("Resumen");
  wr.addRow(["Fecha de captura", fechaCaptura]);
  wr.addRow([]);
  wr.addRow(["Más vendido", maxProd, ventas[maxProd]]);
  wr.addRow(["Menos vendido", minProd, ventas[minProd]]);
  wr.addRow([]);
  wr.addRow(["Totales por categoría"]);
  wr.addRow(["Categoría", "Total"]);
  etiquetasCat.forEach((c, i) => wr.addRow([c, totalesCat[i]]));
  wr.columns = [{ width: 36 }, { width: 20 }];

  // Hoja Gráficas: insertamos imágenes desde los canvas
  const wg = wb.addWorksheet("Gráficas");
  let rowOffset = 1;

  function insertarGrafica(canvasId, titulo) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    wg.getCell(`A${rowOffset}`).value = titulo;
    rowOffset += 1;
    const base64 = canvas.toDataURL("image/png").split(",")[1];
    const imgId = wb.addImage({ base64, extension: "png" });
    wg.addImage(imgId, { tl: { col: 0, row: rowOffset }, ext: { width: 800, height: 360 } });
    rowOffset += 22; // espacio vertical aproximado
    rowOffset += 1;
  }

  insertarGrafica("graficaProductos", "Ventas por producto");
  insertarGrafica("graficaCategorias", "Ventas por categoría");

  // individuales por categoría
  Object.keys(menu).forEach(cat => {
    insertarGrafica(`chart-${slug(cat)}`, `Ventas ${cat}`);
  });

  // Descargar con fecha en el nombre
  const fileName = `ventas_restaurante_${fechaCaptura}.xlsx`;
  const buffer = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), fileName);
}

/*************** Reinicio ***************/
function reiniciar() {
  Object.keys(ventas).forEach(p => {
    ventas[p] = 0;
    actualizarCelda(p);
  });
  document.getElementById("resultados").innerHTML = "";
  Object.keys(charts).forEach(id => destruirChart(id));
  document.getElementById("graficasIndividuales").innerHTML = "";
}

/*************** Init ***************/
document.addEventListener("DOMContentLoaded", () => {
  construirTabla();

  // Default fecha = hoy
  const fechaInput = document.getElementById("fecha");
  if (fechaInput && !fechaInput.value) {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    fechaInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Filtro
  document.getElementById("busqueda").addEventListener("input", filtrarTabla);
});

async function unirExcels() {
  const input = document.getElementById("archivosExcel");
  if (!input.files.length) {
    alert("Selecciona al menos un archivo Excel.");
    return;
  }

  // Objeto para acumular ventas totales
  const ventasTotales = {};
  Object.values(menu).flat().forEach(p => ventasTotales[p] = 0);

  for (const file of input.files) {
    const buffer = await file.arrayBuffer();
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buffer);

    // Suponemos que la hoja "Ventas" tiene los datos
    const ws = wb.getWorksheet("Ventas");
    if (!ws) continue;

    ws.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // saltar encabezado
      const prod = row.getCell(1).value;
      const cat = row.getCell(2).value;
      const cnt = parseInt(row.getCell(3).value) || 0;
      if (ventasTotales[prod] !== undefined) {
        ventasTotales[prod] += cnt;
      }
    });
  }

  // Mostrar resultados en tabla y gráficas
  Object.keys(ventasTotales).forEach(p => {
    ventas[p] = ventasTotales[p];
    actualizarCelda(p);
  });

  mostrarResultados();
  alert("Totales combinados de todos los excels cargados.");
}
