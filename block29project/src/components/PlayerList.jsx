import { useEffect, useState } from "react";  // <-- Add this import at the top
import { useNavigate } from "react-router-dom";

export default function PlayerList({ searchTerm }) {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          const res = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players");
          const data = await res.json();
          setPlayers(data.data.players);
        } catch (err) {
          console.error("Failed to fetch players", err);
        }
      };
  
      fetchPlayers();
    }, []);
  
    const createdPlayerIds = JSON.parse(localStorage.getItem("createdPlayerIds")) || [];
  
    const handleRemove = async (id) => {
      try {
        await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players/${id}`, {
          method: "DELETE",
        });
        setPlayers(players.filter((p) => p.id !== id));
        localStorage.setItem("createdPlayerIds", JSON.stringify(createdPlayerIds.filter(pid => pid !== id)));
      } catch (err) {
        console.error("Failed to delete player:", err);
      }
    };
  
    const filteredPlayers = players.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <h1>Puppy Bowl!</h1>
        <div className="container">
          {filteredPlayers.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.name}</h3>
              {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="card-image"/>}
              <button onClick={() => navigate(`/players/${p.id}`)} className="card-button">Learn More</button>
              {createdPlayerIds.includes(p.id) && (
                <button onClick={() => handleRemove(p.id)} className="remove">Remove</button>
              )}
            </div>
          ))}
          {filteredPlayers.length === 0 && <p>No players match your search.</p>}
        </div>
      </div>
    );
  }