import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push as firebasePush, onValue, remove } from 'firebase/database';
import NavBar from './NavBar';
import { HomePage } from './HomePage';
import { Quiz } from './Questionnaire';
import { Blindbox } from './BlindBox';
import { Education } from './Education';
import { Library } from './Library';
import { ProfilePage } from './ProfilePage';
import ErrorPage from './ErrorPage';
import Footer from './Footer';

function App(props) {
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (firebaseUser) => {
            setCurrentUser(firebaseUser);
        });
    }, []);

    const saveFavorite = (userId, method) => {
        const db = getDatabase();
        const userFavoritesRef = ref(db, `favorites/${userId}`);

        firebasePush(userFavoritesRef, method);
    };

    const deleteFavorite = (userId, method) => {
        const db = getDatabase();
        const userFavoritesRef = ref(db, `favorites/${userId}`);

        onValue(userFavoritesRef, (snapshot) => {
            snapshot.forEach((favSnapshot) => {
                const favorite = favSnapshot.val();
                if (favorite.name === method.name) {
                    remove(favSnapshot.ref);
                }
            });
        });
    };

    function toggleQuiz() {
        setShowQuiz(!showQuiz);
    }

    return (
        <div>
            <NavBar userId={currentUser ? currentUser.uid : null} />
            <Routes>
                <Route index element={<HomePage toggleQuiz={toggleQuiz} />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="blindbox" element={<Blindbox />} />
                <Route path="library" element={<Library data={props.data} />} />
                <Route path="education" element={<Education userId={currentUser ? currentUser.uid : null} currentUser={currentUser} saveFavorite={saveFavorite} />} />
                <Route path="/profile/:userId" element={<ProfilePage userId={currentUser ? currentUser.uid : null} deleteFavorite={deleteFavorite} />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App;