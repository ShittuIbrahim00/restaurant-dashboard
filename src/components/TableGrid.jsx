import { useState } from 'react';
import { motion } from 'framer-motion';
import { tableData } from '../data/tables';

export default function TableGrid() {
  const [selectedTable, setSelectedTable] = useState(null);

  const statusColors = {
    available: 'bg-green-400',
    reserved: 'bg-purple-500',
    running: 'bg-orange-400',
    billed: 'bg-blue-500',
    soon: 'bg-yellow-300 text-black',
  };

  const renderTable = (table) => {
    const isSelected = selectedTable === table.id;

    return (
      <motion.div
        key={table.id}
        onClick={() => setSelectedTable(table.id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex items-center justify-center mx-2"
      >
        {/* Chair layout (top/bottom/left/right) */}
        <div className="absolute -top-2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
          ))}
        </div>
        <div className="absolute -bottom-2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
          ))}
        </div>
        <div className="absolute -left-2 flex flex-col gap-1">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
          ))}
        </div>
        <div className="absolute -right-2 flex flex-col gap-1">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
          ))}
        </div>

        <motion.div
          layoutId={`table-${table.id}`}
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl shadow-md border-2 text-white font-semibold cursor-pointer transition-all duration-300 ${
            isSelected ? 'border-black scale-105' : 'border-transparent'
          } ${statusColors[table.status] || 'bg-gray-300'}`}
        >
          <span className="text-sm">T-{table.id.toString().padStart(2, '0')}</span>
          <span className="text-xs">{table.status}</span>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Regular Tables</h2>
        <div className="overflow-x-auto whitespace-nowrap py-4 px-2 rounded-lg bg-white shadow-inner">
          {tableData
            .filter((t) => t.section === 'regular')
            .map((table) => renderTable(table))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Executive Tables</h2>
        <div className="overflow-x-auto whitespace-nowrap py-4 px-2 rounded-lg bg-white shadow-inner">
          {tableData
            .filter((t) => t.section === 'executive')
            .map((table) => renderTable(table))}
        </div>
      </div>
    </div>
  );
}
