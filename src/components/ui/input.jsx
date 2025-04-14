// src/components/ui/input.jsx
export const Input = ({ placeholder, value, onChange, className, ...props }) => {
    return (
      <input
        type="text"
        className={`border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  };
  