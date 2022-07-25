// 當CLICK btn時
let add = document.querySelector("form button");
var sectionTodo = document.querySelector("section");
function refresh() {
  window.location.reload();
}

add.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  let input = form.children[0].value; //取得輸入資料

  if (input == "") {
    window.alert("請重新輸入");
    return;
  }
  // clear input
  form.children[0].value = "";

  //若有輸入東西就開始做下面的TODO
  // 產生list內容在下方section
  let newTodo = document.createElement("div");
  newTodo.className = "d-flex TodoList isntdone";
  newTodo.style.animation = "scaleUp 0.3s forwards";
  refresh();

  let complete_icon = document.createElement("i");
  complete_icon.className = "fa-solid fa-check";
  complete_icon.addEventListener("click", (e) => {
    let doneItem = e.target.parentElement;
    let doneOrnot = doneItem.classList.value;
    let filter = document.querySelectorAll(".filter_btn");
    let ToDo = filter[1];
    let Completed = filter[2];

    doneItem.classList.toggle("done");
    // 所以如果最後是one done的話，就代表其實是完成
    // 如果是isntdone就是綠色尚未完成
    let BooleanDone = doneOrnot.slice(-8);
    let targetValue = e.target.parentElement.children[1].value;
    if (BooleanDone == "isntdone") {
      // 表示當下尚未完成->被改成完成
      myListArray.forEach((element, index) => {
        if (element.input == targetValue) {
          myListArray[index]["doneOrnot"] = 1;
          localStorage.setItem("list", JSON.stringify(myListArray));
          ToDo.addEventListener("click", (e) => {
            newTodo.style.display = "none";
          });
          Completed.addEventListener("click", (e) => {
            newTodo.style.display = "flex";
          });
          refresh();
        }
      });
    } else {
      myListArray.forEach((element, index) => {
        if (element.input == targetValue) {
          myListArray[index]["doneOrnot"] = 0;
          localStorage.setItem("list", JSON.stringify(myListArray));
          ToDo.addEventListener("click", (e) => {
            newTodo.style.display = "flex";
          });
          Completed.addEventListener("click", (e) => {
            newTodo.style.display = "none";
          });
          refresh();
        }
      });
    }
  });

  // 在用div(icon_right)包住整個form跟最右邊的btn
  let section_form = document.createElement("form");

  let newTodo_text = document.createElement("input");
  newTodo_text.setAttribute("type", "text");
  newTodo_text.setAttribute("value", input);
  newTodo_text.addEventListener("click", (Event) => {
    let edit_input_value = Event.target.value;
    Event.target.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        myListArray.forEach((element, index) => {
          if (element.input == edit_input_value) {
            myListArray[index]["input"] = e.target.value;
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
      }
    });
  });
  section_form.appendChild(newTodo_text);

  let icon_right = document.createElement("div");
  icon_right.className = "icon_right";
  //  修改
  let editbtn = document.createElement("button");
  editbtn.className = "btn edit";
  let edit = document.createElement("i");
  edit.className = "fa-solid fa-pencil";
  editbtn.appendChild(edit);

  editbtn.addEventListener("click", (e) => {
    let edit_input = e.target.parentElement.parentElement.children[1];
    let edit_input_value = edit_input.value;
    edit_input.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        myListArray.forEach((element, index) => {
          if (element.input == edit_input_value) {
            myListArray[index]["input"] = e.target.value;
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
      }
    });
  });

  section_form.appendChild(editbtn);
  icon_right.appendChild(editbtn);

  let deleteTodobtn = document.createElement("button");
  deleteTodobtn.className = "btn delete";
  let deleteTodo = document.createElement("i");
  deleteTodo.className = "fa-regular fa-trash-can";
  deleteTodobtn.appendChild(deleteTodo);

  deleteTodobtn.addEventListener("click", (e) => {
    let deleteItem = e.target.parentElement.parentElement;
    let deletep = deleteItem.children[1].value;
    myListArray.forEach((element, index) => {
      if (element.input == deletep) {
        myListArray.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(myListArray));
      }
    });
    sectionTodo.removeChild(deleteItem);
  });
  icon_right.appendChild(deleteTodobtn);
  newTodo.appendChild(complete_icon);
  newTodo.appendChild(newTodo_text);
  newTodo.appendChild(icon_right);
  sectionTodo.appendChild(newTodo);

  // store data into localStorage
  let Todo = {
    input: input,
    doneOrnot: 0,
  };

  var temp1 = localStorage.getItem("list");
  if (temp1) {
    //   有東西的話
    var myListArray = JSON.parse(temp1);
    myListArray.push(Todo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  } else {
    localStorage.setItem("list", JSON.stringify([Todo]));
  }
});

