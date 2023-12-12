import React from "react";
import ourTeam from '../data/ourTeam.json';
import { Link } from 'react-router-dom';


function WelcomeSection(props) {
    return (
        <div className="d-flex justify-content-center">
            <div className="custom-bg">
                <div className="col-sm-12 p-5">
                    <h1>Welcome!</h1>
                </div>
            </div>
        </div>
    )
}

export function PageRibbon(props) {
    return (
        <div className="col-sm-12">
            <img src="img/education_ribbon.jpeg"
                className="img-fluid shadow-lg"
                alt="Responsive ribbon"></img>
        </div>
    )
}

function QuizCard(props) {
    return (
        <section className="container d-flex justify-content-center">
            <div className="card card-bg custom-border" style={{ width: 350 }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Find the Right Cup of Coffee For You!</h5>
                    <Link className="mt-3 nav-link btn nav-color" to="/quiz">Take the quiz!</Link>
                </div>
            </div>
        </section>
    )
}

function AboutUs(props) {
    return (
        <section className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-sm-12 pb-4">
                    <p className="h1 custom-bg text-center p-3">About Us</p>
                </div>

                <div className="col-sm-4">
                    <div>
                        <p>We're a dynamic team of University of Washington students united by our passion for coffee. We understand that choosing the perfect cup can sometimes be overwhelming. That's why we created this app – to simplify your decision-making process and enhance your coffee experience.</p>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="d-flex justify-content-center">
                        <img className="abt-img shadow-lg" src="img/Home_AboutUs.png" alt="Home Image" />
                    </div>
                </div>

                <div className="col-sm-4">
                    <div>
                        <p>Our app doesn't just help you decide what to drink; it's a journey into the world of coffee. Here, you'll discover and learn about the diverse flavors and stories behind each brew. Join us in exploring the rich tapestry of coffee culture, one cup at a time!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function OurTeam({ imgSrc, name, description }) {
    return (
        <div className="col-sm-6 col-md-3">
            <div>
                <img className="teams-img shadow img-fluid mb-3" src={imgSrc} alt={name} />
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export function HomePage(props) {
    const { toggleQuiz } = props;

    return (
        <div>
            <WelcomeSection />
            <PageRibbon />
            <QuizCard onClick={toggleQuiz} />
            <AboutUs />
            <section className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-sm-12 pb-4">
                        <p className="h1 custom-bg text-center p-3">Our Team</p>
                    </div>

                    {ourTeam.map((team) => (
                        <OurTeam key={team.name} {...team} />
                    ))}
                </div>
            </section>
        </div>
    );
}