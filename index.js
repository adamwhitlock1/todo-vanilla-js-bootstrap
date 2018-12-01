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
  // initially clear out any existing content in the element with id "list"
  // this is useful when calling this function after adding or deleting items
  document.getElementById("list").innerHTML = "";
  // set up a loop to loop through all the list items in the listItems array
  for (let i = 0; i < listItems.length; i++) {
    // create a div element to eventually be added to the dom
    let divNode = document.createElement("DIV");
    // add an id to the div of "li-1" or "li-2" etc based on loop index
    divNode.id = `li-${i}`;
    // add a class to the div
    divNode.className = "item-wrapper";
    // now actually add the div to the dom by appending it to the element with id "list"
    document.getElementById("list").appendChild(divNode);
    // setting it's initial inner html content to have a simple span with a number inside as the todo number
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
