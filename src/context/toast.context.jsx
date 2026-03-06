import { createContext, useState } from "react";
import { Alert, Snackbar } from '@mui/material'

// toast.context.jsx
// -----------------------------------------------------------------------------
// This module provides a toast notification context for the WanderMemo client.
// It uses Material-UI's Snackbar and Alert components to display temporary
// messages at the bottom of the screen.
//
// Usage:
//   1. Wrap your app or component tree with <ToastWrapper>.
//   2. In any child component, use `useContext(ToastContext)` to get `showToast`.
//   3. Call `showToast(message, severity)` to display a toast (severity: 'info', 'success', 'warning', 'error').
// -----------------------------------------------------------------------------

const ToastContext = createContext()

/**
 * ToastWrapper component
 * -----------------------
 * Provides toast notification functionality via React context.
 *
 * State managed:
 *   - toast: object with open, message, and severity properties.
 *
 * Exposes `showToast` function to trigger notifications.
 * Renders a Snackbar with Alert that auto-hides after 3 seconds.
 */
function ToastWrapper(props) {

    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "info"
    })

    // showToast triggers a new toast notification
    const showToast = (message, severity = "info") => {
        setToast({
            open: true,
            message,
            severity
        })
    }

    return (
        <ToastContext.Provider value={{showToast}}>
            {props.children}
            <Snackbar
                open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={toast.severity} variant='filled' onClose={() => setToast({ ...toast, open: false })}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    )
}

export {
    ToastContext,
    ToastWrapper
}