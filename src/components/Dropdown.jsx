export const Dropdown = ({coordinates, characters, setCharacters, showNotification, setMarkerVisible, setFound}) => {

  const handleClick = async (id) => {
    const baseUrl = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/characters/${id}/checkPosition?x=${coordinates.x}&y=${coordinates.y}`);
    const data = await response.json();

    const charResponse = await fetch(`${baseUrl}/api/characters/${id}`);
    const charData = await charResponse.json();

    if (data.found) {
      showNotification(data.message, 1500, false);
      setFound(prevFound => [...prevFound, charData]);
      setMarkerVisible(prevMarkerVisible => (
        {
          ...prevMarkerVisible,
          [id]: {
            visible: true
          }
        }
      ));
      setCharacters(prevCharacters => prevCharacters.filter(char => char.id !== id));
    } else {
      showNotification(data.message, 1500, true);
    }
  }
  return (
    <div className="dropdown" style={{
        left: coordinates.x + 55 + "px",
        top: coordinates.y + "px"
    }}>

      {characters.map(char => (
        <div key={char.id} className="dropdown-character" onClick={() => handleClick(char.id)}>
          <img src={`./src/assets/images/characters/${char.name.toLowerCase()}.png`} alt={char.name} />
          <h3>{char.name}</h3>
        </div>
      ))}
    </div>
  )
}
