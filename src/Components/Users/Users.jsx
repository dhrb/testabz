import React from 'react'
import Card from './Card/Card'
import './usersStyles.scss'
import PropTypes from 'prop-types'

function Users({ users, loading, more, setMore }) {
    Users.propTypes = {
        users: PropTypes.array,
        loading: PropTypes.bool,
        setMore: PropTypes.func,
        more: PropTypes.bool,
    }
    const showMoreHandler = () => {
        setMore(!more)
    }
    const sortedUsers = users.sort(
        (a, b) => a.registration_timestamp - b.registration_timestamp
    )

    return (
        <div className="usersWrapper">
            <div className="usersHeader">
                <h1 className="usersHeading">Working with GET request</h1>
            </div>

            {loading ? (
                <div className="loader"></div>
            ) : (
                <>
                    <div className="usersCards">
                        {(more ? sortedUsers : sortedUsers.slice(6)).map(
                            (user, index) => {
                                return (
                                    <Card
                                        key={index}
                                        name={user.name}
                                        img={user.photo}
                                        position={user.position}
                                        email={user.email}
                                        phoneNumber={user.phone}
                                        timestamp={user.registration_timestamp}
                                    />
                                )
                            }
                        )}
                    </div>
                    <div className="usersBottom">
                        <button className="usersBtn" onClick={showMoreHandler}>
                            {more ? 'Show less ↑' : 'Show more ↓'}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Users
