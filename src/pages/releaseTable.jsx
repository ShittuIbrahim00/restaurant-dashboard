import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ReleaseTable = () => {
  const [data, setData] = useState([]);

  const checkUser = JSON.parse(localStorage.getItem("restaurant-user"));
  const userRole = checkUser.user.token;

  useEffect(() => {
    const handleData = async () => {
      const resp = await axios.get('https://restaurant-backend-wwjm.onrender.com/api/v1/get-All-table', {headers: {Authorization: `Bearer ${userRole}`}});
      if (resp.data.success === true) {
        setData(resp.data.data);
      }
    };
    handleData();
  }, []);

  const handleReserve = async (e, _id) => {
    e.preventDefault();
    try {
      const rescp = await axios.put(`https://restaurant-backend-wwjm.onrender.com/api/v1/update-reserve-table/${_id}`, { isReserved: false, isPaid: false, reservedAt: null }, {headers: {Authorization: `Bearer ${userRole}`}});
      if (rescp.data.success === true) {
        toast.success('Table Unreserved successfully');
        setData(data.map((item) => (item._id === _id ? { ...item, isReserved: false } : item)));
      } else {
        toast.error('Failed to unreserve table');
      }
    } catch (error) {
      toast.error('Failed to unreserved table');
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.length > 0 &&
        data.map((e) => (
          <div key={e._id} className="bg-orange-600 p-3 rounded-md">
            <p>Table Number {e.tableNumber}</p>
            {e.isReserved === true ? (
              <button className="p-3 bg-gray-400 rounded-xs" onClick={(e) => handleReserve(e, e._id)}>
                Release
              </button>
            ) : (
              null
            )}
          </div>
        ))}
    </div>
  );
};

export default ReleaseTable;
