export const MEMORY_TYPES = [
    "Memory", 
    "Tip",
    "Activity", 
    "Sightseeing",
    "Family",
    "Review",
    "Nature",
    "Food", 
    "Stay", 
    "Other"
]

export const VISIBILITIES = [
    "Public", 
    "Private", 
    "Followers"
]

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const USER_ROLES = {
    PREMIUM: { value: "premium", displayLabel: "Premium" },
    USER: { value: "user", displayLabel: "User" },
    ADMIN: { value: "admin", displayLabel: "Admin" }
}

export const MODAL_VIEW_MODES = {
    EDIT: "edit",
    CREATE: "create"
}