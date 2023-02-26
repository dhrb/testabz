import React from 'react';

function Card({img, name, position, email, phoneNumber, timestamp}) {
  return(
    <div className='card'>
      <div className="cardHeader">
        <img 
          className='userImg'
          alt='userImg'
          src={img}
        />
        <p>{name}</p>
      </div>
      <div className="cardBottom">
        <p className='userPosition'>{position}</p>
        <p className='userEmail'>{email}</p>
        <p className='userPhoneNumber'>{phoneNumber}</p>
      </div>
    </div>
  )
}

export default Card;