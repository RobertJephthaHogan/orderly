import { Button } from "antd";
import { ObjectID } from "bson";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../services";
import { User } from "../../../types";
import './styles.css'


export default function SignUpForm() {

    const [userInfo, setUserInfo] = useState<any>({})
    const navigate = useNavigate();


    function onUserInfoChange(value: any, field: any) {
        let workingObj = userInfo;
        workingObj[field] = value
        setUserInfo(workingObj)
    }


    function onSubmitSignup(new_user_data: any) {
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
        <div>
            <div className='form-row'>
                <div className="w-30">
                    <label className="field-label"> First Name: </label>
                </div>
                <div className="w-70">
                    <input
                        name="firstName"
                        id="firstName"
                        type="text"
                        value={userInfo?.firstName}
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'firstName')}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className="w-30">
                    <label className="field-label"> Last Name: </label>
                </div>
                <div className="w-70">
                    <input
                        name="lastName"
                        id="lastName"
                        type="text"
                        value={userInfo?.lastName}
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'lastName')}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className="w-30">
                    <label className="field-label"> Email: </label>
                </div>
                <div className="w-70">
                    <input
                        name="email"
                        id="email"
                        type="text"
                        value={userInfo?.email}
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'email')}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className="w-30">
                    <label className="field-label"> Password: </label>
                </div>
                <div className="w-70">
                    <input
                        name="password"
                        id="password"
                        type="text"
                        value={userInfo?.password}
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'password')}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='form-row'>
                    <label className="field-label"> Phone Number: </label>
                </div>
                <div className="w-70">
                    <input
                        name="phoneNumber"
                        id="phoneNumber"
                        type="text"
                        value={userInfo?.phoneNumber}
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'phoneNumber')}
                    />
                </div>
            </div>
            <div className='form-row'>
                <Button onClick={() => onSubmitSignup(userInfo)} className='submit-btn hcp'>
                    Submit
                </Button>
            </div>
        </div>
    )
}