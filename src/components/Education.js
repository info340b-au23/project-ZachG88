import React from 'react';
import roastTypes from '../data/roastTypes.json';
import drinkTypes from '../data/drinkTypes.json';
import { PageRibbon } from './HomePage';

function RoastTypes({imgSrc, type, description}) {
    return (
        <div className="col-sm-12 col-md-4">
            <div>
                <img className="coffee-img img-fluid my-3" src={imgSrc} alt={type} />
                <h3>{type}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

function DrinkOptions({buttonText}) {
    return (
        <div className="col-sm-12 col-md-4 text-center">
            <input type="radio" className="btn-check" />
            <label className="btn square-button">
                <span className="button-text">{buttonText}</span>
            </label>
        </div>
    );
  }

function DrinkTypes({name, ingredients, imgSrc}) {
    function ingredientsList() {
        const ingredientsListItems = ingredients.split('\n').map((line) => (
            <li className="mb-3">{line}</li>
        ));

        return (<ul>{ingredientsListItems}</ul>);
    }
  
    return (
        <div className="row">
            <div className="col-sm-12 pb-4">
                <p className="h1 custom-bg text-left mt-5">{name}</p>
            </div>
    
            <div className="col-sm-9">
                <div>
                    <p>{ingredientsList()}</p>
                </div>
            </div>
    
            <div className="col-sm-3">
                <div className="d-flex justify-content-center">
                    <img className="img-fluid abt-img" src={imgSrc} alt={name} />
                </div>
            </div>
        </div>
    );
}

export function Education(props) {
    const drinkOptions = ["Espresso", "Doppio", "Cortado", "Ristretto", "Latte", "Cappuccino", "Macchiatto", "Mocha", "Americano", "Flat White", "Frappuccino"];

    return (
        <main className="education">
            <section className="d-flex justify-content-center">
                    <div className="row">
                        <div className="col-sm-12 p-5">
                            <h1>iCoffee Education</h1>
                        </div>
                    </div>
            </section>
            
            <PageRibbon/>

            <section className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-sm-12 pb-4">
                        <p className="h1 custom-bg text-left p-3">About Coffee...</p>
                    </div>

                    <div className="col-sm-9">
                        <div>
                            <p>Welcome to our Coffee Education Page where you can learn about the different types of coffee roasts and even how to make your own drinks! </p>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <div className="d-flex justify-content-center">
                            <img className="abt-img" src="img/education_beans.png" alt="Beans" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="container d-flex justify-content-center">
                <div className="row">
                <div className="col-sm-12 pb-4">
                    <p className="h1 custom-bg text-center">Types of Roasts</p>
                </div>
        
                {roastTypes.map((roast) => (
                    <RoastTypes key={roast.type} {...roast} />
                ))}
                </div>
            </section>

            <section className="d-flex justify-content-center">
                <div className="row">
                    <div className="col-sm-12 p-5">
                        <h2 className="text-center pb-2">Make your own personalized drink!</h2>
                        <h3 className="text-center">Use this menu to make your own favorite drinks</h3>
                    </div>
                </div>
            </section>

            <section className="container d-flex justify-content-center pb-5 flex-column">
                <div className="row">
                    {drinkOptions.map((buttonText) => (
                        <DrinkOptions key={buttonText} buttonText={buttonText} />
                    ))}
                </div>
            </section>
    
            <section className="container d-flex justify-content-center flex-column">
                <div className="col-sm-12 pb-4">
                    <p className="h1 custom-bg text-center m-0">Types of Drinks</p>
                </div>

                {drinkTypes.map((drink) => (
                <DrinkTypes key={drink.name} {...drink} />
                ))}
            </section>
        </main>
    );
}
