import React from 'react';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { Link } from "react-scroll";

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
      <div className="title-container">
        <img className="headerlogo" src="img/HeaderLogo.png" alt={title} />
        <p className="title-text">{title}</p>
      </div>
      <p className="question-text ms-3">{question}</p>
    </div>
    <div className="options-container">
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

        <PreferenceSection
          title="Here is your result!"
          options={resultOptions}
          name='1-2 tsp. of steamed milk
          1 shot of espresso'
        />

        <PreferenceSection
          title="Not sure?"
          options={otherOptions}
          name='others'
        />

        <section className="d-flex align-items-center justify-content-center flex-wrap flex-column m-5">
          <Link
            to="resultSection"
            smooth={true}
            duration={500}
            className="questionnaireredirect"
          >
            Different between drinks
          </Link>
        </section>

        <section className="d-flex align-items-center justify-content-center flex-wrap flex-column m-5">
          <Link
            to="resultSection"
            smooth={true}
            duration={500}
            className="questionnaireredirect"
          >
            Get a blind box!
          </Link>
        </section>

      </main>
    </div>
  );
}

