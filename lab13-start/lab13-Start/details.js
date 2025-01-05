async function initializeDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('mealID');
    const mealData = await getMealById(mealId);
    displayMealDetails(mealData);
}

async function getMealById(mealId) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await resp.json();
    return data.meals[0];
}

function displayMealDetails(mealData) {
    const mealDetailsElement = document.querySelector("#meal-details");
    mealDetailsElement.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredients(mealData).map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${mealData.strInstructions}</p>
    `;
}

function getIngredients(mealData) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`]) {
            ingredients.push(`${mealData[`strIngredient${i}`]}: ${mealData[`strMeasure${i}`]}`);
        }
    }
    return ingredients;
}
