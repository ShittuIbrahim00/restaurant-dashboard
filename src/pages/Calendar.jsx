import { useState } from "react";
import { motion } from "framer-motion";  // For animations

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const themes = ["bg-blue-100", "bg-orange-100", "bg-green-100", "bg-purple-100"];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [schedules, setSchedules] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ day: "", text: "", recurring: false });
  const [currentTheme, setCurrentTheme] = useState(themes[0]); // Default theme

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const isFutureOrToday = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    return selected >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleAddSchedule = () => {
    const key = `${currentYear}-${currentMonth + 1}-${formData.day}`;
    if (!formData.day || !formData.text || !isFutureOrToday(formData.day)) return;

    const newSchedules = { ...schedules };

    // Add schedule to selected day
    newSchedules[key] = [...(newSchedules[key] || []), formData.text];

    // If recurring, add the schedule to subsequent days of the month
    if (formData.recurring) {
      for (let i = parseInt(formData.day) + 7; i <= getDaysInMonth(currentYear, currentMonth); i += 7) {
        const recurringKey = `${currentYear}-${currentMonth + 1}-${i}`;
        newSchedules[recurringKey] = [...(newSchedules[recurringKey] || []), formData.text];
      }
    }

    setSchedules(newSchedules);
    setFormData({ day: "", text: "", recurring: false });
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
    <main className="p-4 sm:p-6 w-full max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => changeMonth(-1)}>&larr;</button>
          <h2 className="text-xl sm:text-2xl font-bold">
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
            className={`bg-orange-500 text-white py-2 px-4 rounded text-sm sm:text-base`}
          >
            + Add Schedule
          </button>
        )}
      </header>

      {/* Color Theme Selector */}
      <div className="mb-4 flex gap-2">
        {themes.map((theme, idx) => (
          <button
            key={idx}
            className={`p-2 rounded ${theme} ${currentTheme === theme ? "border-2 border-gray-800" : ""}`}
            onClick={() => setCurrentTheme(theme)}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <motion.section
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4 bg-white p-4 sm:p-6 rounded shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {DAYS.map((day) => (
          <div key={day} className="text-center text-gray-700 font-medium text-xs sm:text-sm">
            {day}
          </div>
        ))}

        {Array(firstDayOfWeek)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

        {Array(totalDays)
          .fill(null)
          .map((_, index) => {
            const day = index + 1;
            const key = `${currentYear}-${currentMonth + 1}-${day}`;
            return (
              <motion.div
                key={key}
                className={`p-2 border rounded min-h-[60px] text-center flex flex-col text-xs sm:text-sm ${
                  isFutureOrToday(day)
                    ? "bg-white"
                    : "bg-gray-100 text-gray-400"
                } ${currentTheme}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="font-semibold">{day}</div>
                <div className="text-xs sm:text-sm">{DAYS[new Date(currentYear, currentMonth, day).getDay()]}</div>
                <div className="text-left mt-1 overflow-hidden">
                  {schedules[key]?.map((item, i) => (
                    <div key={i} className="text-blue-600 truncate">
                      • {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
      </motion.section>

      {/* Schedule Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 px-4">
          <motion.div
            className="bg-white p-4 sm:p-6 rounded shadow w-full max-w-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
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
              className="w-full mb-3 border p-2 rounded text-sm"
            />
            <input
              type="text"
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              placeholder="Schedule text"
              className="w-full mb-3 border p-2 rounded text-sm"
            />
            <label className="inline-flex items-center text-sm">
              <input
                type="checkbox"
                checked={formData.recurring}
                onChange={(e) =>
                  setFormData({ ...formData, recurring: e.target.checked })
                }
                className="mr-2"
              />
              Recurring Event (every week)
            </label>
            {!isFutureOrToday(formData.day) && formData.day && (
              <p className="text-red-500 text-sm mb-2">
                Cannot schedule in the past.
              </p>
            )}
            <div className="flex justify-between">
              <button
                onClick={handleAddSchedule}
                className="bg-green-500 text-white px-4 py-2 rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-600 px-4 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
