import { FiAlertCircle } from 'react-icons/fi';

export default function ErrorAlert({ message }) {
  return (
    <>
      <style>{`
        .error-alert {
          display: flex;
          align-items: center;
          padding: 1rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #b91c1c;
          background-color: #fee2e2;
          border-radius: 0.5rem;
        }

        .error-icon {
          margin-right: 0.5rem;
          font-size: 1.25rem;
        }
      `}</style>
      <div className="error-alert">
        <FiAlertCircle className="error-icon" />
        <span>{message}</span>
      </div>
    </>
  );
}
