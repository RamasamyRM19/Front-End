"use strict";

(function () {
    var category = [
        {
            id: 1,
            name: 'My Day',
            icon: 'fa fa-sun-o'
        },
        {
            id: 2,
            name: 'Important',
            icon: 'fa fa-star-o'
        },
        {
            id: 3,
            name: 'Planned',
            icon: 'fa fa-calendar-o'
        },
        {
            id: 4,
            name: 'Assigned to me',
            icon: 'fa fa-user-o'
        },
        {
            id: 5,
            name: 'Tasks',
            icon: 'fa fa-home'
        }
    ];
    var tasks = [];

    var leftContainerBarIcon = document.getElementById("bar");
    var leftContainer = document.getElementsByClassName("left-container")[0];
    var categoryItem = document.getElementsByClassName("sideBar-title");
    var centerContainerBarIcon = document.getElementById("sun");
    var centerContainer = document.getElementsByClassName("center-container")[0];
    var hiddenLeftContainer = document.getElementsByClassName('hide-left-container');
    var inputBox = document.getElementsByClassName("new-top");
    var input = document.getElementById("new-list");
    var contents = document.getElementById("addTask");
    var newTask = document.getElementsByClassName('content-three')[0];

    function init() {
        showDate();
        renderCategory();
        eventListener();
    }

    function showDate() {
        let now = new Date().toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });
        document.querySelector("#period").innerText = now;
    }

    function eventListener() {
        leftContainerBarIcon.addEventListener('click', toggleScreenView);
        centerContainerBarIcon.addEventListener('click', toggleScreenView);
        input.addEventListener("keypress", addList);
        contents.addEventListener("keypress", addTask);
    }

    function toggleScreenView() {
        if (hiddenLeftContainer == null) {
            leftContainer.classList.remove("hide-left-container");
            centerContainer.classList.remove("full-screen-view");
        } else {
            leftContainer.classList.add("hide-left-container");
            centerContainer.classList.add("full-screen-view");
        }
    }

    function renderCategory() {
        category.forEach(element => {
            var categoryList = document.createElement("li");
            var categoryIcon = document.createElement("i");
            categoryIcon.className = element.icon;
            categoryList.append(categoryIcon);
            categoryList.append(element.name);
            document.getElementById("top").append(categoryList);
            //document.getElementById("top").append();
        });
    }

    function addList(event) {
        if (event.keyCode == 13 && event.target.value != "") {
            console.log(event.target.value);
            var newList = document.createElement("div");
            var newIcon = document.createElement("i");
            newIcon.className = "fa fa-list-ul";
            newList.innerText = event.target.value;
            event.target.value = "";
            //newList.append(newIcon);
            //document.getElementsByClassName(".new-top").style.display = "inline-block";
            document.getElementById("top").append(newIcon);
            document.getElementById("top").append(newList);
            document.getElementById("top").append(document.createElement("br"));
        }
    }

    // function newAddedTask() {
    //     while (newTask.firstChild) {
    //         newTask.removeChild(newTask.firstChild);
    //     }
    //     addTask();
    // }

    function addTask(event) {
        if (event.keyCode == 13 && event.target.value != "") {
            console.log(event.target.value);

            var newCategoryList = document.createElement("div");
            newCategoryList.className = "middle-content1";
            var newList = document.createElement("div");
            newList.className = "circle";
            var newIcon = document.createElement("i");
            newIcon.className = "fa fa-circle-thin";
            newList.append(newIcon);

            var newTask = document.createElement("div");
            newTask.className = "task";
            var newP = document.createElement("p");
            newP.className = "new";
            var newP1 = document.createElement("p");
            newP1.className = "period";
            newP.innerText = event.target.value;
            newP1.innerText = "Tasks";
            newTask.append(newP);
            newTask.append(newP1);

            var newList1 = document.createElement("div");
            newList1.className = "star";
            var newIcon1 = document.createElement("i");
            newIcon1.className = "fa fa-star-o";
            event.target.value = "";
            newList1.append(newIcon1);

            newCategoryList.append(newList);
            newCategoryList.append(newTask);
            newCategoryList.append(newList1);
            //newTask.appendChild(newCategoryList);

            // document.getElementById("middle-content1").style.display = "inline-block";
            // document.getElementById("circle").append(newIcon);
            // document.getElementById("middle-content1").append(newList);

            // document.getElementById("new").append(newP);
            // document.getElementById("desc").append(newP1);
            // document.getElementById("middle-content1").append(newTask);

            // document.getElementById("star").append(newIcon1);
            // document.getElementById("middle-content1").append(document.createElement("br"));
        }
    }


    // function addTask(e) {
    //     if (e.key === "Enter" && newTaskInputBar.value !== "") {
    //         let taskDetails = {
    //             id: tasks.length + 1,
    //             name: newTaskInputBar.value,
    //             category: [title.innerHTML, title.innerHTML == "Tasks"? "":"Tasks"]
    //         }
    //         tasks.push(taskDetails);
    //         newTaskInputBar.value = "";
    //         refreshTaskList();
    //     }
    // }

    init();

})();