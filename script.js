function generateMealPlan() {
    const numberOfMeals = document.getElementById('numberOfMeals').value;
    const dietPreference = document.getElementById('dietPreference').value;
    const healthSpecification = document.getElementById('healthSpecification').value;
    const calories = document.getElementById('calories').value;
  
    const appId = 'd274a2ad'; // Replace with your Edamam app ID
    const appKey = 'c2131569c6f44750cca1ba268df3de02'; // Replace with your Edamam app key
    const apiEndpoint = `https://api.edamam.com/search?q=meal&app_id=${appId}&app_key=${appKey}&from=0&to=${numberOfMeals}`;
  
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        // Process the retrieved data to extract recipe information
        const recipes = data.hits.map(hit => {
          return {
            name: hit.recipe.label,
            image: hit.recipe.image,
            ingredients: hit.recipe.ingredients.map(ingredient => ingredient.text)
          };
        });
  
        // Display the meal plan with retrieved recipe information
        displayMealPlan(recipes);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors
      });
  }
  
  function displayMealPlan(recipes) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const tableBody = document.querySelector('#mealPlanTable tbody');
    tableBody.innerHTML = ''; // Clear previous content
    
    // Create rows for each meal
    for (let i = 0; i < recipes.length; i++) {
      const meal = recipes[i];
      const row = document.createElement('tr');
      
      for (let j = 0; j < daysOfWeek.length; j++) {
        const cell = document.createElement('td');
        if (i === 0) {
          cell.textContent = daysOfWeek[j];
          cell.classList.add('day-header');
        } else {
          if (meal[j]) {
            const mealInfo = document.createElement('div');
            mealInfo.classList.add('meal-info');
  
            const mealName = document.createElement('h3');
            mealName.textContent = meal.name;
            mealInfo.appendChild(mealName);
  
            const mealImage = document.createElement('img');
            mealImage.src = meal.image;
            mealImage.alt = meal.name;
            mealInfo.appendChild(mealImage);
  
            const ingredientsList = document.createElement('ul');
            meal.ingredients.forEach(ingredient => {
              const listItem = document.createElement('li');
              listItem.textContent = ingredient;
              ingredientsList.appendChild(listItem);
            });
            mealInfo.appendChild(ingredientsList);
  
            cell.appendChild(mealInfo);
          } else {
            cell.textContent = '-';
          }
        }
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    }
  }
  