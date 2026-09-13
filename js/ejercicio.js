// PÁGINA EXPERIENCIA.HTML
// Ejercicio: control de luces móviles de las obras de Lozano-Hemmer

/* Declaración de uso de IA:
Use IA para revisar si estaban bien los codigos resueltos por mi las validaciones, los cálculos
y la estructura general; usando las instrucciones vistas en clase y en los ejercicios me sugirio usar .disabled
En el botón "Reiniciar": acá sí reemplazó algo puntual. Originalmente ese botón usaba .style.display = "none" / "inline-block" para ocultarlo y mostrarlo. 
Lo cambié a .disabled = true / false para que quede visible todo el tiempo pero bloqueado hasta que hay resultados — así todo el archivo usa una sola técnica 
(.disabled) en vez de mezclar dos (.disabled para los campos y .style.display para el botón).
 Esto redujo a un solo punto de "código no visto textualmente" en vez de dos.*/

// ARRAY DE OBJETOS: acá se van a guardar los datos de cada obra

let obras = [];

let cantidadObras = 0;

let contadorObras = 0;


// ELEMENTOS DEL PASO 1

let inputCantidad = document.querySelector("#cantidad-obras");

let botonCantidad = document.querySelector("#boton-cantidad");


// ELEMENTOS DEL PASO 2

let textoProgreso = document.querySelector("#texto-progreso");

let inputNombre = document.querySelector("#nombre-obra");

let inputLuces = document.querySelector("#cantidad-luces");

let inputHoras = document.querySelector("#horas-funcionamiento");

let botonObra = document.querySelector("#boton-obra");


// ELEMENTOS DEL PASO 3

let inputConsumoLuz = document.querySelector("#consumo-luz");

let inputCostoKwh = document.querySelector("#costo-kwh");

let botonCalcular = document.querySelector("#boton-calcular");


// RESULTADOS Y REINICIO

let cajaResultados = document.querySelector("#resultados");

let botonReiniciar = document.querySelector("#boton-reiniciar");


// FUNCIÓN para redondear a 2 decimales usando Math.round 

function redondear(numero) {

    return Math.round(numero * 100) / 100;

}


// PASO 1: CONFIRMAR CANTIDAD DE OBRAS

botonCantidad.addEventListener("click", function () {

    let valor = Number(inputCantidad.value);

    if (isNaN(valor) || valor <= 0 || valor % 1 !== 0) {

        alert("Ingresá una cantidad de obras válida: un número entero mayor a 0.");

    } else {

        cantidadObras = valor;

        // Se deshabilita el paso 1 para que no se pueda modificar

        inputCantidad.disabled = true;

        botonCantidad.disabled = true;

        // Se habilita el paso 2

        inputNombre.disabled = false;

        inputLuces.disabled = false;

        inputHoras.disabled = false;

        botonObra.disabled = false;

        textoProgreso.innerText = "Obra 1 de " + cantidadObras;

    }

});


// PASO 2: AGREGAR CADA OBRA

botonObra.addEventListener("click", function () {

    let nombre = inputNombre.value;

    let luces = Number(inputLuces.value);

    let horas = Number(inputHoras.value);

    if (nombre.length == 0) {

        alert("Ingresá el nombre de la obra.");

    } else if (isNaN(luces) || luces <= 0) {

        alert("Ingresá una cantidad de luces válida, mayor a 0.");

    } else if (isNaN(horas) || horas <= 0 || horas > 24) {

        alert("Ingresá una cantidad de horas válida, entre 1 y 24.");

    } else {

        // Se agrega un nuevo objeto al array de obras

        obras.push({

            nombre: nombre,

            luces: luces,

            horas: horas

        });

        contadorObras++;

        // Se limpian los campos para cargar la siguiente obra

        inputNombre.value = "";

        inputLuces.value = "";

        inputHoras.value = "";

        if (contadorObras == cantidadObras) {

            // Ya se cargaron todas las obras: se deshabilita el paso 2

            inputNombre.disabled = true;

            inputLuces.disabled = true;

            inputHoras.disabled = true;

            botonObra.disabled = true;

            textoProgreso.innerText = "Carga de obras completa.";

            // Se habilita el paso 3

            inputConsumoLuz.disabled = false;

            inputCostoKwh.disabled = false;

            botonCalcular.disabled = false;

        } else {

            textoProgreso.innerText = "Obra " + (contadorObras + 1) + " de " + cantidadObras;

        }

    }

});


