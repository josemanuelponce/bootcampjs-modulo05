// Variables
let puntuacion = 0;
let juegoTerminado = false;
let mensaje = "";

// Funcion para generar numero aleatorio y para no incluir el numero , 8, 9.
const generarNumeroAleatorio = (): number => {
   return Math.floor(Math.random() * 10);
    
}

const generarCarta = (numero : number): number => {
    if (numero > 7){
        return numero + 2;
    }else{
        return numero;
    }
}

// Funcion para generar carta aleatoria
const generarCartaAleatoria = (): number => {
    let valorCarta: number = generarNumeroAleatorio();

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
    } else if (valorCarta >= 8 && valorCarta <= 10) {
        return 0.5;
    } else {
        return 0;
    }
};

// Funcion para comprobar si ganaste o perdiste
const comprobarPartida = () => {
    if (puntuacion < 7.5) {
        mensaje = "";
    }else if (puntuacion === 7.5){
        mensaje = "¡Lo has clavado! ¡Enhorabuena!";
    }else{
        mensaje = "Game Over";
    }
    mostrarMensaje(mensaje);
    
};


// Funcion para comprobar como te quedaste de cerca cuando le das a plantarse
const comprobarPlantarse = () => {
    
    if (puntuacion <= 4 || puntuacion === 4.5) {
        mensaje = "Has sido muy conservador";
    } else if (puntuacion === 5 || puntuacion === 5.5) {
        mensaje = "Te ha entrado el canguelo eh?";
    } else if (puntuacion <= 6 || puntuacion === 6.5 || puntuacion === 7) {
        mensaje = "Casi casi...";
    } else if (puntuacion === 7.5) {
        mensaje = "¡Lo has clavado! ¡Enhorabuena!";
    }else {
        mensaje = "Game Over";
    }
};


// Funcion para mostrar puntuacion y game over
const muestraPuntuacion = () => {
    const elementoPuntuacion = document.getElementById("puntuacion");
    if (elementoPuntuacion !== null && elementoPuntuacion !== undefined && elementoPuntuacion) {
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
    puntuacion += valor;
    comprobarPartida();
    muestraPuntuacion();
};

document.addEventListener("DOMContentLoaded", () => {
    puntuacion = 0; 
    juegoTerminado = false;
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
    puntuacion += valor;
};




// Funcion para nueva partida
const nuevaPartida = () => {
    puntuacion = 0;
    juegoTerminado = false;
    muestraPuntuacion();
    mostrarMensaje("");
};


// Boton para empezar una nueva partida
const nuevaPartidabtn = document.getElementById("nueva");
if (nuevaPartidabtn !== null && nuevaPartidabtn !== undefined) {
nuevaPartidabtn.addEventListener("click", nuevaPartida);
}

document.addEventListener("DOMContentLoaded", muestraPuntuacion);


// Boton para dar carta
const botonCarta = document.getElementById("botonCarta");
if (botonCarta !== null && botonCarta !== undefined && botonCarta instanceof HTMLButtonElement) {
botonCarta.addEventListener("click",() => {
    dameCarta();
});
}


// Boton para boton Me planto
const BotonPlantarse = document.getElementById("BotonPlantarse");
if(BotonPlantarse !== null && BotonPlantarse !== undefined && BotonPlantarse instanceof HTMLButtonElement){
    
BotonPlantarse.addEventListener("click", () => {
    juegoTerminado = true;
    comprobarPlantarse();
    mostrarMensaje(mensaje);
    
});
}

// Boton para mostrar las cartas despues de plantarse para saber que habria pasado
const seguir = document.getElementById("seguir");
if (seguir !== null && seguir !== undefined && seguir instanceof HTMLButtonElement) {
seguir.addEventListener("click",() => {
    seguirPidiendo();
    
});
}



