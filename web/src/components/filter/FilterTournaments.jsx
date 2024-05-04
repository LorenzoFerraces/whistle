import { useContext, useEffect, useState } from 'react';
import FilterTournamentButton from './button/FilterTournamentsButton';
import SearchTournamentBox from './search/SearchTournamentBox';
import { AuthContext } from '../../api/AuthContext';

const FilterTournaments = ({ userId, setTournaments }) => {
  const [inputSport, setInputSport] = useState('');
  const [inputText, setInputText] = useState('');
  const { getUserTournamentsSearch, sports } = useContext(AuthContext);

  const handleSubmit = () => {
    getUserTournamentsSearch(userId, inputSport, inputText, setTournaments);
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSport]);

  return (
    <div className="search-box">
      <FilterTournamentButton
        sports={sports}
        inputSport={inputSport}
        setInputSport={setInputSport}
        handleSubmit={handleSubmit}
      />
      <SearchTournamentBox
        setInputText={setInputText}
        inputText={inputText}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default FilterTournaments;
