const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

toDoForm.classList.add("form-group", "w-25");
toDoInput.classList.add("form-control");

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        console.log(toDo);
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos();
}

function HandleCheckBox() {
    span = this.parentNode.querySelector("span");//여기서 this는 체크박스를 가리킴 checkbox에서 parentnode에 접근을 한다음 span에 접근함.
    if (this.checked) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify (toDos))//json is javascript object 어쩌고임. javascript는 바로 로컬 스토리지에데이터를 정상적으로 저장할 수 없음
}

function paintToDo(text){
    const li = document.createElement("li")
    const delBtn = document.createElement("button");
    const checkBox = document.createElement("input")
    checkBox.classList.add("form-chek")
    checkBox.type = "checkbox"
    const newId = toDos.length +1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteTodo)
    const span = document.createElement("span")
    span.innerText = text;
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text :text,
        id: newId,
    };
    toDos.push(toDoObj);
    saveToDos()
    checkBox.addEventListener("change", HandleCheckBox);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo){
        paintToDo(toDo.text)
    })
    }
};

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
};

init();