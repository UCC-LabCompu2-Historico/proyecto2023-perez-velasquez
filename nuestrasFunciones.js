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
    ponerBombas(filas,columnas);
    contarBombas(filas,columnas);
    mostrarCampo(filas,columnas);
    console.log(campo);
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
        if (campo[f][c] === -1) {
          let casilla = document.getElementById(`casilla-${c}-${f}`)
          casilla.innerHTML = `<i class="fas fa-bomb">B</i>`
          casilla.style.color = "black"
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
   * De una de las casillas
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
          resultado = resultado + 1;
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

  //Tablero inicial
  crearTablero(10, 5);
  crearCampo(10,5);
});
