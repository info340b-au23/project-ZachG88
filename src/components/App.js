import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, get, ref, push as firebasePush, onValue, remove } from 'firebase/database';
import NavBar from './NavBar';
import { HomePage } from './HomePage';
import { Quiz } from './Questionnaire';
import { Blindbox} from './BlindBox';
import { Education } from './Education';
import { Library } from './Library';
import { ProfilePage } from './ProfilePage';
import ErrorPage from './ErrorPage';
import Footer from './Footer';

function App(props) {
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

    const getFavorite = (userId) => {
        const db = getDatabase();
        const userFavoritesRef = ref(db, `favorites/${userId}`);
      
        return get(userFavoritesRef)
        .then((snapshot) => {
            const favorites = [];
            snapshot.forEach((favSnapshot) => {
                favorites.push(favSnapshot.val());
            });
            return(favorites);
        });
    };

    const [showQuiz, setShowQuiz] = useState(false);

    function toggleQuiz() {
        setShowQuiz(!showQuiz);
    }

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route index element={<HomePage toggleQuiz={toggleQuiz}/>} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="blindbox" element={<Blindbox />} />
                <Route path="library" element={<Library data={props.data}/>} />
                <Route path="education"element={<Education currentUser={currentUser} saveFavorite={saveFavorite}/>}/>
                <Route path="/profile" element={<ProfilePage deleteFavorite={deleteFavorite} getFavorite={getFavorite}/>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App;