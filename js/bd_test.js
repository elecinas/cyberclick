var bd_raw = ""; //contenido bd en crudo
var bd = new Array(); //array que contendrá el los registros de cada password
const div_bd_theory_i = document.getElementById("div-theory-i"); //div que mostrará la primera versión de la bd
const button_bd_theory_i = document.getElementById("print-bd-theory-i"); //botón para la primera versión de la bd
const button_erase_theory_i = document.getElementById("erase-bd-theory-i"); //botón para borrar la primera versión de la bd
const div_bd_theory_ii = document.getElementById("div-theory-ii"); //div que mostrará la segunda versión de la bd
const button_bd_theory_ii = document.getElementById("print-bd-theory-ii"); //botón para la segunda versión de la bd
const button_erase_theory_ii = document.getElementById("erase-bd-theory-ii"); //botón para borrar la segunda versión de la bd

/* 01 INICIALIZAMOS LA APLICACIÓN */
//creamos el objeto del que se harán instancias para cada registro
function makeBD() {
  register = {
    rule: "",
    letter: "",
    passpord: "",

    init: function (rule, letter, password) {
      this.rule = rule;
      this.letter = letter;
      this.password = password;
    },
  };
}

//obtenemos el contenido de la bd del archivo .json
//y lo almacenamos en la variable bd_content
function readInput() {
  const requestURL = "../json/data.json";
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const data = request.response;
    bd_raw = data["bd_content"];
    divideInputContent(); //TODO: sustituir por un return
  };
}

//distribuimos el contenido de la BD
function divideInputContent() {
  var bd_raw_array = bd_raw.split("?"); //separamos los registros y generamos un array
  var bd_item_array; //array que contiene todos los componentes de cada registro
  var bd_item_array_rule_array; //dentro del primer componente separaremos las dos cifras en un array
  var bd_item_array_letter; //esto almacena la letra a buscar en el segundo componente
  var object_register = ""; //variable que almacena las instancias de cada registro

  for (var i = 0; i < bd_raw_array.length - 1; i++) {
    bd_item_array = bd_raw_array[i].split(" ");
    bd_item_array_rule_array = bd_item_array[0].split("-");
    bd_item_array_letter = bd_item_array[1].charAt(0);

    //creamos los objetos registro para cada contraseña
    object_register = Object.create(register);
    object_register.init(
      bd_item_array_rule_array,
      bd_item_array_letter,
      bd_item_array[2]
    );
    //los metemos en el array que simulará el contenido de la bd
    bd.push(object_register);
  }
}

//FUNCION PARA INYECTAR CONTENIDO EN EL CONTENEDOR
function inject_content(content, container) {
  container.innerHTML = "";
  container.innerHTML += content;
}

//FUNCIÓN PARA BORRAR CONTENIDO DEL CONTENEDOR
function erase_content(container) {
  container.innerHTML = "";
}

/** 02 DAMOS FUNCIONALIDAD A LA APLICACIÓN DE LA PRIMERA PARTE DEL PROBLEMA */
//Funcionalidad botón imprimir primera teoría…
if (button_bd_theory_i != null) {
  button_bd_theory_i.onclick = function () {
    var content = correctPasswordI();
    inject_content(content + " contraseñas válidas.", div_bd_theory_i);
  };
}

//función que devuelve la cantidad de contraseñas correctas en la primera teoría de BD
function correctPasswordI() {
  var correct_passwords = 0;

  for (let i = 0; i < bd.length; i++) {
    var string = bd[i].password;
    var indices = [];
//control
    console.log(bd[i].password);
    console.log(bd[i].letter);
    console.log(bd[i].rule[0]);
    console.log(bd[i].rule[1]);
//control
    for (var j = 0; j < string.length; j++) {
      if (string[j].toLowerCase() === bd[i].letter) indices.push(j);
    }

    if (indices.length > bd[i].rule[0] && indices.length < bd[i].rule[1]) {
      correct_passwords += 1;
      //control
      console.log(bd[i].letter + ' aparece ' + indices.length + ' veces, es correcta.');
    }
  }

  return correct_passwords;
}

//Funcionalidad botón borrar primera teoría…
if (button_erase_theory_i != null) {
  button_erase_theory_i.onclick = function () {
    erase_content(div_bd_theory_i);
  };
}

/** 03 DAMOS FUNCIONALIDAD A LA APLICACIÓN DE LA SEGUNDA PARTE DEL PROBLEMA */
//When user click second theory button…
if (button_bd_theory_ii != null) {
  button_bd_theory_ii.onclick = function () {
    var content = correctPasswordII();
    inject_content(content + " contraseñas válidas.", div_bd_theory_ii);
  };
}

function correctPasswordII() {
  var correct_passwords = 0;

  for (let i = 0; i < bd.length; i++) {
    var string = bd[i].password;
    var string_pos = 0;
    var is_letter_1 = false;
    var is_letter_2 = false;
/*
    console.log(bd[i].password);
    console.log(bd[i].letter);
    console.log(bd[i].rule[0]);
    console.log(bd[i].rule[1]);
*/
    for (var j = 0; j < string.length; j++) {
      string_pos += 1;


      if (string[j].toLowerCase() === bd[i].letter && string_pos == bd[i].rule[0]) {
        is_letter_1 = true;
        /*console.log('está en la primera posición');*/
      }

      if (string[j].toLowerCase() === bd[i].letter && string_pos == bd[i].rule[1]) {
        is_letter_2 = true;
        /*console.log('está en la segunda posición');*/
      }
    }
    
    if(is_letter_1 ^ is_letter_2){
      correct_passwords += 1;
      /*console.log('¡válida!');*/
    }
  }

  return correct_passwords;
}

//Funcionalidad botón borrar segunda teoría…
if (button_erase_theory_ii != null) {
  button_erase_theory_ii.onclick = function () {
    erase_content(div_bd_theory_ii);
  };
}
