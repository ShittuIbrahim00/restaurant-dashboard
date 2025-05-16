import { useState } from "react";
import TableGrid from "../components/TableGrid";
import FilterBar from "../components/FilterBar";
import OrderPanel from "../components/OrderPanel";

export default function Services() {
  const [selectedTable, setSelectedTable] = useState(null);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-7xl mx-auto">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <FilterBar />
            <TableGrid onSelect={setSelectedTable} selected={selectedTable} />
          </div>
          <OrderPanel selected={selectedTable} />
        </div>
      </div>
  );
}

