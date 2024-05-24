import { useState, useContext } from 'react';
import { AuthContext } from '../../api/AuthContext';
import { Navigate } from 'react-router-dom';
import './Form.css';

const CreateForm = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [sport, setSport] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamsNames, setTeamsNames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [imageURL, setimageURL] = useState('');
  const { setError, postTornament, sports, locations } =
    useContext(AuthContext);
  const [tournament, setTournament] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !tournamentName ||
      !sport ||
      !description ||
      !selectedDate ||
      !location
    ) {
      setError('Please fill out all fields.');
      return;
    }
    if (teams.length < 2) {
      setError('Please add at least 2 teams.');
      return;
    }

    postTornament(
      tournamentName,
      description,
      selectedDate,
      teamsNames,
      sport,
      imageURL,
      location,
      setTournament,
      setSuccess,
    );
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setError('Please select a date equal to or after today.');
    } else {
      setSelectedDate(selectedDate);
    }
  };

  const handleImageUrlChange = (e) => {
    checkIfImageExists(e.target.value, (isValidUrl) => {
      if (isValidUrl) {
        setimageURL(e.target.value);
      } else {
        setError('The image url is invalid, choose another one');
      }
    });
  };

  function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      img.onerror = () => {
        callback(false);
      };
    }
  }

  const addTeam = () => {
    if (teamName.trim() === '') return;
    if (
      teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase())
    ) {
      setError('Team name already exists.');
      return;
    }
    setTeams([...teams, { name: teamName }]);
    setTeamsNames([...teamsNames, teamName]);
    setTeamName('');
  };

  return (
    <div className="simple-form">
      <div className="element">
        <h3>CREATE A TOURNAMENT</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <div>NAME</div>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
            />
          </div>
          <div>
            <div>SPORT</div>
            <select value={sport} onChange={(e) => setSport(e.target.value)}>
              <option value="">Select Sport</option>
              {sports.map((sportOption, index) => (
                <option key={index} value={sportOption}>
                  {sportOption.charAt(0).toUpperCase() + sportOption.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>DESCRIPTION</div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <div>DATE</div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <div>PROVINCE</div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Province</option>
              {locations.map((locationOption, index) => (
                <option key={index} value={locationOption}>
                  {locationOption.charAt(0).toUpperCase() +
                    locationOption.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>IMAGEN URL</div>
            <input
              type="text"
              value={imageURL}
              onChange={handleImageUrlChange}
            />
          </div>
          <div>
            <div>TEAMS</div>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <button type="button" onClick={addTeam}>
              Add Team
            </button>
            <ul>
              {teams.map((team, index) => (
                <li key={index}>{team.name}</li>
              ))}
            </ul>
          </div>
          <button type="submit">Create</button>
        </form>
        {success && tournament ? (
          <Navigate to={`/tournament/${tournament.id}`} />
        ) : null}
      </div>
    </div>
  );
};

export default CreateForm;
