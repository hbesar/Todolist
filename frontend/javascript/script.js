const today = new Date();
const options = { weekday: "long", month: "short", day: "2-digit" };
const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);

document.getElementById("dateTime").innerHTML = formattedDate;

document.getElementById("newTaskBtn").addEventListener("click", function () {
  document.getElementById("taskModal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("taskModal").style.display = "none";
});

document.querySelector(".backModal").addEventListener("click", function () {
  document.getElementById("noneModal").style.display = "none";
});
document.getElementById("backModal").addEventListener("click", function () {
  document.querySelector(".doneModal").style.display = "none";
});
const list = document.querySelector('.task-list');

list.addEventListener('click', function(e){
    if(e.target.type === 'checkbox'){
        const task = e.target.closest('.task');
        const act = task.querySelector(".actions");
        const btnList = act.querySelector('p');
        const teksDone = document.createElement('button');
        teksDone.classList.add('btnDone');
        const btnDone = document.createTextNode('Done');
        teksDone.appendChild(btnDone);
        console.log(teksDone);

        if (e.target.checked) {
            e.target.nextElementSibling.style.textDecoration = "line-through";
            act.replaceChild(teksDone, btnList);
        } else {
            e.target.nextElementSibling.style.textDecoration = "none";
            act.replaceChild(teksDone, btnList);
        }
    }
});



// list.addEventListener('click', function(e){


// if(e.target.checked){
//   let act = document.querySelector(".actions");
//   let btnList = list.getElementsByTagName('p')[3];
//   let teksDone = document.createElement('button');
//   teksDone.classList.add('btnDone')
//   let btnDone = document.createTextNode('Done');
//   teksDone.appendChild(btnDone);
// console.log(teksDone);


//   e.target.nextElementSibling.style.textDecoration = "line-through";
//   act.replaceChild(teksDone, btnList)
// } else {
//   e.target.nextElementSibling.style.textDecoration = "none";
//   act.replaceChild(teksDone, btnList);
// }
// });







document.getElementById("saveTask").addEventListener("click", function () {
  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;
  const level = document.getElementById("option").value;
  const start = document.getElementById("taskStart").value;
  const end = document.getElementById("taskEnd").value;

  if (title && desc && start && level && end) {
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

  document.getElementById("taskModal").style.display = "none";
});

function deleteTask(btn) {
  btn.parentElement.parentElement.remove();
}

function editTask(btn) {
  const task = btn.parentElement.parentElement;
  const title = task.querySelector("strong").innerText;
  const desc = task.querySelector("p").innerText;

  document.getElementById("taskTitle").value = title;
  document.getElementById("taskDesc").value = desc;
  document.getElementById("taskModal").style.display = "flex";

  task.remove();
}



