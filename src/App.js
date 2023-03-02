//Styles import
import './styles.scss';

import { useEffect, useState } from 'react';
import axios from 'axios';

//Components imports
import Header from './Components/Header/Header';
import Welcome from './Components/Welcome/Welcome';
import Users from './Components/Users/Users';
import Registration from './Components/Registration/Registration';

/*
  Wrapper function for app
  1. In this function data get with axios and Data send to server with axios post;
  2. When data GET, info pass from props to users, where .map to <Card /> component to prevent code duplication
  3. There was an idea to use styled components, but I wanted to show the manual skill of writing styles;
*/

function App() {
  const usersUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6';
  const positionsUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([])
  const [positions, setPositions] = useState([])
  const [token, setToken] = useState('');

  // useEffect for fetch data from API
  useEffect(() => {
    async function getData () {
      try{
        const resData = await axios.get(usersUrl);
        setLoading(true);
        setUsers(resData.data.users);
        //One of task in my test work - create loading component, but it is not displayed due to fast loading
        // for the visibility of the download component I used setTimeout :)
        setTimeout(() => {
          setLoading(false);
        }, 800 )
      } catch (error) {
        console.error('Users not loaded ' + error.message);
      }
    }
    async function getPositions() {
      try {
        const resData = await axios.get(positionsUrl);
        setPositions(resData.data.positions);
      } catch (error) {
        console.error('Positions loading ERROR ' + error.message);
      }
    };
    async function getToken() {
      try {
        const resData = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        setToken(resData.data.token);
      } catch (error) {
        console.error('Positions loading ERROR ' + error.message);
      }
    };
    getData();
    getPositions();
    getToken();
  }, [])

  return (
    <div className="appWrapper">
      <header className="appHeader">
        <Header />
      </header>
      <div className='appBody'>
        <div className='welcome'>
          <Welcome />
        </div>
        <div className='users'>
          <Users 
            loading = {loading}
            users={users}
            setUsers={setUsers}
          />
        </div>
        <div className='registration'>
          <Registration
            positions={positions}
            token={token}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
