document.addEventListener("DOMContentLoaded", function() {
  const tablero = document.getElementById("tablero");
  const selectDificultad = document.getElementById("gamemode");
  let campo = [];

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
        const casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.style.width = `${anchoCasilla}px`;
        casilla.style.height = `${altoCasilla}px`;
        tablero.appendChild(casilla);
      }
    }
  }

  /**
   * Permite poder vaciar el tablero en caso de ser necesario y
   * Permite crear el campo nulo, que luego sera completado
   * @method vaciarTableroJava
   * @param {int} filas
   * @param {int} columnas
   */
  let vaciarCampo = (filas,columnas) => {
    campo = [];
    for(let i = 0;i<filas;i++){
      campo.push([columnas]);
    }
    for(let c = 0;c < columnas;c++){
      for(let f = 0;f < filas;f++){
        campo[c][f] = {valor: 0};
      }
    }
  }

  /**
   * Coloca las bombas, en diferentes partes del tablero
   * garantizando que no se superpongan
   * @method ponerBombas
   * @param {int} columnas
   * @param {int} filas
   */
  let ponerBombas = (columnas,filas) => {
    let minas = columnas * filas * 0.1;
    for (let contador = 0; contador < minas; contador++) {
      let fil;
      let col;
      do {
        fil = Math.floor(Math.random() * filas);
        col = Math.floor(Math.random() * columnas);
      } while (campo[col][fil] !== -1)
      campo[fil][col] = {valor: -1}
    }
  }

  let contarBombas = (columnas,filas) => {

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
