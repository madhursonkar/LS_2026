let input = document.getElementById("task");
let add = document.getElementById("add");
let task_space = document.querySelector(".task-space-main");

add.addEventListener("click", () => {
  let input_task = input.value.trim();

  if (input_task === "") {
    input.focus();
    return;
  }

  let task_container = document.createElement("div");
  task_container.classList.add("task-box");

  task_container.innerHTML = `<p class="paragraph">${input_task}</p> 
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>`;

  document.getElementById("main-space").appendChild(task_container);
  input.value = "";

  let delete_btn = task_container.querySelector(".delete-button");
  delete_btn.addEventListener("click", () => {
    task_container.remove();
  });

  let para = task_container.querySelector(".paragraph");
  let editing = false;

  let edit_btn = task_container.querySelector(".edit-button");

  edit_btn.addEventListener("click", () => {
    if (!editing) {
      let input = document.createElement("input");
      input.type = "text";
      input.value = input_task;
      input.classList.add("edit-input");

      task_container.replaceChild(input, para);
      edit_btn.textContent = "Save";
      editing = true;
    } else {
      let edit_input = task_container.querySelector(".edit-input");
      para.textContent = edit_input.value;
      input_task = edit_input.value;

      task_container.replaceChild(para, edit_input);

      edit_btn.textContent = "Edit";
      editing = false;
    }
  });
});
