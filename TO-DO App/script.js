'use strict';

// Set date at top Function (IIFE)
(function () {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let dateplaceHolder = document.getElementById("dateToday")
    dateplaceHolder.textContent = date;
})();

// ============================ Selectors

// Input
let input = document.getElementById("addTaskInput");
let addTaskButton = document.getElementById("addTaskToList");
// Output Div
let urgentDynamicDiv = document.getElementsByClassName("urgentDynamicDiv")[0];
let dynamicCode = document.getElementsByClassName("dynamicCode")[0];
let dallyDynamicDiv = document.getElementsByClassName("dDynamicDiv")[0];

let cbButton = document.getElementsByClassName("cb-btn")[0];
let modal = document.getElementsByClassName("modal")[0];
let overlay = document.getElementsByClassName("overlay")[0];
let ctaskContainer = document.getElementsByClassName("ctask-container")[0];
let cmButton = document.getElementsByClassName("close-modal")[0];
// ============================ Variables

// An array to store all the task objects
let tasksArray = [];
// An array to store all the completed task objects
let completedArray = [];
// Initial count for ID of the Object
let idCounter = 0;

// ============================ Functions

// Start FUNCTION => A function that starts all the magic
const makeRenderTasks = function () {
    // Check if blank text
    if (!input.value) {
        alert("Write a task first!!");
        return 0;
    }
    let tObj;
    // get data from radio buttons and make HTML object using creator
    if (document.getElementById('radioDally').checked) {
        tObj = tObjCreator(`${idCounter}`, input.value, "dally", "no");
    } else {
        tObj = tObjCreator(`${idCounter}`, input.value, "urgent", "no");
    }
    tasksArray.push(tObj);
    renderTaskAtMain(tObj);
    idCounter++; // Increase ID counter
};

// Functions for managing tasks
const manageTask = function (event) {
    let x = event.target;
    let container = x.parentElement.parentElement;

    if (x.classList.contains("item-3")) {
        x.parentElement.classList.add("remove")
        x.parentElement.addEventListener('transitionend', function () {
            alsoFromRest(x.parentElement.id, "remove", container);
            x.parentElement.remove();
        });
    } else if (x.classList.contains("item-2")) {
        let z = x.parentElement;
        tasksArray[z.id].complete = "yes";
        cTransition(z);
        z.addEventListener('transitionend', function () {
            alsoFromRest(z.id, "complete", container);
            z.remove();
        });
    }
    if (dynamicCode.getElementsByClassName("listItem").length === 0) {
        idCount = 0;
    }
    cbShow();
};

// Remove or mark complete from the rest of the places
const alsoFromRest = function (eleID, whatToDo, parent) {
    let x = findElementWithID(eleID, parent);
    if (whatToDo === "remove") {
        x.classList.add("remove");
    } else if (whatToDo === "complete") {
        cTransition(x);
    }
    x.addEventListener('transitionend', function () {
        x.remove();
    });
};

// ============================ Event Listeners

// Add a task
addTaskButton.addEventListener('click', makeRenderTasks);
cbButton.addEventListener('click', displayFromCB);
cmButton.addEventListener('click', closeButton);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        makeRenderTasks();
    }
});

// Manage a task : remove or complete
dallyDynamicDiv.addEventListener('click', manageTask);
urgentDynamicDiv.addEventListener('click', manageTask);
dynamicCode.addEventListener('click', manageTask);
