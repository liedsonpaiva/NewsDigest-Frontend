import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Sources() {
  const [sources, setSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSources = async () => {
      setLoading(true);
      try {
        const res = await api.get("/news-sources");
        setSources(res.data.data); // pega do ApiResponse
      } catch (err) {
        setError(err?.response?.data?.message || "Erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  if (loading) return <p>Carregando fontes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="sources-container">
      <h2>Fontes de Notícias</h2>
      {sources.length === 0 ? (
        <p>Nenhuma fonte ativa encontrada.</p>
      ) : (
        <div className="sources-grid">
          {sources.map((source) => (
            <div
              key={source.id}
              className={`source-card ${
                selectedSources.includes(source.id) ? "selected" : ""
              }`}
              onClick={() =>
                setSelectedSources((prev) =>
                  prev.includes(source.id)
                    ? prev.filter((sid) => sid !== source.id)
                    : [...prev, source.id]
                )
              }
            >
              <img
                src={source.logoUrl}
                alt={source.name}
                className="source-logo"
              />
            </div>
          ))}
        </div>
      )}

      <div className="selected-sources">
        <strong>Selecionadas:</strong>{" "}
        {selectedSources.length > 0 ? (
          <span>
            {selectedSources
              .map(id => {
                const source = sources.find(s => s.id === id);
                return source ? source.name : id;
              })
              .join(", ")}
          </span>
        ) : (
          "Nenhuma"
        )}
      </div>
    </div>
  );
}
