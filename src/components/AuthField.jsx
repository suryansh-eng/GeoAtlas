import {useState} from 'react'

const AuthField = ({label, name, type = 'text', value, onChange, error, hint, autoComplete, inputMode, className = ''}) => {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const noteId = `${name}-note`

  return (
    <div className={`field ${error ? 'invalid' : ''} ${className}`}>
      <input
        id={name}
        name={name}
        type={isPassword && visible ? 'text' : type}
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete={autoComplete}
        inputMode={inputMode}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? noteId : undefined}
      />
      <label htmlFor={name}>{label}</label>

      {isPassword && (
        <button
          type="button"
          className="toggle"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      )}

      {(error || hint) && (
        <p id={noteId} className={error ? 'field-note error' : 'field-note'} role={error ? 'alert' : undefined}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

export default AuthField
