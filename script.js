const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetCont = document.querySelector('.meal-details-content');
const recipeClsBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener("click", getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeClsBtn.addEventListener('click', ()=>{
    mealDetCont.parentElement.classList.remove('showRecipe');
})

function getMealList(){
    let searchInpTxt = document.getElementById('searchInp').value.trim();
    fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${searchInpTxt}`)
    .then(response => response.json()).then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Lihat Resep</a>
                        </div>
                    </div>`;                
            });mealList.classList.remove('notFound');
        }else{
            html = "maaf, makanan tidak ditemukan!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
}

function getMealRecipe(e){
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => getMealRecipeModal(data.meals));
    }
}


function getMealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `<h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Perintah : </h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="food">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Tonton Video</a>
    </div>
    `;
    mealDetCont.innerHTML = html;
    mealDetCont.parentElement.classList.add('showRecipe');
}