import { ObjectID } from 'bson'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../../services/user.service'
import { User } from '../../types'
import './styles.css'



export const SignUp : React.FC = () => {

    const [userInfo, setUserInfo] = useState<any>({})
    const navigate = useNavigate();


    const onUserInfoChange = (value: any, field: any) => {
        let workingObj = userInfo;
        workingObj[field] = value
        setUserInfo(workingObj)
    }


    const onSubmitSignup = (new_user_data: any) => {
        new_user_data.preventDefault()
        const user_to_add_obj = {
            'id': new ObjectID().toString(),
            'firstName': userInfo?.firstName,
            'lastName': userInfo?.lastName,
            'email': userInfo?.email,
            'password': userInfo?.password,
            'phoneNumber': userInfo?.phoneNumber,
            'role': 'user',
            'todos': [],
            'accountsInfo': [],
            'events': []
        }

        let to_add : User  = JSON.parse(JSON.stringify(user_to_add_obj));
  
        userService.createNewUser(to_add).then((resp: any) => {
            navigate('/login')
        })
    }


    return (
        <div className='sign-up-wrapper'>
            <div className='left-side'>

            </div>
            <div className='right-side'>
                <div className='form-container'>
                    <form onSubmit={onSubmitSignup}>
                        <div className='flex pb-1 space-between'>
                            <label> First Name: </label>
                            <input
                                name="firstName"
                                id="firstName"
                                type="text"
                                value={userInfo?.firstName}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'firstName')}
                            />
                        </div>
                        <div className='flex pb-1 space-between'>
                            <label> Last Name: </label>
                            <input
                                name="lastName"
                                id="lastName"
                                type="text"
                                value={userInfo?.lastName}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'lastName')}
                            />
                        </div>
                        <div className='flex pb-1 space-between'>
                            <label> Email: </label>
                            <input
                                name="email"
                                id="email"
                                type="text"
                                value={userInfo?.email}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'email')}
                            />
                        </div>
                        <div className='flex pb-1 space-between'>
                            <label> Password: </label>
                            <input
                                name="password"
                                id="password"
                                type="text"
                                value={userInfo?.password}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'password')}
                            />
                        </div>
                        <div className='flex pb-1 space-between'>
                            <label> Phone Number: </label>
                            <input
                                name="phoneNumber"
                                id="phoneNumber"
                                type="text"
                                value={userInfo?.phoneNumber}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'phoneNumber')}
                            />
                        </div>
                        <div className='flex p-1 w-100'>
                            <button type="submit" className='w-100 submit-login-btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}