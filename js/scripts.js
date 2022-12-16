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
    var addTasks = document.getElementById("addCategory");
    //var newTasks = document.getElementsByClassName('content-three')[0];
    var topLeft = document.getElementById("top");
    var menuLists = topLeft.getElementsByTagName('li');
    var head = document.getElementsByClassName("myDay");
    var renderedItems = document.getElementById("content-three");
    var renderingItems = document.getElementsByClassName("middle-content1");
    var selectedCategory;
    var completedItems = document.getElementById("completed-items");
    var completedTitleContainer = document.getElementById("completed-title-container");

    /**
     * 
     */
    function init() {
        showDate();
        renderCategory();
        eventListener();
        addTask(false);
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
        topLeft.addEventListener("click", handleSelectedList, true);
        renderedItems.addEventListener("click", handleTaskFunctionality);
        addTasks.addEventListener("keypress", handleNewTask);
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
    function addTask(isCompleted) {
        if (isCompleted) {
            completedItems.innerHTML = "";
        } else {
            renderedItems.innerHTML = "";
        }
        var currentCategoryName = head[0].innerText.trim();
        tasks.filter(task => task.isCompleted == isCompleted)
            .forEach(task => {
                task.categories.forEach(categoryName => {
                    if (categoryName === currentCategoryName) {
                        console.log("Entered");
                        var newCategoryList = createTag("div", { className: "middle-content1", dataId: task.id });
                        var newList = createTag("div", { className: "circle" });
                        var newIcon = createTag("i", { className: isCompleted ? "fa fa-check-circle-o" : "fa fa-circle-thin" });
                        newList.append(newIcon);

                        var newTask = createTag("div", { className: "task" });
                        var newP = createTag("p", { className: "new", content: task.name });
                        var newP1 = createTag("p", { className: "period" });
                        newP1.innerText = "Tasks";
                        newTask.append(newP);
                        newTask.append(newP1);

                        var newList1 = createTag("div", { className: "star" });
                        var newIcon1 = createTag("i", { className: task.isImportant ? "fa fa-star" : "fa fa-star-o" });
                        newList1.append(newIcon1);

                        newCategoryList.append(newList);
                        newCategoryList.append(newTask);
                        newCategoryList.append(newList1);
                        //renderedItems.appendChild(newCategoryList);

                        if (isCompleted) {
                            completedItems.append(newCategoryList);
                        } else {
                            console.log(renderedItems);
                            renderedItems.insertBefore(newCategoryList, renderedItems.firstChild);
                        }
                    }
                })
            })
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
        if (parameters.dataId != null) {
            newElement.setAttribute("data-id", parameters.dataId);
        }

        return newElement;
    }

    /**
     * 
     * @param {*} event 
     */
    function handleSelectedList(event) {
        let categoryMenu = topLeft.getElementsByTagName("li");
        let categories = event.target;
        if (categories.tagName == "LI") {
            selectedCategory = categories;
            for (var i = 0; i < categoryMenu.length; i++) {
                categoryMenu[i].className = "default";
                if (i === 5) {
                    categoryMenu[i].className = "line";
                }
            }
            selectedCategory.className = "selected";
            head[0].innerText = categories.innerText;
            addTask(false);
            renderCompletedTask();
        }
    }

    /**
     * 
     * @param {*} event 
     */
    function handleTaskFunctionality(event) {
        if (event.target.tagName == "I") {
            if (event.target.className == "fa fa-star" || event.target.className == "fa fa-star-o") {
                handleImportantTask(event);
            } else {
                handleCompletedTask(event)
            }
        }
    }

    /**
     * 
     * @param {*} event 
     */
    function handleImportantTask(event) {
        let taskId = parseInt(event.target.parentElement.parentElement.getAttribute("data-id"));
        if (event.type == "click") {
            if (event.target.className === "fa fa-star-o") {
                console.log("event occured");
                event.target.className = "fa fa-star";
                addToImportant(taskId, "Important");
            } else if (event.target.className == "fa fa-star") {
                event.target.className = "fa fa-star-o";
                removeFromImportant(taskId, "Important");
            }
            addTask(false);
            renderCompletedTask();
        }
    }

    /**
     * 
     * @param {*} taskId 
     * @param {*} categories 
     */
    function addToImportant(taskId, categories) {
        let taskIndex = getTaskIndexById(taskId);
        let categoryIndex = tasks[taskIndex].categories.indexOf(categories);
        if (categoryIndex == -1) {
            if (!(tasks[taskIndex].isCompleted)) {
                tasks[taskIndex].categories.push(categories);
            }
        }
        tasks[taskIndex].isImportant = true;
    }

    /**
     * 
     * @param {*} taskId 
     * @param {*} categories 
     */
    function removeFromImportant(taskId, categories) {
        let taskIndex = getTaskIndexById(taskId);
        let categoryIndex = tasks[taskIndex].categories.indexOf(categories);
        tasks[taskIndex].categories.splice(categoryIndex, 1);
        tasks[taskIndex].isImportant = false;
    }

    /**
     * 
     * @param {*} id 
     * @returns 
     */
    function getTaskIndexById(id) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                return i;
            }
        }
    }

    /**
     * 
     * @param {*} event 
     */
    function handleNewTask(event) {
        let currentCategoryName = head[0].innerText.trim();
        if (event.keyCode == 13 && event.target.value.trim() != "") {
            let task = {
                id: tasks.length + 1,
                name: event.target.value,
                categories: [currentCategoryName],
                isImportant: false,
                isCompleted: false
            }
            if (currentCategoryName != "Tasks" && isDefaultCategory(currentCategoryName)) {
                task.category.push("Tasks");
            }
            if (currentCategoryName == "Important") {
                task.isImportant = true;
            }
            console.log(task);
            tasks.push(task);
            event.target.value = "";
            addTask(false);
            renderCompletedTask();
        }
    }

    /**
     * 
     * @param {*} categoryName 
     * @returns 
     */
    function isDefaultCategory(categoryName) {
        return category.filter(categories => categories.name === categoryName &&
            categories.isDefault == true).length > 0;
    }

    /**
     * 
     */
    function renderCompletedTask() {
        addTask(true);
        if (completedItems.children.length == 0) {
            completedTitleContainer.classList.add("hide-block");
        } else {
            completedTitleContainer.classList.remove("hide-block");
        }
    }

    function handleCompletedTask(event) {
        console.log("Complete Function");
        if (event.type == "click") {
            if (event.target.className == "fa fa-check-circle-o") {
                let completedItem = event.target.parentElement.parentElement;
                let taskId = parseInt(completedItem.getAttribute("data-id"));
                let index = getTaskIndexById(taskId);
                tasks[index].isCompleted = true;
                let indexOfImportant = tasks[index].categories.indexOf("Important");
                if (indexOfImportant != -1) {
                    tasks[index].category.splice(indexOfImportant, 1);
                }
            } else if (event.target.className == "fa fa-circle-o") {
                let completedItem = event.target.parentElement.parentElement;
                let taskId = parseInt(completedItem.getAttribute("data-id"));
                let index = getTaskIndexById(taskId);
                tasks[index].isCompleted = false;
                let indexOfImportant = tasks[index].category.indexOf("Important");
                if (indexOfImportant != -1) {
                    tasks[index].category.splice(indexOfImportant, 1);
                }
            }
            addTask(false);
            renderCompletedTask();
        } else if (event.type == "mouseover" && event.target.className == "fa fa-circle-o") {
            event.target.className = "fa fa-check-circle-o";
        } else if (event.type == "mouseout" && event.target.className == "fa fa-check-circle-o") {
            event.target.className = "fa fa-circle-o";
        }
    }

    function handleSuggestion() {
        var mainDiv = createTag("div", {className: "right=container"})
        var div1 = createTag("div", { className: "section" });
        var div2 = createTag("div", { className: "section-icon" });
        var div3 = createTag("i", { className: "fa fa-circle-o" });
        div2.append(div3);
        var div4 = createTag("div", { className: "section-name" });
        div4.innerText = element.target.value;
        var div5 = createTag("div", { className: "section-icon" });
        var div6 = createTag("div", { className: "fa fa-star-o" });
        div5.append(div6);

        var div7 = createTag("div", { className: "middle-sections" });
        var div8 = createTag("div", { className: "section" });
        var div9 = createTag("div", { className: "section-icon" });
        var div10 = createTag("i", { className: "fa fa-circle-o" });
        div9.append(div10);
        var div11 = createTag("div", { className: "section-name" });
        div11.innerText = "Added to My Day";
        div8.append(div9);
        div8.append(div11);

    }

    init();

})();