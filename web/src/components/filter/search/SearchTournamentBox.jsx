import { FaSearch } from 'react-icons/fa'
import './SearchTournamentBox.css';

const SearchTournamentBox = ({ inputText, setInputText, handleSubmit }) => {
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClick = () => {
    handleSubmit();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tournament..."
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleClick}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchTournamentBox;
