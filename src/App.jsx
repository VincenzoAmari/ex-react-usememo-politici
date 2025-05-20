import { useState, useEffect } from "react";

function App() {
  const [politici, setPolitici] = useState([]);
  const [ricerca, setRicerca] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((data) => setPolitici(data))
      .catch((error) => console.error(error));
  }, []);

  const filtroPolitici = politici.filter((politico) => {
    const nelNome = politico.name
      .toLowerCase()
      .includes(ricerca.toLocaleLowerCase());
    const nellaBiografia = politico.biography
      .toLowerCase()
      .includes(ricerca.toLocaleLowerCase());
    return nelNome || nellaBiografia;
  });

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
          <div className="card" key={politico.id}>
            <img src={politico.image} alt={politico.name} />
            <h2> {politico.name} </h2>
            <p>
              <strong>Posizione:</strong>
              {politico.position}
            </p>
            <p> {politico.biography} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
