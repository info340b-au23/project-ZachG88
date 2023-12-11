import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';

function Profile({ getFavorite, deleteFavorite }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [favoriteMethods, setFavoriteMethods] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      getFavorite(currentUser.uid).then((favorites) => {
        setFavoriteMethods(favorites);
      });
    }
  }, [currentUser, getFavorite]);

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
      signInSuccessWithAuthResult: () => false,
    },
    credentialHelper: 'none',
  };
  
  if (currentUser) {
    const userName = currentUser.displayName || currentUser.email;

    return (
      <div className="container d-flex justify-content-center flex-column profilesignin">
        <div className="col-sm-12">
          <p className="h1 custom-bg text-center m-0 profilesignintext">Welcome {userName}!</p>
        </div>
        {favoriteMethods.length > 0 && (
          <div>
            <h3 className="custom-bg text-center mt-3 profilesignintext">Here are Your Favorite Brewing Methods!</h3>
            <ul>
              {favoriteMethods.map((method) => (
                <li key={method.name}>
                  <p className="fw-bold m-0">{method.name}</p>
                  <p>{method.description}</p>
                  <button className="profiledelbutton bg-light" onClick={() => (handleDelFavorite(method))}>Delete from favorites</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="questionnaireredirect bg-light mx-auto" onClick={handleClick}>Sign Out</button>
      </div>
    );
  } else {
      return (
        <div className="container d-flex justify-content-center flex-column profilesignin">
          <div className="col-sm-12 pb-4">
            <p className="h1 custom-bg text-center mt-3 profilesignintext">Sign in to view your saved favorites!</p>
          </div>
          <StyledFirebaseAuth className="mb-3" uiConfig={configObj} firebaseAuth={auth} />
        </div>
      );
    }
};

export function ProfilePage(props) {
  return (
    <section className="container"><Profile {...props} /></section>
  );
}