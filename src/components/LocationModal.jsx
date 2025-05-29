import Modal from "./Modal";

const LocationModal = ({
  onClose,
  isOpen,
  onSubmit,
  title,
  formData,
  setFormData,
  restaurants,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} title={title}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        className="space-y-4"
      >
        <select
          name="restaurant"
          value={formData.restaurant}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((rest) => (
            <option key={rest._id} value={rest._id}>
              {rest.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LocationModal;
