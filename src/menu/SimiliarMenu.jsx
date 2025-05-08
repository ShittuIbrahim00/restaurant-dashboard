import { PiDotsThree } from 'react-icons/pi'
import { FaStar } from 'react-icons/fa6'
const SimiliarMenu = () => {
    return (
        <div className='mt-7'>
            <div className='flex items-center justify-between lg:w-[90%] mb-4'>
                <p className='text-sm font-bold'>Similar Menu</p>
                <PiDotsThree />
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 items-center gap-2'>
                <div className='bg-white rounded-xl'>
                    <img src="https://th.bing.com/th/id/OIP.4SJEfLKs_f6gX88NeMqE6wHaFH?w=274&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" className='rounded-t-xl object-contain' />
                    <div className='p-3'>
                        <p className='text-xs text-gray-700'>Desserts</p>
                        <h1 className='text-xl font-semibold mt-2'>Nut Berried Oatmeal</h1>
                        <div className='mt-3 flex items-center justify-between'>
                            <div className='flex items-center gap-1'>
                                <FaStar className='text-yellow-500' />
                                <p>4.7</p>
                            </div>
                            <p>%10.00</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-xl'>
                    <img src="https://th.bing.com/th/id/OIP.4SJEfLKs_f6gX88NeMqE6wHaFH?w=274&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" className='rounded-t-xl object-contain' />
                    <div className='p-3'>
                        <p className='text-xs text-gray-700'>Desserts</p>
                        <h1 className='text-xl font-semibold mt-2'>Nut Berried Oatmeal</h1>
                        <div className='mt-3 flex items-center justify-between'>
                            <div className='flex items-center gap-1'>
                                <FaStar className='text-yellow-500' />
                                <p>4.7</p>
                            </div>
                            <p>%10.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimiliarMenu