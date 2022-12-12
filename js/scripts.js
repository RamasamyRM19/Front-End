"use strict";

(function() {
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
    var task = [];

    const leftContainerBarIcon = document.getElementById("bar");
    const leftContainer = document.getElementsByClassName("left-container")[0];
    const categoryItem = document.getElementsByClassName("sideBar-title");
    const centerContainerBarIcon = document.getElementById("sun");
    const centerContainer = document.getElementsByClassName("center-container")[0];
    // const createdList = document.createElement("li");
    // const createdIcon = document.createElement("i");
    var inputBox = document.querySelector(".new-top");
    var input = document.querySelector(".new-list");
    var contentBox = document.querySelector(".middle-content1")
    var contents = document.querySelector(".addTask");

    function init() {
        renderCategory();
        eventListener();
    }

    function eventListener() {
        leftContainerBarIcon.addEventListener('click',fullScreenView);
        centerContainerBarIcon.addEventListener('click',normalScreenView);
        input.addEventListener("keypress",addList);
        contents.addEventListener("keypress",addTask);
    }

    function fullScreenView() {
        leftContainer.classList.add("hide-left-container");
        centerContainer.classList.add("full-screen-view");
    }

    function normalScreenView() {
        leftContainer.classList.remove("hide-left-container");
        centerContainer.classList.remove("full-screen-view");
    }


    function renderCategory() {
        category.forEach(element => {
        var categoryList = document.createElement("li");
        var categoryIcon = document.createElement("i");
        categoryIcon.className = element.icon;
        categoryList.append(categoryIcon);
        console.log(element.icon);
        categoryList.append(element.name);    
        document.getElementById("top").append(categoryList);
        });
    }

    function addList(event) {
        if (event.keyCode == 13 && event.target.value != "") {
            console.log(event.target.value);
            var newList = document.createElement("div");
            let newIcon = document.createElement("i");
            newIcon.className = "fa fa-list-ul";
            newList.innerText = event.target.value;
            event.target.value = "";
            document.querySelector(".new-top").style.display = "inline-block";
            document.querySelector(".new-top").append(newIcon);
            document.querySelector(".new-top").append(newList);
            document.querySelector(".new-top").append(document.createElement("br"));
        }
    }

    function addTask(event) {
        if (event.keyCode == 13 && event.target.value != "") {
            console.log(event.target.value);
            var newList = document.createElement("div");
            let newIcon = document.createElement("i");
            newIcon.className = "fa fa-circle-thin";
            newList.innerText = event.target.value;

            var newTask = document.createElement("div");
            let newP = document.createElement("p");
            let newP1 = document.createElement("p");
            newP1.innerText = "Tasks";

            var newList1 = document.createElement("div");
            let newIcon1 = document.createElement("i");
            newIcon1.className = "fa fa-star-o";
            newList.innerText = event.target.value;
            event.target.value = "";
            document.querySelector(".middle-content1").style.display = "inline-block";
            document.querySelector(".middle-content1 .circle").append(newIcon);
            document.querySelector(".middle-content1").append(newList);
            
            document.querySelector(".middle-content1 .task .new").append(newP);
            document.querySelector(".middle-content1 .task .period").append(newP1);
            document.querySelector(".middle-content1").append(newTask);

            document.querySelector(".middle-content1 .star").append(newIcon1);
            document.querySelector(".middle-content1").append(newList1);
            document.querySelector(".middle-content1").append(document.createElement("br"));
        }
    }

    init();

})();