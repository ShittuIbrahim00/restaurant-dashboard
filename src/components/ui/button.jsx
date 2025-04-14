export function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-xl transition-all shadow-md ${className}`}
    >
      {children}
    </button>
  );
}
