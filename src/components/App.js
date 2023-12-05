import React, { useState } from 'react';
import { NavBar } from './NavBar';
import { HomePage } from './HomePage';
import { Library } from './Library';
import { Routes, Route } from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Quiz } from './Questionnaire';
import { Education } from './Education';

export function App(props) {
    const [showQuiz, setShowQuiz] = useState(false);

    function toggleQuiz() {
        setShowQuiz(!showQuiz);
    }
    
    // return (
    //     <Router>
    //         <div>
    //             <header>
    //                 <NavBar />
    //             </header>

    //             <main>
    //                 {showQuiz ? (
    //                     <Quiz />
    //                 ) : (
    //                     <>
    //                         <HomePage toggleQuiz={toggleQuiz}/>
    //                         {/* <Library data={props.data}/> */}
    //                         {/* <Education /> */}
    //                     </>
    //                 )}
    //             </main>

    //             <footer>
    //                 <Footer />
    //             </footer>
    //         </div>
    //     </Router>
    // );

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route index element={<HomePage toggleQuiz={toggleQuiz}/>} />
                    <Route path="quiz" element={<Quiz />} />
                {/* <Route path="questionnaire" element={<Library data={props.data}/>} /> */}
                <Route path="library" element={<Library data={props.data}/>} />
                <Route path="education" element={<Education />} />
                {/* <Route path="chat" element={<ChatPage currentUser={currentUser} />} /> */}
            </Routes>
        </div>
    )
}
