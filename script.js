// let names = document.getElementById("name").value;
// let date = document.getElementById("date").value;
// let priority = document.getElementById("priority").value;
let todayContainer = document.getElementById("today"); //future_Box
let futureContainer = document.getElementById("future_Box");
let completedContainer = document.getElementById("completed");

let data;
let today_data;
let future_data;
let res = JSON.parse(localStorage.getItem("data"));

function handleSubmit() {
  const result = [];

  let names = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let priority = document.getElementById("priority").value;
  let res = JSON.parse(localStorage.getItem("data"));
  var id = "id" + Math.random().toString(16).slice(2);
  if (names === "" || date === "" || priority === "") {
    window.alert("Please fill following fields");
    return;
  }
  result.push({
    _id: id,
    name: names,
    date: date,
    priority: priority,
    checked: false,
  });
  if (res) {
    localStorage.setItem("data", JSON.stringify([...res, ...result]));
  } else {
    localStorage.setItem("data", JSON.stringify([...result]));
  }

  let resData = JSON.parse(localStorage.getItem("data"));
  cretaeTodoElement(resData);
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
}

// filter a/c to date

function handleDelete(id) {
  let local = JSON.parse(localStorage.getItem("data"));
  let res = local.filter((val, i) => val._id !== id);
  localStorage.setItem("data", JSON.stringify(res));
  cretaeTodoElement(res);
}

// create a todo item
function cretaeTodoElement(data) {
  let now = new Date().getTime();
  let todayData =
    data.filter(
      (val) => new Date(val.date).getTime() < now && val.checked == false
    ) ?? [];
  let futureData =
    data.filter(
      (val) => new Date(val.date).getTime() > now && val.checked == false
    ) ?? [];
  let completedData = data.filter((val) => val.checked === true) ?? [];

  if (data.length > 0) {
    todayContainer.innerHTML = todayData.map((item, i) => {
      return `<div class="item_box">
            <span>${i + 1}</span>
            <span class="name" >${item.name}</span>
            <span>${item.date}</span>
            <span class="priority" >Priority : ${item.priority}</span>
            <input type="checkbox" id=${item._id} onchange="handleCheck('${
        item._id
      }')" />
           
 
            <i class="fa-solid fa-trash" onclick="handleDelete('${
              item._id
            }')"></i>

          </div>`;
    });
    futureContainer.innerHTML = futureData.map((item, i) => {
      return `<div class="item_box">
            <span>${i + 1}</span>
            <span class="name" >${item.name}</span>
            <span>${item.date}</span>
            <span class="priority" >Priority : ${item.priority}</span>
            <input type="checkbox"  onchange="handleCheck('${item._id}')" />
  
            <i class="fa-solid fa-trash" onclick="handleDelete('${
              item._id
            }')"></i>

          </div>`;
    });
    completedContainer.innerHTML = completedData.map((item, i) => {
      return `<div class="item_box">
      <span>${i + 1}</span>
      <span class="name" >${item.name}</span>
      <span>${item.date}</span>
      <span class="priority" >Priority : ${item.priority}</span>
      <input type="checkbox" checked={${item.checked}} onchange="handleCheck('${
        item._id
      }')" />

      <i class="fa-solid fa-trash" onclick="handleDelete('${item._id}')"></i>

    </div>`;
    });
  }
  emptyBox(todayData, futureData, completedData);
}

function handleCheck(id) {
  let localData = JSON.parse(localStorage.getItem("data"));

  let res = localData.map((val, i) => {
    if (val?._id === id) {
      if (val.checked === true) {
        return {
          ...val,
          checked: false,
        };
      } else if (val.checked === false) {
        return {
          ...val,
          checked: true,
        };
      }
    } else {
      return val;
    }
  });
  cretaeTodoElement(res);

  localStorage.setItem("data", JSON.stringify(res));
  // let data = JSON.parse(localStorage.getItem("data"));
}

function emptyBox(today = [], future = [], completedData = []) {
  // let localData = JSON.parse(localStorage.getItem("data"));

  if (!today.length > 0 || !today) {
    todayContainer.innerHTML = `<div class="item_box">
   <span>No Data Found</span>
    
  </div>`;
  }
  if (!future.length > 0 || !future) {
    futureContainer.innerHTML = `<div class="item_box">
    <span>No Data Found</span>
  </div>`;
  }
  if (!completedData.length > 0) {
    completedContainer.innerHTML = `<div class="item_box">
    <span>No Data Found</span>
  </div>`;
  }
}
emptyBox();
cretaeTodoElement(res);