// -------------------新增結束，將local存的都放在這裡面---------------------
let temp = localStorage.getItem("list");
let myList = JSON.parse(temp);
myList.forEach((e, index) => {
  // 開始製作一直存在localStorage的todoList
  let localdiv = document.createElement("div");
  let doneOrnot = myList[index]["doneOrnot"];
  if (doneOrnot) {
    localdiv.className = "d-flex TodoList isntdone done";
  } else {
    localdiv.className = "d-flex TodoList isntdone";
  }

  let todoicon = document.createElement("i");
  todoicon.className = "fa-solid fa-check";
  todoicon.addEventListener("click", (e) => {
    let todoDone = e.target.parentElement;
    let doneOrnot = todoDone.classList.value;
    let BooleanDone = doneOrnot.slice(-8);
    let targetValue = e.target.parentElement.children[1].value;
    if (BooleanDone == "isntdone") {
      // 表示當下尚未完成->被改成完成
      myList.forEach((element, index) => {
        if (element.input == targetValue) {
          myList[index]["doneOrnot"] = 1;
          localStorage.setItem("list", JSON.stringify(myList));
        }
      });
    } else {
      myList.forEach((element, index) => {
        if (element.input == targetValue) {
          myList[index]["doneOrnot"] = 0;
          localStorage.setItem("list", JSON.stringify(myList));
        }
      });
    }
    todoDone.classList.toggle("done");
  });

  let todo_form = document.createElement("form");

  let todo_text = document.createElement("input");
  todo_text.setAttribute("type", "text");
  todo_text.setAttribute("value", e.input);
  todo_text.addEventListener("click", (Event) => {
    let edit_input_value = Event.target.value;
    Event.target.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        myList.forEach((element, index) => {
          if (element.input == edit_input_value) {
            myList[index]["input"] = e.target.value;
            localStorage.setItem("list", JSON.stringify(myList));
            alert("更改完成");
          }
        });
      }
    });
  });

  todo_form.appendChild(todo_text);

  let editbtn = document.createElement("button");
  editbtn.className = "btn edit";
  let edit = document.createElement("i");
  edit.className = "fa-solid fa-pencil";
  editbtn.appendChild(edit);
  editbtn.addEventListener("click", (e) => {
    let edit_input = e.target.parentElement.parentElement.children[1];
    let edit_input_value = edit_input.value; //還沒改的value
    edit_input.addEventListener("keydown", (Event) => {
      if (Event.keyCode === 13) {
        // 接下來把使用者改的字書盡local
        myList.forEach((element, index) => {
          if (element.input == edit_input_value) {
            myList[index]["input"] = Event.target.value;
            localStorage.setItem("list", JSON.stringify(myList));
          }
        });
      }
    });
  });
  todo_form.appendChild(editbtn);

  let deleteTodobtn1 = document.createElement("button");
  deleteTodobtn1.className = "btn delete";
  let deleteTodo = document.createElement("i");
  deleteTodo.className = "fa-regular fa-trash-can";
  deleteTodobtn1.appendChild(deleteTodo);
  deleteTodobtn1.addEventListener("click", (e) => {
    let deleteItem = e.target.parentElement.parentElement;
    sectionTodo.removeChild(deleteItem);
    let deletep = deleteItem.children[1].value;
    myList.forEach((element, index) => {
      if (element.input == deletep) {
        myList.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(myList));
      }
    });
  });

  let icon_right = document.createElement("div");
  icon_right.className = "icon_right";
  icon_right.appendChild(editbtn);
  icon_right.appendChild(deleteTodobtn1);

  localdiv.appendChild(todoicon);
  localdiv.appendChild(todo_text);
  localdiv.appendChild(icon_right);
  sectionTodo.appendChild(localdiv);
});

// ----------filter--------------------------
let filter = document.querySelectorAll(".filter_btn");

filter.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("a.active").classList.remove("active");
    btn.classList.add("active");
  });
});

filter[0].addEventListener("click", (e) => {
  let todo_div = e.target.parentElement.parentElement.children[2].children;
  let len = todo_div.length;
  for (let i = 0; i < len; i++) {
    todo_div[i].style.display = "flex";
  }
});
filter[1].addEventListener("click", (e) => {
  let todo_div = e.target.parentElement.parentElement.children[2].children;
  let len = todo_div.length;
  for (let i = 0; i < len; i++) {
    if (myList[i].doneOrnot) {
      todo_div[i].style.display = "none";
    } else {
      todo_div[i].style.display = "flex";
    }
  }
});
filter[2].addEventListener("click", (e) => {
  let todo_div = e.target.parentElement.parentElement.children[2].children;
  let len = todo_div.length;
  for (let i = 0; i < len; i++) {
    if (myList[i]["doneOrnot"]) {
      todo_div[i].style.display = "flex";
    } else {
      todo_div[i].style.display = "none";
    }
  }
});
