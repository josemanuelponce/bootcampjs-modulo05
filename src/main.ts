// Variables
let puntuacion = 0;
let juegoTerminado = false;


// Funcion para generar numero aleatorio y para no incluir el numero 7, 8, 9.
const generarCartaAleatoria = (): number => {
    let valorCarta: number = Math.floor(Math.random() * 12) + 1;

    if (valorCarta === 7 || valorCarta === 8 || valorCarta === 9) {
        valorCarta = generarCartaAleatoria(); 
    }

    return valorCarta;
};

// Funcion para poner valor a cada carta
const calcularCarta = (valorCarta: number): number => {
    if (valorCarta === 1) {
        return 1;
    } else if (valorCarta >= 2 && valorCarta <= 7) {
        return valorCarta;
    } else {
        return 0.5;
    }
};


// Funcion para mostrar puntuacion y game over
const muestraPuntuacion = () => {
    
    const elementoPuntuacion = document.getElementById("puntuacion");


    if (elementoPuntuacion) {
        if (juegoTerminado) {
            elementoPuntuacion.innerHTML = "Game Over";
        }else{
            elementoPuntuacion.innerHTML = `Tu puntuacion es ${puntuacion}`;
        }
    }else{
        console.error("No se ha encontrado el elemento con id intentos");
    }
};


// Funcion para dar carta aleatoria y game over
const dameCarta = () => {
    if (!juegoTerminado) {
        const valorCarta = generarCartaAleatoria();
        const valorRealCarta = calcularCarta(valorCarta);
        puntuacion += valorRealCarta;

        if (puntuacion > 7.5) {
            juegoTerminado = true;
        }

        muestraPuntuacion();

        return valorCarta;
    } else {
        return undefined; 
    }
};

document.addEventListener("DOMContentLoaded", () => {
    puntuacion = 0; 
    juegoTerminado = false;
    muestraPuntuacion();
    mostrarMensaje("");
});



// Funcion para mostrar carta

const mostrarCarta = (valorCarta: number): void => {
    const cartaImg: HTMLImageElement = document.getElementById("cartaImg") as HTMLImageElement;
    switch (valorCarta) {
        case 1:
            cartaImg.src = "/src/img/1_as-copas.jpg";
            break;
        case 2:
            cartaImg.src = "/src/img/2_dos-copas.jpg";
            break;
        case 3:
            cartaImg.src = "/src/img/3_tres-copas.jpg";
            break;
        case 4:
            cartaImg.src = "/src/img/4_cuatro-copas.jpg";
            break;
        case 5:
            cartaImg.src = "/src/img/5_cinco-copas.jpg";
            break;
        case 6:
            cartaImg.src = "/src/img/6_seis-copas.jpg";
            break;
        case 7:
            cartaImg.src = "/src/img/7_siete-copas.jpg";
            break;
        case 10:
            cartaImg.src = "/src/img/10_sota-copas.jpg";
            break;
        case 11:
            cartaImg.src = "/src/img/11_caballo-copas.jpg";
            break;
        case 12:
            cartaImg.src = "/src/img/12_rey-copas.jpg";
            break;
        default:
            cartaImg.src = "https://github.com/Lemoncode/fotos-ejemplos/blob/main/cartas/back.jpg";
    }
};

// Funcion para boton Me planto

const mostrarMensaje = (mensaje: string) => {
    const elementoMensaje = document.getElementById("mensaje");
    if (elementoMensaje) {
        elementoMensaje.innerHTML = mensaje;
    } else {
        console.error("mostrarMensaje: No se ha encontrado el elemento con id mensaje");
    }

};

const BotonPlantarse = document.getElementById("BotonPlantarse") as HTMLButtonElement;
BotonPlantarse.addEventListener("click", () => {
    juegoTerminado = true;
    muestraPuntuacion();
    
    let mensaje = ""; // Inicializa el mensaje vacío
    
    if (puntuacion <= 4 && puntuacion <= 4.5) {
        mensaje = "Has sido muy conservador";
    } else if (puntuacion === 5 && puntuacion <= 5.5) {
        mensaje = "Te ha entrado el canguelo eh?";
    } else if (puntuacion >= 6 && puntuacion <= 7) {
        mensaje = "Casi casi...";
    } else if (puntuacion === 7.5) {
        mensaje = "¡Lo has clavado! ¡Enhorabuena!";
    } else {
        mensaje = "Game Over";
    }
    
    mostrarMensaje(mensaje);
});

// Funcion para nueva partida

const nuevaPartida = () => {
    puntuacion = 0;
    juegoTerminado = false;
    muestraPuntuacion();
    mostrarMensaje("");
};

const nuevaPartidabtn = document.getElementById("nueva") as HTMLButtonElement;
nuevaPartidabtn.addEventListener("click", nuevaPartida);


document.addEventListener("DOMContentLoaded", muestraPuntuacion);



const botonCarta = document.getElementById("botonCarta") as HTMLButtonElement;
botonCarta.addEventListener("click",() => {
    if (!juegoTerminado) {
        const cartaElegida = dameCarta();
        if (cartaElegida) {
            console.log("carta elegida:", cartaElegida);
            mostrarCarta(cartaElegida);
            mostrarMensaje("");
        }
    }
});





