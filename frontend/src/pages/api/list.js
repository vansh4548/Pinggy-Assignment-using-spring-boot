export default async function handler(req, res) {
  try {
    const backendResponse = await fetch('http://localhost:8080/list');
    
    // if (!backendResponse.ok) {
    //   throw new Error('Failed to fetch posts');
    // }

    const data = await backendResponse.json();
    // Ensure we always return an array
    res.status(200).json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return empty array on error
    res.status(200).json([]);
  }
}