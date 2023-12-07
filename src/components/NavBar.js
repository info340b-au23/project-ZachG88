import React from "react";
import { Link } from 'react-router-dom';


export function NavBar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light nav-color">

            <Link className="nav-link navbar-brand" to="/"> <img
                    src="img/icoffee_logo.jpeg"
                    height="80"
                    alt="iCoffee Logo"
                    loading="lazy"
                />
            </Link>

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
                        {/* <a className = "nav-link" aria-current="page" href="index.html">Home</a> */}
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className = "nav-item">
                        {/* <a className = "nav-link" href="questionnaire.html">Quiz</a> */}
                        <Link className="nav-link" to="/quiz">Quiz</Link>
                    </li>
                    <li className = "nav-item">
                        {/* <a className = "nav-link" href="education.html">Education</a> */}
                        <Link className="nav-link" to="/education">Education</Link>
                    </li>
                    <li className = "nav-item">
                        {/* <a className = "nav-link" href="library.html">Library</a> */}
                        <Link className="nav-link" to="/library">Library</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
