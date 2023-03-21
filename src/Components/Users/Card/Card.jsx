import React from 'react'
import PropTypes from 'prop-types'

function Card({ img, name, position, email, phoneNumber }) {
    Card.propTypes = {
        img: PropTypes.string,
        name: PropTypes.string,
        position: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string
    }
    return (
        <div className="card">
            <div className="cardHeader">
                <img className="userImg" alt="userImg" src={img} />
                <p>{name}</p>
            </div>
            <div className="cardBottom">
                <p className="userCardInfo">{position}</p>
                <p className="userCardInfo">{email}</p>
                <p className="userCardInfo">{phoneNumber}</p>
            </div>
        </div>
    )
}

export default Card
