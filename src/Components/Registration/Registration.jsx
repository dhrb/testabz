import React, { useEffect, useState } from 'react'
import './regStyles.scss'
import axios from 'axios'
import PropTypes from 'prop-types'
import radioChecked from './../../assets/img/radioChecked.svg'
import radioUnchecked from './../../assets/img/radioUnchecked.svg'
import uploadedImg from './../../assets/img/succesImg.svg'

function Registration({ positions, token }) {
    Registration.propTypes = {
        positions: PropTypes.array,
        token: PropTypes.string
    }
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [phone, setPhone] = useState()
    const [phoneError, setPhoneError] = useState(false)
    const [file, setFile] = useState()
    const [fileError] = useState(false)
    const [position, setPosition] = useState()
    const [uploaded, setUploaded] = useState(false)
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if (firstNameError && emailError && phoneError === true) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [firstNameError, emailError, phoneError])
    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            '/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/gm'
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
    }
    //inputs handlers
    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
        if (e.target.value.length < 2) {
            setFirstNameError(true)
        } else setFirstNameError(false)
    }
    const phoneHandeler = (e) => {
        setPhone(e.target.value)
        if (e.target.value.length < 12 || e.target.value.length > 13) {
            setPhoneError(true)
        } else {
            setPhoneError(false)
        }
    }
    const getUserData = async () => {
        let data = new FormData()
        data.append('name', firstName)
        data.append('email', email)
        data.append('phone', phone)
        data.append('position_id', position)
        data.append('photo', file)

        const postUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users`
        //async post req to BE
        try {
            await axios
                .post(postUrl, data, {
                    headers: {
                        token: token,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    console.log(res.status)
                    setUploaded(true)
                })
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="registrationWrapper">
            {uploaded ? (
                <div className="hasUploaded">
                    <p className="succesParagraph">
                        User successfully registered
                    </p>
                    <img
                        src={uploadedImg}
                        className="uploadedImg"
                        alt="uploadImg"
                    />
                </div>
            ) : (
                <div className="registrationForm">
                    <h1 className="regHead">Working with POST request</h1>
                    <div className="inputUserData">
                        <input
                            type="text"
                            className={firstNameError ? 'regError' : 'regInput'}
                            name="firstName"
                            placeholder="Your name"
                            onChange={(e) => firstNameHandler(e)}
                            value={firstName}
                        />
                        <input
                            type="text"
                            className={emailError ? 'regError' : 'regInput'}
                            name="email"
                            placeholder="Email"
                            onChange={(e) => emailHandler(e)}
                            value={email}
                        />
                        <input
                            type="text"
                            className={phoneError ? 'regError' : 'regInput'}
                            name="phone"
                            placeholder="Phone"
                            onChange={(e) => phoneHandeler(e)}
                            value={phone}
                        />
                        <p className="phoneTemplate">+38 (XXX) XXX - XX - XX</p>
                    </div>
                    <div className="radioBtns">
                        <p className="selectRadioParagraph">
                            Select your position
                        </p>
                        <ul className="radioBtnsList">
                            {positions.map((item, index) => (
                                <li
                                    className="radioBtnsItem"
                                    value={item.value}
                                    key={index}
                                >
                                    <img
                                        src={
                                            position === item.id
                                                ? radioChecked
                                                : radioUnchecked
                                        }
                                        className="radioCheckImg"
                                        alt="checkImg"
                                        value="Frontend developer"
                                        onClick={() => {
                                            setPosition(item.id)
                                        }}
                                    />
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="registrationBottom">
                        <label
                            className={fileError ? 'getFileErr' : 'getFile'}
                            htmlFor="file"
                        >
                            <span className="uploadSpan">Upload</span>
                            <input
                                className="getFileInput"
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <span className="fileWayInput" disabled={true}>
                                {file ? file.name : 'Upload your photo'}
                            </span>
                        </label>
                        <div className="regBtnBlock">
                            <button
                                className="regBtn"
                                onClick={getUserData}
                                disabled={valid ? true : false}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Registration