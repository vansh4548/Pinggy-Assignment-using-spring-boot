import { useState, useEffect } from 'react';
import Head from 'next/head';
import PostForm from '../Components/PostForm';
import PostList from '../Components/PostList';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorAlert from '../Components/ErrorAlert';
import { FiPlusCircle, FiList, FiZap } from 'react-icons/fi';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/list');
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => {
      const currentPosts = Array.isArray(prevPosts) ? prevPosts : [];
      return newPost?.post ? [newPost.post, ...currentPosts] : currentPosts;
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Pinggy Post Manager</title>
        <meta name="description" content="Create and manage posts with Pinggy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Centered Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <FiZap className="text-indigo-600 text-5xl animate-pulse mb-4" />
            <h1 className="text-4xl sm:text-5xl  text-center font-extrabold text-gray-900">
              Pinggy Post Manager
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-gray-700">
              Create and manage your posts with ease
            </p>
          </div>

          {/* Grid Layout for Form and List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Create New Post Section */}
            <div className="bg-white rounded-2xl shadow-md p-8 transition duration-300 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <FiPlusCircle className="text-blue-600 text-2xl mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Create New Post</h2>
              </div>
              <PostForm onSuccess={handleNewPost} />
            </div>

            {/* Recent Posts Section */}
            <div className="bg-white rounded-2xl shadow-md p-8 transition duration-300 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <FiList className="text-green-600 text-2xl mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Recent Posts</h2>
              </div>

              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorAlert message={error} />
              ) : (
                <PostList posts={posts} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
