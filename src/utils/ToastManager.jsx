import React, { createContext, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// 创建一个Context
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'default') => {
    const id = Math.random().toString(36).substring(2, 11);
    setToasts([...toasts, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  // 根据类型设置Toast的类名
  const toastClassName = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      default:
        return '';
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer className="p-3" position="top-end">
        {toasts.map(toast => (
          <Toast key={toast.id} onClose={() => removeToast(toast.id)} delay={5000} autohide
                 className={toastClassName(toast.type)}>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
