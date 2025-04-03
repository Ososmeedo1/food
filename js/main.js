
const rowDisplay = document.getElementById("rowDisplay");
const categories = document.getElementById("categories");
const area = document.getElementById("area");
const ingredients = document.getElementById("ingredients");
const search = document.getElementById("search");
const searchDisplay = document.getElementById("searchDisplay");
const contact = document.getElementById("contact");
const contactDisplay = document.getElementById("contactDisplay");
const motion = $(".side-nav-menu .nav-tab").outerWidth();
const loading = document.querySelector("#internalLoading");


const searchSm = document.getElementById("searchSm");
const categoriesSm = document.getElementById("categoriesSm");
const areaSm = document.getElementById("areaSm");
const ingredientsSm = document.getElementById("ingredientsSm");
const contactSm = document.getElementById("contactSm");

$('#start').click(function () {
  searchByName("chicken")
});

document.addEventListener("DOMContentLoaded", function () {
  const upButton = document.getElementById("upButton");

  const scrollPosition = 0;
  
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > scrollPosition && currentScroll > 200) {
      upButton.classList.add("show");
    } else if (currentScroll < scrollPosition && currentScroll < 200) {
      upButton.classList.remove("show");
    }

    scrollPosition = currentScroll;
  });
  
  upButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

$(document).ready(function () {
  searchByName("chicken").then(() => {
    $(".loading").fadeOut(500);
  });
});

$(categoriesSm).click(function () {
  searchDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  getCategories().then(() => {
    $(".loading").fadeOut(500);
  });
  closeSideNav(motion);
});

$(categories).click(function () {
  searchDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  getCategories().then(() => {
    $(".loading").fadeOut(500);
  });
  closeSideNav(motion);
});

$(ingredientsSm).click(function () {
  searchDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  getIngredients();
  closeSideNav(motion);
});

$(ingredients).click(function () {
  searchDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  getIngredients();
  closeSideNav(motion);
});

$(areaSm).click(function () {
  searchDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  getArea();
  closeSideNav(motion);
});

$(area).click(function () {
  searchDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  getArea();
  closeSideNav(motion);
});

$(searchSm).click(function () {
  rowDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  searchButton();
  closeSideNav(motion);
});

$(search).click(function () {
  rowDisplay.innerHTML = ``;
  contactDisplay.innerHTML = ``;
  searchButton();
  closeSideNav(motion);
});

$(contactSm).click(function () {
  searchDisplay.innerHTML = ``;
  rowDisplay.innerHTML = ``;
  contactButton();
  closeSideNav(motion);
});

$(contact).click(function () {
  searchDisplay.innerHTML = ``;
  rowDisplay.innerHTML = ``;
  contactButton();
  closeSideNav(motion);
});

window.addEventListener("beforeunload", function (event) {
  event.preventDefault(); // Required for some browsers
  event.returnValue = "Are you sure you want to leave this page?";
});



$('.side-nav-menu .open-close-icon').click(() => {

  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav(motion);
  } else {
    openSideNav();
  }
})

function closeSideNav(motion) {
  $(".side-nav-menu").animate({ left: -motion }, 500)
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  for (let i = 4; i >= 0; i--) {
    $(".links li").eq(i).animate({ top: 300 }, (7 - i) * 100);
  }
}

function openSideNav() {
  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100);
  }
  $(".side-nav-menu").animate({ left: 0 }, 500)
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
}

function displayMeals(data) {
  let container = ``;


  for (let i = 0; i < data.length; i++) {
    container += `
      <div class="col-md-3" onclick="getMealDetails('${data[i].idMeal}')">
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img src="${data[i].strMealThumb}" class="w-100" alt="">
          <div class="meal-layer position-absolute d-flex justify-content-center align-items-center text-black">
            <h3>${data[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `
  };

  rowDisplay.innerHTML = container;
}

async function getIngredients() {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  const data = await response.json();
  const meals = data.meals;
  displayIngredients(meals);
  loading.classList.add("d-none");
}

