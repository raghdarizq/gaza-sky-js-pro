let Thename = document.getElementById("name");
let sumbit = document.getElementById("sumbit");
let Search = document.getElementById("Search");
let btnDalete = document.getElementById("btnDalete");

let AllNames;
let mediator;
let statu = "create";

//if localStorage
if (localStorage.Employees != null) {
  AllNames = JSON.parse(localStorage.Employees);
} else {
  AllNames = [];
}
// sumbit data
sumbit.onclick = function () {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)};`
  let newNeme = {
    Thename: Thename.value,
    color:randomColor,
  };
  if (Thename.value != "") {
    if (statu == "create") {
      AllNames.push(newNeme);
      console.log(newNeme)
    } else {
      AllNames[mediator] = newNeme;
      sumbit.innerHTML = "sumbit";
      statu = "create";
    }
  }
  localStorage.setItem("Employees", JSON.stringify(AllNames));
  clearData();
  readData();
};
//clearData
const clearData = () => {
  Thename.value = "";
};


//show data
const readData = () => {
  let card = "";
  for (let i = 0; i < AllNames.length; i++) {
    card += `
        <div class="card" style="background-color:${AllNames[i].color}">
            <h1>Hello My Name is :</h1>
            <br />
            <span>${AllNames[i].Thename}</span>
            <br />
            <button  onclick="deleteThisName(${i})" id="delete">delete</button>
            <button  onclick="updateData(${i})" id="Update">Update</button>
        </div>
    `;
    document.getElementById("hero").innerHTML = card;
    if (AllNames.length > 0) {
      btnDalete.innerHTML = `
      <button onclick={deleteAll()}>delete All(${AllNames.length})</button>`;
    } else {
      btnDalete.innerHTML = ``;
    }
  }
};
readData();
//delet one item
const deleteThisName = (i) => {
  AllNames.splice(i, 1);
  localStorage.Employees = JSON.stringify(AllNames);
  readData();
};
//deleteAll
const deleteAll = () => {
  AllNames.splice(0);
  readData();
  localStorage.clear();

};
//updateData
const updateData = (i) => {
  Thename.value = AllNames[i].Thename;
  sumbit.innerHTML = "Update";
  statu = "Update";
  mediator = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};
//Search
const SearchData = (value) => {
  let card = "";
  for (let i = 0; i < AllNames.length; i++) {
    if (AllNames[i].Thename.toLowerCase().includes(value.toLowerCase())) {
      card += `
      <div class="card" style="background-color:${AllNames[i].color}">
          <h1>Hello My Name is :</h1>
          <br />
          <span>${AllNames[i].Thename}</span>
          <br />
          <button  onclick="deleteThisName(${i})" id="delete">delete</button>
          <button  onclick="updateData(${i})" id="Update">Update</button>
      </div>
  `;
      document.getElementById("hero").innerHTML = card;
    } else {
      document.getElementById("hero").innerHTML =
        "There is no employee by this name";
    }
  }
};
