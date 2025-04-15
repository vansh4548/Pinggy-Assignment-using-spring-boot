export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
  
    try {
      const backendResponse = await fetch('http://localhost:8080/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PinggyAuthHeader': req.headers.pinggyauthheader || ''
        },
        body: JSON.stringify(req.body)
      });
  
      console.log('Backend response status:', backendResponse.status);
  
      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        console.error('Backend error response:', errorText);
        throw new Error(`Backend responded with status ${backendResponse.status}: ${errorText}`);
      }
  
      const data = await backendResponse.json();
      console.log('Backend response data:', data);
      
      return res.status(200).json(data);
    } catch (error) {
      console.error('Full error:', error);
      return res.status(500).json({ 
        message: 'Failed to create post',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }