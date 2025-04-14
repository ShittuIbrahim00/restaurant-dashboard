const OrderTypes = () => {
    const types = [
      { label: "Dine-In", value: 75, color: "#22C55E" }, // green
      { label: "Takeaway", value: 60, color: "#3B82F6" }, // blue
      { label: "Online", value: 65, color: "#FACC15" },   // yellow
    ];
  
    const total = types.reduce((acc, curr) => acc + curr.value, 0);
  
    // Calculate strokeDasharray for each type
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
  
    const chartSegments = types.map((type, idx) => {
      const percent = type.value / total;
      const dash = percent * circumference;
      const segment = (
        <circle
          key={idx}
          r={radius}
          cx="100"
          cy="100"
          fill="transparent"
          stroke={type.color}
          strokeWidth="16"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset={-offset}
          transform="rotate(-90 100 100)"
        />
      );
      offset += dash;
      return segment;
    });
  
    return (
      <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow">
        <h4 className="text-lg font-semibold text-gray-700 mb-6">
          Order Types
        </h4>
  
        <div className="flex justify-center items-center relative">
          {/* Donut Chart SVG */}
          <svg width="200" height="200" className="z-10">
            <circle
              r={radius}
              cx="100"
              cy="100"
              fill="transparent"
              stroke="#E5E7EB" // Tailwind gray-300
              strokeWidth="16"
            />
            {chartSegments}
          </svg>
  
          {/* Center Total */}
          <div className="absolute text-center font-merienda">
            <p className="text-xl font-bold text-gray-700">Total</p>
            <p className="text-2xl font-extrabold text-gray-900">{total}</p>
          </div>
  
          {/* Indicators */}
          <div className="absolute top-0 right-0 flex flex-col items-start bg-white rounded-lg p-2 shadow">
            {types.map((type, index) => (
              <div key={index} className="flex items-center mb-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: type.color }}
                ></div>
                <p className="ml-2 text-gray-600">
                  {type.label} ({Math.round((type.value / total) * 100)}%)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderTypes;
  