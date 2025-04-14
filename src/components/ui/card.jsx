export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl bg-white/10 h-full p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
