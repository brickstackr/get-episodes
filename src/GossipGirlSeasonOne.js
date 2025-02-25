import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Replace with your OMDb API Key
const API_KEY = '2d76fe51';

// Function to fetch episodes for Gossip Girl Season 1
const getSeasonOneEpisodes = async () => {
  const seriesTitle = 'Gossip Girl';
  const season = 1;  // We are only interested in Season 1

  try {
    const response = await axios.get(`http://www.omdbapi.com/?t=${seriesTitle}&season=${season}&apikey=${API_KEY}`);
    if (response.data && response.data.Episodes) {
      return response.data.Episodes;
    } else {
      throw new Error('No episodes found');
    }
  } catch (error) {
    console.error('Error fetching Season 1 episodes:', error);
    return [];
  }
};

const GossipGirlSeasonOne = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const seasonOneEpisodes = await getSeasonOneEpisodes();
        setEpisodes(seasonOneEpisodes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch episodes');
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return <div>Loading episodes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {/* Header Card */}
      <div className="header-card">
        <h1>Gossip Girl - Season 1</h1>
      </div>
      
      {/* Episode List */}
      <div className="episode-list">
        {episodes.map((episode, index) => (
          <div key={index} className="episode-card">
            <h3>{episode.Title} (Season 1, Episode {episode.Episode})</h3>
            <p>{episode.Aired}</p>
            <p>{episode.Plot}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GossipGirlSeasonOne;
