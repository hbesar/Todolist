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

document.getElementById("backModal").addEventListener("click", function () {
  document.getElementById("doneModal").style.display = "none";
});
document.getElementById("completed").addEventListener("click", function () {
  document.getElementById("doneModal").style.display = "flex";
});

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
      today >= endDate
        ? '<span class="expired">Time Is Up</span>'
        : `<span class="start">Start ${dateStart}</span>`;

    task.innerHTML = `<div class='first'><input type="checkbox" id="myCheck">
    <div id="tab"><strong>${title}</strong><p class= "descript">${desc}</p>
    <div class= 'due'><p class= "status">${status}</p><p class= "level">Priority : <span>${level}</span></p></div></div></div>
                        <div class="actions">
                        <p>Ex Date : ${dateEnd}</p>
                        <button class= "edit" onclick='editTask(this)'><img src="./frontend/assets/icon/edit.png" alt="edit"></button>
                        <button onclick='deleteTask(this)'><img src="./frontend/assets/icon/delete.png" alt="delete"></button>
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
document.getElementById("completed").addEventListener("click", function () {
  document.getElementById("taskDone").style.display = "flex";
});
