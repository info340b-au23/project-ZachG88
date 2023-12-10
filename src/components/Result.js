import React, { useState } from 'react';
import roastTypes from '../data/roastTypes.json';
import brewingMethodsData from '../data/brewingMethods.json';
import drinkTypes from '../data/drinkTypes.json';
import { PageRibbon } from './HomePage';

function EducationHeader(props) {
    return (
        <section className="d-flex justify-content-center">
            <div className="row">
                <div className="col-sm-12 p-5 text-center">
                    <h2>Open a Blind box for a ramdom coffee:</h2>
                    <button onClick={props.onSelectRandomCoffee}>Open the box now!</button>
                    {props.selectedCoffee && (
                        <div>
                            <h2>{props.selectedCoffee.name}</h2>
                            <p>{props.selectedCoffee.ingredients}</p>
                            <img src={props.selectedCoffee.imgSrc} alt={props.selectedCoffee.name} />
                        </div>
                    )}
                    <h3>Hope you enjoy it</h3>
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
        <main className="blindbox">
            <EducationHeader selectedCoffee={selectedCoffee} onSelectRandomCoffee={selectRandomCoffee} />
        </main>
    );
}
