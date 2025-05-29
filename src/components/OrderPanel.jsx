import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export default function OrderPanel({ selected, onClose }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const variants = {
    hidden: isMobile
      ? { y: "100%", opacity: 0 }
      : { x: 100, opacity: 0 },
    visible: isMobile
      ? { y: 0, opacity: 1 }
      : { x: 0, opacity: 1 },
    exit: isMobile
      ? { y: "100%", opacity: 0 }
      : { x: 100, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          key="order-panel"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed z-50 ${
            isMobile ? "inset-x-0 bottom-0" : "right-0 top-0 h-full"
          } w-full md:w-80 bg-white p-6 shadow-xl border-t md:border-l md:rounded-l-2xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Table Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Selected:</span>{" "}
              <span className="text-green-600 font-semibold">{selected}</span>
            </p>

            <button
              className="w-full px-4 py-2 rounded-full font-semibold transition-colors duration-300 bg-orange-500 text-white hover:bg-orange-600"
            >
              Place Order
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
