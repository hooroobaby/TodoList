// Selectors
let addbtn = document.querySelector("form button");
let todo_section = document.querySelector("section");
let filterBtn = document.querySelector(".filter");
// Event Listeners
document.addEventListener("DOMContentLoaded", readLocal);
addbtn.addEventListener("click", add);
todo_section.addEventListener("click", editToLocal);
todo_section.addEventListener("click", tododiv);
filterBtn.addEventListener("click", changeFilterActive);
filterBtn.addEventListener("click", fnfilter);

// Functions
function add(e) {
  e.preventDefault();
  let input = $("input[name='todo']").val();
  if (input == "") {
    alert("請輸入東西");
    return;
  }
  let sectionTodo = document.getElementById("section");

  let newTodo = document.createElement("div");
  newTodo.className = "d-flex TodoList isntdone";

  let newTodo_text = document.createElement("input");
  newTodo_text.setAttribute("type", "text");
  newTodo_text.setAttribute("value", input);
  //   加進Local
  addToLocal(input);

  let complete_btn = document.createElement("button");
  complete_btn.className = "btn complete";
  complete_btn.innerHTML = `<i class="fa-solid fa-check"></i> `;

  let deleteTodobtn = document.createElement("button");
  deleteTodobtn.className = "btn delete";
  deleteTodobtn.innerHTML = ` <i class="fa-regular fa-trash-can"></i> `;

  let arr = [newTodo_text, complete_btn, deleteTodobtn];
  arr.forEach((item) => {
    newTodo.appendChild(item);
  });

  sectionTodo.appendChild(newTodo);
  e.target.parentElement.children[0].value = "";
}

function tododiv(e) {
  if (e.target.classList[1] === "delete") {
    removeLocal(e.target.parentElement);
    todo_section.removeChild(e.target.parentElement);
  } else if (e.target.classList[1] == "complete") {
    e.target.parentElement.classList.toggle("done");
    // 如果要呼叫fnfilter參數應該要有filterBtn的e但我目前先放棄
    doneOrnotToLocal(e);
  }
}

function removeLocal(deleteDIV) {
  const deleteInput = deleteDIV.children[0].value;
  let temp = localStorage.getItem("todos");
  if (!temp) {
    return;
  } else {
    let myList = JSON.parse(temp);
    myList.forEach((element, index) => {
      if (element.input == deleteInput) {
        myList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(myList));
      }
    });
  }
}

function changeFilterActive(e) {
  document.querySelector("a.active").classList.remove("active");
  e.target.classList.add("active");
}
// ----------------------------------------Filter----------------------------------
function fnfilter(e) {
  console.log(e);
  let target = e.toElement.classList[2];
  let todo_div = todo_section.childNodes;
  todo_div.forEach((todo) => {
    switch (target) {
      case "all": {
        todo.style.display = "flex";
        break;
      }
      case "todo": {
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      }
      case "complete": {
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      }
    }
  });
}
// ----------------------------------------LocalStorage 處理----------------------------------
function readLocal() {
  let temp = localStorage.getItem("todos");
  if (!temp) {
    return;
  } else {
    let myList = JSON.parse(temp);
    myList.forEach((todo) => {
      let sectionTodo = document.getElementById("section");

      let newTodo = document.createElement("div");
      newTodo.className = "d-flex TodoList isntdone";
      if (todo.doneOrnot) {
        newTodo.classList.add("done");
      }

      let newTodo_text = document.createElement("input");
      newTodo_text.setAttribute("type", "text");
      newTodo_text.setAttribute("value", todo.input);

      let complete_btn = document.createElement("button");
      complete_btn.className = "btn complete";
      complete_btn.innerHTML = `<i class="fa-solid fa-check"></i> `;

      let deleteTodobtn = document.createElement("button");
      deleteTodobtn.className = "btn delete";
      deleteTodobtn.innerHTML = ` <i class="fa-regular fa-trash-can"></i> `;

      let arr = [newTodo_text, complete_btn, deleteTodobtn];
      arr.forEach((item) => {
        newTodo.appendChild(item);
      });

      sectionTodo.appendChild(newTodo);
    });
  }
}

function addToLocal(input) {
  // store data into localStorage
  let Todo = {
    input: input,
    doneOrnot: 0,
  };
  let temp = localStorage.getItem("todos");
  if (temp) {
    //   有東西的話
    let myListArray = JSON.parse(temp);
    myListArray.push(Todo);
    localStorage.setItem("todos", JSON.stringify(myListArray));
  } else {
    localStorage.setItem("todos", JSON.stringify([Todo]));
  }
}

function editToLocal(event) {
  const oldInput = event.target.defaultValue;
  event.target.addEventListener("keydown", (e) => {
    const newInput = e.target.value;
    let myList = JSON.parse(localStorage.getItem("todos"));
    if (e.keyCode == 13) {
      myList.forEach((element, index) => {
        if (element.input == oldInput) {
          myList[index]["input"] = newInput;
          localStorage.setItem("todos", JSON.stringify(myList));
          alert("更改完成");
        }
      });
    }
  });
}

function doneOrnotToLocal(e) {
  let doneOrnot = e.target.parentElement.classList.contains("done");
  let myList = JSON.parse(localStorage.getItem("todos"));
  let targetValue = e.target.parentElement.children[0].value;
  myList.forEach((element, index) => {
    if (element.input == targetValue) {
      myList[index]["doneOrnot"] = doneOrnot;
      localStorage.setItem("todos", JSON.stringify(myList));
    }
  });
}
