import React, { useState } from 'react'
import toast from 'react-hot-toast'

const tableCategory = () => {
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)
    const [names, setNames] = useState({
        name: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNames(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault()
        try {
            if (!names.name.trim()) {
                setError('Pls Fill The Field')
                setLoader(false)
                return
            }
            const resp = await axios.post('https://restaurant-backend-wwjm.onrender.com/api/v1/create-table-category')
            if (resp.data.success === true) {
                setLoader(false)
                toast.success(resp.data.msg)
            } else {
                setLoader(true)
                toast.error(resp.data.msg)
            }
        } catch (error) {
            toast.error(resp.data.msg)
            console.log(error)
        }
    }
    return (
        <div>

        </div>
    )
}

export default tableCategory
