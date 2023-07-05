document.addEventListener("DOMContentLoaded", function() {
    const tablero = document.getElementById("tablero");
    const selectDificultad = document.getElementById("gamemode");
    let campo = [];
    let enJuego = true
    let juegoiniciado = false;
    let banderas = 0;
    /**
     * Crea el tablero de juego, con celdas segun la dificultad
     * elegida, pero en el HTML, es el tablero visible
     * @method crearTablero
     * @param {int} columnas
     * @param {int} filas
     */
    let crearTablero = (columnas, filas) => {
        tablero.innerHTML = "";

        const anchoCasilla = 800 / columnas;
        const altoCasilla = 400 / filas;
        for (let fila = 0; fila < filas; fila++) {
            for (let columna = 0; columna < columnas; columna++) {
                let casilla = document.createElement("button");
                casilla.classList.add("casilla");
                casilla.id = `casilla-${columna}-${fila}`;
                casilla.style.width = `${anchoCasilla}px`;
                casilla.style.height = `${altoCasilla}px`;
                tablero.appendChild(casilla);
            }
        }
    }

    /**
     * Permite poder crear el tablero en caso de ser necesario,
     * Pero es el tablero del javascript
     * @method crearCampo
     * @param {int} columnas
     * @param {int} filas
     */
    let crearCampo = (filas,columnas) =>{
        vaciarCampo(filas,columnas);
        eventosCampo(filas,columnas);
        ponerBombas(filas,columnas);
        contarBombas(filas,columnas);
        mostrarCampo(filas,columnas);
        console.log(campo);
        console.log(tablero);
    }

    /**
     * Permite ingresar los eventos sobre el campo (tablero del js)
     * Con los cambios del usuario
     * @method eventosCampo
     * @param {int} columnas
     * @param {int} filas
     */
    let eventosCampo = (filas,columnas) =>{
        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                let casilla = document.getElementById(`casilla-${f}-${c}`)
                casilla.addEventListener("mouseup",me=>{
                    simpleclick(casilla,f,c,me)
                })
            }
        }
    }

    /**
     * Permite ingresar los eventos del Mouse que interactuan con
     * el campo, que es el tablero del Javascript
     * @method eventosCampo
     * @param {int} columna
     * @param {int} fila
     * @param {element} casilla
     * @param {function} me
     */

    let simpleclick = (casilla,fila,columna,me) => {
        if(!enJuego){
            return;
        }
        if(casilla.value === "descubierto"){
            return;
        }
        switch (me.button){
            case 0://el 0 nos indica que es el click izquierdo
                if(casilla.value === "marcado"){
                    break;
                }
                while(juegoiniciado && campo[fila][columna] !== 0){
                    crearCampo(filas,columnas);
                }
                casilla.value = "descubierto";
                juegoiniciado = true;
                break;
            case 1:
                break;
            case 2:
                if(casilla.value === "marcado"){
                    casilla.value = "cubierto";
                    banderas--;
                }else{
                    casilla.value = "marcado"
                    banderas++;
                }
                break;
        }
    }

    /**
     * Permite mantener actualizado el campo (tablero del js)
     * Con los cambios del usuario
     * @method mostrarCampo
     * @param {int} columnas
     * @param {int} filas
     */
    let mostrarCampo = (filas,columnas) =>{
        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                let casilla;
                switch (campo[f][c]){
                    case -1:
                        casilla = document.getElementById(`casilla-${f}-${c}`)
                        casilla.innerHTML = '<span class="bomb-letter">B</span>';
                        casilla.value = "cubierto";
                        break;
                    case 0:
                        casilla = document.getElementById(`casilla-${f}-${c}`)
                        casilla.innerHTML = '<span class="vacia"></span>';
                        casilla.value = "cubierto";
                        break;
                    default:
                        casilla = document.getElementById(`casilla-${f}-${c}`)
                        casilla.innerHTML = `<span class="contorno">${campo[f][c]}</span>`;
                        casilla.value = "cubierto";
                        break;
                }
            }
        }
    }

    /**
     * Permite poder vaciar el tablero en caso de ser necesario y
     * Permite crear el campo nulo, que luego sera completado
     * @method vaciarCampo
     * @param {int} columnas
     * @param {int} filas
     */
    let vaciarCampo = (filas,columnas) => {
        campo = [];
        for (let f = 0; f < filas; f++) {
            campo.push([])
            for (let c = 0; c < columnas; c++) {
                campo[f].push(0)
            }
        }
    }

    //
    tablero.addEventListener("click", function() {
        // Obtener todos los inputs
        let inputs = document.getElementsByTagName("input");

        // Recorrer los inputs y desactivarlos
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
        // Iniciar el cronómetro
        startTime = new Date();

        // Actualizar el cronómetro cada segundo
        setInterval(actualizarCronometro, 1000);
    });

    function actualizarCronometro() {
        let currentTime = new Date();
        let tiempoTranscurrido = Math.floor((currentTime - startTime) / 1000);

        // Mostrar el tiempo transcurrido en el cronómetro
        let cronometro = document.getElementById("cronometro");
        cronometro.innerHTML = tiempoTranscurrido + " seg";
    }

    /**
     * Coloca las bombas, en diferentes partes del tablero
     * garantizando que no se superpongan
     * @method ponerBombas
     * @param {int} columnas
     * @param {int} filas
     */
    let ponerBombas = (filas,columnas) => {
        let minas = columnas * filas * 0.1;
        let contador = 0;
        do{
            let fil = Math.floor(Math.random() * filas);
            let col = Math.floor(Math.random() * columnas);
            if(campo[fil][col]===0){
                campo[fil][col]=-1;
                contador++;
            }
        }while(contador<minas)
    }
    /**
     * Permite contabilizar las cantidad de bombas en el perimetro
     * De una de las casillas en la posición (fila,columna)
     * @method contarBombas
     * @param {int} filas
     * @param {int} columnas
     * @param {int} fila
     * @param {int} columna
     */
    let contar = (filas, columnas, fila, columna) => {
        let resultado = 0;
        for (let x = fila - 1; x <= fila + 1; x++) {
            for (let y = columna - 1; y <= columna + 1; y++) {
                if (x >= 0 && y >= 0 && x < filas && y < columnas && campo[x][y] === -1) {
                    resultado++;
                }
            }
        }
        return resultado;
    }


    /**
     * Permite contabilizar las cantidad de bombas en el perimetro
     * De cada una de las casillas
     * @method contarBombas
     * @param {int} columnas
     * @param {int} filas
     */
    let contarBombas = (filas,columnas) => {
        for (let f = 0;f < filas;f++){
            for(let c = 0;c < columnas;c++){
                if(campo[f][c]===0){
                    campo[f][c] = contar(filas,columnas,f,c);
                }
            }
        }
    }

    /**
     * Selecciona la dificultad del juego y, en consecuencia, crea el
     * tablero efectivamente llamando a la función correspondiente
     * @method selectDificultad
     */
    selectDificultad.addEventListener("change", function () {
        const dificultadSeleccionada = selectDificultad.value;

        if (dificultadSeleccionada === "facil") {
            crearTablero(10, 5);
            crearCampo(10,5);
        } else if (dificultadSeleccionada === "intermedio") {
            crearTablero(20, 10);
            crearCampo(20,10);
        } else if (dificultadSeleccionada === "dificil") {
            crearTablero(40, 20);
            crearCampo(40,20);
        }
    });


    /**
     // Obtén una referencia al elemento Canvas y su contexto
     var canvas = document.getElementById("canvas");
     var ctx = canvas.getContext("2d");

     // Configura el color inicial del Canvas
     var canvasColor = "#FFFFFF";

     // Detecta el clic en una casilla
     canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    // Comprueba si la casilla con coordenadas (mouseX, mouseY) es una bomba
    var esBomba = comprobarSiEsBomba(mouseX, mouseY);

    // Cambia el color del Canvas si la casilla es una bomba
    if (esBomba) {
        canvasColor = "#FF0000"; // Cambia el color a rojo
    }

    // Dibuja en el Canvas
    dibujarCanvas();
});

     */
    //Tablero inicial
    crearTablero(10, 5);
    crearCampo(10,5);
});