import React, {useEffect, useState} from 'react';
import Recipie from './Recipie'
import logo from './logo.svg';
import './App.css';

const App = () => {

  const APP_ID = 'f878f094';
  const APP_KEY = '5b53d9d26f436874de47a8e1d12f65b5';
  

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([""]);
  const [query, setQuery] = useState(["chicken"]);

 // const [counter, setCounter] = useState(0);

  useEffect(() =>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data  = await response.json();
    setRecipes(data.hits);
  } 


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button  className="search-button" type="submit">
         search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe=>(
          <Recipie 
            key = {recipe.recipe.calories}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