function displayIngredients(data) {
  let container = ``;

  for (let i = 0; i < data.length; i++) {
    if (data[i].strIngredient == "Pork" || data[i].strIngredient == "Bacon") {
      continue;
    }
    container += `
    <div class="col-md-3" onclick="getMealsForIngredient('${data[i].strIngredient}')">
        <div class="meal country position-relative overflow-hidden text-center text-dark rounded-2 bg-light p-4 h-100">
          <h2 class="font-monospace">${data[i].strIngredient}</h2>
        </div>
      </div>
    `
  };

  rowDisplay.innerHTML = container;
}

async function getCategories() {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  const data = await response.json();
  const categories = data.categories;
  displayCategories(categories)
  loading.classList.add("d-none");
}

function displayCategories(data) {
  let container = ``;
  for (let i = 0; i < data.length; i++) {

    if (data[i].strCategory != "Pork") {
      container += `
    <div class="col-md-3">
        <div onclick="getSpecificCategory('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
          <div class="meal-layer position-absolute d-flex flex-column align-items-center justify-content-center text-black px-3">
            <h3>${data[i].strCategory}</h3>
            <p>${data[i].strCategoryDescription.split(' ').slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>
    `
    }
  }
  
  rowDisplay.innerHTML = container;

}

async function getArea() {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  const data = await response.json();
  const area = data.meals;
  displayArea(area);
  loading.classList.add("d-none");
}

function displayArea(data) {
  let container = ``;

  for (let i = 0; i < data.length; i++) {
    container += `
      <div class="col-md-3" onclick="getMealsForArea('${data[i].strArea}')">
        <div class="meal country position-relative overflow-hidden text-center text-dark rounded-2 bg-light p-4 h-100">
          <h2 class="font-monospace">${data[i].strArea}</h2>
        </div>
      </div>
    `
  }

  rowDisplay.innerHTML = container;
}

async function getSpecificCategory(name) {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
  const data = await response.json();
  const meals = data.meals;

  displayMeals(meals)
  loading.classList.add("d-none");
}

async function getMealsForArea(name) {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
  const data = await response.json();
  const meals = data.meals;

  displayMeals(meals)
  loading.classList.add("d-none");
}

async function getMealsForIngredient(ingredient) {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  const meals = data.meals;
  displayMeals(meals);
  loading.classList.add("d-none");
}

async function getMealDetails(id) {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  const meals = data.meals[0];
  displayMealDetails(meals);
  loading.classList.add("d-none");
}

function displayMealDetails(data) {
  let ingredients = ``;
  let container = ``;
  searchDisplay.innerHTML = ``;
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredients += `<li class="badge">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}  </li>`;
    } else {
      break;
    }
  }



  container = `
      <div class="col-md-4">
          <div class="image">
            <img src="${data.strMealThumb}" class="w-100" id="dishImg" alt="${data.strMeal}" />
            <h2>${data.strMeal}</h2>
          </div>
        </div>

        <div class="col-md-8">
          <h2>Instructions</h2>
          <p>${data.strInstructions}</p>
          <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
          <h3>Recipes: </h3>
          <ul class="list-unstyled d-flex flex-wrap w-50 py-4">
            ${ingredients}
          </ul>

          <a href="${data.strSource}" class="btn btn-success btn-sm w-25 me-2" target="_blank">Source</a>
          <a href="${data.strYoutube}" class="btn btn-danger btn-sm w-25" target="_blank">Video</a>
        </div>
    `


  rowDisplay.innerHTML = container;

  let dishImg = document.getElementById("dishImg");

  function resizeImage(e) {
    if (e.matches) {
      dishImg.classList.add("mb-4");
    }
  }

  const mediaQuery = window.matchMedia("(max-width: 600px)");
  mediaQuery.addEventListener("change", resizeImage);
  resizeImage(mediaQuery);
}

function searchButton() {
  searchDisplay.innerHTML = `
  <div class="row py-4">
      <div class="col-md-6 d-flex justify-content-center">
        <input onkeyup="searchByName(this.value)" id="nameSearch" class="input" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <input onkeyup="searchByLetter(this.value)" class="input" type="text" placeholder="Search By First Letter">
      </div>
    </div>
  `

  rowDisplay.innerHTML = "";

  const nameSearch = document.getElementById("nameSearch");

  function marginBottom(e) {
    if (e.matches) {
      nameSearch.classList.add("mb-4");
    } else {
      nameSearch.classList.remove("mb-4");
    }
  }
  const mediaQuery = window.matchMedia("(max-width: 600px)");
  mediaQuery.addEventListener("change", marginBottom);
  marginBottom(mediaQuery);
}

