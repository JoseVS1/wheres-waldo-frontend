import { useEffect, useState } from "react";

export const SuccessScreen = ({finalTime}) => {
  const [name, setName] = useState("");
  const [currentHighscore, setCurrentHighscore] = useState({});
  const [highscoreRegistered, setHighscoreRegistered] = useState(false);
  const userFinalTime = `${Math.floor(finalTime / 360000)}:${(Math.floor((finalTime % 360000) / 6000)).toString().padStart(2, "0")}:${(Math.floor((finalTime % 6000) / 100)).toString().padStart(2, "0")}:${(finalTime % 100).toString().padStart(2, "0")}`;
  let currentHighscoreTime;

  if (currentHighscore) {
    currentHighscoreTime = `${Math.floor(currentHighscore.time / 360000)}:${(Math.floor((currentHighscore.time % 360000) / 6000)).toString().padStart(2, "0")}:${(Math.floor((currentHighscore.time % 6000) / 100)).toString().padStart(2, "0")}:${(currentHighscore.time % 100).toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    const fetchCurrentHighscore = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.69:3000";
        const response = await fetch(`${baseUrl}/api/highscore`);
        const data = await response.json();
        
        const highscore = data.highscore[0];

        setCurrentHighscore(highscore);
      } catch (err) {
        console.error(err);
      }
    }
    
    fetchCurrentHighscore();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.69:3000";
      const deleteResponse = await fetch(`${baseUrl}/api/highscore`, {
        method: "DELETE"
      });
    
      const deleteData = await deleteResponse.json();
      
      const response = await fetch(`${baseUrl}/api/highscore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          time: finalTime
        })
      });
  
      const data = await response.json();

      if (response.ok) {
        setHighscoreRegistered(true);
        setCurrentHighscore(data.highscore);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="success">
        <h1>Congratulations</h1>
        <h2>You found all characters!</h2>
        <h2>Final time: {userFinalTime}</h2>

        <h3>Current record:</h3>
        {currentHighscore ? (
          <h3 className="current-record">{currentHighscore.name}: {currentHighscoreTime}</h3>
        ) : (
          <h3>None</h3>
        )}
        
        {currentHighscore && !highscoreRegistered && finalTime < currentHighscore.time || !highscoreRegistered && !currentHighscore ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name: </label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
      
            <button type="submit">Submit</button>
          </form>
        ) : finalTime > currentHighscore.time ? (
          <button className="try-again-btn" onClick={() => window.location.reload()}>Try again</button>
        ) : (
          <h2 className="registeredHeading">Highscore registered</h2>
        )}
      
    </div>
  )
}
