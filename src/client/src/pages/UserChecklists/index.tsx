import React from 'react'
import './styles.css'



export default function UserChecklists() {

    return (
        <div>
            User Checklists
            <div className='w-100 flex'>
                <div className='w-30'>
                    Checklist by category
                </div>
                <div className='w-70'>
                    Checklist area
                </div>
            </div>
        </div>
    )
}