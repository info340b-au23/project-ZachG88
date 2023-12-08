import React from 'react';
// import { Link } from "react-scroll";
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

const PreferenceOption = ({ name, id, imgSrc, label, description }) => (
  <>
    <input type="radio" className="btn-check" name={name} id={id} autoComplete="off" />
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


// PreferenceSection Component
const PreferenceSection = ({ title, question, options, name }) => (
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
            description={option.description} // Add this line
          />
        ))}
      </div>
    </div>
  </div>
);

function Results({selectedDrinks}) {
  const drinkResults = drinkTypes.filter(function(drink, index) {
    return selectedDrinks.indexOf(index) !== -1;
  });

  return (
    <section>
      <div className="d-flex mt-lg-5 ms-4 mb-1">
          <img className="headerlogo" src="img/HeaderLogo.png" alt="coffee"/>
          <p className="text mt-4 ms-1">Here are your results:</p>
      </div>

      {drinkResults.map((drink, index) => (
        <div key={index} className="d-flex align-items-center justify-content-center flex-wrap flex-column">
          <div className="d-flex mb-2">
            <div className="p-3">
              <img className="img-results" src={drink.imgSrc} alt="coffee"/>
                <div>
                  <button className="result-buttons">{drink.name}</button>
                </div>
            </div>
            <div className="mt-4 me-4">
              <ul>
                {drink.ingredients.split('\n').map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function ResultsSection(props) {
  return (
    <section>
      <Results selectedDrinks={[2, 4]}/>
      <div>
        <div className="d-flex mt-5 ms-4 mb-1">
          <img className="headerlogo" src="img/HeaderLogo.png" alt="coffee"/>
          <p className="text mt-4 ms-1">Not Sure?</p>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-wrap flex-column pb-5">
          <Link
            to="/education"
            className="questionnaireredirect"
          >
            Different between drinks
          </Link>
          <Link
            to="resultSection"
            className="questionnaireredirect"
          >
            Get a blind box!
          </Link>
        </div>  
      </div>
    </section>
  );
}

// QuizPage Component
export function Quiz() {
  // Define the options for each preference section
  const temperatureOptions = [
    { imgSrc: "img/quizimgs/cold.jpg", label: "Cold" },
    { imgSrc: "img/quizimgs/hot.jpg", label: "Hot" },
  ];

  const milkOptions = [
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
        label: "Macchiatto",    },
    { 
        imgSrc: "img/Latte.png", 
        label: "Latte",
    }
  ];

  const otherOptions = [

  ];

  return (
    <div className="questionnairebody">
      <main className="questionnaire">
        <div>
          <IntroductionSection />
        </div>
        <section className="d-flex align-items-center justify-content-center flex-wrap flex-column m-5">
          <div>
            <PreferenceSection
              title="Temperature Preference"
              question="Would you like an iced or a hot drink?"
              options={temperatureOptions}
              name="temperature"
            />
          </div>
          <div>
            <PreferenceSection
              title="Milk Preference"
              question="What kind of milk do you prefer?"
              options={milkOptions}
              name="milk"
            />
          </div>
          <PreferenceSection
            title="Flavor Preference"
            question="What kind of syrup do you prefer?"
            options={flavorOptions}
            name="flavor"
          />
          <PreferenceSection
            title="Caffeine Preference"
            question="How much caffeine do you prefer?"
            options={caffeineOptions}
            name="caffeine"
          />
        </section>

        <section className="d-flex align-items-center justify-content-center flex-wrap flex-column m-5">
          <Link
            to="resultSection"
            smooth={true}
            duration={500}
            className="questionnaireredirect"
          >
            See Your Results!
          </Link>
        </section>

        {/* <PreferenceSection
          title="Here is your result!"
          options={resultOptions}
          name='1-2 tsp. of steamed milk
          1 shot of espresso'
        />

        <PreferenceSection
          title="Not sure?"
          options={otherOptions}
          name='others'
        /> */}
        <div>
          <ResultsSection />
        </div>
      </main>
    </div>
  );
}

