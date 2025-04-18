  function updateGreeting() {
      const greetingElement = document.getElementById("greeting");
      const hours = new Date().getHours();
      let greetingText = "Hi There, ";

      if (hours >= 5 && hours < 12) {
          greetingText += "Good Morning";
      } else if (hours >= 12 && hours < 18) {
          greetingText += "Good Afternoon";
      } else if (hours >= 18 && hours < 22) {
          greetingText += "Good Evening";
      } else {
          greetingText += "Good Night";
      }

      greetingElement.textContent = greetingText;
      } updateGreeting();

  const today = new Date();
  const options = { weekday: "long", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);
  const dateTime = document.getElementById("dateTime");

      dateTime.innerHTML = formattedDate;

// Date Start Add Task
  window.addEventListener("DOMContentLoaded", () => {
      const today = new Date().toISOString().split("T")[0];
      const dateInput = document.getElementById('taskStart')
      dateInput.value = today;
  });

  const newTask = document.getElementById("newTaskBtn");
  const taskModal = document.getElementById("taskModal");
  const closModal = document.getElementById("closeModal");
  const saveTask = document.getElementById("saveTask");
  let taskBeingEdited = null;
  let isEditMode = false;

// + New Task Button
  newTask.addEventListener("click", function () {
      taskModal.style.display = "flex";
  });

// Save Button New Task
  saveTask.addEventListener("click", function () {
      const title = document.getElementById("taskTitle").value;
      const desc = document.getElementById("taskDesc").value;
      const level = document.getElementById("option").value;
      const start = document.getElementById("taskStart").value;
      const end = document.getElementById("taskEnd").value;

      if (!title || !desc || !level ) {
        return alert("Please fill in all fields correctly!");
      }

      if (start > end || end < start) {
        return alert('Please ensure the start date is before the end date.');
      }

      const taskList = document.getElementById("taskList");
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dateStart = new Intl.DateTimeFormat("en-US", options).format(startDate);
      const dateEnd = new Intl.DateTimeFormat("en-US", options).format(endDate);
      let status = today.getTime() > endDate.getTime() 
        ? '<span class="expired">Time Is Up</span>'
        : `<span class="start">Ex Date : ${dateEnd}</span>`;

      let levelClass = "";
        if (level === "High") {
          levelClass = "high-priority";
        } else if (level === "Medium") {
          levelClass = "medium-priority";
        } else if (level === "Low") {
          levelClass = "low-priority";
        }

      const taskContent = `<div class='first'><input type="checkbox" class= "check">
        <div class= "tab"><strong>${title}</strong><p class= "descript">${desc}</p>
        <div class= 'due'><p class= "status">Start : ${dateStart}</p>
        <p class= "level">Priority : <span class="${levelClass}">${level}</span></p></div></div></div>
        <div class="actions">
        <p>${status}</p>
        <div class= 'double'>
        <button class= "edit" onclick='editTask(this)'><img src="./frontend/assets/icon/edit.png" alt="edit"></button>
        <button onclick='deleteTask(this)'><img src="./frontend/assets/icon/delete.png" alt="delete"></button>
        </div>
        </div>`;

      if (isEditMode && taskBeingEdited) {

      // Edit Task
        taskBeingEdited.innerHTML = taskContent;
        taskBeingEdited.setAttribute("data-start", start);
        taskBeingEdited.setAttribute("data-end", end);
        taskBeingEdited = null;
        isEditMode = false;

      } else {

      // Tambah Task
        const task = document.createElement("div");
        task.setAttribute("data-start", start);
        task.setAttribute("data-end", end);
        task.classList.add("task");
        task.innerHTML = taskContent;
        taskList.appendChild(task);

      }
      // Reset form
        taskModal.style.display = "none";
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDesc").value = "";
        document.getElementById("option").value = "";
        document.getElementById("taskEnd").value = "";
  });

  closModal.addEventListener("click", function () {
        taskModal.style.display = "none";
        taskBeingEdited = null;
        isEditMode = false;
  });


  const complete = document.getElementById('completed');
  const doneModal = document.getElementById('doneMdl');
  const noneModal = document.getElementById('noneModal');
  const listDone = document.querySelector('completed');
  const bkModal = document.querySelector ('.bkModal');
  const backModal = document.querySelector('.backModal');
  const list = document.querySelector('.task-list');

// Cheked Task
  list.addEventListener('click', function(e){
        if(e.target.type === 'checkbox'){
        const task = e.target.closest('.task');
        const act = task.querySelector(".actions");
        const btnList = act.querySelector('p');

        const teksDone = document.createElement('button');
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

// Completed Button
  complete.addEventListener('click', function(){
        if(doneModal.className == 'completed') {
        doneModal.style.display = 'flex';
        } else {
        noneModal.style.display = 'flex';
        }
        });

  list.addEventListener('click', function(el) {
        if (el.target.className == "btnDone") {
        doneMdl.classList.add('completed');


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
        <div class="dated">${formattedTime}
        <button class= "listDel "onclick='deleteList(this)'><img src="./frontend/assets/icon/delete.png" alt="delete"></button>
        </div>`
        doneList.appendChild(taskDone);
        el.target.parentElement.parentElement.remove();
        }
console.log(el.target)
  });

// Back Button List Task
  backModal.addEventListener('click', function (){
        noneModal.style.display = 'none';

  });

// Back Button No Task
  bkModal.addEventListener('click', function (){
        doneModal.style.display = 'none';
  });


// Edit Button Task List
  function editTask(btn) {
        const task = btn.closest('.task');
        const title = task.querySelector("strong").innerText;
        const desc = task.querySelector("p.descript").innerText;
        const levelText = task.querySelector(".level span").innerText;
        const start = task.getAttribute("data-start");
        const end = task.getAttribute("data-end");


        document.getElementById("taskTitle").value = title;
        document.getElementById("taskDesc").value = desc;
        document.getElementById("option").value = levelText;
        document.getElementById("taskStart").value = start;
        document.getElementById("taskEnd").value = end;


        taskBeingEdited = task;
        isEditMode = true;

        document.getElementById("taskModal").style.display = "flex";
  };  


// Delete Button Task List
  function deleteTask(btn) {
        if (confirm("Are you sure delete this task?")) {
            btn.parentElement.parentElement.parentElement.remove();
        }
  };

// Delete Button Task List Done
  function deleteList(btn) {
        const del = btn.parentElement.parentElement;
        const doneList = document.getElementById("containerDone");

        if (confirm("Are you sure delete this task?")) {
          del.remove();
        }


        if (doneList.children.length === 0) {
          doneModal.style.display = "none"; 
          noneModal.style.display = "flex"; 
          doneModal.classList.remove("completed");
        }
  };