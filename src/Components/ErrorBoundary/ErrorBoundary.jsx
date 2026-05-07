import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (typeof window !== 'undefined' && window.console) {
      console.error('[ErrorBoundary]', error, errorInfo)
    }
  }

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
          background: '#020617',
          color: '#f8fafc',
        }}
      >
        <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: '1.5rem', color: '#94a3b8', lineHeight: 1.5 }}>
            The page hit an unexpected error. Try reloading — if the issue persists, please email{' '}
            <a href="mailto:hello@ionatech.co" style={{ color: '#60a5fa', textDecoration: 'underline' }}>
              hello@ionatech.co
            </a>
            .
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '0.5rem',
              background: '#3b82f6',
              color: 'white',
              border: 0,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
