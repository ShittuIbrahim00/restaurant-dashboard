import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [schedules, setSchedules] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ day: "", text: "" });

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const isFutureOrToday = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    return selected >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleAddSchedule = () => {
    const key = `${currentYear}-${currentMonth + 1}-${formData.day}`;
    if (!formData.day || !formData.text || !isFutureOrToday(formData.day)) return;

    setSchedules((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), formData.text],
    }));

    setFormData({ day: "", text: "" });
    setShowForm(false);
  };

  const changeMonth = (offset) => {
    const newMonth = currentMonth + offset;
    const newDate = new Date(currentYear, newMonth);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const canScheduleInCurrentMonth =
    currentYear > today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth >= today.getMonth());

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => changeMonth(-1)}>&larr;</button>
          <h2 className="text-2xl font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={() => changeMonth(1)}>&rarr;</button>
        </div>
        {canScheduleInCurrentMonth && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded"
          >
            + Add Schedule
          </button>
        )}
      </header>

      {/* Calendar Grid */}
      <section className="grid grid-cols-7 gap-4 bg-white p-6 rounded shadow">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-gray-700 font-medium">
            {day}
          </div>
        ))}

        {/* Blank spaces before 1st day of month */}
        {Array(firstDayOfWeek)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

        {/* Actual Days */}
        {Array(totalDays)
          .fill(null)
          .map((_, index) => {
            const day = index + 1;
            const key = `${currentYear}-${currentMonth + 1}-${day}`;
            return (
              <div
                key={key}
                className={`p-2 border rounded min-h-[60px] text-center ${
                  isFutureOrToday(day)
                    ? "bg-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <div className="font-semibold">{day}</div>
                <div className="text-sm text-left">
                  {schedules[key]?.map((item, i) => (
                    <div key={i} className="text-blue-600 truncate">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </section>

      {/* Schedule Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="text-lg font-bold mb-4">Add Schedule</h3>
            <input
              type="number"
              min="1"
              max={totalDays}
              value={formData.day}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
              placeholder={`Day (1-${totalDays})`}
              className="w-full mb-3 border p-2 rounded"
            />
            <input
              type="text"
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              placeholder="Schedule text"
              className="w-full mb-3 border p-2 rounded"
            />
            {!isFutureOrToday(formData.day) && formData.day && (
              <p className="text-red-500 text-sm mb-2">
                Cannot schedule in the past.
              </p>
            )}
            <div className="flex justify-between">
              <button
                onClick={handleAddSchedule}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-600 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
