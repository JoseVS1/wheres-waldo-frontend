import { useFloating, offset, flip, shift } from "@floating-ui/react";
import { useEffect } from "react";

export const Dropdown = ({coordinates, characters, setCharacters, showNotification, setMarkerVisible, setFound}) => {
  const virtualReference = {
    getBoundingClientRect() {
      const clientX = coordinates.x - window.pageXOffset;
      const clientY = coordinates.y - window.pageYOffset;

      return {
        x: clientX - 35,
        y: clientY + 65,
        top: clientY + 65,
        left: clientX - 35,
        right: clientX - 35,
        bottom: clientY + 65,
        width: 50,
        height: 50,
      };
    },
  };
  
  const { x, y, strategy, refs } = useFloating({
    placement: "right",
    middleware: [
      offset(40),
      flip(),
      shift({ padding: 10 })
    ],
    elements: { reference: virtualReference }
  });

  useEffect(() => {

  }, [coordinates]);
  
  const handleClick = async (id) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/characters/${id}/checkPosition?x=${coordinates.relativeX}&y=${coordinates.relativeY}`);
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
    <div ref={refs.setFloating} className="dropdown" style={{
        position: strategy,
        left: x != null ? x : 0,
        top: y != null ? y : 0
    }}>
  
      {characters.map(char => (
        <div key={char.id} className="dropdown-character" onClick={() => handleClick(char.id)}>
          <img src={`/${char.name.toLowerCase()}.png`} alt={char.name} />
          <h3>{char.name}</h3>
        </div>
      ))}
    </div>
  )
}


