/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/

//Global Variables
// const addItems = document.querySelector('.form-inline');
// const itemsList = document.querySelector('.activities');
// const items = JSON.parse(localStorage.getItem('items')) || [];
///////

var createItem = function(key, value) {
  event.preventDefault();
  return window.localStorage.setItem(key, value);
}

var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

var showDatabaseContents = function() {
  $('tbody').html('');
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear(); 

    // var jsDate = $('#datepicker').datepicker('getDate');
    // if (jsDate !== null) { // if any date selected in datepicker
    // jsDate instanceof Date; // -> true
    // jsDate.getDate();
    // jsDate.getMonth();
    // jsDate.getFullYear();
    // }
  

  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    $('tbody').append(`<tr><td><input type="checkbox" id="checkbox${i}"></td><td>${key}</td><td>${window.localStorage.getItem(key)}</td><td><div class="date">${mm}/${dd}/${yyyy}</div></td></tr>`)
      event.preventDefault();
  }
}

var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null
}

var getKeyInput = function() {
  return $('.key').val();
}

var getValueInput = function() {
  return $('.value').val();
}

var resetInputs = function() {
  $('.key').val('');
  $('.value').val('');
}

$(document).ready(function() {
  showDatabaseContents();

  /////BUTTONS////////////
  $('.create').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        if(confirm('key already exists in database, do you want to update instead?')) {
          updateItem(getKeyInput(), getValueInput());
          showDatabaseContents();
        }
      } else {
        createItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      }
    } else  {
      alert('key and value must not be blank');
    }
  });

  $('.update').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        updateItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key and value must not be blank');
    }
  });

  $('.delete').click(function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key must not be blank');
    }
  });

  $('.reset').click(function() {
    resetInputs();
  });

  $('.clear').click(function() {
    if (confirm('WARNING: Are you sure you want to clear the database? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      showDatabaseContents();
    }
  });

 //////////Date/////////////
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear(); 
$('p').append(`<div class="date-header">Today's Date 📅: ${mm}/${dd}/${yyyy}</div>`);

/////////Clock/////////////////
function displayTime() {
  let date = new Date(); 
  let time = date.toLocaleTimeString();
  document.querySelector('.clock').textContent = time; 
}
displayTime(); 
const createClock = setInterval(displayTime, 1000); 

/////////Table//////////////
  $('#table').DataTable( {
        "order": [[ 3, "desc" ]],
        colReorder: true,
        autoFill: true
  });

  // $('#table tbody').on('mouseenter', 'td', function() {
  //   var colIdx = table.cell(this).index().column;

  //   $(table.cells().nodes()).removeClass('highlight');
  //   $(table.column(colIdx).nodes()).addClass('highlight'); 
  // });


////////Checkboxes/////////////
var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {};
console.log(checkboxValues);
var $checkboxes = $("#checkbox-container :checkbox");
console.log($checkboxes);

$checkboxes.on("change", function(){
  $checkboxes.each(function(){
    checkboxValues[this.id] = this.checked;
  });
  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

$.each(checkboxValues, function(key, value) {
  console.log(key, value);
  $("#" + key).prop('checked', value); //checkbox id
});

//////Button - Toggle Checkboxes//////////
let $button = $('.toggle'); 

function allChecked() {
  return $checkboxes.length === $checkboxes.filter(':checked').length; 
}

function updateButtonStatus() {
  $button.text(allChecked()? 'Uncheck all' : 'Check all'); 
}

$checkboxes.on('change', function() {
  updateButtonStatus();
});

function handleToggle(){
  $checkboxes.prop("checked", allChecked()? false : true)
}

$("button").on("click", function() {
  event.preventDefault(); 
  handleToggle();
});

////////Priority Dropdown////////////

$('.dropdown-toggle').dropdown();

// ///////Cube//////////////
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;


// function animate() {
//   requestAnimationFrame( animate );
//   renderer.render( scene, camera );
// }
// animate();

})

