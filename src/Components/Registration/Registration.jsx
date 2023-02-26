import React, { useState } from 'react';
import './regStyles.scss';
import axios from 'axios';

import radioChecked from './../../assets/img/radioChecked.svg';
import radioUnchecked from './../../assets/img/radioUnchecked.svg';

function Registration({positions, token}) {
  
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [file, setFile] = useState();
  const [position, setPosition] = useState();
  const [uploaded, setUpload] = useState(false);

  // { method: 'POST', body: formData, headers: { 'Token': token, 
  // get token with GET api/v1/token method }, }) .then(function(response) { return response.json(); }) .then(function(data) 
  // { console.log(data); if(data.success) { // process success response } else { // proccess server errors } }) .catch(function(error) { // proccess network errors });

  const getUserData = async () => {
    const data = {
      name: firstName,
      email: email,
      phone: phone,
      position_id: position,
      photo: file,
    };
    const postUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users`;
    await axios.post(postUrl,data,
        {
          headers: {
            'token' : token,
          },  
          body: {
            data
          }
        }
      ).then((res) => {
        console.log(res.message)
      })
    }

  return (
    <div className='registrationWrapper'>
      <h1 className='regHead'>Working with POST request</h1>
      <div className='inputUserData'>
        <input 
          type='text'
          className='regInput'
          placeholder='Your name'
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input 
          type='text' 
          className='regInput' 
          placeholder='Email' 
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type='text' 
          className='regInput' 
          placeholder='Phone'
          min={12} 
          onChange={e => setPhone(Number(e.target.value))}
        />
        <p className='phoneTemplate'>+38 (XXX) XXX - XX - XX</p>
      </div>
      <div className='radioBtns'>
        <p className='selectRadioParagraph'>Select your position</p>
        <ul className='radioBtnsList'>
          {positions.map((item, index) => (
            <li
              className='radioBtnsItem'
              value={item.value}
              key={index}
            >
              <img 
                src={position === item.id ? radioChecked : radioUnchecked} 
                className='radioCheckImg'
                alt='checkImg'
                value='Frontend developer'
                onClick={() =>{
                  setPosition(item.id);
                }}
              />
              {item.name}
              </li>
          ))}
        </ul>
      </div>
      <div className='registrationBottom'>
        <label className='getFile' htmlFor='file'>
          <span className='uploadSpan'>Upload</span>
          <input
            className='getFileInput' 
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span 
            className='fileWayInput'
            disabled={true}
          >
            {file ? file.name : 'Upload your photo'}
          </span>
        </label>
        <div className='regBtnBlock'>
          <button 
            className='regBtn'
            onClick={getUserData}
          >
            Sign up
          </button>
        </div>
      </div>

    </div>
  )
}

export default Registration