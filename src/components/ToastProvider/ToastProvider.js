import React from 'react';

import useEscapeKey from '../../hooks/useEscapeKey';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, variant) => {
    const nextToasts = [...toasts, { message, variant, id: crypto.randomUUID() }];
    setToasts(nextToasts);
  }, [toasts]);

  const dismissToast = React.useCallback((id) => {
    const nextToasts = toasts.filter((t) => t.id !== id);
    setToasts(nextToasts);
  }, [toasts]);

  const value = React.useMemo(() => ({ toasts, addToast, dismissToast }), [toasts, dismissToast, addToast]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleEscape);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
