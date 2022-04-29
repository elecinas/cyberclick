//These code take the document objects
const numbers_event_init = document.getElementById("print-numbers-button");
const numbers_event_erase = document.getElementById("erase-numbers-button");
const div_print = document.getElementById("print-div");

//When user click init button…
if (numbers_event_init != null) {
  numbers_event_init.onclick = function () {
    var content = create_numeric_sequence();
    inject_content(content, div_print);
  };
}

//When user click erase button…
if (numbers_event_erase != null) {
  numbers_event_erase.onclick = function () {
    div_print.innerHTML = "";
  };
}

//inject content in a container
function inject_content(content, container) {
  container.innerHTML = "";
  container.innerHTML += content;
}

//create sequence
function create_numeric_sequence() {
  var numeric_sequence = "";
  var new_numeric_sequence = "";
  var number_piece = "";

  for (let i = 1; i < 101; i++) {
    number_piece = " - " + changeNumberIfNeed(i);
    numeric_sequence = new_numeric_sequence + number_piece;
    new_numeric_sequence = numeric_sequence;
  }

  return numeric_sequence;
}

//Change number if it is need
function changeNumberIfNeed(number) {
  var new_number = number;

  if (number % 3 == 0) {
    new_number = "cyber";
  } 
  if (number % 5 == 0) {
    new_number = "click";
  } 
  if (number % 3 == 0 && number % 5 == 0) {
    new_number = "cyberclick";
  }

  return new_number;
}
