const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api', async (req, res) => {
  try {
   
    const userQuery = req.query.query;

    
    const options = {
      method: 'GET',
      url: 'https://porn-videos.p.rapidapi.com/video/' + encodeURIComponent(userQuery),
      headers: {
        'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
        'X-RapidAPI-Host': 'porn-videos.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    
    if (Array.isArray(response.data) && response.data.length > 0) {
      
      const videoCategories = {};

      response.data.forEach((video, index) => {
        const category = `video${index + 1}`;
        if (!videoCategories[category]) {
          videoCategories[category] = [];
        }
        videoCategories[category].push(video.videoUrl);
      });

     
      const apiResponse = `${apiOwner}; ${userQuery} ${JSON.stringify(videoCategories)}`;

     
      res.send(apiResponse);
    } else {
      console.error('Unexpected API response structure:', response.data);
      res.status(500).json({ error: 'Internal Server Error - Unexpected API response structure' });
    }
  } catch (error) {
    console.error('Error making API request:', error);
    res.status(500).json({ error: 'Internal Server Error - Error making API request' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const apiOwner = 'ApiOwner:- kshitiz au';
