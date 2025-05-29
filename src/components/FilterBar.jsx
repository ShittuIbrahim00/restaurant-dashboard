import { motion } from "framer-motion";

export const legends = [
  { label: "Available", color: "bg-green-400" },
  { label: "Reserved", color: "bg-purple-500" },
  { label: "Running", color: "bg-orange-400" },
  { label: "Billed", color: "bg-blue-500" },
  { label: "Soon", color: "bg-yellow-300 text-black" },
];

export default function FilterBar() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-wrap items-center gap-4 px-6 py-4 bg-white shadow-sm rounded-md"
    >
      {legends.map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`${item.color} px-3 py-1 rounded-full text-sm font-semibold shadow-sm`}
        >
          {item.label}
        </motion.div>
      ))}
    </motion.div>
  );
}
