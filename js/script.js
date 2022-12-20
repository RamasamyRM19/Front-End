"use strict";

import { saveOrGetData } from "./fetchAPIScript.js";
(function () {

  var category = [];
  var tasks = [];
  var period = document.getElementById("period");
  var leftContainerBarIcon = document.getElementById("bar");
  var leftContainer = document.getElementsByClassName("left-container")[0];
  var centerContainerBarIcon = document.getElementById("sun");
  var centerContainer = document.getElementsByClassName("center-container")[0];
  var input = document.getElementById("new-list");
  var addTasks = document.getElementById("addCategory");
  var topLeft = document.getElementById("top");
  var head = document.getElementById("myDay");
  var renderedItems = document.getElementById("content-three");
  var renderingItems = document.getElementsByClassName("content-title");
  var selectedCategory;
  var completedItems = document.getElementById("completed-items");
  var completedTitleContainer = document.getElementById("completed-title-container");
  var rightContainer = document.getElementsByClassName("right-container")[0];
  var exitIcon = document.getElementById("exit-icon");
  var titleContent = document.getElementById("title-content");
  var renderedCompleted = document.getElementById("content-three");
  var taskTitleSection = document.getElementById("task-title-section");

  /**
   * Initial Function to start up the script
   */
  function init() {
    showDate();
    getTasks();
    renderCategory();
    eventHandlers();
    addTask(false);
  }

  /**
   * Show Current Date & Day
   */
  function showDate() {
    let now = new Date().toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });
    period.innerText = now;
  }

  /**
   * Handle the click & keypress Event functionality
   */
  function eventHandlers() {
    leftContainerBarIcon.addEventListener('click', toggleScreenView);
    centerContainerBarIcon.addEventListener('click', toggleScreenView);
    input.addEventListener("keypress", addList);
    topLeft.addEventListener("click", handleSelectedList);
    renderedItems.addEventListener("click", handleTaskFunctionality);
    renderedCompleted.addEventListener("mouseover", handleCompletedTaskFunctionality);
    renderedCompleted.addEventListener("mouseout", handleCompletedTaskFunctionality);
    completedTitleContainer.addEventListener("click", handleCompletedBar);
    addTasks.addEventListener("keypress", handleNewTask);
    renderedItems.addEventListener("click", handleTaskFunctionality);
    exitIcon.addEventListener("click", hideRightContainer);
  }

  /**
   * To Hide Left Container & Show full-width on Center Container
   */
  function toggleScreenView() {
    leftContainer.classList.toggle("hide-left-container");
    centerContainer.classList.toggle("full-screen-view");
  }

  /**
   * Render Left Side Category
   */
  function renderCategory(newCategoryAdd) {
    var savedCategory = saveOrGetData("categories", "GET");
    savedCategory.then(savedCategory => {
      category = savedCategory;
      category.forEach(element => {
        generateCategory(element);
      });
    })
      .catch(error => console.log('error', error));
  }

  function generateCategory(element) {
    var categoryList = createTag("li", {});
    var categoryIcon = createTag("i", {});
    categoryIcon.className = element.icon;
    categoryList.append(categoryIcon);
    categoryList.append(element.name);
    topLeft.append(categoryList);
    if (element.isLastDefaultTask) {
      var newLine = createTag("li", { className: "line" });
      topLeft.append(newLine);
    }
  }

  /**
   * Add new List in the left container
   * 
   * @param {*} event 
   */
  function addList(event) {
    var categoryName = event.target.value;
    if (event.keyCode == 13 && event.target.value != "") {
      let categoryData = {
        name: categoryName,
        icon: "fa fa-list-ul",
        isLastDefaultTask: false
      }
      saveCategory(categoryData);
      event.target.value = "";
      topLeft.innerText = "";
      getTasks();
    }
  }

  function saveCategory(categoryData) {
    saveOrGetData('categories', 'POST', categoryData)
      .then(() => {
        renderCategory(true);
      })
      .catch(error => console.log('error', error));
  }

  function saveTask(task) {
    var result = saveOrGetData("task", "POST", task);
    result.then(() => getTasks())
      .catch(error => console.log('error', error));
  }

  function getTasks() {
    var savedTasks = saveOrGetData("tasks", "GET");
    savedTasks.then(savedTasks => {
      tasks = savedTasks;
      renderCompletedTask();
    })
      .catch(error => console.log('error', error));
  }

  /**
   * Add New task based on Category, render items based on important & completed tasks
   * 
   * @param {*} isCompleted 
   */
  function addTask(isCompleted) {
    if (isCompleted) {
      completedItems.innerHTML = "";
    } else {
      renderedItems.innerHTML = "";
    }
    var currentCategoryName = head.innerText.trim();
    tasks.filter(task => task.isCompleted == isCompleted)
      .forEach(task => {
        task.category.forEach(categoryName => {
          if (categoryName === currentCategoryName) {
            var newCategoryList = createTag("div", { className: "middle-content1", dataId: task.id });
            var newList = createTag("div", { className: "circle circleIcon", id: "circle" });
            var newIcon = createTag("i", { className: isCompleted ? "fa fa-check-circle-o" : "fa fa-circle-thin", dataId: task.id });
            newList.append(newIcon);

            var newTask = createTag("div", { className: "task task-content" });
            var newP = createTag("p", { className: "new content-title", content: task.name });
            var newP1 = createTag("p", { className: "period" });
            newP1.innerText = "Tasks";
            newTask.append(newP);
            newTask.append(newP1);

            var newList1 = createTag("div", { className: "star" });
            var newIcon1 = createTag("i", { className: task.isImportant ? "fa fa-star" : "fa fa-star-o", dataId: task.id });
            newList1.append(newIcon1);

            newCategoryList.append(newList);
            newCategoryList.append(newTask);
            newCategoryList.append(newList1);

            if (isCompleted) {
              completedItems.append(newCategoryList);
            } else {
              renderedItems.insertBefore(newCategoryList, renderedItems.firstChild);
            }
          }
        })
      })
  }

  /**
   * Create Tag Element by validating that is not undefined & null.
   * 
   * @param {*} element 
   * @param {*} parameters 
   * @returns newElement
   */
  function createTag(element, parameters) {
    var newElement = document.createElement(element);
    if (parameters.className !== undefined) {
      newElement.className = parameters.className;
    }
    if (parameters.id !== undefined) {
      newElement.id = parameters.id;
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
   * Handle the selected category list
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
      head.innerText = categories.innerText;
      addTask(false);
      renderCompletedTask();
    }
  }

  /**
   * Checks to handle the important & completed task functionality
   * 
   * @param {*} event 
   */
  function handleTaskFunctionality(event) {
    if (event.target.tagName == "I") {
      if (event.target.className == "fa fa-star" || event.target.className == "fa fa-star-o") {
        handleImportantTask(event);
      } else if (event.target.className == "fa fa-circle-o" || event.target.className == "fa fa-check-circle-o") {
        handleCompletedTask(event)
      }
    } else if (event.target.tagName == "P") {
      handleTaskDetail(event);
    }
  }

  function handleCompletedTaskFunctionality(event) {
    if (event.target.tagName == "I") {
      if (event.target.className == "fa fa-circle-thin") {
        event.target.className = "fa fa-check-circle-o";
      } else if (event.target.className == "fa fa-check-circle-o") {
        event.target.className = "fa fa-circle-thin";
      }
    }
  }

  /**
   * Handle the important task functionality
   * 
   * @param {*} event 
   */
  function handleImportantTask(event) {
    let taskId = parseInt(event.target.parentElement.parentElement.getAttribute("data-id"));
    if (event.type == "click") {
      if (event.target.className === "fa fa-star-o") {
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

  function handleCompletedTask(event) {
    console.log(event);
    if (event.type == "click") {
      if (event.target.className == "fa fa-circle-check-o") {
        let completedItem = event.target;
        let taskId = parseInt(completedItem.getAttribute("data-id"));
        let index = getTaskIndexById(taskId);
        tasks[index].isCompleted = true;
        let indexOfImportant = tasks[index].category.indexOf("Important");
        if (indexOfImportant != -1) {
          tasks[index].category.splice(indexOfImportant, 1);
        }
        addTask(false);
        renderCompletedTask();
        renderTaskDetail(taskId);
      } else if (event.target.className == "fa fa-circle-thin") {
        let completedItem = event.target;
        let taskId = parseInt(completedItem.getAttribute("data-id"));
        let index = getTaskIndexById(taskId);
        tasks[index].isCompleted = false;
        let indexOfImportant = tasks[index].category.indexOf("Important");
        if (indexOfImportant != -1) {
          tasks[index].category.splice(indexOfImportant, 1);
        }
        addTask(false);
        renderCompletedTask();
        renderTaskDetail(taskId);
      }
    }
  }

  /**
   * Add the task to important category by pressing star icon
   * 
   * @param {*} taskId 
   * @param {*} categories 
   */
  function addToImportant(taskId, categories) {
    let taskIndex = getTaskIndexById(taskId);
    let categoryIndex = tasks[taskIndex].category.indexOf(categories);
    if (categoryIndex == -1) {
      if (!(tasks[taskIndex].isCompleted)) {
        tasks[taskIndex].category.push(categories);
      }
    }
    tasks[taskIndex].isImportant = true;
  }

  /**
   * Remove the task from important category by pressing star icon
   * 
   * @param {*} taskId 
   * @param {*} categories 
   */
  function removeFromImportant(taskId, categories) {
    let taskIndex = getTaskIndexById(taskId);
    let categoryIndex = tasks[taskIndex].category.indexOf(categories);
    tasks[taskIndex].category.splice(categoryIndex, 1);
    tasks[taskIndex].isImportant = false;
  }

  /**
   * Get the task by id
   * 
   * @param {*} id 
   * @returns i
   */
  function getTaskIndexById(id) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return i;
      }
    }
  }

  /**
   * Handle the new task and then call the addtask and rendercompletedtask function
   * 
   * @param {*} event 
   */
  function handleNewTask(event) {
    let currentCategoryName = head.innerText.trim();
    if (event.keyCode == 13 && event.target.value.trim() != "") {
      let task = {
        id: tasks.length + 1,
        name: event.target.value,
        category: [currentCategoryName],
        isImportant: false,
        isCompleted: false
      }
      if (currentCategoryName != "Tasks" && isDefaultCategory(currentCategoryName)) {
        task.category.push("Tasks");
      }
      if (currentCategoryName == "Important") {
        task.isImportant = true;
      }
      saveTask(task);
      tasks.push(task);
      event.target.value = "";
      addTask(false);
      renderCompletedTask();
    }
  }

  /**
   * Checks the initial stored category is default
   * 
   * @param {*} categoryName 
   * @returns category
   */
  function isDefaultCategory(categoryName) {
    return category.filter(categories => categories.name === categoryName &&
      categories.isDefault == true).length > 0;
  }

  /**
   * Render the completed task by adding and removing the classname
   */
  function renderCompletedTask() {
    addTask(true);
    if (completedItems.children.length == 0) {
      completedTitleContainer.classList.add("hide-block");
    } else {
      completedTitleContainer.classList.remove("hide-block");
    }
  }

  /**
   * handle the completed task by clicking the icon and store it in the completed attribute
   * 
   * @param {*} event 
   */
  function handleCompletedTasks(event) {
    let completedItem = event.target;
    let taskId = parseInt(completedItem.getAttribute("data-id"));
    let index = getTaskIndexById(taskId);
    tasks[index].isCompleted = true;
    let indexOfImportant = tasks[index].category.indexOf("Important");
    if (indexOfImportant != -1) {
      tasks[index].category.splice(indexOfImportant, 1);
    }
    addTask(false);
    renderCompletedTask();
  }
  function handleCompletedTasks1(event) {
    let completedItem = event.target;
    let taskId = parseInt(completedItem.getAttribute("data-id"));
    let index = getTaskIndexById(taskId);
    tasks[index].isCompleted = false;
    let indexOfImportant = tasks[index].category.indexOf("Important");
    if (indexOfImportant != -1) {
      tasks[index].category.splice(indexOfImportant, 1);
    }
    addTask(false);
    renderCompletedTask();
  }

  /**
   * To show or hide completed bar based on arrow click
   * 
   * @param {*} event 
   */
  function handleCompletedBar(event) {
    if (event.target.tagName == "DIV") {
      if (event.target.children[0].className == "fa fa-chevron-down") {
        event.target.children[0].className = "fa fa-chevron-right";
        completedItems.classList.add("hide-block");
      } else if (event.target.children[0].className == "fa fa-chevron-right") {
        completedItems.classList.remove("hide-block");
        event.target.children[0].className = "fa fa-chevron-down";
      }
    }
  }

  /**
   * Handle the right container by adding the center container and right container classes
   */
  function handleRightContainer() {
    centerContainer.classList.add("center-container1");
    rightContainer.classList.add("show-block");
    handleRightContent();
  }

  /**
   * Hide the right container by removing the center container and right container classes
   */
  function hideRightContainer() {
    centerContainer.classList.remove("center-container1");
    rightContainer.classList.remove("show-block");
  }

  function handleRightContent() {
    let currentCategoryName = renderingItems[0].innerText;
    titleContent.innerText = currentCategoryName;
  }

  function handleTaskDetail(event) {
    if (event.type == "click" && event.target.tagName == "P") {
      centerContainer.classList.add("center-container1");
      rightContainer.classList.add("show-block");
      handleRightContent();
      renderTaskDetail(event.target.getAttribute("data-id"));
    } else if (event.type == "click" && event.target.id == "exit-icon") {
      centerContainer.classList.remove("center-container1");
      rightContainer.classList.remove("show-block");
    }
  }

  function renderTaskDetail(taskId) {
    taskTitleSection.innerHTML = "";
    let taskIndex = getTaskIndexById(taskId);
    let task = tasks[taskIndex];
    let checkIconContainer = createTag("div", { className: "section-icon" });
    let regularIcon = "fa fa-circle-thin";
    let solidIcon = "fa fa-circle-check-o";
    let checkIcon = createTag("i",
      {
        className: task.isCompleted ? solidIcon : regularIcon,
        dataId: taskId
      });
    checkIconContainer.append(checkIcon);
    let nameContainer = createTag("div", { className: task.isCompleted ? "striked section-name" : "section-name" });
    nameContainer.innerText = task.name;
    let starIconContainer = createTag("div", { className: "section-icon" });
    regularIcon = "fa-regular fa-star";
    solidIcon = "fa-solid fa-star";
    let starIcon = createTag("i",
      {
        className: task.isImportant ? solidIcon : regularIcon,
        dataId: taskId
      });
    starIconContainer.append(starIcon)
    taskTitleSection.append(checkIconContainer);
    taskTitleSection.append(nameContainer);
    taskTitleSection.append(starIconContainer);
  }

  init();

})();
