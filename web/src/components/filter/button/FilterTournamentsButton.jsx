const FilterTournamentButton = ({
  sports,
  inputSport,
  setInputSport,
  handleSubmit,
}) => {
  const handleChange = (e) => {
    setInputSport(e.target.value);
    handleSubmit();
  };

  return (
    <select value={inputSport} onChange={handleChange}>
      <option value="">All Sports</option>
      {sports.map((sport, index) => (
        <option key={index} value={sport}>
          {sport}
        </option>
      ))}
    </select>
  );
};

export default FilterTournamentButton;
