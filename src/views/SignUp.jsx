import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '../firebase'
import {EMAIL_RE, cleanPhone, isValidPhone, passwordIssue, authMessage} from '../utils/authHelpers'
import AuthField from '../components/AuthField'
import bg from '../assets/background_image.png'
import './SignUp.css'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirm: ''
}

const SignUp = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({type: '', text: ''})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues((prev) => ({...prev, [name]: value}))
    setErrors((prev) => ({...prev, [name]: ''}))
  }

  const validate = () => {
    const next = {}
    if (!values.firstName.trim()) next.firstName = 'Enter your first name.'
    if (!values.lastName.trim()) next.lastName = 'Enter your last name.'

    if (!values.email.trim()) next.email = 'Enter your email.'
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.'

    if (!values.phone.trim()) next.phone = 'Enter your phone number.'
    else if (!isValidPhone(values.phone)) next.phone = 'Use 7-15 digits, with an optional + prefix.'

    const issue = passwordIssue(values.password)
    if (!values.password) next.password = 'Create a password.'
    else if (issue) next.password = issue

    if (!values.confirm) next.confirm = 'Confirm your password.'
    else if (values.confirm !== values.password) next.confirm = 'Passwords do not match.'

    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    setLoading(true)
    setStatus({type: '', text: ''})
    try {
      const {firstName, lastName, email, phone, password} = values
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
      await updateProfile(cred.user, {displayName: `${firstName.trim()} ${lastName.trim()}`})
      await setDoc(doc(db, 'users', cred.user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: cleanPhone(phone),
        createdAt: serverTimestamp()
      })
      navigate('/') // change to your post-signup route
    } catch (err) {
      setStatus({type: 'error', text: authMessage(err.code)})
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page" style={{backgroundImage: `url(${bg})`}}>
      <section className="auth-card auth-card--wide">
        <h1>Create your account</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="signup-grid">
            <AuthField
              label="First name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              autoComplete="given-name"
            />
            <AuthField
              label="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
              autoComplete="family-name"
            />
            <AuthField
              className="field--full"
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            <AuthField
              className="field--full"
              label="Phone"
              name="phone"
              type="tel"
              inputMode="tel"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete="tel"
            />
            <AuthField
              className="field--full"
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              hint="Min. 8 characters with upper, lower and a number."
              autoComplete="new-password"
            />
            <AuthField
              className="field--full"
              label="Confirm password"
              name="confirm"
              type="password"
              value={values.confirm}
              onChange={handleChange}
              error={errors.confirm}
              autoComplete="new-password"
            />
          </div>

          {status.text && (
            <p className={`form-status ${status.type}`} role="status">
              {status.text}
            </p>
          )}

          <button type="submit" className="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  )
}

export default SignUp
