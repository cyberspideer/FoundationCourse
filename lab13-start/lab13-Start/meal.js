const mealsElement = document.querySelector("#meals");
const localStorageKey = 'mealIds';
const favoriteMealsElement = document.querySelector("#favorite-meals");
getRandomMeal();


function initializeMain() {

    const favoriteMeals = getMealsFromLocalStorage();
    favoriteMeals.forEach(mealId => {
        getMealById(mealId).then(mealData => addFavoriteMeal(mealData));
    });
}


async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const randomData = await resp.json();
    const randomMeal = randomData.meals[0];
    addMeal(randomMeal);
}


function addMeal(mealData) {
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            <span class="random">Meal of the Day</span>
            <img src="${mealData.strMealThumb}" alt="Meal" class="meal-image">
        </div>
        <div class="meal-body">
            <h3>${mealData.strMeal}</h3>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;


    const mealImage = meal.querySelector(".meal-image");
    mealImage.addEventListener('click', () => openMealDetails(mealData));

    const favoriteButton = meal.querySelector(".fav-btn");
    favoriteButton.addEventListener('click', () => toggleFavorite(mealData, favoriteButton));

    mealsElement.appendChild(meal);
}


function addFavoriteMeal(mealData) {
    const meal = document.createElement("li");
    meal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="Favorite Meal" class="meal-image">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    meal.querySelector(".meal-image").addEventListener('click', () => openMealDetails(mealData));

    favoriteMealsElement.appendChild(meal);
}


function openMealDetails(mealData) {
    window.open(`details.html?mealID=${mealData.idMeal}`, '_self');
}

function toggleFavorite(mealData, button) {
    if (button.classList.contains("active")) {
        button.classList.remove("active");
        removeMealFromLocalStorage(mealData.idMeal);
    } else {
        button.classList.add("active");
        addMealToLocalStorage(mealData.idMeal);
    }
}

// add meals
function addMealToLocalStorage(mealId) {
    const mealsArray = getMealsFromLocalStorage();
    localStorage.setItem(localStorageKey, JSON.stringify([...mealsArray, mealId]));
    updateFavorites();
}

// Removed
function removeMealFromLocalStorage(mealId) {
    const mealsArray = getMealsFromLocalStorage();
    localStorage.setItem(localStorageKey, JSON.stringify(mealsArray.filter(id => id !== mealId)));
    updateFavorites();
}


function getMealsFromLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem(localStorageKey));
    return mealIds ? mealIds : [];
}


function updateFavorites() {
    favoriteMealsElement.innerHTML = '';
    const favoriteMeals = getMealsFromLocalStorage();
    favoriteMeals.forEach(mealId => {
        getMealById(mealId).then(mealData => addFavoriteMeal(mealData));
    });
}


async function getMealById(mealId) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealData = await resp.json();
    return mealData.meals[0];
}




document.querySelector("#search").addEventListener('click', () => {
    const searchTerm = document.querySelector("#search-term").value;
    searchMeals(searchTerm);
});


async function searchMeals(searchTerm) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await resp.json();
    const meals = data.meals;
    mealsElement.innerHTML = '';
    if (meals) {
        meals.forEach(meal => addMeal(meal));
    }
}