import { FaRegEdit } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
import { IoMdCheckmark } from 'react-icons/io'
import { IoBookmarkOutline, IoShareSocialOutline } from 'react-icons/io5'
import { PiDotsThree } from 'react-icons/pi'

const Component = () => {
    return (
        <div className='bg-white rounded-xl p-3 lg:w-[100%]'>
            <div className='lg:w-full'>
                <div className='mb-4'>
                    <img src="https://th.bing.com/th/id/OIP.GsKc6m7ZvxLeShNc7uJvBQHaE8?w=270&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" className='w-full rounded-xl lg:h-[350px]' />
                </div>
                <div className='lg:flex items-center justify-between leading-10'>
                    <div className='flex flex-col leading-loose'>
                        <h2 className='text-lg font-bold'>Mango Coconut Smoothie Bowl</h2>
                        <div className='flex items-center gap-3'>
                            <p className='text-sm font-semibold text-orange-400'>Beverages, Dessert</p>
                            <p className='bg-pink-200 text-xs p-1 rounded-sm'>Customizable</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between lg:gap-4'>
                        <p className='text-orange-400 text-2xl'>$9.00</p>
                        <div className='flex items-center gap-2'>
                            <button className='border border[0.25px] border-black rounded-md p-1.5 flex items-center justify-center'><IoShareSocialOutline /></button>
                            <button className='border border[0.25px] border-black rounded-md p-1.5 flex items-center justify-center'><IoBookmarkOutline /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[100%] lg:flex gap-5 mt-4'>
                <div className='lg:w-[70%]'>
                    <div className='flex items-center gap-3 mt-3 text-xs'>
                        <div className='flex items-center gap-.5'>
                            <FaStar className='text-yellow-500 text-xs' />
                            <p className='font-bold text-sm'>4.6<span className='text-gray-500 text-xs'>/5 Rating</span></p>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='font-bold text-gray-800 text-xs mb-2'>Description</p>
                        <span className='text-xs'>Refreshing and tropical smoothe with a hint of coconut, topped with fresh fruit. Perfect for a light meal or a cool dessert.</span>
                    </div>
                    <div className='mt-3'>
                        <p className='font-bold text-gray-800 text-sm mb-2'>Values</p>
                        <div>
                            <div className='flex items-center justify-between text-xs text-gray-500'>
                                <div className='flex items-center gap-1'>
                                    <div className='rounded-full h-[12px] flex item-center justify-center w-[12px] bg-yellow-400'><IoMdCheckmark className='text-white text-xs' /></div>
                                    <p>Tropical & Refreshing</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <div className='rounded-full h-[12px] flex item-center justify-center w-[12px] bg-yellow-400'><IoMdCheckmark className='text-white text-xs' /></div>
                                    <p>Creamy & Indulgent</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <div className='rounded-full h-[12px] flex item-center justify-center w-[12px] bg-yellow-400'><IoMdCheckmark className='text-white text-xs' /></div>

                                    <p>Nutrient-Rich</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-xs mt-2 text-gray-500'>
                                <div className='flex items-center gap-1'>
                                    <div className='rounded-full h-[12px] flex item-center justify-center w-[12px] bg-yellow-400'><IoMdCheckmark className='text-white text-xs' /></div>

                                    <p>Natural Sweet</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <div className='rounded-full h-[12px] flex item-center justify-center w-[12px] bg-yellow-400'><IoMdCheckmark className='text-white text-xs' /></div>

                                    <p>Energizing</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <div className='rounded-full h-[12px] flex item-center justify-center w-[12px] bg-yellow-400'><IoMdCheckmark className='text-white text-xs' /></div>

                                    <p>Verisatile & Cutomizable</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-200 mt-3 rounded-md p-4 flex items-center gap-4'>
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col leading-6 items-center'>
                                <p className='text-xs text-gray-400'>Calories</p>
                                <p className='text-sm text-black'>320 <span className='text-sm font-normal text-gray-400'>kcals</span></p>
                            </div>
                            <hr className='h-[50px] bg-black border-gray-300 border-[0.95px]' />
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col leading-6 items-center'>
                                <p className='text-xs text-gray-400'>Protein</p>
                                <p className='text-sm text-black'>5 <span className='text-sm font-normal text-gray-400'>gram</span></p>
                            </div>
                            <hr className='h-[50px] bg-black border-gray-300 border-[0.95px]' />
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col leading-6 items-center'>
                                <p className='text-xs text-gray-400'>Fats</p>
                                <p className='text-sm text-black'>12 <span className='text-sm font-normal text-gray-400'>gram</span></p>
                            </div>
                            <hr className='h-[50px] bg-black border-gray-300 border-[0.95px]' />
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex flex-col leading-6 items-center'>
                                <p className='text-xs text-gray-400'>Carbo</p>
                                <p className='text-sm text-black'>50 <span className='text-sm font-normal text-gray-400'>gram</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[30%] mt-2'>
                    <div className='border-[0.25px] border-gray-500 rounded-xl p-3 w-full'>
                        <div className='flex items-center justify-between lg:w-[100%]'>
                            <p className='text-gray-700 text-lg'>Ingredient</p>
                            <PiDotsThree className='text-xl font-bold' />
                        </div>
                        <div>
                            <li className='text-gray-400 text-xs mt-2'>Mango</li>
                            <li className='text-gray-400 text-xs mt-2'>Coconut Milk</li>
                            <li className='text-gray-400 text-xs mt-2'>Banana</li>
                            <li className='text-gray-400 text-xs mt-2'>Pineapple</li>
                            <li className='text-gray-400 text-xs mt-2'>Corn flakes</li>
                            <li className='text-gray-400 text-xs mt-2'>Fresh berries(strayBerries, blueberries)</li>
                            <li className='text-gray-400 text-xs mt-2'>Granola</li>
                        </div>
                    </div>
                    <div className='w-full'>
                        <button className='flex items-center w-full mt-7 hover:bg-opacity-80 active:bg-orange-700 active:scale-95 gap-4 justify-center py-2 rounded-md bg-orange-500 text-white transition duration-200'>
                            <FaRegEdit />
                            <span>Edit Menu</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Component