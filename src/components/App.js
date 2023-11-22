import React, { useState } from 'react';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { WelcomeSection, PageRibbon, QuizCard } from './HomePage';
import { Library } from './Library';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Quiz } from './Questionnaire';

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
                            <WelcomeSection />
                            <QuizCard onClick={toggleQuiz} />
                            <Library data={props.data}/>
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
