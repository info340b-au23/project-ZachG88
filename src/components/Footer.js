import React from "react";

export function Footer() {
    return (
        <footer>
            <div className="container d-none d-sm-flex">
                <p><a href="mailto:zgen88@uw.edu"><span className="material-icons">email</span> email us!</a></p>
                <p><a href="tel:253-285-0537"><span className="material-icons">phone</span> call us!</a></p>
                <p>&copy; iCoffee 2023</p>
            </div>
        </footer>
    );
}
