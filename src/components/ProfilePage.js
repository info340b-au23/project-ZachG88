import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { getDatabase, ref, get as firebaseGet } from 'firebase/database';
import { useParams, Link, useNavigate  } from 'react-router-dom';

function Profile({ deleteFavorite }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [favoriteMethods, setFavoriteMethods] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  const getFavorites = () => {
    const db = getDatabase();
    const userFavoritesRef = ref(db, `favorites/${userId}`);

    return firebaseGet(userFavoritesRef)
      .then((snapshot) => {
        const favorites = [];
        snapshot.forEach((favSnapshot) => {
          favorites.push(favSnapshot.val());
        });
        return(favorites);
      })
      .catch((error) => {
        console.log('Error getting profile favorites:', error);
      });
  };

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
    });
  }, []);

  useEffect(() => {
    if (currentUser && userId === currentUser.uid) {
      getFavorites(currentUser.uid).then((favorites) => {
        setFavoriteMethods(favorites);
      });
    }
  }, [currentUser, userId]);

  const handleClick = () => {
    signOut(getAuth());
  };

  const handleDelFavorite = (method) => {
    if (currentUser) {
      deleteFavorite(currentUser.uid, method);
    }
  };

  const auth = getAuth();
  const configObj = {
    signInOptions: [
      { provider: EmailAuthProvider.PROVIDER_ID, requireDisplayName: true },
      { provider: GoogleAuthProvider.PROVIDER_ID },
    ],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => {
        navigate('/');
        return(false);
      },
    },
    credentialHelper: 'none',
  };

  if (currentUser) {
    const userName = currentUser.displayName || currentUser.email;

    return (
      <div className="container d-flex justify-content-center flex-column profilesignin">
        <div className="col-sm-12">
          <h1 className="custom-bg text-center mb-2 profilesignintext">Welcome {userName}!</h1>
        </div>
        {favoriteMethods.length === 0 && (
          <p className="custom-bg text-center m-0 profilesignintext">Make way to the education page to add your desired coffee brewing methods!</p>
        )}
        {favoriteMethods.length > 0 && (
          <div className="container shadow-sm bg-light rounded-5 py-4">
            <h3 className="text-center mt-3">Here are Your Favorited Brewing Methods!</h3>
            <p className="text-center mb-3">(Make sure to refresh the page after deleting any favorites!)</p>
            <ul>
              {favoriteMethods.map((method) => (
                <li key={method.name}>
                  <p className="fw-bold m-0">{method.name}</p>
                  <p>{method.description}</p>
                  <button className="profiledelbutton" onClick={() => handleDelFavorite(method)}>Delete from favorites</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link to="/" className="questionnaireredirect bg-light mx-auto" onClick={handleClick}>Sign Out</Link >
      </div>
    );
  } else {
    return (
      <div className="container d-flex justify-content-center flex-column profilesignin">
        <div className="col-sm-12 pb-4">
          <p className="h1 custom-bg text-center mt-3 profilesignintext">Sign In to View Saved Coffee Brewing Methods!</p>
        </div>
        <StyledFirebaseAuth className="mb-3" uiConfig={configObj} firebaseAuth={auth} />
      </div>
    );
  }
}

export function ProfilePage(props) {
  return <section className="container"><Profile {...props} /></section>;
}
