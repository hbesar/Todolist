const today = new Date();
const options = { weekday: "long", month: "short", day: "2-digit" };
const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);
const dateTime = document.getElementById("dateTime");

dateTime.innerHTML = formattedDate;

const newTask = document.getElementById("newTaskBtn");
const taskModal = document.getElementById("taskModal");
const closModal = document.getElementById("closeModal");

newTask.addEventListener("click", function () {
  taskModal.style.display = "flex";
});

closModal.addEventListener("click", function () {
  taskModal.style.display = "none";
});


const saveTask = document.getElementById("saveTask");

saveTask.addEventListener("click", function () {
  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;
  const level = document.getElementById("option").value;
  const start = document.getElementById("taskStart").value;
  const end = document.getElementById("taskEnd").value;


  if (start > end || end < start ) {
    alert('please fill the date correctly');
  } else if (title && desc && start && level && end ) {
    const taskList = document.getElementById("taskList");
    const task = document.createElement("div");
    task.classList.add("task");

    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateStart = new Intl.DateTimeFormat("en-US", options).format(
      startDate
    );

    const dateEnd = new Intl.DateTimeFormat("en-US", options).format(endDate);

    let status =
      today.getTime() > endDate.getTime() 
     ? '<span class="expired">Time Is Up</span>'
     : `<span class="start">${dateEnd}</span>`;

    task.innerHTML = `<div class='first'><input type="checkbox" class= "check">
    <div class= "tab"><strong>${title}</strong><p class= "descript">${desc}</p>
    <div class= 'due'><p class= "status">${dateStart}</p><p class= "level">Priority : <span>${level}</span></p></div></div></div>
                        <div class="actions">
                        <p>Ex Date : ${status}</p>
                        <div class= 'double'>
                        <button class= "edit" onclick='editTask(this)'><img src="./frontend/assets/icon/edit.png" alt="edit"></button>
                        <button onclick='deleteTask(this)'><img src="./frontend/assets/icon/delete.png" alt="delete"></button>
                        </div>
                        </div>`;
    taskList.appendChild(task);
  }
  taskModal.style.display = "none";
});


const list = document.querySelector('.task-list');

list.addEventListener('click', function(e){
    if(e.target.type === 'checkbox'){
        const task = e.target.closest('.task');
        const act = task.querySelector(".actions");
        const btnList = act.querySelector('p');

        const teksDone = document.createElement('div');
        teksDone.classList.add('btnDone');
        const btnDone = document.createTextNode('Done');

        teksDone.appendChild(btnDone);
        

        if (e.target.checked) {
            e.target.nextElementSibling.style.textDecoration = "line-through";
            act.replaceChild(teksDone, btnList);
        } else {
            e.target.nextElementSibling.style.textDecoration = "none";
            act.replaceChild(teksDone, btnList);
        } 
    }
});


const complete = document.getElementById('completed');
const doneModal = document.getElementById('doneMdl');
const noneModal = document.getElementById('noneModal');

const listDone = document.querySelector('completed');
const bkModal = document.querySelector ('.bkModal');
const backModal = document.querySelector('.backModal');

complete.addEventListener('click', function(){
  if(complete.className == 'completed') {
    doneModal.style.display = 'flex';
  } else {
  noneModal.style.display = 'flex';
  }
});

list.addEventListener('click', function(el) {

if (el.target.className == "btnDone") {
complete.classList.add('completed');


  const currentTime = new Date();
  const options = { weekday: "long", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"  };
  const formattedTime = currentTime.toLocaleString('en-US', options);

  const doneList = document.getElementById('containerDone');
  const taskDone = document.createElement('div');
  taskDone.classList.add('wrap');

  const task = el.target.closest('.task');
  const title = task.querySelector("strong").innerText;
  const desc = task.querySelector("p").innerText;


  taskDone.innerHTML =`<div class="script"><div class="task-content">
  <div class="title">${title}</div>
  <div class="description">${desc}</div>
  </div>
  <div><img src="./frontend/assets/icon/Vector.png" alt="check" />
  </div>
  </div>
  <hr class="solid" />
  <div class="dated">${formattedTime}</div>`
doneList.appendChild(taskDone);
el.target.parentElement.parentElement.remove();
}

});


backModal.addEventListener('click', function (){
  noneModal.style.display = 'none';
  
});

bkModal.addEventListener('click', function (){
  doneModal.style.display = 'none';
});


function deleteTask(btn) {
    if (confirm("Are you sure delete this task?")) {
        btn.parentElement.parentElement.parentElement.remove();
    }
};

function editTask(btn) {
  const task = btn.parentElement.parentElement.parentElement;
  const title = task.querySelector("strong").innerText;
  const desc = task.querySelector("p").innerText;

  document.getElementById("taskTitle").value = title;
  document.getElementById("taskDesc").value = desc;
  document.getElementById("taskModal").style.display = "flex";

  task.remove();
}



