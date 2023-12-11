import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './BasetballTeamFinder.css'

interface ITeam {
  id: number;
  name: string;
  country: string;
  logo: string | null;
  venue: string;
  founded: number;
}

const BasketballTeamFinder = () => {
  const [team, setTeam] = useState<ITeam>({
    id: 0,
    name: '',
    country: '',
    logo: '',
    venue: '',
    founded: 0,
  });
  const [teamName, setTeamName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const fetchTeam = async () => {
    try {
      const response = await axios.get('https://api-basketball.p.rapidapi.com/teams', {
        params: {
          league: '12',
          season: '2019-2020',
        },
        headers: {
          'X-RapidAPI-Key': '1851a2b719msh9472d1897640ac4p1f4735jsn52b98592e5d9',
          'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
        },
      });

      if (response) {
        console.log(response);
        const foundTeam = response.data.response.find(
          (team: any) => team.name.toLowerCase() === teamName.toLowerCase()
        );

        if (foundTeam) {
          setTeam({
            id: foundTeam.id,
            name: foundTeam.name,
            country: foundTeam.country.name,
            logo: foundTeam.logo,
            venue: foundTeam.venue,
            founded: foundTeam.founded,
          });
        } else {
          setTeam({
            id: 0,
            name: 'Team not found',
            country: '',
            logo: '',
            venue: '',
            founded: 0,
          });
        }
      }
    }  catch (error) {
      if (error.response && error.response.status === 403) {
        // Handle 403 error: Display an appropriate message to the user
        console.error('Access Forbidden. Please check your permissions.');
     
      } else {
        console.error('Error fetching team:', error);
       
      }
  
   
      setTeam({
        id: 0,
        name: 'Team not found',
        country: '',
        logo: '',
        venue: '',
        founded: 0,
      });
    }
  };

  const handleButtonClick = () => {
    if (teamName.trim() !== '') {
      fetchTeam();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api-basketball.p.rapidapi.com/teams?league=12&season=2019-2020';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1851a2b719msh9472d1897640ac4p1f4735jsn52b98592e5d9',
          'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div  className='container text-center'>
      <img
        src="https://cdn.freebiesupply.com/logos/large/2x/espn-nba-logo-png-transparent.png"
        alt="ESPN NBA Logo"
        className="logo-img"
      />
      <h1 className='text-center'>Search for a Basketball Team</h1>
      <div className='w-25 mx-auto'>
        <input type='text' onChange={handleInputChange} placeholder='Enter a team name' />
        <button className="btn" onClick={handleButtonClick}>Search</button>
      </div>

      {team.name && (
        <div className='card' style={{ width: '18rem' }}>
           
          {team.logo && <img src={team.logo} className='card-img-top' alt={team.name} />}
          {team.logo && <img src={team.logo} className='card-img-top' alt={team.name} />}
          <div className='card-body'>
            <h5 className='card-title'>{team.name}</h5>
            <p>Country: {team.country}</p>
            <p>Venue: {team.venue}</p>
            <p>Founded: {team.founded}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketballTeamFinder;
