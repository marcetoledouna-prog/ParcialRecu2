// PÁGINA OBRAS.HTML
// Galería de obras generada con JavaScript + dato curioso al azar

// ARRAY DE OBJETOS CON LAS 5 OBRAS DE LA GALERÍA

const obras = [

    {
        nombre: "Vectorial Elevation",
        anio: 1999,
        imagen: "https://www.lozano-hemmer.com/image_sets/vectorial_elevation/mexico_2000/vectorialelevation_mexico_02_t.jpg"
    },

    {
        nombre: "Body Movies",
        anio: 2001,
        imagen: "https://www.lozano-hemmer.com/image_sets/body_movies/rotterdam_2001/bodymovies_rotterdam_01_t.jpg"
    },

    {
        nombre: "Pulse Room",
        anio: 2006,
        imagen: "https://www.lozano-hemmer.com/image_sets/pulse_room/venice_2007/pulseroom_venice_01_t.jpg"
    },

    {
        nombre: "Pulse Park",
        anio: 2008,
        imagen: "https://www.lozano-hemmer.com/image_sets/pulse_park/new_york_2008/pulse_park_03_t.jpg"
    },

    {
        nombre: "33 Questions per Minute",
        anio: 2000,
        imagen: "https://www.lozano-hemmer.com/image_sets/33_questions_per_minute/havana_2000/33q_cuba_01_t.jpg"
    }

];


// ELEMENTO DONDE SE ARMA LA GALERÍA

let contenedorGaleria = document.querySelector("#galeria-obras");


// ARMAR LA GALERÍA USANDO for Y CONCATENACIÓN CON +

for (let i = 0; i < obras.length; i++) {

    contenedorGaleria.innerHTML += "<div class='obra'>" +
        "<img src='" + obras[i].imagen + "' alt='Obra " + obras[i].nombre + "'>" +
        "<p><strong>" + obras[i].nombre + "</strong></p>" +
        "<p>" + obras[i].anio + "</p>" +
        "</div>";

}


// CAMBIO DE DISEÑO DE LA GALERÍA

let botonDiseno = document.querySelector("#boton-diseno");

let disenoAlternativo = false;


botonDiseno.addEventListener("click", function () {

    let tarjetas = document.querySelectorAll(".obra");

    if (disenoAlternativo == false) {

        for (let i = 0; i < tarjetas.length; i++) {

            tarjetas[i].style.backgroundColor = "#3ab0ff";

            tarjetas[i].style.color = "#0d1b2a";

            tarjetas[i].style.maxWidth = "9rem";

        }

        disenoAlternativo = true;

    } else {

        for (let i = 0; i < tarjetas.length; i++) {

            tarjetas[i].style.backgroundColor = "#14213d";

            tarjetas[i].style.color = "#f2f2f2";

            tarjetas[i].style.maxWidth = "none";

        }

        disenoAlternativo = false;

    }

});


// DATO CURIOSO AL AZAR

const datosCuriosos = [

    "Rafael Lozano-Hemmer es un artista mexicano-canadiense especializado en instalaciones interactivas en espacios públicos.",

    "Su obra combina tecnología avanzada como sensores biométricos, robótica y datos en tiempo real.",

    "En su proyecto Vectorial Elevation, ciudadanos controlaban reflectores gigantes a través de internet.",

    "Pulse Room es una instalación que traduce los latidos cardíacos de los visitantes en pulsos de luz.",

    "Su trabajo explora la relación entre el cuerpo humano, la tecnología y la vigilancia.",

    "Ha expuesto sus obras en más de 70 países alrededor del mundo.",

    "Lozano-Hemmer estudió química física antes de dedicarse al arte, lo que influye en su enfoque tecnológico.",

    "Sus instalaciones suelen involucrar la participación activa del público para activar la obra.",

    "Fue ganador del prestigioso premio Ars Electronica por su innovador uso de tecnología en arte.",

    "Utiliza la luz como lenguaje poético para explorar temas de identidad, memoria y presencia."

];


let botonDato = document.querySelector("#boton-dato");

let textoDato = document.querySelector("#texto-dato");


botonDato.addEventListener("click", function () {

    let indiceAzar = Math.floor(Math.random() * datosCuriosos.length);

    textoDato.innerText = datosCuriosos[indiceAzar];

});
