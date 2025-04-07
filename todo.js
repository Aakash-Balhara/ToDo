// let items = document.querySelector("#list");
// let submitbtn = document.querySelector("#submit");
// let input = document.getElementById("inp");
// let todoarr = [];
// let id = 1;

// // Load tasks when page reloads
// window.onload = function () {
//     let storedTasks = localStorage.getItem("todo");
//     if (storedTasks) {
//         todoarr = storedTasks.split(","); // Convert string back to array
//         todoarr.forEach(task => enterValue(task, false)); // Load tasks
//     }
// };

// function enterValue(taskText = null, saveToStorage = true) {
//     let cid = id;
//     let icon1 = document.createElement("i");
//     icon1.setAttribute("class", "fa-solid fa-xmark");
//     let icon2 = document.createElement("i");
//     icon2.setAttribute("class", "fa-solid fa-pen-to-square");
//     let icon3 = document.createElement("input");
//     icon3.type = "checkbox";

//     const data = taskText || input.value; 
//     if (data.trim() === "") return; 

//     const list = document.createElement("li");
//     list.textContent = data;

//     items.append(list);
//     items.append(icon1);
//     items.append(icon2);
//     items.append(icon3);

//     icon1.addEventListener("click", function () {
//         list.remove();
//         icon1.remove();
//         icon2.remove();
//         icon3.remove();
//         todoarr = todoarr.filter(item => item !== data);
//         localStorage.setItem("todo", todoarr.join(",")); // Update storage
//     });

//     icon2.addEventListener("click", function () {
//         let edt = prompt("Enter Value:", data);
//         if (edt) {
//             list.textContent = edt;
//             let index = todoarr.indexOf(data);
//             if (index !== -1) {
//                 todoarr[index] = edt;
//                 localStorage.setItem("todo", todoarr.join(",")); 
//             }
//         }
//     });

//     icon3.addEventListener("change", function () {
//         list.style.textDecoration = icon3.checked ? "line-through" : "none";
        
//     });

//     if (saveToStorage) {
//         todoarr.push(data);
//         localStorage.setItem("todo", todoarr.join(",")); // Save task
//     }

//     id++;
//     input.value = "";
// }

// submitbtn.addEventListener("click", () => enterValue());




const search = document.querySelector("#search");
const list = document.querySelector("ol");
const button = document.querySelector("button");
let id = 0;

let arr = JSON.parse(localStorage.getItem("todoList")) || [];

function updateId(obj){
    let len=arr.length;
    if(len == 0){
        id = 0;
    }else{

        id = arr[len-1].id;
    }
    // console.log(id);
   
    
}

function updateobj(obj){
    for(let i=0;i<arr.length;i++){
        arr[i].id=i;
    }
    saveToLocalStorage();
    if(arr[-1]=' '){
        id=0;
    }
}

function saveToLocalStorage(obj) {
    localStorage.setItem("todoList", JSON.stringify(arr));
}

function createSpan(searchValue) {
    const span = document.createElement("span");
    span.textContent = searchValue;
    span.style.flex = "1";
    return span;
}

function createCheckbox(obj) {
    const chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.style.marginRight = "10px";
    chkbox.style.position = "relative";
    chkbox.style.left = "-1%";
    chkbox.style.top = "-0px";
    chkbox.checked = obj.status == "Completed";

    chkbox.addEventListener("change", () => {
        obj.status = chkbox.checked ? "Completed" : "Pending";
        saveToLocalStorage();
        console.log(arr);
    });
    return chkbox;
}

function editIcon(span, obj) {
    const edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square color");
    edit.style.cursor = "pointer";
    edit.style.margin = "0 10px";
    edit.style.color = "blue";

    edit.addEventListener("click", () => {
        const e = prompt("Enter the new text:", span.textContent);
        if (e) {
            span.textContent = e;
            obj.title = e;
            saveToLocalStorage();
        }
    });
    return edit;
}

function deleteIcon(listItem, obj) {
    const delet = document.createElement("i");
    delet.setAttribute("class", "fa-solid fa-xmark color");
    delet.style.cursor = "pointer";
    delet.style.color = "red";
    delet.style.marginLeft = "10px";

    delet.addEventListener("click", () => {
        listItem.remove();
        console.log("Deleted item:", obj.title);
        const index = arr.findIndex(item => item.id === obj.id);
        if (index !== -1) {
            arr.splice(index, 1);
            saveToLocalStorage();
        }
        updateobj();
    });
    return delet;
}

function addItem() {
    const searchValue = search.value;
    if (!searchValue) return;

    const obj = {
        id: id++,
        status: "Pending",
        title: searchValue
    };
    arr.push(obj);
    saveToLocalStorage();

    createListItem(obj);
    search.value = "";
}

function createListItem(obj) {
    const listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.alignItems = "center";
    listItem.style.justifyContent = "space-between";
    listItem.style.padding = "10px";
    listItem.style.borderBottom = "1px solid #ddd";

    const chkbox = createCheckbox(obj);
    const span = createSpan(obj.title);
    const edit = editIcon(span, obj);
    const delet = deleteIcon(listItem, obj);
    

    listItem.appendChild(span);
    listItem.appendChild(chkbox);
    listItem.appendChild(edit);
    listItem.appendChild(delet);
    list.appendChild(listItem);
}

function loadTodoList() {
    arr.forEach(obj => {
        createListItem(obj);
    });
    updateId();
}
search.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addItem();
});

button.addEventListener("click", addItem);

loadTodoList();