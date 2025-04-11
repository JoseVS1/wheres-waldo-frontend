import { useEffect, useRef, useState } from "react";
import { Dropdown } from "./components/Dropdown";
import { Circle } from "./components/Circle";
import { NotificationBox } from "./components/NotificationBox";
import useNotification from "./hooks/useNotification";
import { SuccessScreen } from "./components/SuccessScreen";
import { Marker } from "./components/Marker";
import { Navbar } from "./components/Navbar";
import Confetti from "react-confetti";

const App = () => {
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    relativeX: 0,
    relativeY: 0
  });
  const imgRef = useRef(null);
  const [currentDimensions, setCurrentDimensions] = useState({
    currentWidth: 0,
    currentHeight: 0
  });
  const [characters, setCharacters] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { visible, text, error, showNotification } = useNotification();
  const [gameCompleted, setGameCompleted] = useState(false);
  const [markerVisible, setMarkerVisible] = useState({});
  const [found, setFound] = useState([]);
  const [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [stopwatchIsRunning, setStopwatchIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      captureDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/characters`);
        const data = await response.json();

        setCharacters(data.characters);
        const visibility = data.characters.reduce((acc, character) => {
          acc[character.id] = { visible: false };
          return acc;
        }, {});
        setMarkerVisible(visibility);
        setStopwatchIsRunning(true)
      } catch (err) {
        console.error(err);
      }
    }

    fetchCharacters();
  }, []);

  useEffect(() => {
    let timeout;

    if (characters && characters.length === 0) {
      setShowConfetti(true);
      setStopwatchIsRunning(false);
      setFinalTime(time);
      setGameCompleted(true);
      timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 10000);

    }

    return () => {
      clearTimeout(timeout);
    }
  }, [characters, time]);

  const captureDimensions = () => {
    if (imgRef.current) {
      setCurrentDimensions({
        currentWidth: imgRef.current.offsetWidth,
        currentHeight: imgRef.current.offsetHeight
      });
    }
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const xPercent = x / width;
    const yPercent = y / height;
    
    setCoordinates({x, y, relativeX: xPercent, relativeY: yPercent});
    setShowDropdown(!showDropdown)
  }
  return (
    <>
      {showConfetti && <Confetti />}
      <Navbar stopwatchIsRunning={stopwatchIsRunning} time={time} setTime={setTime} />

      {found && found.map(char => (
        <Marker key={char.id} currentDimensions={currentDimensions} coordinates={{x: char.x, y: char.y}} isVisible={markerVisible[char.id]} id={char.id} />
      ))}

      <NotificationBox visible={visible} text={text} error={error} />

      {gameCompleted && <SuccessScreen finalTime={finalTime} />} 

      <img ref={imgRef} className={`map ${gameCompleted ? "unclickable" : ""}`} onLoad={captureDimensions} onClick={handleClick} src="/map1.jpg" alt="map 1" />

      {showDropdown && (
        <>
          <Dropdown coordinates={coordinates} characters={characters} setCharacters={setCharacters} showNotification={showNotification} setMarkerVisible={setMarkerVisible} setFound={setFound} />
          <Circle coordinates={coordinates} setShowDropdown={setShowDropdown} />
        </>
      )}
    </>
  )
}

export default App
