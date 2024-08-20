const d = document;
const textarea = d.getElementById("miTextarea");
const muneco = d.querySelector(".result__img");
const carga = d.querySelector(".loader");
const resultadotext = d.getElementById("result__text");
const resulttitle = d.querySelector(".result__title"); // Cambiado a querySelector
const buttonencrip = d.getElementById("encriptarBtn");
const buttondesencrip = d.getElementById("desencriptarBtn");
const buttoncopiar = d.getElementById("copiarBtn");
const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"],
  ["a", "ai"],
];

function encriptarMensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1];
        break;
      }
    }
    mensajeEncriptado += encriptada;
  }
  return mensajeEncriptado;
}

function desencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;
  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
  }
  return mensajeDesencriptado;
}

// Ocultar elementos cuando se empieza a escribir
textarea.addEventListener("input", (i) => {
  if (i.target.value.trim() !== "") {
    muneco.style.display = "none";
    carga.classList.remove("hidden");
    resulttitle.textContent = "Capturando mensaje";
    resultadotext.textContent = "";
  } else {
    resetearInterfaz();
  }
});

// Función para encriptar
buttonencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  if (mensaje.trim() !== "") {
    let mensajeEncriptado = encriptarMensaje(mensaje);
    mostrarResultado(mensajeEncriptado, "El resultado es:");
  }
});

// Función para desencriptar
buttondesencrip.addEventListener("click", (d) => {
  d.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  if (mensaje.trim() !== "") {
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    mostrarResultado(mensajeDesencriptado, "El resultado es:");
  }
});

// Función para copiar
buttoncopiar.addEventListener("click", () => {
  const textoACopiar = resultadotext.textContent.trim();

  if (textoACopiar) {
    navigator.clipboard.writeText(textoACopiar).then(() => {
      mostrarMensajeCopiadoExitoso();
    }).catch(err => {
      console.error('Error al copiar el texto:', err);
      mostrarErrorCopia();
    });
  } else {
    console.error('No hay texto para copiar');
    mostrarErrorCopia();
  }
});

  
function mostrarMensajeCopiadoExitoso() {
  resulttitle.textContent = "El texto se copió con éxito";
  setTimeout(() => {
    resulttitle.textContent = "El resultado es:";
  }, 2000);
}

  
function mostrarErrorCopia() {
  resulttitle.textContent = "Error al copiar el texto";
  setTimeout(() => {
    resulttitle.textContent = "El resultado es:";
  }, 2000);
}

// Función para mostrar el resultado
function mostrarResultado(mensaje, titulo) {
  muneco.style.display = "none";
  carga.classList.add("hidden");
  resulttitle.textContent = titulo;
  resultadotext.textContent = mensaje;
  buttoncopiar.classList.remove("hidden");
}

// Función para resetear la interfaz
function resetearInterfaz() {
  muneco.style.display = "block";
  carga.classList.add("hidden");
  resulttitle.textContent = "Ningún mensaje fue encontrado";
  resultadotext.textContent = "Ingresa el texto que deseas encriptar o desencriptar.";
  buttoncopiar.classList.add("hidden");
}
