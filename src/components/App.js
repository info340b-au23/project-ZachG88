import React, { useState } from 'react';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { HomePage } from './HomePage';
import { Library } from './Library';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Quiz } from './Questionnaire';
import { Education } from './Education';

export function App(props) {
    const [showQuiz, setShowQuiz] = useState(false);

    function toggleQuiz() {
        setShowQuiz(!showQuiz);
    }
    
    return (
        <Router>
            <div>
                <header>
                    <NavBar />
                </header>

                <main>
                    {showQuiz ? (
                        <Quiz />
                    ) : (
                        <>
                            <HomePage toggleQuiz={toggleQuiz}/>
                            {/* <Library data={props.data}/> */}
                            {/* <Education /> */}
                        </>
                    )}
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </Router>
    );
}
