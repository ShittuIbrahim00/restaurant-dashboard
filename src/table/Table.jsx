import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Table = () => {
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({
        tableNumber: '',
        capacity: '',
        price: '',
        id: id,
    })
    

    const handleChange = (e) => {
        const { name, value } = e.target
        setNames(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async(e)=>{
        setLoader(true)
        e.preventDefault()
        try {
           if(!data.tableNumber || !data.capacity || !data.price){
                setError('Pls fill all the fields')
                setLoader(false)
                return
           }

           const resp = await axios.post('https://restaurant-backend-wwjm.onrender.com/api/v1/create-table')
           if(resp.data.success === true){
            setLoader(false)
            toast.success(resp.data.msg)
           }else{
            setLoader(true)
            toast.error(resp.data.msg)
           }
           
        } catch (error) {
            console.log(error)
            toast.error(resp.data.msg)
        }
    }
  return (
    <div>
        
    </div>
  )
}

export default Table