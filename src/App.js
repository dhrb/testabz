//Styles import
import './styles.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Components imports
import Header from './Components/Header/Header'
import Welcome from './Components/Welcome/Welcome'
import Users from './Components/Users/Users'
import Registration from './Components/Registration/Registration'

function App() {
    const usersUrl =
        'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=12';
    const positionsUrl =
        'https://frontend-test-assignment-api.abz.agency/api/v1/positions';

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [positions, setPositions] = useState([])
    const [token, setToken] = useState('')
    const [more, setMore] = useState(false)

    async function getData() {
        try {
            const resData = await axios.get(usersUrl)
            setLoading(true)
            setUsers(resData.data.users)
            //One of task in my test work - create loading component, but it is not displayed due to fast loading
            // for the visibility of the download component I used setTimeout :)
            setTimeout(() => {
                setLoading(false)
            }, 800)
        } catch (error) {
            alert('Users not loaded ' + error.message)
        }
    }
    async function getPositions() {
        try {
            const resData = await axios.get(positionsUrl)
            setPositions(resData.data.positions)
        } catch (error) {
            console.error('cannot loading '/positions/'' + error.message)
        }
    }
    async function getToken() {
        try {
            const resData = await axios.get(
                'https://frontend-test-assignment-api.abz.agency/api/v1/token'
            )
            setToken(resData.data.token)
        } catch (error) {
            console.error('Positions loading ERROR ' + error.message)
        }
    }
    useEffect(() => {
        (async () => {
            await getData()
            await getPositions()
            await getToken()
        })
    }, [])

    return (
        <div className="appWrapper">
            <header className="appHeader">
                <Header />
            </header>
            <div className="appBody">
                <div className="welcome">
                    <Welcome />
                </div>
                <div className="users">
                    <Users
                        loading={loading}
                        users={users}
                        setUsers={setUsers}
                        setMore={setMore}
                        more={more}
                    />
                </div>
                <div className="registration">
                    <Registration positions={positions} token={token} />
                </div>
            </div>
        </div>
    )
}
export default App