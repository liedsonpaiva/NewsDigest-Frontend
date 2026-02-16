export default function Card({ children }) {
  return (
    <div style={{
      backgroundColor: "#f9f9f9",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "1rem"
    }}>
      {children}
    </div>
  );
}