// PASO 3: CALCULAR RESULTADOS

botonCalcular.addEventListener("click", function () {

    let consumoLuz = Number(inputConsumoLuz.value);

    let costoKwh = Number(inputCostoKwh.value);

    if (isNaN(consumoLuz) || consumoLuz <= 0) {

        alert("Ingresá un consumo por hora de cada luz válido, mayor a 0.");

    } else if (isNaN(costoKwh) || costoKwh <= 0) {

        alert("Ingresá un costo por kWh válido, mayor a 0.");

    } else {

        // Se deshabilita el paso 3

        inputConsumoLuz.disabled = true;

        inputCostoKwh.disabled = true;

        botonCalcular.disabled = true;

        // ACUMULADOR para el consumo total

        let consumoTotal = 0;

        // Se toma la primera obra como referencia para buscar el máximo

        let obraMayorTiempo = obras[0];

        // CONTADOR de obras con más de 20 luces

        let cantidadMas20 = 0;

        for (let i = 0; i < obras.length; i++) {

            let consumoObra = obras[i].luces * obras[i].horas * consumoLuz;

            consumoTotal += consumoObra;

            if (obras[i].horas > obraMayorTiempo.horas) {

                obraMayorTiempo = obras[i];

            }

            if (obras[i].luces > 20) {

                cantidadMas20++;

            }

        }

        let consumoPromedio = consumoTotal / obras.length;

        let costoDiarioMayor = obraMayorTiempo.luces * obraMayorTiempo.horas * consumoLuz * costoKwh;

        let porcentajeMas20 = (cantidadMas20 / obras.length) * 100;

        // MOSTRAR RESULTADOS concatenando strings con +

        cajaResultados.innerHTML = "<h3 class='titulo3'>Resultados</h3>" +
            "<p>Consumo diario total: " + redondear(consumoTotal) + " kWh</p>" +
            "<p>Consumo diario promedio por obra: " + redondear(consumoPromedio) + " kWh</p>" +
            "<p>Obra con mayor tiempo de funcionamiento: " + obraMayorTiempo.nombre + " (" + obraMayorTiempo.horas + " hs/día)</p>" +
            "<p>Costo diario de esa obra: $" + redondear(costoDiarioMayor) + "</p>" +
            "<p>Porcentaje de obras con más de 20 luces: " + redondear(porcentajeMas20) + "%</p>";

        botonReiniciar.disabled = false;

    }

});


// BOTÓN REINICIAR: reinicia el ejercicio sin recargar la página

botonReiniciar.addEventListener("click", function () {

    // Se reinician las variables del array de obras y los contadores

    obras = [];

    cantidadObras = 0;

    contadorObras = 0;

    // PASO 1: se vuelve a habilitar y se limpia

    inputCantidad.value = "";

    inputCantidad.disabled = false;

    botonCantidad.disabled = false;

    // PASO 2: se limpia y se vuelve a deshabilitar

    textoProgreso.innerText = "Todavía no se confirmó la cantidad de obras.";

    inputNombre.value = "";

    inputLuces.value = "";

    inputHoras.value = "";

    inputNombre.disabled = true;

    inputLuces.disabled = true;

    inputHoras.disabled = true;

    botonObra.disabled = true;

    // PASO 3: se limpia y se vuelve a deshabilitar

    inputConsumoLuz.value = "";

    inputCostoKwh.value = "";

    inputConsumoLuz.disabled = true;

    inputCostoKwh.disabled = true;

    botonCalcular.disabled = true;

    // Se limpian los resultados y se oculta el botón de reiniciar

    cajaResultados.innerHTML = "";

    botonReiniciar.disabled = true;

});
