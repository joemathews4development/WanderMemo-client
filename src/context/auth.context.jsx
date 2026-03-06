// auth.context.jsx
// -----------------------------------------------------------------------------
// Authentication context for the WanderMemo client app.
// Components wrapped with <AuthWrapper> can access auth state via
// `useContext(AuthContext)` and respond to login/logout events.
// -----------------------------------------------------------------------------
import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";

const AuthContext = createContext()

/**
 * AuthWrapper component
 * ----------------------
 * Holds authentication state and exposes it through a React context.
 *
 * State managed:
 *   - isLoggedIn
 *   - loggedUser
 *   - isAuthenticatingUser
 *
 * Any descendant can call `useContext(AuthContext)` to read/update these
 * values.
 */
function AuthWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(true)

    const passedContext = {
        isLoggedIn, setIsLoggedIn,
        loggedInUser, setLoggedInUser,
        isAuthenticatingUser, setIsAuthenticatingUser,
    }

    // when the component mounts, ask backend to verify the current session
    useEffect(() => {
        authenticateUser()
    }, [])

    const authenticateUser = async () => {
        try {
            const response = await service.get(`/auth/verify`)
            setLoggedInUser(response.data.payload)
            setIsLoggedIn(true)
            setIsAuthenticatingUser(false)
        } catch (error) {
            setLoggedInUser(null)
            setIsLoggedIn(false)
            setIsAuthenticatingUser(false)
        }
        
    }

    if(isAuthenticatingUser) {
        return(<h3>Authenticating....</h3>)
    }
    
    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthWrapper
}