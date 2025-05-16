import { motion } from 'framer-motion';
import clsx from 'clsx';

const statusColors = {
  available: 'bg-green-400',
  reserved: 'bg-purple-500',
  running: 'bg-orange-400',
  billed: 'bg-blue-500',
  soon: 'bg-yellow-300',
};

export default function TableCard({ id, status, onSelect, selected }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={clsx(
        "w-24 h-24 rounded-lg flex items-center justify-center cursor-pointer text-white font-bold transition",
        statusColors[status],
        selected && "ring-4 ring-white"
      )}
      onClick={() => onSelect(id)}
    >
      {id}
    </motion.div>
  );
}