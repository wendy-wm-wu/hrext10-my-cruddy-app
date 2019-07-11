/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/

$(document).ready(function() {
 

  const addItems = document.querySelector('.add-items'); //select all added items from form class
  const itemsList = document.querySelector('.tasks'); //selecting all tasks from list
  const items = JSON.parse(localStorage.getItem('items')) || []; //get items from local storage; 
  const deleteBtn = document.querySelector('input[name="delete"]');
  // const toggleBtn = document.querySelector('input[name="check"]');

  function addItem(e) {
    e.preventDefault(); 
    let text = (this.querySelector('[name=item]')).value;  //selecting all the text inputs and extracting value from it 
    let item = {
      text,
      done: false
    };
    items.push(item);
    populateList(items, itemsList);  
    localStorage.setItem('items', JSON.stringify(items)); 
    this.reset(); 
  }

  function populateList(tasks = [], tasksList) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();
    tasksList.innerHTML = tasks.map((task, i) => {
      return `
        <li>
          <input class="box" type="checkbox" data-index=${i} id="items${i}" ${task.done ? 'checked' : ''} />
          <label for="items${i}">${task.text}</label>
          <br>
          <input class="star" type="checkbox" title="bookmark page">
          <div class="date">${mm}/${dd}/${yyyy}</div>
        </li>
      `;
    }).join(''); 
  }

  function toggle(e) {
    if(!e.target.matches('input')) return ; //skip this unless it's an input 
    let el = e.target; 
    let index = el.dataset.index; 
    // console.log(el); 
    // console.log(el.dataset);
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items)); 
    populateList(items, itemsList); 
  }


  $(deleteBtn).on('click', function() {
    let currentIndex;
    let text = (document.querySelector('[name=item]')).value;
    items.find(function(item, index) {
      if(item.text === text) {
        currentIndex = index;
        items.splice(currentIndex, 1);
      }
    });
    localStorage.setItem('items', JSON.stringify(items)); 
    populateList(items, itemsList); 
  })

  ////Checkboxes////

$('#checkAll').click(function() {
  $('.box').not(this).prop('checked',this.checked);
});


addItems.addEventListener('submit', addItem); 
itemsList.addEventListener('click', toggle); 


populateList(items,itemsList); 

////////Button - Toggle Checkboxes////////


})

