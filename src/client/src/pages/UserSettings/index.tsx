import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'



export default function UserSettings() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])

    console.log('currentUser', currentUser)

    return (
        <div className='user-settings-component p-1'>
            <div className='user-settings-top-bar mb-1'>
                top bar
            </div>
            <div>
                <div className='user-info-card  mb-1'>
                    <div className='p-2'>
                        <h4>User information card</h4>
                    </div>
                    <div className='divider' />
                    <div className=' info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'>First Name : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.firstName} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'>Last Name : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.lastName} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Email : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.email} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Password : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> xxxxxxxxxxx </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Phone Number : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> {currentUser?.phoneNumber} </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Height : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 5' 10'' </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Weight : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 170 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Body Fat Percentage : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 12 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Target Weight : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 215 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    <div className='info-row flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Target BFP : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 7 </h5>
                        </div>
                        <div className='pl-4 edit-icon'>
                            <h5 className='vm-auto'><EditOutlined /> </h5>
                        </div>
                    </div>
                    
                </div>
                <div className='user-info-card  mb-1'>
                    <div className='p-2'>
                        <h4>User nutrition settings card</h4>
                    </div>
                    <div className='divider' />
                    <div className='flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Water Intake Goals : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> 124 </h5>
                        </div>
                    </div>
                    <div className='flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Calorie Goals : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> Calorie Goals </h5>
                        </div>
                    </div>
                    <div className='flex p-1 pl-3'>
                        <div>
                            <h5 className='vm-auto'> Macro Goals : </h5>
                        </div>
                        <div className='pl-2'> 
                            <h5 className='vm-auto'> macro goals </h5>
                        </div>
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