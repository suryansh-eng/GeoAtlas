import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth'
import {auth} from '../firebase'
import {EMAIL_RE, authMessage} from '../utils/authHelpers'
import AuthField from '../components/AuthField'
import bg from '../assets/background_image.png'
import './Login.css'

const Login = () => {
  const [values, setValues] = useState({email: '', password: ''})
  const [errors, setErrors] = useState({})
  const [remember, setRemember] = useState(true)
  const [status, setStatus] = useState({type: '', text: ''})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues((prev) => ({...prev, [name]: value}))
    setErrors((prev) => ({...prev, [name]: ''}))
  }

  const validate = () => {
    const next = {}
    if (!values.email.trim()) next.email = 'Enter your email.'
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (!values.password) next.password = 'Enter your password.'
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
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
      await signInWithEmailAndPassword(auth, values.email.trim(), values.password)
navigate('/dashboard')
    } catch (err) {
      setStatus({type: 'error', text: authMessage(err.code)})
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = async () => {
    if (!EMAIL_RE.test(values.email.trim())) {
      setErrors({email: 'Enter your email first.'})
      return
    }
    try {
      await sendPasswordResetEmail(auth, values.email.trim())
      setStatus({type: 'success', text: 'Reset link sent. Check your inbox.'})
    } catch (err) {
      setStatus({type: 'error', text: authMessage(err.code)})
    }
  }

  return (
    <main className="auth-page" style={{backgroundImage: `url(${bg})`}}>
      <section className="auth-card">
        <h1>Log in</h1>

        <form onSubmit={handleSubmit} noValidate>
          <AuthField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          <AuthField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />

          <div className="options">
            <label className="check">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
          </div>

          {status.text && (
            <p className={`form-status ${status.type}`} role="status">
              {status.text}
            </p>
          )}

          <button type="submit" className="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
