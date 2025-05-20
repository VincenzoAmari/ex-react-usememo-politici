import { useState, useEffect } from "react";

function App() {
  const [politici, setPolitici] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((data) => setPolitici(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(politici);

  return (
    <div>
      <h1>lista politici</h1>
      <div className="listaPolitici">
        {politici.map((politico) => (
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
