const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api', async (req, res) => {
  const userQuery = req.query.query; 

  const options = {
    method: 'GET',
    url: `https://porn-videos.p.rapidapi.com/video/${encodeURIComponent(userQuery)}`,
    headers: {
      'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
      'X-RapidAPI-Host': 'porn-videos.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    
    const videoURLs = response.data.map(video => video.videoUrl);

    
    const apiResponse = {
      apiOwner: 'kshitiz au',
      videos: videoURLs
    };

    
    res.json(apiResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
