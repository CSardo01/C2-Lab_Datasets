
console.log(window.innerWidth);


function renderItems(collection) {
  //   console.log(collection.typefaces);
  if (window.innerWidth < 768) {
    console.log("Mobile Script");
    document.getElementById("statement").innerHTML = "Howdy! These boxes display the most popular typefaces of all time. The height of each box indicates the font's prevalence, while the width represents its creation date.The older the typeface, the taller the box. Simply click over a box to learn more about each typeface!"


    collection.typefaces.forEach((element) => {
      console.log(":{", element);
      let collectionContainer = document.getElementById("collectionContainer");

      let typefaces = `
    <div class="typeface-visual" 
    data-style="${element.style}"
    data-country="${element.country}"
    style="height: ${(element.number / 5564) * 300}%; width: ${(50 - element.rankYear) * 2}%;">

    <img class="typeface-img" src="${element.img}">

    <div class="typeface-data">
      <h2 class="typeface-name">${element.name}</h2>
      <p class="typeface-type tag">${element.style}</p>
      <p class="typeface-designer tag">${element.designer}</p>
      <p class="typeface-country tag">${element.country}</p>
      <p class="typeface-year tag">${element.year}</p>
      <p class="typeface-works tag">${element.number} works on Fonts in Use.</p>
    </div>
    </div>`;
      //border: ${element.rankYear * 0.1}px solid black;
      //background-image: url(${element.img});
      //background-color: hsl(${element.rankYear * 2 + 130}, 40%, 70%);
      //style="width: ${(element.number / 5564) * 100}%;"

      collectionContainer.insertAdjacentHTML("beforeend", typefaces);

    });

  }
  else {
    console.log("Desktop Script");

    collection.typefaces.forEach((element) => {
      console.log(":{", element);
      let collectionContainer = document.getElementById("collectionContainer");

      let typefaces = `
    <div class="typeface-visual" 
      data-style="${element.style}"
      data-country="${element.country}"
      style="width: ${(element.number / 5564) * 100}%; height: ${(50 - element.rankYear) * 2}%;">
    <img class="typeface-img" src="${element.img}">
    <div class="typeface-data">
      <h2 class="typeface-name">${element.name}</h2>
      <p class="typeface-type tag">${element.style}</p>
      <p class="typeface-designer tag">${element.designer}</p>
      <p class="typeface-country tag">${element.country}</p>
      <p class="typeface-year tag">${element.year}</p>
      <p class="typeface-works tag">${element.number} works on Fonts in Use.</p>
    </div>
    </div>`;
      //border: ${element.rankYear * 0.1}px solid black;
      //background-image: url(${element.img});
      //background-color: hsl(${element.rankYear * 2 + 130}, 40%, 70%);
      //style="width: ${(element.number / 5564) * 100}%;"

      collectionContainer.insertAdjacentHTML("beforeend", typefaces);
    });
  }
}

let btn = document.querySelectorAll(".filter-btn");
btn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log("clicked", event.target.dataset.country);
    btn.classList.toggle("button-clicked");

    document.querySelectorAll('.typeface-visual').forEach(item => {
      item.classList.remove("filter-hide");
      item.classList.add("filter-show")
    })

    //write code to remove clicked class from other buttons

    document.querySelectorAll(".typeface-visual").forEach(function (item) {
      if (event.target.dataset.filter == "style") {
        if (event.target.dataset.style == item.dataset.style) {
          console.log(";{", item)
          item.classList.add("filter-show")
        }
        else {
          item.classList.add("filter-hide")
        }
      } else if (event.target.dataset.filter == "country") {
        if (event.target.dataset.country == item.dataset.country) {
          console.log(";{", item)
          item.classList.add("filter-show")
        }
        else {
          item.classList.add("filter-hide")
        }
      }
    });
  });
});

resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function (event) {
  document.querySelectorAll(".filter-btn").forEach(item => {
    console.log(">.<", item)
    item.classList.remove("button-clicked")
  })
  document.querySelectorAll(".typeface-visual").forEach(item => {
    item.classList.remove("filter-hide");
    item.classList.add("filter-show")
  })
});

var slider = document.getElementById("myRange");
var collectionContainer = document.getElementById("collectionContainer")
console.log(collectionContainer.style.width);
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output = this.value
  console.log(output + "%")
  // console.log((this.value), "%");
  collectionContainer.style.width = (output + "%")
  // console.log(collectionContainer.style.width);
}

const drager = document.querySelector('.collection-overflow-container');
let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - drager.offsetLeft;
  scrollLeft = drager.scrollLeft;
};
let stopDragging = function (event) {
  mouseDown = false;
};

drager.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if (!mouseDown) { return; }
  const x = e.pageX - drager.offsetLeft;
  const scroll = x - startX;
  drager.scrollLeft = scrollLeft - scroll;
});

// Add the event listeners
drager.addEventListener('mousedown', startDragging, false);
drager.addEventListener('mouseup', stopDragging, false);
drager.addEventListener('mouseleave', stopDragging, false);
fetch("assets/fonts-in-use.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (collection) {
    // And passes the data to the function, above!
    renderItems(collection); // In reverse order
  });
