import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    LabelList,
} from "recharts";

const data = [
    { day: "Mon", value: 14 },
    { day: "Tue", value: 13 },
    { day: "Wed", value: 20 },
    { day: "Thu", value: 13 },
    { day: "Fri", value: 15 },
    { day: "Sat", value: 17 },
    { day: "Sun", value: 13 },
];

const OrderOverview = () => {
    return (
        <div className="bg-white lg:w-[90%] p-5 rounded-2xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-md font-semibold text-gray-800">Orders Overview</h2>
                <span className="text-sm text-gray-400">This Week</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data} barSize={40}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#B0B0B0' }}
                    />
                    <YAxis hide domain={[0, 25]} />
                    <Tooltip
                        cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                            fontSize: '14px'
                        }}
                        labelStyle={{ fontWeight: 500, color: '#333' }}
                        itemStyle={{ color: '#f97316' }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#f97316">
                        <LabelList dataKey="value" position="top" fill="#f97316" fontSize={12} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
}

export default OrderOverview;