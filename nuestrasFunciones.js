document.addEventListener('DOMContentLoaded', function() {
    let filas = 15;
    let columnas = 15;
    let ancho = 30;
    let campo = [];
    let minas = 22;
    let estado = true;
    let comienzo = false;
    let banderas = 0;
    let tiempoRef = Date.now();
    let cronometrar = false;
    let acumulado = 0;
    let nombreSelect = document.getElementById("nameInput");
    const reinicio = document.getElementById("reinicio");
    const dificultad = document.getElementById("gamemode");
    const canvas = document.getElementById("miCanvas");
    let ctx = canvas.getContext('2d');

    /**
     * Crea un nuevo juego, dependiendo si es necesario por un cambio de dificultad
     * o por que simplemente necesita no caer en una casilla con mina
     * @method nuevoJuego
     */
    let nuevoJuego = () => {
        reiniciarVariables();
        limpiarCanvas(canvas);
        crearTablero();
        eventosCampo();
        crearCampo();
        actualizarCampo();
    }

    /**
     * Es una función, que se utiliza para reiniciar las variables, principalmente, para que
     * yo pueda reiniciar el tableero sin que haya efectos colaterales
     * @method reiniciarVariables
     */
    let reiniciarVariables = () => {
        estado = true;
        comienzo = false;
        banderas = 0;
        nombreSelect.disabled = false;
        acumulado = 0;
        cronometrar = false;
    };

    /**
     * esta funcion nos limpia el canvas para comenzar un nuevo juego y poder tirar confetti tranquilito
     * @param canvas
     * @method limpiarCanvas
     */
    let limpiarCanvas = (canvas) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    /**
     * Crea el tablero de juego, con celdas segun la dificultad elegida, pero en el HTML,
     * es el tablero visible
     * @method crearTablero
     */
    let crearTablero = () => {
        let html = ""
        for (let f = 0;f < filas; f++){
            html += `<tr>`
            for (let c = 0;c < columnas; c++){
                html += `<td id="casilla-${c}-${f}">`
                html += `</td>`
            }
            html += `</tr>`
        }
        let tableroHTML = document.getElementById("tablero")
        tableroHTML.innerHTML = html
        tableroHTML.style.width = columnas * ancho + "px";
        tableroHTML.style.height = filas * ancho + "px";
        tableroHTML.style.background = "#a29898";
    }

    /**
     * Crea el tablero de juego, con casillas segun la dificultad elegida, pero en el Javascript,
     * o sea es el tablero no visible, en el cual se realizan las operaciones.
     * @method crearCampo
     */
    let crearCampo = () => {
        vaciarCampo();
        ponerMinas();
        valorizarCampo();
        contarMinas();
    }

    /**
     * Permite vaciar el campo, o sea resetear todos los valores del campo anterior,
     * igualando el campo a un arreglo vacío y en cada arreglo vacío pushea otro arreglo vacío
     * @method crearTablero
     */
    let vaciarCampo = () => {
        campo = [];
        for (let c = 0; c < columnas; c++) {
            campo.push([]);
        }
    }

    /**
     * Permite poder utilizar la función matematica random y floor, de tal manera
     * que las minas, se coloquen de forma aleatoria, sin superponerse.
     * @method ponerMinas
     */
    let ponerMinas = () => {
        for(let i = 0;i < minas;i++){
            let c;
            let f;
            do{
                f = Math.floor(Math.random() * filas);
                c = Math.floor(Math.random() * columnas);
            } while (campo[c][f])
            campo[c][f] = {valor: -1};
        }

    }

    /**
     * Permite poder asignarle a todas las casillas que no tengan nada asignado
     * el valor momentaneo 0.
     * @method valorizarCampo
     */
    let valorizarCampo = () => {
        for (let c = 0;c < columnas;c++){
            for(let f = 0;f < filas;f++){
                if(!campo[c][f]){
                    campo[c][f] = {valor: 0};
                }
            }
        }
    }

    /**
     * Permite contar la cantidad de Minas que tiene una casilla a su alrededor
     * y devuelve el número cálculado
     * @method contar
     * @param columna
     * @param  fila
     */
    let contar = (columna,fila) => {
        let resultado = 0;
        for (let x = columna - 1; x <= columna + 1; x++) {
            for (let y = fila - 1; y <= fila + 1; y++) {
                if (x >= 0 && y >= 0 && x < filas && y < columnas && campo[x][y].valor === -1) {
                    resultado++;
                }
            }
        }
        return resultado;
    }

    /**
     * Es la función que se encarga de poder actualizar el valor de las casillas,
     * usando la función contar, asignamos ese valor a las casillas del campo
     * @method contarMinas
     */
    let contarMinas = () => {
        for (let c = 0;c < columnas;c++){
            for(let f = 0;f < filas;f++){
                if(campo[c][f].valor !==-1){
                    campo[c][f].valor = contar(c,f);
                }
            }
        }
    }

    /**
     * Permite verificar el estado del campo, de tal manera que lee los valores, y logra
     * interactuar con el tablero del HTML, para que cada uno de los valores de las casillas
     * tenga sentido a la hora de jugar, utilizando los estados "undefined", "destapado" y
     * "bandera", en caso de ser undefined, significa que la casilla está tapada, destapado
     * significa que está tapada, y la bandera significa que el usuario apretó para poner una
     * bandera, y cada uno de estos estados se programó de manera que tenga sentido con el j
     * juego clásico del buscaminas
     * @method actualizarCampo
     */
    let actualizarCampo = () => {
        for(let c = 0;c < columnas;c++){
            for(let f = 0;f < filas;f++){
                let casilla = document.getElementById(`casilla-${c}-${f}`);
                if(campo[c][f].estado === "destapado"){
                    casilla.style.boxShadow = "none";
                    switch (campo[c][f].valor){
                        case -1:
                            //es un favicon que usamos de la libreria font-awesome.
                            casilla.innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`;
                            casilla.style.background = "#cbc1c1";
                            break;
                        case 0:
                            break;
                        default:
                            casilla.innerHTML = campo[c][f].valor;
                    }
                }
                if(campo[c][f].estado === "bandera"){
                    casilla.innerHTML = `<i class="fa-solid fa-flag"></i>`;
                    casilla.style.color = "#001ed1";
                    casilla.style.transition = "none";
                }
                if(campo[c][f].estado === undefined){
                    casilla.innerHTML = ``;
                }
                if(campo[c][f].estado === "destapado"){
                    casilla.style.color = "black";
                }
            }
        }
        ganar();
        perder();
        actualizarContador();
        if(comienzo){
            nombreSelect.disabled = true;
        }
    }

    /**
     * Esta función se indica de ver si el jugador ha ganado, lo hace verificando que todas
     * las casillas con valor -1 estén tapadas, en caso contrario sale de la función y se activa
     * la funcion perder
     * @method ganar
     */
    let ganar = () => {
        let contador = 0;
        for(let c = 0;c < columnas;c++) {
            for (let f = 0; f < filas; f++) {
                if(campo[c][f].estado === "bandera" && campo[c][f].valor === -1){
                    contador++;
                }else if(campo[c][f].estado === "destapado" && campo[c][f].valor === -1) {
                    return;
                }
            }
        }
        if(contador === minas){
            let tableroHTML = document.getElementById("tablero");
            tableroHTML.style.background = "green";
            generarConfetti(canvas);
            estado = false;
            cronometrar = false;
        }
    };

    /**
     * Esta función se indica de ver si el jugador ha perdido, lo hace verificando si el
     * usuario destapó una mina, en ese caso el tablero se pone rojito.
     * @method perder
     */
    let perder = () => {
        for(let c = 0;c < columnas;c++){
            for(let f = 0;f < filas;f++){
                if(campo[c][f].estado === "destapado" && campo[c][f].valor === -1){
                    let tableroHTML = document.getElementById("tablero");
                    tableroHTML.style.background = "#db3b26";
                    estado = false;
                    cronometrar = false;
                }
            }
        }
        if(estado){
            return;
        }
        for(let c = 0;c < columnas;c++) {
            for (let f = 0; f < filas; f++) {
                if (campo[c][f].valor === -1) {
                    let casilla = document.getElementById(`casilla-${c}-${f}`);
                    casilla.innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`;
                    casilla.style.color = "black";
                }
            }
        }
    }

    /**
     * Esta función lo que se encarga, es de agregar el evento de clic del mouse, con la interacción
     * de las casillas.
     * @method eventosCampo
     */
    let eventosCampo = () => {
        for(let c = 0;c < columnas;c++){
            for(let f = 0;f < filas;f++){
                let casilla = document.getElementById(`casilla-${c}-${f}`);
                casilla.addEventListener("mouseup",me =>{
                    clic(casilla, c, f, me)
                })
            }
        }
    }

    /**
     * El rol de esta función es poder ingresar, que acciones va a a realizar el campo, dependiendo
     * del tipo de interacción que haga el mouse, abajo están especificado que hace cada caso, y
     * tambien permite que si el usuario aprieta en una casilla que sea distinta de cero, el programa
     * creara otro juego hasta que le toque una casilla con valor 0.
     * @method perder
     */
    let clic = (casilla, c, f, me) => {
        if(!estado){
            return;
        }
        if(campo[c][f].estado === "destapado"){
            return;
        }
        switch (me.button){
            case 0: //Click izquierdo
                if(campo[c][f].estado === "bandera"){
                    break;
                }
                while(!comienzo && campo[c][f].valor !== 0){
                    nuevoJuego();
                }
                campo[c][f].estado = "destapado";
                if(!comienzo){
                    cronometrar = true;
                }
                comienzo = true;
                if(campo[c][f].valor === 0){
                    areaRecursiva(c,f);
                }
                break;
            case 1: //Scroll
                break;
            case 2: //Click derecho
                if(campo[c][f].estado === "bandera"){
                    campo[c][f].estado = undefined;
                    banderas--;
                }else{
                    campo[c][f].estado = "bandera"
                    banderas++;
                }
                break;
            default:
                break;
        }
        actualizarCampo();
    }

    /**
     * Esta grosisima función lo que se realiza es que, utilizando el concepto de la recursividad,
     * cuando yo apriete, sobre una celda vacía, va a destapar, todas las casillas no destapadas, a su
     * alrededor, y si esa casilla tiene un valor 0, entonces la función se va a volver a llamar,
     * hasta que no queden casillas con valor 0 para liberar.
     * @method areaRecursiva
     * @param columna;
     * @param fila;
     */
    let areaRecursiva = (columna,fila) => {
        for (let x = columna - 1; x <= columna + 1; x++) {
            for (let y = fila - 1; y <= fila + 1; y++) {
                if(x >= 0 && y >= 0 && x < filas && y < columnas){
                    if(campo[x][y].estado === undefined) {
                        campo[x][y].estado = "destapado";
                        if(campo[x][y].valor === 0){
                            areaRecursiva(x,y)
                        }
                    }
                }
            }
        }
    }

    /**
     * Actualiza la cantidad de bombas que quedan según las banderas que marcaste, pero
     * tambien puede ser una cantidad negativa, dependiendo si el jugador puso más banderas que minas
     * @method actualizarContador
     */
    let actualizarContador = () => {
        let panel = document.getElementById("contador");
        panel.innerHTML = minas-banderas;
    }

    /**
     * Esto no es un método como tal, pero si es un evento que genera un nuevo juego si el usuario
     * aprieta el boton de reinicio
     */
    reinicio.addEventListener("click", function (){
        nuevoJuego();
    });

    /**
     * Es un evento que permite crear un nuevo evento mientras seleccionas la dificultad.
     */
    dificultad.addEventListener("change", function (){
        const dificultadSeleccionada = dificultad.value;

        if (dificultadSeleccionada === "facil") {
            filas = 15;
            columnas = 15;
            minas = 22;
            nuevoJuego();
        } else if (dificultadSeleccionada === "intermedio") {
            filas = 20;
            columnas = 20;
            minas = 50;
            nuevoJuego();
        } else if (dificultadSeleccionada === "dificil") {
            filas = 25;
            columnas = 25;
            minas = 94;
            nuevoJuego();
        }
    })

    /**
     * Es una función Es una función de temporización incorporada que se utiliza para
     * ejecutar repetidamente un bloque de código o una función con un intervalo de tiempo específico.
     * @method setInterval
     */
    setInterval(() => {
        let tiempo = document.getElementById("cronometro");
        if (cronometrar) {
            acumulado += Date.now() - tiempoRef;
        }
        tiempoRef = Date.now();
        tiempo.innerHTML = formatearTiempo(acumulado);
    }, 1000 / 60);

    /**
     * toma un valor de tiempo en milisegundos y lo convierte en una cadena de texto con el formato "HH:MM:SS.MMM",
     * donde HH son las horas, MM  los minutos, SS  los segundos y MMM  milisegundos.
     * @method setInterval
     */
    let formatearTiempo = (tiempo_ms) => {
        let St = Math.floor(tiempo_ms / 1000);
        let S = St % 60;
        let M = Math.floor((St / 60) % 60);
        let H = Math.floor(St / 3600);
        Number.prototype.ceros = function (n) {
            return (this + "").padStart(n, "0");
        }

        return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2);
    }

    /**
     * Esta funcion me genera el confetti que sale cuando el jugador gana la partida, creando particulas de los
     * diferentes colores seleccionados, para luego animarlos y obtener el festejo deseado
     * @method generarConfetti
     */
    let generarConfetti = (canvas) => {
        let particulas = [];

        const colors = ['#8ecc75', '#528fd3', '#e081b7']; //Colores del Confetti

        for (let i = 0; i < 300; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = Math.random() * 0.5 + 5;
            let color = colors[Math.floor(Math.random() * colors.length)];
            let speed = Math.random() * 30;
            let rota = Math.random() * 360;

            particulas.push({x, y, size, color, speed, rota});
        }
        /**
         * Esta funcion anima el confetti para que caiga en cascada
         * @method animarConfetti
         */
        let animarConfetti = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(let i=0; i<300; i++){
                let particula = particulas[i];
                particula.y += particula.speed;
                ctx.beginPath();
                ctx.save();
                ctx.fillStyle = particula.color;
                ctx.translate(particula.x, particula.y);
                ctx.rotate(-particula.rota * Math.PI / 180);
                ctx.fillRect(-particula.size/2, -particula.size/2, particula.size, particula.size);
                ctx.restore();
                ctx.closePath();
            }
            requestAnimationFrame(animarConfetti);
        };
        animarConfetti();
    };

    nuevoJuego();
});

