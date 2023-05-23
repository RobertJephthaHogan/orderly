import React from 'react'
import './styles.css'



export default function UserSettings() {

    return (
        <div className='user-settings-component p-1'>
            <div className='user-settings-top-bar mb-1'>
                top bar
            </div>
            <div>
                <div className='user-info-card  mb-1'>
                    User information card
                    Height
                    Weight
                    body fat percentage
                    target Weight
                    target bfp
                </div>
                <div className='user-info-card  mb-1'>
                    User nutrition settings card
                    water intake goals
                    calorie goals
                    macro goals

                </div>
                <div className='user-info-card  mb-1'>
                    morning routine card
                    
                </div>
                <div className='user-info-card  mb-1'>
                    evening routine card
                    
                </div>
            </div>
        </div>
    )
}