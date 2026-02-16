export default function Button({ children, onClick, color="blue" }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontWeight: "bold",
        marginTop: "0.5rem"
      }}
    >
      {children}
    </button>
  );
}
