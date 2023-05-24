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
                    <div>
                        User information card
                    </div>
                    <div className='divider' />
                    <div>
                        First Name
                    </div>
                    <div>
                        Last Name
                    </div>
                    <div>
                        Email
                    </div>
                    <div>
                        Password
                    </div>
                    <div>
                        Phone Number
                    </div>
                    <div>
                        Height
                    </div>
                    <div>
                        Weight
                    </div>
                    <div>
                        Body Fat Percentage
                    </div>
                    <div>
                        Target Weight
                    </div>
                    <div>
                        Target BFP
                    </div>
                    
                </div>
                <div className='user-info-card  mb-1'>
                    <div>
                        User nutrition settings card
                    </div>
                    <div className='divider' />
                    <div>
                        water intake goals
                    </div>
                    <div>
                        calorie goals
                    </div>
                    <div>
                        macro goals
                    </div>

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