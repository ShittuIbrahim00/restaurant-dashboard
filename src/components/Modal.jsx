// import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, y: "-20px" },
  visible: { opacity: 1, y: "0" },
};

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdrop}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            {children}
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
              onClick={onClose}
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
