// Variables
let puntuacion = 0;

// Funcion para generar numero aleatorio y para no incluir el numero , 8, 9.
const generarNumeroAleatorio = (): number => {
   return Math.floor(Math.random() * 10);
    
}
// Funcion para generar carta
const generarCarta = (numero: number): number => {
    if (numero === 0) {
        return 1;
    }
    return numero > 7 ? numero + 2 : numero
    
};


// Funcion para poner valor a cada carta
const calcularCarta = (valorCarta: number): number => {
    if (valorCarta > 7) {
        return 0.5
    }else{
        return valorCarta;
    }
};

const sumarPuntos = (valor : number) => {
    puntuacion += valor;
};

// Funcion para bloquear botones
const bloquearCartaDAR = (estaBloqueado: boolean) => {
    const bloquearCarta = document.getElementById("botonCarta");
    if(bloquearCarta !== null && bloquearCarta !== undefined && bloquearCarta instanceof HTMLButtonElement){
        bloquearCarta.disabled = estaBloqueado;
    }
};

// Funcion bloquear boton para seguir
const bloquearCartaSeguir = (estaBloqueado: boolean) => {
    const bloquearCarta = document.getElementById("seguir");
    if(bloquearCarta !== null && bloquearCarta !== undefined && bloquearCarta instanceof HTMLButtonElement){
        bloquearCarta.disabled = estaBloqueado;
    }
};

bloquearCartaSeguir(true);

// Funcion bloquear boton Me planto
const bloquearCartaPlanto = (estaBloqueado: boolean) => {
    const bloquearCarta = document.getElementById("BotonPlantarse");
    if(bloquearCarta !== null && bloquearCarta !== undefined && bloquearCarta instanceof HTMLButtonElement){
        bloquearCarta.disabled = estaBloqueado;
    }
};


// Funcion para ganar o perder la partida
const gestionarPartida = () => {
    if (puntuacion === 7.5){
        ganarPartida();
    }
    if (puntuacion > 7.5) {
        perderPartida();
    }
};

// Funcion para ganar partida
const ganarPartida = () => {
    if (puntuacion === 7.5){
        mostrarMensaje("¡Lo has clavado! ¡Enhorabuena!");
        bloquearCartaDAR(true);
        bloquearCartaSeguir(true);
    }
};

// Funcion para perder partida
const perderPartida = () => {
    if (puntuacion > 7.5) {
        mostrarMensaje("Game Over");
        bloquearCartaDAR(true);
        bloquearCartaSeguir(true);
    }
};


// Funcion para comprobar como te quedaste de cerca cuando le das a plantarse
const comprobarPlantarse = () => {
    const mensaje = devolverMensajePlantarse();
    mostrarMensaje(mensaje);
    
    bloquearCartaDAR(true);
    bloquearCartaPlanto(true);
    bloquearCartaSeguir(false);
    gestionarPartida();
};

const devolverMensajePlantarse = () => {
    if (puntuacion <= 4 || puntuacion === 4.5) {
        return"Has sido muy conservador";
    } else if (puntuacion === 5 || puntuacion === 5.5) {
        return"Te ha entrado el canguelo eh?";
    } else if (puntuacion <= 6 || puntuacion === 6.5 || puntuacion === 7) {
        return"Casi casi...";
    } else if (puntuacion === 7.5) {
        return"¡Lo has clavado! ¡Enhorabuena!";
    }else {
        return"Game Over";
    }
    
};


// Funcion para mostrar puntuacion y game over
const muestraPuntuacion = () => {
    const elementoPuntuacion = document.getElementById("puntuacion");
    if (elementoPuntuacion !== null && elementoPuntuacion !== undefined && elementoPuntuacion instanceof HTMLDivElement) {
        elementoPuntuacion.innerHTML = `Tu puntuacion es ${puntuacion}`;
    }

};

