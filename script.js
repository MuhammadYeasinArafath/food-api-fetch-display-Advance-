let searchFood =() =>{
    //alert('Clicked!!');

    let searchField = document.getElementById('search-field');
//console.log(searchField);

    let searchText = searchField.value;
    //console.log(searchText);

    searchField.value = '';
    if(searchText == ''){
      let error = document.getElementById('error');
      error.innerHTML = "Plz type the food name.";
      
      let searchResult = document.getElementById('search-result');
      searchResult.innerHTML = '';
      let singleMealDetails = document.getElementById('singleMealDetailsId');
      singleMealDetails.innerHTML = '';
      
    }
    else{
      
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    //console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals));
    }
}





let displaySearchResult = (meals) =>{
    //console.log(meals);

    let searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    let singleMealDetails = document.getElementById('singleMealDetailsId');
    singleMealDetails.innerHTML = '';
    error.innerHTML = '';
    if(meals == null){
      let error = document.getElementById('error');
      error.innerHTML = "There is no food by this name.";
      
    }



    meals.forEach(meal =>{
        //console.log(meal);

       let div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `
       <div onclick='loadMoreDetails(${meal.idMeal})' class="card">
       <img src="${meal.strMealThumb}" class="card-img-top" alt="Food Image">
       <div class="card-body">
         <h5 class="card-title">${meal.strMeal}</h5>
         <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
         <h6>Click Anywhere To Read More.</h6>
       </div>
     </div>
       `;
      searchResult.appendChild(div);
    })
}

let loadMoreDetails = mealId =>{
    //alert(mealId);
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    //console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleMeal(data.meals[0]));

}
let displaySingleMeal = (singleMeal) => {
    //console.log(singleMeal);
    let singleMealDetails = document.getElementById('singleMealDetailsId');
    singleMealDetails.innerHTML = '';
    let div = document.createElement("div");
    div.classList.add('card');
    div.innerHTML = `
    <img src="${singleMeal.strMealThumb}" class="card-img-top" alt="Single Meal Data Search Details">
    <div class="card-body">
      <h5 class="card-title">Name:${singleMeal.strMeal}</h5>
      <p class="card-text">Category:${singleMeal.strCategory}</p>
      <p class="card-text">Recipe:${singleMeal.strInstructions}</p>
    
    </div>
    `;
    singleMealDetails.appendChild(div);
}



