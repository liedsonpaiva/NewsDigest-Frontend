import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [horario, setHorario] = useState("");
  const [sources, setSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados para mensagens de cadastro
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSources = async () => {
      setLoading(true);
      try {
        const res = await api.get("/news-sources");
        setSources(res.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    // Validações manuais
    if (!email.trim()) {
      setErrorMsg("Por favor, preencha o email.");
      return;
    }
    // Regex simples para validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Por favor, insira um email válido.");
      return;
    }
    if (!horario) {
      setErrorMsg("Por favor, escolha um horário.");
      return;
    }
    if (Object.keys(selectedSources).length === 0) {
      setErrorMsg("Selecione ao menos uma fonte.");
      return;
    }

    const subscriptions = Object.entries(selectedSources).map(([id, quantidade]) => ({
      newsSourceId: Number(id),
      quantidadeNoticias: Number(quantidade),
    }));

    try {
      await api.post("/users/full", {
        email,
        horarioEnvio: horario,
        subscriptions,
      });

      setSuccessMsg("Cadastro realizado com sucesso!");
      setEmail("");
      setHorario("");
      setSelectedSources({});
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Erro ao cadastrar usuário. Usuário já cadastrado.";
      setErrorMsg(msg);
    }
  };

  if (loading) return <p>Carregando fontes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="sources-container">
      <h2>Cadastro</h2>

      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required removido para validação manual
          />
        </div>

        {/* HORÁRIO */}
        <div>
          <label>Horário de envio</label>
          <input
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            // required removido para validação manual
          />
        </div>

        <h3>Escolha as fontes</h3>
        <div className="sources-grid">
          {sources.map((source) => (
            <div
              key={source.id}
              className={`source-card ${selectedSources[source.id] ? "selected" : ""}`}
              onClick={() =>
                setSelectedSources((prev) => {
                  const newObj = { ...prev };
                  if (newObj[source.id]) delete newObj[source.id];
                  else newObj[source.id] = 1;
                  return newObj;
                })
              }
            >
              <img src={source.logoUrl} alt={source.name} className="source-logo" />

              {selectedSources[source.id] && (
                <div className="quantity-box" onClick={(e) => e.stopPropagation()}>
                  Quantidade:
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selectedSources[source.id]}
                    onChange={(e) =>
                      setSelectedSources((prev) => ({
                        ...prev,
                        [source.id]: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button type="submit">Cadastrar</button>

        {/* Mensagens de sucesso ou erro */}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </form>
    </div>
  );
}