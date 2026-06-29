let input = document.getElementById("task");
let add = document.getElementById("add");

add.addEventListener("click", async () => {
  let input_task = input.value.trim();

  if (input_task === "") {
    input.focus();
    return;
  }

  add.disabled = true;
  add.textContent = "Planning...";

  try {
    const response = await fetch("http://localhost:3000/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: input_task })
    });

    if (!response.ok) throw new Error("Server error");
    
    const data = await response.json(); 
    
    let task_container = document.createElement("div");
    task_container.classList.add("task-box");

    let stepsHtml = data.steps.map(step => `<li>${step}</li>`).join('');

    task_container.innerHTML = `
      <h3 class="task-title">${input_task}</h3>
      <ol class="steps-list">
        ${stepsHtml}
      </ol>
      <button class="delete-button">Delete Plan</button>
    `;

    document.getElementById("main-space").appendChild(task_container);
    input.value = "";

    let delete_btn = task_container.querySelector(".delete-button");
    delete_btn.addEventListener("click", () => {
      task_container.remove();
    });

  } catch (error) {
    console.error("Failed to fetch plan:", error);
    alert("Something went wrong while generating the plan. Please check your backend.");
  } finally {
    add.disabled = false;
    add.textContent = "Add";
  }
});