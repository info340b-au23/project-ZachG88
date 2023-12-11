import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import roastTypes from '../data/roastTypes.json';
import brewingMethodsData from '../data/brewingMethods.json';
import drinkTypes from '../data/drinkTypes.json';
import { PageRibbon } from './HomePage';

function EducationHeader(props) {
    return (
        <section className="d-flex justify-content-center">
            <div className="row">
                <div className="col-sm-12 p-5">
                    <h1>iCoffee Education</h1>
                </div>
            </div>
        </section>
    );
}

function EducationIntro(props) {
    return (
        <section className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-sm-12">
                    <p className="h1 custom-bg text-left mb-3">About Coffee...</p>
                </div>

                <div className="col-sm-9">
                    <div>
                        <p>Welcome to our Coffee Education Page where you can learn about the different types of coffee roasts, brewing methods, and drinks!</p>
                    </div>
                </div>

                 <div className="col-sm-3">
                    <div className="d-flex justify-content-center">
                        <img className="abt-img" src="img/education_beans.png" alt="Beans" />
                    </div>
                </div>
            </div>
        </section>
    );
}

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

function CoffeeBrewingMethods({ currentUser, saveFavorite }) {
    const [preferredStrength, setPreferredStrength] = useState('light');
    const [preferredType, setPreferredType] = useState('drip');
    const [recommendedMethods, setRecommendedMethods] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
  
    const brewingMethods = brewingMethodsData;
  
    const handleClick = () => {
        const filteredMethods = brewingMethods.filter((method) => (
            method.strength === preferredStrength && method.type === preferredType
        ));
        setRecommendedMethods(filteredMethods);
        setButtonClicked(true);
    };

    const handleFavorite = (method) => {
        if (currentUser) {
            saveFavorite(currentUser.uid, method);
        }
    };
  
    return (
        <section className="container d-flex justify-content-center flex-column">
            <div className="col-sm-12 pb-4">
                <p className="h1 custom-bg text-center m-0">Different Brewing Methods</p>
                <p className="text-center m-3">Select different options for strength and the brewing type to get recommendations!</p>
                <p className="text-center">
                    <Link to="/profile">Sign in</Link> to save recommendations to your profile!
                </p>
            </div>
            
            <div className="d-flex align-items-center justify-content-center flex-wrap flex-column">
                <div>
                    <label className="m-3">Strength:
                        <select className="ms-2" value={preferredStrength} onChange={(brew) => (
                            setPreferredStrength(brew.target.value)
                            )}>
                            <option value="light" title="For those who prefer a milder coffee experience. Light strength offers subtle flavors and is achieved through lighter roasts or a lower coffee-to-water ratio.">Light</option>
                            <option value="medium" title="A balanced intensity suitable for many coffee drinkers. Medium strength combines flavor richness with a moderate coffee-to-water ratio.">Medium</option>
                            <option value="strong" title="For those who prefer a bold and robust coffee flavor. Strong strength can be achieved through dark roasts or a higher coffee-to-water ratio.">Strong</option>
                        </select>
                    </label>

                    <label className="m-3">Brewing Type:
                        <select className="ms-2" value={preferredType} onChange={(brew) => (
                            setPreferredType(brew.target.value)
                            )}>
                            <option value="drip" title="Water is poured over the coffee grounds and the brewed coffee drips through a filter.">Drip</option>
                            <option value="manual" title="Various aspects of the brewing process is manually controlled by the person.">Manual</option>
                            <option value="immersion" title="Coffee beans are fully submerged in the water for a certain period of time, allowing the coffee to extract its flavors.">Immersion</option>
                        </select>
                    </label>
                </div>

                <button className="questionnaireredirect brewmethods" onClick={handleClick}>View Brewing Methods</button>
            </div>

            {buttonClicked && recommendedMethods.length === 0 && (
                <p className="text-danger text-center">No brewing methods found for the selected preferences, please try different options!</p>
            )}

            {buttonClicked && (
                <div>
                    <h3 className="custom-bg text-center mt-3">Brew Recommendations:</h3>
                    <ul>
                        {recommendedMethods.map((method) => (
                            <li key={method.name}>
                                <p className="fw-bold m-0">{method.name}</p>
                                <p> {method.description}</p>
                                {currentUser && (
                                    <button className="profiledelbutton" onClick={() => (handleFavorite(method))}>Add to Favorites</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

function DrinkTypes({name, ingredients, imgSrc}) {
    function ingredientsList() {
        const ingredientsListItems = ingredients.split('\n').map((line, index) => (
            <li key={index} className="mb-3">{line}</li>
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
                    {ingredientsList()}
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
    return (
        <main className="education">
            <EducationHeader />
            <PageRibbon/>
            <EducationIntro />
            <section className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-sm-12 pb-4">
                        <p className="h1 custom-bg text-center">Types of Roasts</p>
                        <p className="text-center m-3">Here is where you can learn all kinds of coffee roasts!</p>
                    </div>
            
                    {roastTypes.map((roast) => (
                        <RoastTypes key={roast.type} {...roast} />
                    ))}
                </div>
            </section>
            <CoffeeBrewingMethods {...props}/>
            <section className="container d-flex justify-content-center flex-column">
                <div className="col-sm-12 pb-4">
                    <p className="h1 custom-bg text-center m-0">Types of Drinks</p>
                    <p className="text-center m-3">Learn about the different types of coffee drinks and instructions on how to make them!</p>
                </div>

                {drinkTypes.map((drink) => (
                <DrinkTypes key={drink.name} {...drink} />
                ))}
            </section>
        </main>
    );
}
