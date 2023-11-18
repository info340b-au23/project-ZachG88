import React, { useState } from 'react';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { WelcomeSection,PageRibbon, QuizCard } from './HomePage';


export default function App(props) {
    return (
        <div>
            <NavBar />
            <WelcomeSection/>
            <PageRibbon/>
            <QuizCard />
            <Footer />
        </div>
    );
}
