import { useState } from "react";

export default function CreatePlayer() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [createdPlayers, setCreatedPlayers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name,
      breed,
      imageUrl,
      status: "bench",
      teamId: null,
    };

    try {
      const res = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlayer),
      });

      const data = await res.json();
      const created = data.data.newPlayer;

      // Store created player ID in localStorage
      const createdIds = JSON.parse(localStorage.getItem("createdPlayerIds")) || [];
      localStorage.setItem("createdPlayerIds", JSON.stringify([...createdIds, created.id]));

      setCreatedPlayers([...createdPlayers, created]);

      // Reset form
      setName("");
      setBreed("");
      setImageUrl("");
    } catch (err) {
      console.error("Failed to create player:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players/${id}`, {
        method: "DELETE",
      });

      setCreatedPlayers(createdPlayers.filter((p) => p.id !== id));

      // Update localStorage
      const createdIds = JSON.parse(localStorage.getItem("createdPlayerIds")) || [];
      localStorage.setItem("createdPlayerIds", JSON.stringify(createdIds.filter((pid) => pid !== id)));
    } catch (err) {
      console.error("Failed to delete player:", err);
    }
  };

  return (
    <>
      <h2>Create a New Puppy Player</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Create Player</button>
      </form>

      <h3 className="create">Created Players</h3>
      <div>
        {createdPlayers.map((p) => (
          <div key={p.id} className="card">
            <h4>{p.name}</h4>
            <p>{p.breed}</p>
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}
            <button onClick={() => handleRemove(p.id)} className="remove">Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}