async function searchByName(item) {
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
  const data = await response.json();
  const meals = data.meals;
  displayMeals(meals);
  loading.classList.add("d-none");
}

async function searchByLetter(item) {
  if (item.length == 0) {
    return;
  }
  loading.classList.remove("d-none");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`);
  const data = await response.json();
  const meals = data.meals;
  displayMeals(meals);
  loading.classList.add("d-none");
}

function contactButton() {
  contactDisplay.innerHTML = `
  <div class="container w-50 h-100 d-flex flex-column justify-content-center align-items-center" id="contactForm">
    <div class="row pt-5 gy-5">
        <div class="col-md-6">
          <input type="text" onblur="nameValidation()" onkeyup="nameValidation(this.value); inputValidation()" id="nameInput" placeholder="Enter Your Name">
          
          <div class="text-danger mt-2 d-none d-flex justify-content-center" id="nameAlert" role="alert"></div>
        </div>
          <div class="col-md-6">
          <input type="email" onblur="emailValidation()" onkeyup="emailValidation(this.value); inputValidation()" id="emailInput" placeholder="Enter Your Email">
          <div class="text-danger mt-2 d-none d-flex justify-content-center" id="emailAlert" role="alert"></div>
        </div>
        <div class="col-md-6">
          <input type="tel" onblur="phoneValidation()" onkeyup="phoneValidation(this.value); inputValidation()" id="phoneInput" placeholder="Enter Your Phone">
          <div class="text-danger mt-2 d-none d-flex justify-content-center" id="phoneAlert" role="alert"></div>
        </div>
        <div class="col-md-6">
          <input type="number" onblur="ageValidation()" onkeyup="ageValidation(this.value); inputValidation()" id="ageInput" placeholder="Enter Your Age">
          <div class="text-danger mt-2 d-none d-flex justify-content-center" id="ageAlert" role="alert"></div>
        </div>
        <div class="col-md-6">
          <input type="password" onblur="passwordValidation()" onkeyup="passwordValidation(this.value); inputValidation()" id="passwordInput" placeholder="Enter Your Password">
          <div class="text-danger mt-2 d-none d-flex justify-content-center" id="passwordAlert" role="alert"></div>
        </div>
        <div class="col-md-6">
          <input type="password" onblur="confirmPasswordValidation()" onkeyup="confirmPasswordValidation(this.value); inputValidation()" id="confirmPasswordInput" placeholder="Confirm Your Password">
          <div class="text-danger mt-2 d-none d-flex justify-content-center" id="confirmPasswordAlert" role="alert"></div>
        </div>
      </div>
      <button class="btn btn-outline-success w-100 my-4" id="submitContact" disabled>Submit</button>
      </div>
  `

  rowDisplay.innerHTML = ``;

  const contactForm = document.getElementById("contactForm");

  function resize(e) {
    if (e.matches) {
      contactForm.classList.add("w-100");
    }
  }

  const mediaQuery = window.matchMedia("(max-width: 600px)");
  mediaQuery.addEventListener("change", resize);
  resize(mediaQuery);
}

function inputValidation() {

  const name = document.getElementById("nameAlert").innerHTML;
  const email = document.getElementById("emailAlert").innerHTML;
  const phone = document.getElementById("phoneAlert").innerHTML;
  const age = document.getElementById("ageAlert").innerHTML;
  const password = document.getElementById("passwordAlert").innerHTML;
  const confirmPassword = document.getElementById("confirmPasswordAlert").innerHTML;

  console.log(name);
  

  const nameInput = document.getElementById("nameInput").value;
  const emailInput = document.getElementById("emailInput").value;
  const phoneInput = document.getElementById("phoneInput").value;
  const ageInput = document.getElementById("ageInput").value;
  const passwordInput = document.getElementById("passwordInput").value;
  const confirmPasswordInput = document.getElementById("confirmPasswordInput").value;
  const submitContact = document.getElementById("submitContact");


  if (!name && !email && !phone && !age && !password && !confirmPassword && nameInput && emailInput && phoneInput && ageInput && passwordInput && confirmPasswordInput) {
    submitContact.removeAttribute("disabled");
  } else {
    submitContact.setAttribute("disabled", true);
  }
}

function nameValidation() {
  const nameInput = document.getElementById("nameInput").value;
  const nameAlert = document.getElementById("nameAlert");

  const nameRegex = /^[a-zA-Z][a-zA-Z' -]{2,19}$/;

  const result = nameRegex.test(nameInput);

  if (nameInput.length == 0) {
    nameAlert.classList.remove("d-none");
    nameAlert.innerHTML = `Name is required`;
  } else if (nameInput.length < 3) {
    nameAlert.classList.remove("d-none");
    nameAlert.innerHTML = `Name must be at least 3 characters`;
  } else if (nameInput.length > 20) {
    nameAlert.classList.remove("d-none");
    nameAlert.innerHTML = `Name must be less than 20 characters`;
  }
  else {
    nameAlert.classList.add("d-none");
    nameAlert.innerHTML = ``;
  }

  return result;

}

function emailValidation() {
  const emailInput = document.getElementById("emailInput").value;
  const emailAlert = document.getElementById("emailAlert");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const result = emailRegex.test(emailInput);
  if (emailInput.length == 0) {
    emailAlert.classList.remove("d-none");
    emailAlert.innerHTML = `Email is required`;
  } else if (!result) {
    emailAlert.classList.remove("d-none");
    emailAlert.innerHTML = `Email is invalid`;
  } else {
    emailAlert.classList.add("d-none");
    emailAlert.innerHTML = ``;
  }



  return result;
}

function phoneValidation() {
  const phoneInput = document.getElementById("phoneInput").value;
  const phoneAlert = document.getElementById("phoneAlert");
  const phoneRegex = /^01[0-2,5][0-9]{8}$/;
  const result = phoneRegex.test(phoneInput);
  if (phoneInput.length == 0) {
    phoneAlert.classList.remove("d-none");
    phoneAlert.innerHTML = `Phone is required`;
  } else if (!result) {
    phoneAlert.classList.remove("d-none");
    phoneAlert.innerHTML = `Enter valid Egyptian phone number`;
  } else {
    phoneAlert.classList.add("d-none");
    phoneAlert.innerHTML = ``;
  }
  return result;
}

function ageValidation() {
  const ageInput = document.getElementById("ageInput").value;
  const ageAlert = document.getElementById("ageAlert");
  const ageRegex = /^(1[89]|[2-9][0-9])$/;

  const result = ageRegex.test(ageInput);

  if (ageInput.length == 0) {
    ageAlert.classList.remove("d-none");
    ageAlert.innerHTML = `Age is required`;
  } else if (!result) {
    ageAlert.classList.remove("d-none");
    ageAlert.innerHTML = `Age must be between 18 and 99`;
  } else {
    ageAlert.classList.add("d-none");
    ageAlert.innerHTML = ``;
  }

  return result;
}

function passwordValidation() {
  const passwordInput = document.getElementById("passwordInput").value;
  const passwordAlert = document.getElementById("passwordAlert");

  const passwordRegex = /^.{8,}$/;

  const result = passwordRegex.test(passwordInput);

  if (passwordInput.length == 0) {
    passwordAlert.classList.remove("d-none");
    passwordAlert.innerHTML = `Password is required`;
  }
  else if (!result) {
    passwordAlert.classList.remove("d-none");
    passwordAlert.innerHTML = `Password must be at least 8 characters`;
  } else {
    passwordAlert.classList.add("d-none");
    passwordAlert.innerHTML = ``;
  }

  return result;
}

function confirmPasswordValidation() {
  const passwordInput = document.getElementById("passwordInput").value;
  const confirmPasswordInput = document.getElementById("confirmPasswordInput").value;
  const confirmPasswordAlert = document.getElementById("confirmPasswordAlert");

  const result = passwordInput === confirmPasswordInput;
  if (confirmPasswordInput.length == 0) {
    confirmPasswordAlert.classList.remove("d-none");
    confirmPasswordAlert.innerHTML = `Confirm Password is required`;
  } else if (!result) {
    confirmPasswordAlert.classList.remove("d-none");
    confirmPasswordAlert.innerHTML = `Passwords do not match`;
  } else {
    confirmPasswordAlert.classList.add("d-none");
    confirmPasswordAlert.innerHTML = ``;
  }

  return result;
}






