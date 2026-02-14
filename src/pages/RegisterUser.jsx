import { useState } from "react";
import { userService } from "../services/userService";

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [horarioEnvio, setHorarioEnvio] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await userService.register({ email, horarioEnvio });

      // Backend agora retorna ApiResponse
      setSuccess(res.data.message);
      setEmail("");
      setHorarioEnvio("");
    } catch (err) {
      // Pega a mensagem do ApiResponse ou fallback
      setError(err.response?.data?.message || "Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Horário de Envio</label>
          <input
            type="time"
            value={horarioEnvio}
            onChange={(e) => setHorarioEnvio(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
