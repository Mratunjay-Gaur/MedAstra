// MedAstra — ErrorBoundary Component
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log to console for debugging
    console.error('[MedAstra] Uncaught error:', error, errorInfo);
  }

  handleRetry() {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--bg)',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 className="medastra-brand" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            MedAstra
          </h1>
          <h2 style={{ color: 'var(--danger)', fontSize: '1.25rem', marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', marginBottom: '1.5rem' }}>
            An unexpected error occurred. Our team has been notified. Please try refreshing the
            page or click retry below.
          </p>
          {this.state.error && (
            <pre
              style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                maxWidth: '560px',
                textAlign: 'left',
                overflow: 'auto',
                marginBottom: '1.5rem',
              }}
            >
              {this.state.error.toString()}
            </pre>
          )}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '0.6rem 1.5rem',
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              Retry
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              style={{
                padding: '0.6rem 1.5rem',
                background: 'transparent',
                color: 'var(--primary)',
                border: '1px solid var(--primary)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
