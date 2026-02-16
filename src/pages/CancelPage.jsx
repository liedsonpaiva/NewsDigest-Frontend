import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function CancelPage() {
  const { token } = useParams(); // pega token da URL
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cancelSubscription = async () => {
      try {
        const res = await axios.get(`/unsubscribe?token=${token}`);
        setMessage(res.data); // backend retorna a string
      } catch (err) {
        setError(err.response?.data || "Erro ao processar descadastro");
      } finally {
        setLoading(false);
      }
    };

    cancelSubscription();
  }, [token]);

  if (loading) return <p>Processando descadastro...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <h2>Cancelamento de Assinatura</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
