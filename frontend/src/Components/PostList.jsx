import { FiUser, FiClock } from 'react-icons/fi';
export default function PostList({ posts = [] }) {
  const displayPosts = Array.isArray(posts) ? posts : [];

  if (displayPosts.length === 0) {
    return (
      <>
        <style>{`
          .empty-state {
            text-align: center;
            padding: 2rem;
            font-size: 1.2rem;
            color: #999;
          }
        `}</style>
        <div className="empty-state">No posts available</div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .post-list {
          display: grid;
          gap: 1.5rem;
          padding: 1rem;
        }

        .post-item {
          background-color: #fff;
          padding: 1.25rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .post-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .post-item h3 {
          font-size: 1.25rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .post-item p {
          color: #666;
          line-height: 1.6;
        }

        .post-auth {
          margin-top: 0.75rem;
          font-size: 0.9rem;
          color: #0070f3;
          font-weight: 500;
        }
      `}</style>

      <div className="post-list">
        {displayPosts.map((post, index) => (
          <div key={index} className="post-item">
            <h3>{post.title || 'Untitled Post'}</h3>
            <p>{post.body || 'No content'}</p>
            {post.pinggyAuthHeader && (
              <div className="post-auth">
                <FiUser style={{ marginRight: '4px' }} />
                Auth: {post.pinggyAuthHeader}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
