import { useEffect, useState } from "react";
import axios from "axios";

export default function Sources() {
  const [sources, setSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSources = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/news-sources"); // seu endpoint
        // Filtra apenas fontes ativas
        const activeSources = res.data.filter((s) => s.active);
        setSources(activeSources);
      } catch (err) {
        const message = err?.response?.data?.message || "Erro inesperado";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedSources((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
    );
  };

  if (loading) return <p>Carregando fontes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Fontes de Notícias</h2>

      {sources.length === 0 ? (
        <p>Nenhuma fonte ativa encontrada.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sources.map((source) => (
            <li key={source.id} style={{ marginBottom: 8 }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source.id)}
                  onChange={() => handleCheckboxChange(source.id)}
                />
                {" "}{source.name}
              </label>
            </li>
          ))}
        </ul>
      )}

      <div>
        <strong>Selecionadas:</strong>{" "}
        {selectedSources.length > 0
          ? selectedSources.join(", ")
          : "Nenhuma"}
      </div>
    </div>
  );
}
