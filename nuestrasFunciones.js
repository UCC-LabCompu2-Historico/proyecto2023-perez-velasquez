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
        casilla.id = `celda-${columna}-${fila}`;
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
    ponerBombas(filas,columnas);
    console.log(campo);
  }

  /**
   * Permite mantener actualizado el campo (tablero del js)
   * Con los cambios del usuario
   * @method mostrarCampo
   * @param {int} columnas
   * @param {int} filas
   */
  let mostrarCampo = (columnas,filas) =>{

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

  /**
   * Coloca las bombas, en diferentes partes del tablero
   * garantizando que no se superpongan
   * @method ponerBombas
   * @param {int} columnas
   * @param {int} filas
   */
  let ponerBombas = (filas,columnas) => {
    let minas = columnas * filas * 0.2;
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
   * De cada una de las casillas
   * @method contarBombas
   * @param {int} columnas
   * @param {int} filas
   * @param {int[][]} arreglo
   */
  let contarBombas = (arreglo,columnas,filas) => {
    for (let c = 0;c < columnas;c++){
      for(let f = 0;f < filas;f++){
        if(!campo[f][c]){
          campo[f][c] = 0;
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

  //Tablero inicial
  crearTablero(10, 5);
  crearCampo(10,5);
});
/*
  function contarLado(arreglo, fila, columna) {
    let total = 0
    if (fila - 1 >= 0 && columna - 1 >= 0) {
      if (arreglo[fila - 1][columna - 1] == "b") {
        total = total + 1
      }
    }
    if (fila - 1 >= 0) {
      if (arreglo[fila - 1][columna] == "b") {
        total = total + 1
      }
    }
    if (fila - 1 >= 0 && columna + 1 < 10) {
      if (arreglo[fila - 1][columna + 1] == "b") {
        total = total + 1
      }
    }
    if (columna + 1 < 10) {
      if (arreglo[fila][columna + 1] == "b") {
        total = total + 1
      }
    }
    if (fila + 1 < 10 && columna + 1 < 10) {
      if (arreglo[fila + 1][columna + 1] == "b") {
        total = total + 1
      }
    }
    if (fila + 1 < 10) {
      if (arreglo[fila + 1][columna] == "b") {
        total = total + 1
      }
    }
    if (fila + 1 < 10 && columna - 1 >= 0) {
      if (arreglo[fila + 1][columna - 1] == "b") {
        total = total + 1
      }
    }
    if (columna - 1 >= 0) {
      if (arreglo[fila][columna - 1] == "b") {
        total = total + 1
      }
    }
    return total
  }
*/