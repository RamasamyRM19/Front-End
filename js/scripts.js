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
    var categoryItem = document.getElementById("sideBar-title");
    var centerContainerBarIcon = document.getElementById("sun");
    var centerContainer = document.getElementsByClassName("center-container")[0];
    var hiddenLeftContainer = document.getElementsByClassName('hide-left-container');
    var inputBox = document.getElementsByClassName("new-top");
    var input = document.getElementById("new-list");
    var contents = document.getElementById("addTask");
    var newTasks = document.getElementsByClassName('content-three')[0];
    var topLeft = document.getElementById("top");
    var menuLists = topLeft.getElementsByTagName('li');
    var head = document.getElementsByClassName("myDay");
    var selectedCategory;

    /**
     * 
     */
    function init() {
        showDate();
        renderCategory();
        eventListener();
    }

    /**
     * 
     */
    function showDate() {
        let now = new Date().toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });
        document.querySelector("#period").innerText = now;
    }

    /**
     * 
     */
    function eventListener() {
        leftContainerBarIcon.addEventListener('click', toggleScreenView);
        centerContainerBarIcon.addEventListener('click', toggleScreenView);
        input.addEventListener("keypress", addList);
        contents.addEventListener("keypress", addTask);
        topLeft.addEventListener("click", handleSelectedList, true);
    }

    /**
     * 
     */
    function toggleScreenView() {
        leftContainer.classList.toggle("hide-left-container");
        centerContainer.classList.toggle("full-screen-view");
    }

    /**
     * 
     */
    function renderCategory() {
        category.forEach(element => {
            var categoryList = createTag("li", {});
            var categoryIcon = createTag("i", {});
            categoryIcon.className = element.icon;
            categoryList.append(categoryIcon);
            categoryList.append(element.name);
            topLeft.append(categoryList);
        });
        var newLine = createTag("li", { className: "line" });
        topLeft.append(newLine);
    }

    /**
     * 
     * @param {*} event 
     */
    function addList(event) {
        if (event.keyCode == 13 && event.target.value != "") {
            var newList = createTag("li", {});
            var newIcon = createTag("i", { className: "fa fa-list-ul" });
            newList.append(newIcon);
            newList.append(event.target.value);
            topLeft.append(newList);
            event.target.value = "";
        }
    }

    /**
     * 
     * @param {*} event 
     */
    function addTask(event) {
        if (event.keyCode == 13 && event.target.value != "") {
            var newCategoryList = createTag("div", { className: "middle-content1" });
            var newList = createTag("div", { className: "circle" });
            var newIcon = createTag("i", { className: "fa fa-circle-thin" });
            newList.append(newIcon);

            var newTask = createTag("div", { className: "task" });
            var newP = createTag("p", { className: "new" });
            var newP1 = createTag("p", { className: "period" });
            newP.innerText = event.target.value;
            newP1.innerText = "Tasks";
            newTask.append(newP);
            newTask.append(newP1);

            var newList1 = createTag("div", { className: "star" });
            var newIcon1 = createTag("i", { className: "fa fa-star-o" });
            event.target.value = "";
            newList1.append(newIcon1);

            newCategoryList.append(newList);
            newCategoryList.append(newTask);
            newCategoryList.append(newList1);
            newTasks.appendChild(newCategoryList);

        }
    }

    /**
     * 
     * @param {*} element 
     * @param {*} parameters 
     * @returns 
     */
    function createTag(element, parameters) {
        var newElement = document.createElement(element);
        if (parameters.className !== undefined) {
            newElement.className = parameters.className;
        }
        if (parameters.content !== undefined) {
            newElement.innerText = parameters.content;
        }
        return newElement;
    }

    function handleSelectedList(event) {
        let menuCategories = topLeft.getElementsByTagName("li");
        let categories = event.target;
        selectedCategory = categories;
        head[0].innerText = categories.innerText;
    }

    init();

})();