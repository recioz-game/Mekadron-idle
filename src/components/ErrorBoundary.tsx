import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("----------------------------------------");
    console.error("--- ERROR ATRAPADO POR ERROR BOUNDARY ---");
    console.error("----------------------------------------");
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.error("----------------------------------------");
  }

  public render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return (
        <div style={{
          backgroundColor: '#111827',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#EF4444' }}>Algo ha salido muy mal.</h1>
          <p>Ha ocurrido un error de renderizado que ha bloqueado la aplicación.</p>
          <p>Por favor, recarga la página. Si el error persiste, informa de ello.</p>
          <pre style={{
            backgroundColor: '#1F2937',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #374151',
            color: '#F3F4F6',
            maxWidth: '800px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            marginTop: '2rem'
          }}>
            <strong>Error:</strong> {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
