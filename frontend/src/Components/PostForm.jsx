import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import ErrorAlert from './ErrorAlert';

export default function PostForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    authCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PinggyAuthHeader': formData.authCode
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body
        })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      onSuccess(data);
      setFormData({ title: '', body: '', authCode: '' });
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .form {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .formGroup {
          margin-bottom: 1.5rem;
        }

        .label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: border-color 0.2s;
        }

        .input:focus {
          border-color: #0070f3;
          outline: none;
        }

        .textarea {
          resize: vertical;
        }

        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .button:hover {
          background-color: #0059c1;
        }

        .disabled {
          background-color: #aaa !important;
          cursor: not-allowed;
        }

        .icon {
          font-size: 1.2rem;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="form">
        {error && <ErrorAlert message={error} />}

        <div className="formGroup">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input"
            placeholder="Enter post title"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="body" className="label">
            Content
          </label>
          <textarea
            id="body"
            name="body"
            rows={4}
            value={formData.body}
            onChange={handleChange}
            required
            className="input textarea"
            placeholder="Write your post content here..."
          />
        </div>

        <div className="formGroup">
          <label htmlFor="authCode" className="label">
            Authentication Code
          </label>
          <input
            type="password"
            id="authCode"
            name="authCode"
            value={formData.authCode}
            onChange={handleChange}
            required
            className="input"
            placeholder="Enter your auth code"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`button ${loading ? 'disabled' : ''}`}
        >
          {loading ? (
            'Submitting...'
          ) : (
            <>
              <FiSend className="icon" />
              Submit Post
            </>
          )}
        </button>
      </form>
    </>
  );
}
