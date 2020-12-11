let todos = [];

const deleteTodo = event => {
    const deleteButton = event.target;
    const todo = deleteButton.parentNode;
    todo.parentNode.removeChild(todo);

    const cleanTodos = todos.filter(item => {
        return item.id !== parseInt(todo.id);
    });

    todos = cleanTodos;
    saveTodos(todos);
};

const HandleCheckBox = ({ target }) => {
    //여기서 this는 체크박스를 가리킴
    //checkbox에서 parentnode에 접근
    //이후 span에 접근함.
    const span = target.parentNode.querySelector("span");

    if(target.checked) return span.style.textDecoration = "line-through";

    return span.style.textDecoration = "none";
};

const saveTodos = (todos, name) => {
    //json is javascript object 어쩌고임.
    //javascript는 바로 로컬 스토리지에
    //데이터를 정상적으로 저장할 수 없음

    if(name !== undefined && name.length !== 0) {
        return localStorage.setItem(name, JSON.stringify(todos));        
    };

    return localStorage.setItem("toDos", JSON.stringify(todos));
};

const paintTodo = (text, todoList, name) => {
    const todoBox = document.createElement("li")
    const deleteButton = document.createElement("button");
    const checkBox = document.createElement("input");

    checkBox.classList.add("form-chek");
    checkBox.type = "checkbox";

    const newId = todos.length +1;

    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", deleteTodo);

    const span = document.createElement("span");
    span.innerText = text;

    todoBox.appendChild(checkBox);
    todoBox.appendChild(span);
    todoBox.appendChild(deleteButton);
    todoBox.id = newId;

    todoList.appendChild(todoBox);

    const todoObject = {
        id: newId,
        text: text,
    };

    todos.push(todoObject);

    saveTodos(todos, name);
    checkBox.addEventListener("change", HandleCheckBox);
};

const handleSubmit = event => {
    event.preventDefault();

    if(event.target.classList.contains("showing")) {
        const nameInput = event.target.children[0];

        return nameInput.parentNode.innerHTML = `<span>${nameInput.value}</span> 님 안녕하세요!`;
    };

    const todoInput = event.target.children[0];

    const todoList = document.querySelector(".js-toDoList");

    const name = document.querySelector(".js-form").children[0].innerHTML;

    const currentValue = todoInput.value;
    paintTodo(currentValue, todoList, name);

    todoInput.value = "";
};

const loadTodos = _ => {
    const todoList = document.querySelector(".js-toDoList");
    const loadedTodos = localStorage.getItem("toDos");

    if(loadedTodos === null || loadedTodos === "undefined") return false;
    
    const parsedTodos = JSON.parse(loadedTodos);

    parsedTodos.forEach(todo => {
        paintTodo(todo.text, todoList);
    });
};

window.onload = _ => {
    const todoForm = document.querySelector(".js-toDoForm");
    const todoInput = todoForm.querySelector("input");
    
    todoForm.classList.add("form-group", "w-25");
    todoInput.classList.add("form-control");
    
    loadTodos("toDos");
    todoForm.addEventListener("submit", handleSubmit);
};