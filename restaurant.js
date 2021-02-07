// Recive json data
const recieveInput = () => {

    const inputValue = document.getElementById('product').value;
    const mealAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputValue;
    fetch(mealAPI)
        .then(res => res.json())
        .then(data => products(data))
}


// Button click 

document.getElementById('submit').addEventListener('click', recieveInput)


// Show product lisi

const products = (product) => {
    const inputValue = document.getElementById('product').value;
    const productWrapper = document.getElementById('productWrapper')
    const alert = document.getElementById('alert');
    const alertTitle = document.getElementById('alertTitle');
   
    let a = ''
    if (inputValue === '') {
        // alert('Secarch box can not be empty')
        alertTitle.innerText = 'The search box cannot be empty.'
    } else if (product.meals) {
        product.meals.forEach(products => {
            a += `
        <div onclick="itemDetails('${products.strMeal}')" class="singleProduct">
        <div class="imgInner">
            <img  class="productImg" src="${products.strMealThumb}" alt="">
        </div>
        <h2 class="productH2">${products.strMeal}</h2>
        </div>
        
        `
            productWrapper.innerHTML = a

        });
    }else{
        alertTitle.innerText = 'Sorry, We do not have this item at this time.'
        
    }
    
    alert.style.display = 'block';
    document.getElementById('close-popup').addEventListener('click', function(){
        alert.style.display = 'none';
    }) 
}





// Show single product details

const itemDetails = details => {
    console.log(details)
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const items = data.meals[0];
            const detailsArea = document.getElementById('detailsArea');
            const detailsItems = `
        
        <div class="singleProduct">
        <div class="imgInner">
            <img  class="productImg" src="${items.strMealThumb}" alt="">
        </div>
        <h2 class="productH2">${items.strMeal}</h2>
        </div>
        <div>
            <ul class="itemsDetails">
            <li>${items.strMeasure1} ${items.strIngredient1}</li>
            <li>${items.strMeasure2} ${items.strIngredient2}</li>
            <li>${items.strMeasure3} ${items.strIngredient3}</li>
            <li>${items.strMeasure4} ${items.strIngredient4}</li>
            <li>${items.strMeasure5} ${items.strIngredient5}</li>
            <li>${items.strMeasure6} ${items.strIngredient6}</li>
            <li>${items.strMeasure7} ${items.strIngredient7}</li>
            <li>${items.strMeasure8} ${items.strIngredient8}</li>
        </ul>
        <button onclick="closeBtn()" class="close">X</button>
        </div>
        `;
            detailsArea.innerHTML = detailsItems;
            detailsArea.style.display = 'block';

        })
}

// Clock to close button
const closeBtn = () => {
    detailsArea.style.display = 'none';
    errorContent.style.display = 'none';
};