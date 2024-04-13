import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../api/AuthContext';

const CreateForm = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const { setError } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tournamentName || !sport || !description || !selectedDate) {
      setError('Please fill out all fields.');
      return;
    }
    if (teams.length < 2){
      setError('Please add at least 2 teams.');
      return;
    }
    // Crear el torneo
    navigate('/'); 
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    if (selectedDate < today) {
      setError('Please select a date equal to or after today.');
    } else {
      setSelectedDate(selectedDate);
    }
  };

  const addTeam = () => {
    if (teamName.trim() === '') return;
    if (teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase())) {
      setError('Team name already exists.');
      return;
    }
    setTeams([...teams, { name: teamName }]);
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
            <input
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            />
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
      </div>
    </div>
  );
};

export default CreateForm;
