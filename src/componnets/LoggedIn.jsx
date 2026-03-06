import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from 'react-router-dom'

function LoggedIn(props) {

    const { isLoggedIn } = useContext(AuthContext)
    if (isLoggedIn) {
        return props.children
    } 
    return <Navigate to="/login"/>
}

export default LoggedIn