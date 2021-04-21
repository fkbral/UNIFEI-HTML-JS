const form = document.querySelector("#new-todo-form");
const input = document.querySelector("#new-todo");
const list = document.querySelector("#todo-list");
const storedTodo = JSON.parse(localStorage.getItem("my-todo-app"));

const todoObject = storedTodo ? storedTodo : { list: [] };
const todoList = todoObject.list;

form.addEventListener("submit", addTodo);
renderTodos();

function addTodo(event) {
  event.preventDefault();

  if (input.value === "") {
    return;
  }

  todoList.push({
    title: input.value,
    done: false,
  });

  addTodoToHtml({
    title: input.value,
    done: false,
  });

  localStorage.setItem("my-todo-app", JSON.stringify(todoObject));

  input.value = "";
}

// Como poderíamos declarar a mesma função no formato de arrow function:

// const addTodoArrow = (event) => {
//  Conteúdo da função
// };

function addTodoToHtml(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const completeButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  li.dataset.identifier = todo.title;

  span.innerText = todo.title;

  completeButton.addEventListener("click", () => completeTodo(todo));

  deleteButton.innerText = "remover";
  deleteButton.addEventListener("click", () => deleteTodo(todo));

  if (todo.done) {
    li.classList.add("done");
  }

  li.appendChild(span);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);
  list.appendChild(li);
}

function completeTodoInHtml(todo) {
  const todoLi = list.querySelector(`[data-identifier="${todo.title}"]`);
  todoLi.classList.toggle("done");
}

function deleteTodoFromHtml(todo) {
  const todoLi = list.querySelector(`[data-identifier="${todo.title}"]`);
  list.removeChild(todoLi);
}

function completeTodo(todoToComplete) {
  const todoIndex = todoList.findIndex(
    (todo) => todo.title === todoToComplete.title
  );

  if (todoIndex < 0) {
    return;
  }

  completeTodoInHtml(todoToComplete);
  todoList[todoIndex].done = !todoList[todoIndex].done;

  localStorage.setItem("my-todo-app", JSON.stringify(todoObject));
}

function deleteTodo(todoToDelete) {
  const todoIndex = todoList.findIndex(
    (todo) => todo.title === todoToDelete.title
  );

  if (todoIndex < 0) {
    return;
  }

  todoObject.list.splice(todoIndex, 1);

  deleteTodoFromHtml(todoToDelete);
  localStorage.setItem("my-todo-app", JSON.stringify(todoObject));
}

function deleteTodoFilter(todoToDelete) {
  const filteredTodoList = todoList.filter((todo) => todo !== todoToDelete);

  localStorage.setItem("my-todo-app", JSON.stringify(filteredTodoList));
}

function renderTodos() {
  todoList.map((todo) => addTodoToHtml(todo));
}
