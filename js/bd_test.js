var bd_raw = ""; //contenido bd en crudo
var bd = new Array(); //array que contendrá el los registros de cada password
const div_bd_theory_i = document.getElementById("div-theory-i"); //div que mostrará la primera versión de la bd
const button_bd_theory_i = document.getElementById("print-bd-theory-i"); //botón para la primera versión de la bd
const div_bd_theory_ii = document.getElementById("div-theory-ii"); //div que mostrará la segunda versión de la bd
const button_bd_theory_ii = document.getElementById("print-bd-theory-ii"); //botón para la segunda versión de la bd

/* INICIALIZAMOS LA APLICACIÓN */
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
  var separator = " "; //haremos split en cada espacio del string

  for (var i = 0; i < bd_raw_array.length - 1; i++) {
    bd_item_array = bd_raw_array[i].split(separator);
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

/*
function startBD() {
  var bd_server = JSON.parse(sessionStorage.getItem("bd_server"));

  if (bd_server.started) {
    return;
  }

  //TODO 

  bd_server.started = true;
  sessionStorage.setItem("bd_server", JSON.stringify(bd_server));
}
*/

/** DAMOS FUNCIONALIDAD A LA APLICACIÓN */
//botón primera teoria de bd
//When user click first theory button…
if (button_bd_theory_i != null) {
  button_bd_theory_i.onclick = function () {
    var content = correctPasswordI();
    inject_content(content, div_bd_theory_i);
  };
}
//When user click second theory button…
if (button_bd_theory_ii != null) {
  button_bd_theory_ii.onclick = function () {
    var content = "Teoría II";
    inject_content(content, div_bd_theory_ii);
  };
}

//inject content in a container
function inject_content(content, container) {
  container.innerHTML = "";
  container.innerHTML += content;
}

//función que devuelve la cantidad de contraseñas correctas en la primera teoría de BD
function correctPasswordI() {
  
    var string = bd[1].password;
    var indices = [];

    for (var i = 0; i < string.length; i++) {
      if (string[i].toLowerCase() === bd[1].letter) indices.push(i);
    }

    /** control */
    console.log(bd[1].rule[0]);
    console.log(bd[1].rule[1]);
    console.log(bd[1].letter);
    console.log(bd[1].password);
    /** control */

    if (indices.length > bd[1].rule[0] && indices.length < bd[1].rule[1]) {
      console.log("aparece más de " + bd[1].rule[0] + " veces. Y menos de " + bd[1].rule[1] + " veces, por lo que: Contraseña correcta!");
    } else {
      console.log("aparece menos de " + bd[1].rule[0] + " veces o  más de " + bd[1].rule[1] + " veces, por lo que  contraseña incorrecta!");
    }
  
  return indices.length;
}
