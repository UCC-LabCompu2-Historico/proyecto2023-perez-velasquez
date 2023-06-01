const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");
const selector = document.getElementById("tamanio");

function dibujarTablero(gamemode) {
    const [columnas, filas] = gamemode.split("x");
    const anchoCasilla = (canvas.width / columnas);
    const altoCasilla = (canvas.height / filas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {
            const x = columna * anchoCasilla;
            const y = fila * altoCasilla;

            ctx.fillStyle = "#ccc";
            ctx.fillRect(x, y, anchoCasilla, altoCasilla);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x, y, anchoCasilla, altoCasilla);
        }
    }
}
selector.addEventListener("change", function () {
    const tamanioSeleccionado = selector.value;
    dibujarTablero(tamanioSeleccionado);
});

// Dibujar el tablero inicial
dibujarTablero(selector.value);

let findeljuego = (id) =>{

}