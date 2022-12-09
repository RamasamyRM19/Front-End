/*------------- Date ---------------*/
// var currentDate = myDateFunction();
// document.getElementById("period").innerHTML = currentDate;

// function myDateFunction() {
//     var date = new Date();
//     return (date.toDateString());
// }

(function dateGenerate () {
    let now = new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
document.querySelector("#period").innerText = now;
})(); 

/*------------- Line Bar ---------------*/
(function newFun() {
    document.querySelector(".container").addEventListener("click", fun, true);
})();

function fun(e) {
    if (e.target.className == "fa fa-bars") {
        var btn = document.querySelector(".left-container");
        if (btn.style.display == "none") {
            document.querySelector(".left-container").style.display = "inline-block";
            document.querySelector(".center-container").style.width = "78.5%";
            document.querySelector(".myDay .fa.fa-sun-o").style.display = "inline-block";
            document.querySelector(".myDay .fa.fa-bars").style.display = "none";
        }

        else {
            document.querySelector(".left-container").style.display = "none";
            document.querySelector(".center-container").style.width = "99.9%";
            document.querySelector(".myDay .fa.fa-sun-o").style.display = "none";
            document.querySelector(".myDay .fa.fa-bars").style.display = "inline-block";
        }
    }
}

/************************New List*******************************/
var inputBox = document.querySelector(".new-top");
var input = document.querySelector(".new-list");
input.addEventListener("keypress", function (event) {

    if (event.keyCode == 13) {
        console.log(event.target.value);
        var newList = document.createElement("div");
        newList.innerText = event.target.value;
        event.target.value="";
        document.querySelector(".new-top").style.display="inline-block";
        document.querySelector(".new-top").append(newList);
        document.querySelector(".new-top").append(document.createElement("br"));
    }
});


  /*--------------------------------*/
  document.querySelector(".top")
    .addEventListener("click", handleCategoryFocus, true);
  function handleCategoryFocus(e) {
    let category = e.target;
    if (category.tagName != "LI") {
      category = category.parentElement;
    }
    if (category.tagName == "LI") {
      let categories = document.querySelectorAll(".top li");
      categories.forEach(category => {
        category.removeAttribute("style");
      });
      category.style.backgroundColor = "#ecf6fd";
      category.style.borderLeft = "2px solid #2564cf";
      category.style.fontWeight = "600";
      category.style.paddingLeft = "26px";
  
      let middleContent = document.querySelector(".center-container");
      let categoryTitle = middleContent.querySelector(".myDay");
      let categoryTitleIcon =
        middleContent.querySelector("#sun");
      if (category.innerText.trim() == "Assigned to me") {
        categoryTitle.style.color = "green";
        categoryTitleIcon.style.color = "green";
      } else if (category.innerText.trim() != "My Day") {
        categoryTitle.style.color = "#2564cf";
        categoryTitleIcon.style.color = "#2564cf";
      } else {
        categoryTitle.style.color = "black";
        categoryTitleIcon.style.color = "black";
      }
      let categoryIcon = category.querySelector(".left-category-icon").className;
      categoryTitleIcon.className = categoryIcon;
      categoryTitle.innerText = category.innerText;
    }
  }