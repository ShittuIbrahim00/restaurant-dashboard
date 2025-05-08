import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Tables = () => {
  const [error, setError] = useState('');
  const [error1, setError1] = useState('')
  const [category, setCategory] = useState([])
  const [loader, setLoader] = useState(false)
  const [name, setName] = useState('')
  const [table, setTable] = useState([])
  const [data, setData] = useState({
    tableNumber: '',
    capacity: '',
    price: '',
    categoryId: ""
  })
  const [editingTableId, setEditingTableId] = useState(null); // Track which table is being edited

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (!name.trim()) {
        setError('Pls Fill The Input Field');
        setLoader(false);
        return;
      }
      const resp = await axios.post('https://restaurant-backend-wwjm.onrender.com/api/v1/create-table-category', { name: name });
      console.log(resp);
      if (resp.data.sucess === true) {
        setLoader(false);
        toast.success(resp.data.msg);
        setShowCategoryModal(false); // Close modal on success
      } else {
        setLoader(false);
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (!data.tableNumber || !data.capacity || !data.price) {
        setError1('Pls fill all the fields');
        setLoader(false);
        return;
      }

      let resp;
      if (editingTableId) {
        // If editing, make a PUT request to update the table
        resp = await axios.put(`https://restaurant-backend-wwjm.onrender.com/api/v1/update-table/${editingTableId}`, data);
      } else {
        // Otherwise, create a new table
        resp = await axios.post('https://restaurant-backend-wwjm.onrender.com/api/v1/create-table', data);
      }

      console.log("API Response:", resp);

      if (resp.data.success === true) {
        setLoader(false);
        toast.success(resp.data.msg);
        setShowTableModal(false); // Close modal on success
        fetchTable(); // Fetch updated table list
        setEditingTableId(null); // Reset editing state
      } else {
        setLoader(false);
        toast.error(resp.data.msg || "An error occurred. Please try again.");
      }
    } catch (error) {
      setLoader(false);
      const errorMessage = error.response?.data?.msg || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  const fetchTable = async () => {
    try {
      const resp = await axios.get('https://restaurant-backend-wwjm.onrender.com/api/v1/get-all-table');
      console.log(resp)
      if (resp.data.success === true) {
        setTable(resp.data.data);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const checkUser = JSON.parse(localStorage.getItem("restaurant-user"));
  const userRole = checkUser.user.role;

  const [showTableModal, setShowTableModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    const fetchCatgoryData = async () => {
      const resp = await axios.get('https://restaurant-backend-wwjm.onrender.com/api/v1/get-all-category')
      if (resp.data.sucess === true) {
        setCategory(resp.data.data)
      }
    }
    fetchCatgoryData()
  }, [])

  const handleDelete = async (_id) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this table')
      if (confirm) {
        const resp = await axios.delete(`https://restaurant-backend-wwjm.onrender.com/api/v1/delete-table/${_id}`)
        if (resp.data.success) {
          toast.success('Table deleted successfully')
          setTable(resp.data.data)
        } else {
          toast.error('Failed to delete table')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (tableData) => {
    setData({
      tableNumber: tableData.tableNumber,
      capacity: tableData.capacity,
      price: tableData.price,
      categoryId: tableData.categoryId
    });
    setEditingTableId(tableData._id); // Set the editing ID
    setShowTableModal(true); // Open the modal to edit the table
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"></h2>
        <button
          onClick={() => setShowCategoryModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Add Table Category
        </button>
        <button
          onClick={() => setShowTableModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Add Table
        </button>
      </div>

      {/* Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">{editingTableId ? 'Edit Table' : 'Add Table'}</h3>
            <form onSubmit={handleSubmit}>
              <select name="categoryId" value={data.categoryId} onChange={handleChange} className="w-full mb-4 border px-3 py-2 rounded">
                <option value="">Select Table Category</option>
                {
                  category?.map((e) => (
                    <option key={e._id} value={e._id}>{e.name}</option>
                  ))
                }
              </select>
              <input
                type="text"
                name='tableNumber'
                value={data.tableNumber}
                onChange={handleChange}
                placeholder="Table Number"
                className="w-full mb-4 border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="capacity"
                onChange={handleChange}
                value={data.capacity}
                placeholder="Table Capacity"
                className="w-full mb-4 border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Price"
                value={data.price}
                onChange={handleChange}
                name="price"
                className="w-full mb-4 border px-3 py-2 rounded"
              />
              {error1 && <p className="text-sm text-red-500">{error1}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowTableModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  {`${loader === true ? 'Please wait...' : editingTableId ? 'Save Changes' : 'Create'}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add Category</h3>
            <form onSubmit={handleCatSubmit}>
              <select name="name" onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 border px-3 py-2 rounded"
                value={name} id="" >
                <option value="">Select Category Name</option>
                <option value="Regular">Regular</option>
                <option value="Executive">Executive</option>
              </select>

              {error && <p className="text-sm text-red-500 h-3">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  {`${loader === true ? 'Please Wait...' : 'Create'}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table List */}
      <div className="grid lg:grid-cols-4 gap-3 sm:grid-cols-1 sm-w-full grid-cols-1">
        {
          table.length > 0 ? (
            table?.map((e) => (
              <div key={e._id} className="bg-orange-600 rounded-md p-4 hover:scale-100 hover:opacity-95">
                <div className="flex items-start text-gray justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{e?.tableNumber}</p>
                    <p className="font-bold">Capacity: {e?.capacity} </p>
                    <p className="font-bold">price: ${e?.price}</p>
                    <p>Category: {e?.categoryId?.name}</p>
                  </div>
                  <div className=" flex flex-col gap-4">
                    <MdDeleteOutline className="cursor-pointer" onClick={() => { handleDelete(e._id) }} />
                    <CiEdit className="cursor-pointer" onClick={() => { handleEdit(e) }} />
                  </div>
                </div>
              </div>
            ))
          ) : (<p className="text-center font-bold text-4xl">No Table</p>)
        }
      </div>
    </div>
  );
};

export default Tables;
