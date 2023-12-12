import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import drinkTypes from '../data/drinkTypes.json';




const IntroductionSection = () => (
  <section className="container-sm mt-lg-5">
    <div className="mb-2">
      <div className="d-flex mb-1">
        <img className="headerlogo" src="/img/HeaderLogo.png" alt="coffee" />
        <p className="text mt-4 ms-1">Introduction</p>
      </div>
      <div className="text-black mx-1">
        <p>Welcome to iCoffee: Your Personal Coffee Companion! Choose your preference on temperature, milk, sweetness, and caffeine amount here, and we will generate the perfect drink just for you!</p>
      </div>
    </div>
  </section>
);

const PreferenceOption = ({ name, id, imgSrc, label, description, handlePreferenceChange }) => {
  const handleOptionSelect = (event) => {
    if (event.target.checked) {
      handlePreferenceChange(label);
    }
  };

  return (
    <>
      <input
        type="radio"
        className="btn-check"
        name={name}
        id={id}
        autoComplete="off"
        onChange={handleOptionSelect}
      />
      <label className="btn square-button" htmlFor={id}>
        <img src={imgSrc} alt={label} />
        <div className="label-container">
          <span className="button-text">{label}</span>
        </div>
        <div className="description-container">
          <p className="option-description">{description}</p>
        </div>
      </label>
    </>
  );
};

const PreferenceSection = ({ title, question, options, name, handlePreferenceChange }) => (
  <div className="preference-section">
    <div className="title-question-container">
      <div className="title-container d-flex mb-1 ms-3">
        <img className="headerlogo" src="img/HeaderLogo.png" alt={title} />
        <p className="title-text text mt-4 mx-0">{title}</p>
      </div>
    </div>
    <div className="options-container">
      <p className="question-text options ms-3">{question}</p>
      <div className="btn-group-sm" role="group" aria-label={name}>
        {options.map((option, index) => (
          <PreferenceOption
            key={index}
            name={name}
            id={`${name}${index}`}
            imgSrc={option.imgSrc}
            label={option.label}
            description={option.description}
            handlePreferenceChange={handlePreferenceChange}
          />
        ))}
      </div>
    </div>
  </div>
);

