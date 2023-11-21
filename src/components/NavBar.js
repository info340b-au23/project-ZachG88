import React from "react";
import iCoffeeLogo from '../img/icoffee_logo.jpeg';

export function NavBar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light nav-color">

            <a className = "navbar-brand" href="#/">
                <img
                    src= {iCoffeeLogo}
                    height="80"
                    alt="iCoffee Logo"
                    loading="lazy"
                />
            </a>

            <button className = "navbar-toggler" 
                    type="button" 
                    data-md-toggle="collapse"
                    data-md-target="#navbarNav" 
                    aria-controls="navbarNav"
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                <span className = "navbar-toggler-icon"></span>
            </button>


            <div className = "collapse navbar-collapse menu-options" id="navbarNav">
                <ul className = "navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className = "nav-item">
                        <a className = "nav-link" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li className = "nav-item">
                        <a className = "nav-link" href="questionnaire.html">Quiz</a>
                    </li>
                    <li className = "nav-item">
                        <a className = "nav-link" href="education.html">Education</a>
                    </li>
                    <li className = "nav-item">
                        <a className = "nav-link" href="library.html">Library</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
