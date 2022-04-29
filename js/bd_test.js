//array que contendrá el los registros de cada password
var bd = new Array();

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
    divideInputContent(data); 
  };
}

//and send data to makingBD() function
function divideInputContent(data) {
  console.log(data["bd_content"]);
  //TODO ALL…
}
//creamos el objeto del que se harán instancias para cada registroi
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
