//Get variables for input fields, buttons, and checkboxes
const getChangeElements = document.querySelector(".listName");
const getListElements = document.getElementsByClassName("listItem");
const getCheckBoxes = document.querySelectorAll("[type=checkbox]");
const getListItems = document.querySelectorAll("li.listItem");
const listTitle = getChangeElements[0];
const changeInput = getChangeElements[1];
const changeButton = getChangeElements[2];

const listButton = getListElements[1];

//Array to build list items
const listItems = [{ text: "pepper" }, { text: "apple" }, { text: "orange" }];

//Global variables

//Allows user to change and toggle list description using input field and button

//Allows user to add items to list using onclick attribute to run function
const addToList = () => {
  let listInput = getListElements[0];
  let addItem = {
    text: listInput.value
  };
  listItems.push(addItem);
  listInput.value = "";
  renderList();
};

const deleteItem = index => {
  listItems.splice(index, 1);
  renderList();
};

//Crosses out checked list items
const markDone = index => {
  let checkedElement = document.querySelector(`#list #li-${index} .listItem`);
  checkedElement.classList.toggle("done");
};

const editItem = index => {
  let editInput = document.querySelector(".listName");
  editInput.setAttribute("id", index);
  console.log("Editing " + index);
  let editWrapper = document.getElementById("list-name-wrapper");
  editWrapper.classList.add("show");
};

const commitEdit = () => {
  let indexToChange = parseInt(document.querySelector(".listName").id) - 1;
  let newText = document.querySelector(".listName").value;
  console.log(newText);
  listItems[indexToChange].text = newText;
  renderList();
  document.querySelector(".listName").value = "";
  let editWrapper = document.getElementById("list-name-wrapper");
  editWrapper.classList.toggle("show");
};

// function to render the list of items
const renderList = () => {
  document.getElementById("list").innerHTML = "";
  for (let i = 0; i < listItems.length; i++) {
    let divNode = document.createElement("DIV");
    divNode.id = `li-${i}`;
    divNode.className = "item-wrapper";
    document.getElementById("list").appendChild(divNode);
    divNode.innerHTML = `<span>${i + 1} </span>`;

    let node = document.createElement("LI");
    let textnode = document.createTextNode(listItems[i].text);
    node.appendChild(textnode);
    node.classList.add("listItem");
    divNode.appendChild(node);

    let buttonNode = document.createElement("BUTTON");
    let buttonText = document.createTextNode("X");
    buttonNode.setAttribute("onclick", `deleteItem(${i})`);
    buttonNode.appendChild(buttonText);
    buttonNode.className = "deleteLI";
    divNode.appendChild(buttonNode);

    let editNode = document.createElement("BUTTON");
    let editText = document.createTextNode("Edit " + listItems[i].text);
    editNode.setAttribute("onclick", `editItem(${i + 1})`);
    editNode.appendChild(editText);
    editNode.className = "editLI";
    divNode.appendChild(editNode);

    let checkboxNode = document.createElement("INPUT");
    checkboxNode.className = "taskDone";
    checkboxNode.type = "checkbox";
    checkboxNode.setAttribute("onclick", `markDone(${i})`);
    divNode.appendChild(checkboxNode);
  }
};

renderList();
