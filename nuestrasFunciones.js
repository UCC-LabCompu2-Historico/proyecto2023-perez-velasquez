document.addEventListener("DOMContentLoaded", function() {
  const tablero = document.getElementById("tablero");
  const selectDificultad = document.getElementById("gamemode");
  
  /**
    * Crea el tablero de juego, con celdas segun la dificultad elegida
    * @method crearTablero
    * @param {const} columnas
    * @param {const} filas
    */
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
  
  /**
    * Selecciona la dificultad del juego y, en consecuencia, crea el
    * tablero efectivamente llamando a la función correspondiente
    * @method selectDificultad
    */
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
  
  //Tablero inicial
  crearTablero(10, 5);
  
  });