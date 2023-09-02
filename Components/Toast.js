import  { useState, useEffect } from 'react';
import { RxCrossCircled } from 'react-icons/rx';


const Toast = ({ message, duration, onClose }) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  const handleClose = () => {
    setShowToast(false);
    onClose();
  };

  return (
    <>
      {showToast && (
        <div className={`toast1 ${showToast ? 'active' : ''}`}>
          <div className="toast-content">{message}</div>
          <button className="toast-close" onClick={handleClose}>
            <RxCrossCircled size={15} />
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;