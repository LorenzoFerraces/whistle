import { FaSearch } from 'react-icons/fa';

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
    <div>
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
