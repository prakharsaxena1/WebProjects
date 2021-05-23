// All functions here

// Object creator => Creates Objects to track and render tasks
const tObjCreator = (id, text, type, complete) => {
    return { id, text, type, complete };
};

// HTML from Objects maker => Makes HTML from Object creator object
const htmlMakerLI = (obj) => `<div class="listItem" id="${obj.id}">
        <div class="item-1">${obj.text}</div>
        <div class="item-2">✔</div>
        <div class="item-3">✖</div>
        </div>`;

// Returns a cTask HTML Code
const htmlMakerCB = (obj) => `<div class="cTask"><h2 class="centerClass">${obj.text}</h2></div>`;

// Display to Complete Overlay Box
const renderToCOB = function (obj) {
    ctaskContainer.insertAdjacentHTML('beforeend', obj);
};

// HTML render => render tasks
const renderTaskAtMain = function (htmlObj) {
    let html = htmlMakerLI(htmlObj);
    if (htmlObj.type === "dally") {
        // Add to dally Sidebar
        dallyDynamicDiv.insertAdjacentHTML('beforeend', html)
        document.getElementById(htmlObj.id).classList.add("dallyStyle")
    } else {
        // Add to Urgent Sidebar
        urgentDynamicDiv.insertAdjacentHTML('beforeend', html)
        document.getElementById(`${htmlObj.id}`).classList.add("urgentStyle")
    }
    dynamicCode.insertAdjacentHTML('beforeend', html);
    input.value = "";
};

// Add transitions to Completed
const cTransition = function (ele) {
    ele.classList.add("complete");
    ele.innerText = `TASK COMPLETED`;
}

const findElementWithID = function (eleID, whichDone) {
    let m = [dynamicCode, dallyDynamicDiv, urgentDynamicDiv]
    m.splice(m.indexOf(whichDone), 1);
    for (let X of m) {
        for (let element of X.getElementsByClassName("listItem")) {
            if (element.id === eleID) {
                return element;
            }
        }
    }
    return;
};

const cbShow = function () {
    // Make the button with the div to display completed tasks
    completedArray = tasksArray.filter((element) => element.complete === "yes");
    if (completedArray.length > 0 && cbButton.classList.contains("hidden")) {
        cbButton.classList.remove("hidden");
    }
}

const closeButton = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    ctaskContainer.innerHTML = ""
};

const displayFromCB = function () {
    completedArray.forEach(element => {
        renderToCOB(htmlMakerCB(element));
    });
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};


// ======== Keep it safe for later use ========

// ele.style.padding = "11px 4px 11px 10px";
// ele.style.backgroundColor = "#26C281";
// ele.style.transition = "background-color 800ms ease-out"
// ele.textContent = `TASK COMPLETED`;