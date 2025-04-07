let input = document.getElementById("inp");
let addTask = document.querySelector("#btn");
let type = document.querySelector("#dropdown");
let list = document.querySelector("#list");

let id = 0;
let arr = JSON.parse(localStorage.getItem("todoList")) || [];

function filterTask(){
    list.innerHTML="";

    arr.forEach(obj=>{
        if(type.value==="All" ||type.value===obj.status){
            if(obj.delete==="false"){
                createList(obj);
            }
        }
    });
}

function updateId(obj) {
    let len = arr.length;
    if (len == 0) {
        id = 0;
    } else {
        id = arr[len - 1].id + 1;
    }
}


function saveToLocalStorage(obj) {
    localStorage.setItem("todoList", JSON.stringify(arr));
}

function createspan(taskValue) {
    const span = document.createElement("span");
    span.textContent = taskValue;
    span.style.flex = "1";
    return span;
}

function createCheckbox(obj) {
    const chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.style.marginRight = "0px";
    chkbox.style.position = "relative";
    chkbox.style.left = "-1%";
    chkbox.style.top = "-0px";
    chkbox.checked = obj.status == "checked";

    chkbox.addEventListener("change", () => {
        obj.status = chkbox.checked ? "checked" : "unchecked";
        saveToLocalStorage();
        // console.log(arr);
    });
    return chkbox;
}

function editIcon(span, obj) {
    const edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square color");
    edit.style.cursor = "pointer";
    edit.style.margin = "0 10px";
    edit.style.color = "be6c77";

    edit.addEventListener("click", () => {
        const edt = prompt("Enter the new text:", span.textContent);
        if (edt) {
            span.textContent = edt;
            obj.task = edt;
            saveToLocalStorage();
        }
    });
    return edit;
}

function deleteIcon(listItem, obj) {
    const dlt = document.createElement("i");
    dlt.setAttribute("class", "fa-solid fa-xmark color");
    dlt.style.cursor = "pointer";
    dlt.style.color = "orange";
    dlt.style.marginLeft = "10px";

    dlt.addEventListener("click", () => {
        listItem.remove();
        // console.log("Deleted item:", obj.title);
        const index = arr.findIndex(item => item.id === obj.id);
        if (index !== -1) {
            arr[index].delete = "true";
        }
        saveToLocalStorage();
    });
    return dlt;
}

function additem() {
    let taskValue = input.value.trim();
    if (!taskValue) {
        return;
    }

    const obj = {
        id: id++,
        status: "unchecked",
        task: taskValue,
        delete: "false"
    };
    arr.push(obj);
    saveToLocalStorage();

    createList(obj);
    input.value = "";

}

function createList(obj) {
    const listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.alignItems = "center";
    listItem.style.justifyContent = "space-between";
    listItem.style.padding = "10px";
    listItem.style.borderBottom = "1px solid #ddd";

    const chkbox = createCheckbox(obj);
    const span = createspan(obj.task);
    const edit = editIcon(span, obj);
    const dlt = deleteIcon(listItem, obj);

    listItem.appendChild(chkbox);
    listItem.appendChild(span);
    listItem.appendChild(edit);
    listItem.appendChild(dlt);
    list.appendChild(listItem);

}

function loadTodo() {
    arr.forEach(obj => {
        if (obj.delete === "false") {
            createList(obj);
        }
    });
    updateId();
}

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        additem();
    }
});

type.addEventListener("change",filterTask);
addTask.addEventListener("click", additem);

loadTodo();