const tablero = document.getElementById("tablero");
const selectDificultad = document.getElementById("dificultad");

function crearTablero(columnas, filas) {
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

selectDificultad.addEventListener("change", function () {
  const dificultadSeleccionada = selectDificultad.value;

  if (dificultadSeleccionada === "facil") {
    crearTablero(10, 5);
  } else if (dificultadSeleccionada === "intermedio") {
    crearTablero(20, 10);
  } else if (dificultadSeleccionada === "dificil") {
    crearTablero(40, 20);
  }
});

// Crear el tablero inicial
crearTablero(10, 5);
