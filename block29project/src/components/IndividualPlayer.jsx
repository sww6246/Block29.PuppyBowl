import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function IndividualPlayer() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate(); // 👈 For going back

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players/${id}`);
        const data = await res.json();
        setPlayer(data.data.player);
      } catch (err) {
        console.error("Failed to fetch player:", err);
      }
    };

    fetchPlayer();
  }, [id]);

  if (!player) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2 className="card-header">{player.name}</h2>
      <p className="card-p"><strong>Breed:</strong> {player.breed}</p>
      <p className="card-p"><strong>Status:</strong> {player.status}</p>
      {player.imageUrl && <img src={player.imageUrl} alt={player.name} />}
      <br />
      <button onClick={() => navigate("/")}>Back to List</button> {/* 👈 Back button */}
    </div>
  );
}