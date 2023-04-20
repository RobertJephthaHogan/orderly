import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux'



export default function UserAgenda() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])

    const dateFormatOptions : any= {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };



    return (
        <div className='user-agenda-component'>
            <div className='p-1'>
                <div className='user-agenda-top-bar'>
                    <h3 id="welcome-back-title">Welcome back, {currentUser?.firstName}!</h3>
                    <h4>{new Date().toLocaleDateString("en-US", dateFormatOptions)}</h4>
                </div>
            </div>
            User Agenda
        </div>
    )
}