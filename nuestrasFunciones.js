const tablero = document.getElementById("tablero");
const selector = document.getElementById("dificultad");

function crearTablero(dificultad) {
  const [columnas, filas] = dificultad.split("x");
  tablero.innerHTML = "";
  
  const anchoCasilla = 800 / columnas;
  const altoCasilla = 400 / filas;

  for (let fila = 0; fila < filas; fila++) {
    for (let columna = 0; columna < columnas; columna++) {
      const casilla = document.createElement("div");
      casilla.classList.add("casilla");
      casilla.style.width = `${anchoCasilla}px`;
      casilla.style.height = `${altoCasilla}px`;
      tablero.appendChild(casilla);
    }
  }
}

selector.addEventListener("change", function () {
  const tamanioSeleccionado = selector.value;
  crearTablero(tamanioSeleccionado);
});

// Crear el tablero inicial
crearTablero(selector.value);