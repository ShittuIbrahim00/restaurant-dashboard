import React from 'react'
import { FaStar } from 'react-icons/fa6'
const MenuReview = () => {
    return (
        <div className='lg:w-[100%] p-2'>
            <div className=' w-[100%]'>
                <div className='w-full flex justify-between'>
                    <h2 className='text-md font-semibold'>Review</h2>
                    <p className='text-xs text-gray-400 mt-2'>See More Reviews</p>
                </div>
            </div>
            <div className=''>
                <div className=' w-[100%] rounded-xl p-2 bg-white'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <img src="https://th.bing.com/th/id/OIP.Hw4w9rfXHpUaCUF5udShDwHaEK?w=301&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" className='rounded-full h-[40px] w-[40px]' />
                        </div>
                        <div>
                            <p className='text-xs'>Sarah L . <span className='text-gray-400 text-xs'>OCT 15 2025</span></p>
                            <div>
                                <div className='flex items-center'>
                                    <FaStar className='text-yellow-500 text-sm' />
                                    <FaStar className='text-yellow-500 text-sm' />
                                    <FaStar className='text-yellow-500 text-sm' />
                                    <FaStar className='text-yellow-500 text-sm' />
                                    <FaStar className='text-yellow-500 text-sm' />
                                    <span className='text-gray-400'>5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <p className='text-xs text-gray-400'>Absolutely delicious, This Mango and coconut<br></br> flavors are refreshing and perfectly balancd</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuReview