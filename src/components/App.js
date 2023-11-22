import React, { useState } from 'react';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { HomePage } from './HomePage';
import { Library } from './Library';
import { Education } from './Education';

function App(props) {
    return (
        <div>
            <header>
                <NavBar />
            </header>

            <main>
                {/* <HomePage /> */}
                {/* <Library data={props.data}/> */}
                <Education />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;