// Funcion para mostrar carta
const obtenerUrlCarta = (valorCarta: number): string => {
    
    
    switch (valorCarta) {
        case 1:
            return "/src/img/1_as-copas.jpg";
        case 2:
            return "/src/img/2_dos-copas.jpg";
        case 3:
            return "/src/img/3_tres-copas.jpg";
        case 4:
            return "/src/img/4_cuatro-copas.jpg";
        case 5:
            return "/src/img/5_cinco-copas.jpg";
        case 6:
            return "/src/img/6_seis-copas.jpg";
        case 7:
            return "/src/img/7_siete-copas.jpg";
        case 10:
            return "/src/img/10_sota-copas.jpg";
        case 11:
            return "/src/img/11_caballo-copas.jpg";
        case 12:
            return "/src/img/12_rey-copas.jpg";
        default:
            return "/src/img/back.jpg";
    
}
};

// Funcion para mostrar la carta
const mostrarCarta = (carta: number) => {
    const cartaImg= document.getElementById("cartaImg");
    if(cartaImg !== null && cartaImg !== undefined && cartaImg instanceof HTMLImageElement){
        const imagenUrl = obtenerUrlCarta(carta);
        cartaImg.src = imagenUrl;
    }
};



// Funcion para dar carta aleatoria y game over
const dameCarta = () => {
    const numeroAleatorio = generarNumeroAleatorio();
    const carta = generarCarta(numeroAleatorio);
    mostrarCarta(carta);
    const valor = calcularCarta(numeroAleatorio);
    sumarPuntos(valor);
    gestionarPartida();
    muestraPuntuacion();
};

document.addEventListener("DOMContentLoaded", () => {
    puntuacion = 0; 
    muestraPuntuacion();
    mostrarMensaje("");
});





// Funcion para mostrar un mensaje
const mostrarMensaje = (mensaje: string) => {
    const elementoMensaje = document.getElementById("mensaje");
    if (elementoMensaje) {
        elementoMensaje.innerHTML = mensaje;
    } else {
        console.error("No se ha encontrado el elemento");
    }

};

// Funcion para saber que habria pasado cuando te plantas
const seguirPidiendo = () => {
    const numeroAleatorio = generarNumeroAleatorio();
    const carta = generarCarta(numeroAleatorio);
    mostrarCarta(carta);
    const valor = calcularCarta(numeroAleatorio);
    sumarPuntos(valor);
    gestionarPartida();
    muestraPuntuacion();
    comprobarPlantarse();
    
};


// Funcion para nueva partida
const nuevaPartida = () => {
    
    puntuacion = 0;
    muestraPuntuacion();
    mostrarMensaje("");
    bloquearCartaDAR(false);
    bloquearCartaSeguir(true);
    bloquearCartaPlanto(false);
    mostrarCarta(13);
};


// Boton para empezar una nueva partida
const nuevaPartidabtn = document.getElementById("nueva");
if (nuevaPartidabtn !== null && nuevaPartidabtn !== undefined && nuevaPartidabtn instanceof HTMLButtonElement) {
nuevaPartidabtn.addEventListener("click", nuevaPartida);
}

document.addEventListener("DOMContentLoaded", muestraPuntuacion);


// Boton para dar carta
const BotonCarta = document.getElementById("botonCarta");
if (BotonCarta !== null && BotonCarta !== undefined && BotonCarta instanceof HTMLButtonElement) {
BotonCarta.addEventListener("click",() => dameCarta());
}


// Boton para boton Me planto
const BotonPlantarse = document.getElementById("BotonPlantarse");
if(BotonPlantarse !== null && BotonPlantarse !== undefined && BotonPlantarse instanceof HTMLButtonElement){
BotonPlantarse.addEventListener("click", () => comprobarPlantarse());
}

// Boton para mostrar las cartas despues de plantarse para saber que habria pasado
const Seguir = document.getElementById("seguir");

if (Seguir !== null && Seguir !== undefined && Seguir instanceof HTMLButtonElement) {
Seguir.addEventListener("click",() => seguirPidiendo());
}



