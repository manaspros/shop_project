import { useEffect, useState } from "react";
import MealsItem from "./MealItem.jsx";



export default function Meals(){

    const [loadedMeals,setLoadedMeals]=useState([]);
    useEffect(() => {    async function fetchMeals(){
        const response = await fetch('http://localhost:3000/meals');

        if(!response.ok){
            throw new Error('Something went wrong');
        } 
        const meals = await response.json();

        setLoadedMeals(meals);
    }
    fetchMeals();
    },[]);

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => <MealsItem key={meal.id} meal={meal}/>)} 
            
        </ul>
    )};
