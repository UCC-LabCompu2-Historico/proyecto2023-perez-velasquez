document.addEventListener('DOMContentLoaded', function() {
    let filas = 20;
    let columnas = 20;
    let ancho = 30;
    let campo = [];
    let minas = (filas * columnas * 0.1);
    let estado = true;
    let comienzo = false;
    let banderas = minas;

    let nuevoJuego = () => {
        crearTablero();
        eventosCampo();
        crearCampo();
        actualizarCampo();
    }

    /**
     * Crea el tablero de juego, con celdas segun la dificultad
     * elegida, pero en el HTML, es el tablero visible
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
    }

    let crearCampo = () => {
        vaciarCampo();
        ponerBombas();
        valorizarCampo();
        contarBombas();
    }

    let vaciarCampo = () => {
        campo = [];
        for (let c = 0; c < columnas; c++) {
            campo.push([]);
        }
    }

    let ponerBombas = () => {
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

    let valorizarCampo = () => {
        for (let c = 0;c < columnas;c++){
            for(let f = 0;f < filas;f++){
                if(!campo[c][f]){
                    campo[c][f] = {valor: 0};
                }
            }
        }
    }

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
    let contarBombas = () => {
        for (let c = 0;c < columnas;c++){
            for(let f = 0;f < filas;f++){
                if(campo[c][f].valor !==-1){
                    campo[c][f].valor = contar(c,f);
                }
            }
        }
    }

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
            }
        }
    }

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
                while(!comienzo && campo[c][f].valor === -1){
                    nuevoJuego();
                }
                campo[c][f].estado = "destapado";
                comienzo = true;
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

    nuevoJuego();
});