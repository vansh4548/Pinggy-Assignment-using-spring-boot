export default function LoadingSpinner() {
  return (
    <>
      <style>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .spinner {
          border-radius: 9999px;
          height: 3rem;
          width: 3rem;
          border-top: 2px solid #6366f1;
          border-bottom: 2px solid #6366f1;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </>
  );
}
