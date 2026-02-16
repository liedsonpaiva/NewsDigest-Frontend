import { useEffect, useState } from "react";
import { subscriptionService } from "../services/subscriptionService";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [quantidadeNoticias, setQuantidadeNoticias] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await subscriptionService.getUserSubscriptions();
      setSubscriptions(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao buscar assinaturas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await subscriptionService.subscribe({
        newsSourceId: selectedSource,
        quantidadeNoticias,
      });

      setSuccess(res.data.message);
      setSelectedSource("");
      setQuantidadeNoticias(1);
      fetchSubscriptions();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar assinatura");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (newsSourceId) => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await subscriptionService.remove(newsSourceId);
      setSuccess(res.data.message);
      fetchSubscriptions();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao remover assinatura");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Minhas Assinaturas</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Fonte</label>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="1">Fonte 1</option>
            <option value="2">Fonte 2</option>
          </select>
        </div>

        <div>
          <label>Quantidade de Notícias</label>
          <input
            type="number"
            value={quantidadeNoticias}
            onChange={(e) => setQuantidadeNoticias(Number(e.target.value))}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Assinar"}
        </button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.newsSourceId}>
            {sub.newsSourceName} - {sub.quantidadeNoticias}
            <button onClick={() => handleDelete(sub.newsSourceId)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
