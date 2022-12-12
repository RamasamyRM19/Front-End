/*------------- Date ---------------*/
(function dateGenerate() {
    let now = new Date().toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });
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
        let newIcon = document.createElement("i");
        newIcon.className = "fa fa-list-ul";
        newList.innerText = event.target.value;
        event.target.value = "";
        document.querySelector(".new-top").style.display = "inline-block";
        document.querySelector(".new-top").append(newIcon);
        document.querySelector(".new-top").append(newList);
        document.querySelector(".new-top").append(document.createElement("br"));
    }
});


/*--------------------CENTER CONTAINER--------------------*/
/*----------------Change color in Heading------------------*/
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

        document.querySelector(".sort").style.display="none";
        document.querySelector(".suggestion").style.display="none";
        document.querySelector(".period").style.display="none";
        document.querySelector(".sort").style.color="#2564cf";
        document.querySelector(".sort i").style.color="#2564cf";

        let middleContent = document.querySelector(".center-container");
        let categoryTitle = middleContent.querySelector(".myDay p");
        let categoryTitleIcon = document.querySelector("#sun");
        if (category.innerText.trim() == "Assigned to me") {
            categoryTitle.style.color = "green";
            categoryTitleIcon.style.color = "green";
        } else if (category.innerText.trim() != "My Day") {
            categoryTitle.style.color = "#2564cf";
            categoryTitleIcon.style.color = "#2564cf";
            document.querySelector(".sort").style.display="inline-block";
            if (category.innerText.trim() == "Planned") {
                document.querySelector(".sort").style.display="none";
            }
        } else {
            categoryTitle.style.color = "black";
            categoryTitleIcon.style.color = "black";
            document.querySelector(".period").style.display="inline";
            document.querySelector(".sort").style.display="inline-block";
            document.querySelector(".suggestion").style.display="inline-block";
            document.querySelector(".sort").style.color="#858383";
            document.querySelector(".sort i").style.color="#858383";
        }
        
        document.querySelector("#sun").className = category.querySelector(".left-category-icon").className;
        categoryTitle.innerText = category.innerText;
    }
}

document.getElementById("add").addEventListener("keypress", handleAddButton);
function handleAddButton(e) {
    if (e.key == "Enter" && e.target.value != "") {
      let addButton
        = document.querySelector(".new-two .addBtn");
      addButton.click();
    }
  }

// let categoryTitle = document.querySelector(".sideBar-title").addEventListener("click", handleCategoryFocus, true);
// function handleCategorySelect(e) {
//     if (categoryTitle == "My Day") {
//         icon = 
//     }
// }