import React, { useState } from 'react';
import drinkTypes from '../data/drinkTypes.json';

function EducationHeader(props) {
    return (
        <section className="d-flex justify-content-center">
            <div className="row">
                <div className="col-sm-12 p-5 text-center">
                    <h2>Open a Blind Box for a Random Coffee Drink!</h2>
                    <button className="questionnaireredirect mx-auto m-3" onClick={props.onSelectRandomCoffee}>Click here to open!</button>
                    {props.selectedCoffee && (
                        <div className="blindbox p-3">
                            <h2>{props.selectedCoffee.name}</h2>
                            <p>{props.selectedCoffee.ingredients}</p>
                            <img className="abt-img border border-dark border-2 m-3" src={props.selectedCoffee.imgSrc} alt={props.selectedCoffee.name} />
                        </div>
                    )}
                    <h3 className="mt-4">Hope you enjoy it!</h3>
                </div>
            </div>
        </section>
    );
}

export function Blindbox(props) {
    const [selectedCoffee, setSelectedCoffee] = useState(null);

    const selectRandomCoffee = () => {
        const randomIndex = Math.floor(Math.random() * drinkTypes.length);
        setSelectedCoffee(drinkTypes[randomIndex]);
    };

    return (
        <main>
            <EducationHeader selectedCoffee={selectedCoffee} onSelectRandomCoffee={selectRandomCoffee} />
        </main>
    );
}
