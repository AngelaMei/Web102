import React, {Component, useState} from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json"

const BaristaForm = () => {

    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }

    const [currentDrink, setCurrentDrink] = useState('');
    const [trueRecipe, setTrueRecipe] = useState({});
    const [showAnswer, setShowAnswer] = useState(false);

    const [correct_temp, setCheckedTemperature] = useState('');
    const [correct_syrup, setCheckedSyrup] = useState('');
    const [correct_milk, setCheckedMilk] = useState('');
    const [correct_blended, setCheckedBlended] = useState('');

    const onCheckAnswer = (e) => {
        e.preventDefault();
        setShowAnswer(true);
        if (trueRecipe.temp != inputs['temperature']){
            setCheckedTemperature('wrong');
          } else {
            setCheckedTemperature("correct");
        }
        if (trueRecipe.syrup != inputs['syrup']){
            setCheckedSyrup('wrong');
        } else {
            setCheckedSyrup("correct");
        }
        if (trueRecipe.milk != inputs['milk']){
            setCheckedMilk('wrong');
        }
        else {
            setCheckedMilk("correct");
        }
        if (trueRecipe.blended != inputs['blended']){
            setCheckedBlended('wrong');
        }
        else {
            setCheckedBlended("correct");
        }
    }

    const onNewDrink = (e) => {
        e.preventDefault();
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': '' });

        setCheckedTemperature('');
        setCheckedSyrup('');
        setCheckedMilk('');
        setCheckedBlended('');
            
        getNextDrink();
        // console.log({inputs})
    }

    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    }

  return (
    <div>
        <h2>Hi, I'd like to order a:</h2>
        <div className="drink-container">
            <h2 className="mini-header">{currentDrink}</h2>
            <button type="new-drink-button" className="button newdrink" onClick={onNewDrink}>🔄</button>
        </div>
        <form className="container">
            <div className="mini-container">
                <h3>Temperature</h3>
                <div className={`answer-space ${correct_temp === 'wrong' ? 'wrong' : ''}`} id={correct_temp}>{inputs["temperature"]}</div>
                <RecipeChoices
                    handleChange={(e) => setInputs({...inputs, 'temperature': e.target.value})}
                    label="temperature"
                    choices={ingredients["temperature"]}
                    checked={inputs["temperature"]}
                />
            </div>
            <div className="mini-container">
                <h3>Milk</h3>
                <div className={`answer-space ${correct_milk === 'wrong' ? 'wrong' : ''}`} id={correct_milk}>{inputs["milk"]}</div>
                <RecipeChoices
                    handleChange={(e) => setInputs({...inputs, 'milk': e.target.value})}
                    label="milk"
                    choices={ingredients["milk"]}
                    checked={inputs["milk"]}
                />
            </div>
            <div className="mini-container">
                <h3>syrup</h3>
                <div className={`answer-space ${correct_syrup === 'wrong' ? 'wrong' : ''}`} id={correct_syrup}>{inputs["syrup"]}</div>
                <RecipeChoices
                    handleChange={(e) => setInputs({...inputs, 'syrup': e.target.value})}
                    label="syrup"
                    choices={ingredients["syrup"]}
                    checked={inputs["syrup"]}
                />
            </div>
            <div className="mini-container">
                <h3>blended</h3>
                <div className={`answer-space ${correct_blended === 'wrong' ? 'wrong' : ''}`} id={correct_blended}>{inputs["blended"]}</div>
                <RecipeChoices
                    handleChange={(e) => setInputs({...inputs, 'blended': e.target.value})}
                    label="blended"
                    choices={ingredients["blended"]}
                    checked={inputs["blended"]}
                />
            </div>
        </form>
        <button type="submit" className="button submit" onClick={onCheckAnswer}>Check Answer</button>
        <button type="new-drink-button" className="button submit" onClick={onNewDrink}>New Drink</button>
        <div className={`mini-container ${showAnswer ? '' : 'hidden'}`}>
            <h3>Answers</h3>
            <div>Temp: {trueRecipe.temp}</div>
            <div>Milk: {trueRecipe.milk}</div>
            <div>Syrup: {trueRecipe.syrup}</div>
            <div>Blended: {trueRecipe.blended}</div>
        </div>
    </div>
  );
};

export default BaristaForm;