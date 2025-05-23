import React, { useState, useEffect, useMemo, memo } from "react";

const PoliticoCard = memo(function PoliticoCard({ politico }) {
  return (
    <div className="card" key={politico.id}>
      <img src={politico.image} alt={politico.name} />
      <h2>{politico.name}</h2>
      <p>
        <strong>Posizione:</strong> {politico.position}
      </p>
      <p>{politico.biography}</p>
    </div>
  );
});

function App() {
  const [politici, setPolitici] = useState([]);
  const [ricerca, setRicerca] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((data) => setPolitici(data))
      .catch((error) => console.error(error));
  }, []);

  const filtroPolitici = useMemo(() => {
    return politici.filter((politico) => {
      const nelNome = politico.name
        .toLowerCase()
        .includes(ricerca.toLocaleLowerCase());
      const nellaBiografia = politico.biography
        .toLowerCase()
        .includes(ricerca.toLocaleLowerCase());
      return nelNome || nellaBiografia;
    });
  }, [politici, ricerca]);

  return (
    <div>
      <h1>lista politici</h1>
      <input
        type="text"
        placeholder="cerca per nome o biografia"
        value={ricerca}
        onChange={(e) => setRicerca(e.target.value)}
      />
      <div className="listaPolitici">
        {filtroPolitici.map((politico) => (
          <PoliticoCard key={politico.id} politico={politico} />
        ))}
      </div>
    </div>
  );
}

export default App;
