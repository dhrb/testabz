import React from 'react'
import './welcomeStyles.scss'

function Welcome() {
    return (
        <div className="welcomeWrapp">
            <div className="welcomeMain">
                <h1 className="welcomeHeader">
                    Test assignment for front-end developer
                </h1>
                <p className="welcomeParagraph">
                    What defines a good front-end developer is one that has
                    skilled knowledge of HTML, CSS, JS with a vast understanding
                    of User design thinking as they`ll be building web
                    interfaces with accessibility in mind. They should also be
                    excited to learn, as the world of Front-End Development
                    keeps evolving.
                </p>
                <button className="welcomeBtn">Sign up</button>
            </div>
        </div>
    )
}

export default Welcome
