import React, { useState } from 'react';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { WelcomeSection,PageRibbon, QuizCard } from './HomePage';
import { Library } from './Library';


export function App(props) {
    return (
        <div>
            <header>
                <NavBar />
            </header>

            <main>
                <WelcomeSection/>
                <PageRibbon/>
                <QuizCard />
                <Library />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}
