import React from "react";
import ribbon from '../img/education_ribbon.jpeg';
import { Quiz } from './Questionnaire' 
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import {Routes, Route, useNavigate} from 'react-router-dom';

export function WelcomeSection() {

    return (
        <div className = "d-flex justify-content-center">
            <div className ="custom-bg">
                <div className ="col-sm-12 p-5">
                    <h1>Welcome!</h1>
                </div>
            </div>
        </div>
    )
}

export function PageRibbon() {

    return(
        <div className ="col-sm-12">
            <img src={ribbon}
            className="img-fluid shadow-lg" 
            alt="Responsive ribbon"></img>
        </div>
    )
}

export function QuizCard({ onClick }) {
    return(
        <div onClick={onClick}>
            <div className = "d-flex justify-content-center p-5">
                <div className="card card-bg custom-border col-sm-6">
                    <div className="card-body">
                        <h5 className="card-title">Find the Right Cup of Coffee For You!</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button className="btn nav-color">Take the quiz!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}