function Results({
  temperaturePreference,
  basePreference,
  flavorPreference,
  caffeinePreference }
) {
  let drink;
  let index;
  const Latte = drinkTypes[2];
  const Americano = drinkTypes[6];

  if (basePreference === "Water") {
    drink = Americano;
    index = 6;
  } else {
    drink = Latte;
    index = 2;
  }

  const constructIngredients = () => {
    const defaultValues = {
      Temperature: "Served hot",
      Base: "8 oz of 2% milk",
      Flavor: "No flavor",
      Caffeine: "1 espresso shot"
    };

    let numberOfShots = "";
    switch (caffeinePreference) {
      case "None":
        numberOfShots = "no";
        break;
      case "Light":
        numberOfShots = "1";
        break;
      case "Medium":
        numberOfShots = "2";
        break;
      case "Strong":
        numberOfShots = "3";
        break;
      default:
        numberOfShots = "1";
        break;
    }

    const preferences = {
      Temperature: temperaturePreference ? (`Served ${temperaturePreference.toLowerCase()}`) : defaultValues.Temperature,
      Base: basePreference ? `With 8oz of ${basePreference.toLowerCase()} ${index === 6 ? "" : "milk"}` : defaultValues.Base,
      Flavor: flavorPreference ? `With 2 pumps of ${flavorPreference.toLowerCase()}` : defaultValues.Flavor,
      Caffeine: caffeinePreference ? `And ${numberOfShots} shots of espresso` : defaultValues.Caffeine
    };

    return Object.keys(preferences).map((preference, index) => (
      <li key={index}>
        {preferences[preference]}
      </li>
    ));
  };

  return (
    <section>
      <div className="d-flex mt-lg-5 ms-4 mb-1">
        <img className="headerlogo" src="img/HeaderLogo.png" alt="coffee" />
        <p className="text mt-4 ms-1">Here are your results:</p>
      </div>

      <div key={index} className="d-flex align-items-center justify-content-center flex-wrap flex-column">
        <div className="d-flex mb-2">
          <div className="p-3">
            <img className="img-results" src={drink.imgSrc} alt="coffee" />
            <div>
              <button className="result-buttons">{drink.name}</button>
            </div>
          </div>
          <div className="mt-4 me-4">
            <ul>
              {constructIngredients()}
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}

function ResultsSection({
  temperaturePreference,
  basePreference,
  flavorPreference,
  caffeinePreference
}) {
  return (
    <section>
      <Results
        temperaturePreference={temperaturePreference}
        basePreference={basePreference}
        flavorPreference={flavorPreference}
        caffeinePreference={caffeinePreference}
      />
      <div>
        <div className="d-flex mt-5 ms-4 mb-1">
          <img className="headerlogo" src="img/HeaderLogo.png" alt="coffee" />
          <p className="text mt-4 ms-1">Not Sure?</p>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-wrap flex-column pb-5">
          <Link
            to="/education"
            className="questionnaireredirect"
          >
            Difference between drinks
          </Link>
          <Link
            to="/blindbox"
            className="questionnaireredirect"
          >
            Get a blind box!
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Quiz() {
  const temperatureOptions = [
    { imgSrc: "img/quizimgs/cold.jpg", label: "Cold" },
    { imgSrc: "img/quizimgs/hot.jpg", label: "Hot" },
  ];

  const milkOptions = [
    { imgSrc: "img/quizimgs/water.png", label: "Water" },
    { imgSrc: "img/quizimgs/oatmilk.jpg", label: "Oat" },
    { imgSrc: "img/quizimgs/2percentmilk.jpg", label: "2%" },
    { imgSrc: "img/quizimgs/wholemilk.jpg", label: "Whole" },
    { imgSrc: "img/quizimgs/soymilk.jpg", label: "Soy" },
    { imgSrc: "img/quizimgs/skimmilk.jpg", label: "Skim" },
    { imgSrc: "img/quizimgs/almondmilk.jpg", label: "Almond" },
    { imgSrc: "img/quizimgs/coconutmilk.png", label: "Coconut" },
  ];

  const flavorOptions = [
    { imgSrc: "img/quizimgs/none.jpg", label: "None" },
    { imgSrc: "img/quizimgs/vanilla.png", label: "Vanilla" },
    { imgSrc: "img/quizimgs/caramel.jpg", label: "Caramel" },
    { imgSrc: "img/quizimgs/brownsugar.png", label: "Brown Sugar" },
  ];

  const caffeineOptions = [
    { imgSrc: "img/quizimgs/none.jpg", label: "None" },
    { imgSrc: "img/quizimgs/light.jpg", label: "Light" },
    { imgSrc: "img/quizimgs/medium.jpg", label: "Medium" },
    { imgSrc: "img/quizimgs/strong.jpg", label: "Strong" },
  ];

  const resultOptions = [
    {
      imgSrc: "img/Macchiatto.png",
      label: "Macchiatto",
    },
    {
      imgSrc: "img/Latte.png",
      label: "Latte",
    }
  ];

  const otherOptions = [

  ];

  const [temperaturePreference, setTemperaturePreference] = useState('');
  const [basePreference, setBasePreference] = useState('');
  const [flavorPreference, setFlavorPreference] = useState('');
  const [caffeinePreference, setCaffeinePreference] = useState('');

  const handleTemperatureChange = (selectedPreference) => {
    setTemperaturePreference(selectedPreference);
    setShowResults(false);
  };

  const handleBaseChange = (selectedPreference) => {
    setBasePreference(selectedPreference);
    setShowResults(false);
  };

  const handleFlavorChange = (selectedPreference) => {
    setFlavorPreference(selectedPreference);
    setShowResults(false);
  };

  const handleCaffeineChange = (selectedPreference) => {
    setCaffeinePreference(selectedPreference);
    setShowResults(false);
  };


  const [showResults, setShowResults] = useState(false);

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="questionnairebody">
      <main className="questionnaire">
        <div>
          <IntroductionSection />
        </div>
        <section className="d-flex align-items-center justify-content-center flex-wrap flex-column m-5">
          <PreferenceSection
            title="Temperature Preference"
            question="Would you like an iced or a hot drink?"
            options={temperatureOptions}
            name="temperature"
            handlePreferenceChange={handleTemperatureChange}
          />

          <PreferenceSection
            title="Base Preference"
            question="What kind of base do you prefer?"
            options={milkOptions}
            name="milk"
            handlePreferenceChange={handleBaseChange}
          />

          <PreferenceSection
            title="Flavor Preference"
            question="What kind of syrup do you prefer?"
            options={flavorOptions}
            name="flavor"
            handlePreferenceChange={handleFlavorChange}
          />

          <PreferenceSection
            title="Caffeine Preference"
            question="How much caffeine do you prefer?"
            options={caffeineOptions}
            name="caffeine"
            handlePreferenceChange={handleCaffeineChange}
          />
        </section>

        <section className="d-flex align-items-center justify-content-center flex-wrap flex-column m-5">
          <button onClick={handleShowResults} className="questionnaireredirect">
            See Your Results!
          </button>
        </section>

        {showResults && (
          <div>
            <ResultsSection
              temperaturePreference={temperaturePreference}
              basePreference={basePreference}
              flavorPreference={flavorPreference}
              caffeinePreference={caffeinePreference}
            />
          </div>
        )}
      </main>
    </div>
  );
}

