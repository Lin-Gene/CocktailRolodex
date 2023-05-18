const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/cocktails', async (req, res) => {
    const {ingredient}  = req.query;
    const response = await containsIngredient(ingredient);
    let drinks = response.data.drinks;
    res.render('results.ejs', {ingredient, drinks});
})

app.get('/cocktails/:drinkName', async (req, res) => {
    const { drinkName } = req.params;
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
        const drinkInfo = response.data.drinks;
        res.render('details.ejs', {drinkInfo});
      } catch (error) {
        console.error(error);
      }
    
})

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})


const containsIngredient = async (ingredient) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        return response;
      } catch (error) {
        console.error(error);
      }
}





/*

const ingredientsInput = document.querySelector("#ingredients");
ingredientsInput.addEventListener("submit", function (e) {
    e.preventDefault();
    searchCocktails(this.elements[0].value, this.elements[1].value);
})

const searchCocktails = async(ingredient1, ingredient2) => {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient1}`);
    // still need to build in additional logic to search with second ingredient
    if (ingredient2.length === 0) {
        for (let i = 0; i < response.data.drinks.length; i++) {
            console.log(response.data.drinks[i].strDrink);
        }
    } else {
        console.log("SEARCHING WITH 2 INGREDIENTS!");
        // currently this functionality is not working, figure out how to check for null values as well as why containsIngredient sometimes return true randomly?
        for (let i = 0; i < response.data.drinks.length; i++) {
            let drinkID = response.data.drinks[i].idDrink;
            if (containsIngredient(drinkID, ingredient2)) {
                console.log("containsIngredient returned true!");
                console.log(response.data.drinks[i].strDrink);
            }       
        }
    }
    
}


const containsIngredient = async(drinkID, ingredient) => {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`);
    ingredient = ingredient.toLowerCase();
    
    if ((response.data.drinks.strIngredient1 !== null && response.data.drinks.strIngredient1.toLowerCase() === ingredient) || (response.data.drinks.strIngredient1 !== null && response.data.drinks.strIngredient2.toLowerCase() === ingredient) || (response.data.drinks.strIngredient1 !== null && response.data.drinks.strIngredient3.toLowerCase() === ingredient) || (response.data.drinks.strIngredient1 !== null && response.data.drinks.strIngredient4.toLowerCase() === ingredient) || (response.data.drinks.strIngredient1 !== null && response.data.drinks.strIngredient5() === ingredient)) {
        return true;
    }
    
    return false;
}

*/




/*
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin")
.then(res => {
    console.log("Resolved", res);
    return res.json()
})
.then(data => {
    console.log(data);
})
.catch((e) => {
    console.log("Error", e);
});
*/

