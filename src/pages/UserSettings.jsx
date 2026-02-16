import { useEffect, useState } from "react";
import { userService } from "../services/userService";

export default function UserSettings() {
  const [horarioAtual, setHorarioAtual] = useState("");
  const [novoHorario, setNovoHorario] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await userService.getById();
      const user = res.data.data;
      setHorarioAtual(user.horarioEnvio?.substring(0, 5));
      setNovoHorario(user.horarioEnvio?.substring(0, 5));
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao buscar usuário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await userService.updateHorario({ horarioEnvio: novoHorario });
      setSuccess(res.data.message);
      setHorarioAtual(novoHorario);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao atualizar horário");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    const confirm = window.confirm("Deseja realmente desativar a conta?");
    if (!confirm) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await userService.deactivate();
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao desativar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Configurações do Usuário</h2>

      <p><strong>Horário Atual:</strong> {horarioAtual}</p>

      <form onSubmit={handleUpdate}>
        <div>
          <label>Novo Horário</label>
          <input
            type="time"
            value={novoHorario}
            onChange={(e) => setNovoHorario(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Horário"}
        </button>
      </form>

      <hr />

      <button
        onClick={handleDeactivate}
        disabled={loading}
        style={{ backgroundColor: "red", color: "white" }}
      >
        {loading ? "Processando..." : "Desativar Conta"}
      </button>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
