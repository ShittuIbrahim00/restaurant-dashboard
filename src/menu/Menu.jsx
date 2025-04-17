import React from 'react'
import Component from './Component'
import OrderOverview from './OrderOverview'
import SimiliarMenu from './SimiliarMenu'
import MenuReview from './MenuReview'

const Menu = () => {
    return (
        <div className="mt-[100px] flex items-center w-[100%] justify-end">
            <div className="grid lg:grid-cols-2 gap-5 w-[100%] lg:w-[85%]">
                <div>
                    <Component />
                    <MenuReview />
                </div>
                <div className="">
                    <OrderOverview />
                    <SimiliarMenu className='mt-5'/>
                </div>
            </div>
        </div>

    )
}

export default Menu
