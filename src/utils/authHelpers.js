export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const cleanPhone = (phone) => phone.replace(/[\s()-]/g, '')

export const isValidPhone = (phone) => /^\+?[0-9]{7,15}$/.test(cleanPhone(phone))

// Returns an empty string when the password meets every rule
export const passwordIssue = (password) => {
  if (password.length < 8) return 'Use at least 8 characters.'
  if (!/[a-z]/.test(password)) return 'Add a lowercase letter.'
  if (!/[A-Z]/.test(password)) return 'Add an uppercase letter.'
  if (!/[0-9]/.test(password)) return 'Add a number.'
  return ''
}

export const authMessage = (code) => {
  const messages = {
    'auth/email-already-in-use': 'That email already has an account. Try logging in.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/user-not-found': 'Incorrect email or password.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/weak-password': 'Choose a stronger password.',
    'auth/too-many-requests': 'Too many attempts. Wait a moment and retry.',
    'auth/network-request-failed': 'Network problem. Check your connection.'
  }
  return messages[code] || 'Something went wrong. Please try again.'
}
