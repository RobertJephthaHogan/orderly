import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import userActions from "../../../redux/actions/user"
import { store } from "../../../redux/store"
import { userService } from "../../../services/user.service"
import './styles.css'


export default function LogInForm() {

    const [loginInfo, setLoginInfo] = useState<any>({})
    const navigate = useNavigate()


    function handleLoginInfoChange(data: any, field: any) {
        let workingObj = {...loginInfo}
        workingObj[field] = data
        setLoginInfo(workingObj)     
    }

    
    function dispatchLoginData(resp: any) {
		store.dispatch(userActions.login(resp))
    }


    function onSubmitLogin(e : any) {
        userService.loginUser(loginInfo).then((resp: any) => {
			dispatchLoginData(resp.data)
			navigate('/dashboard')
        })
    }

    return (
        <div>
            <div className="form-row">
                <input
                    name="username"
                    id="username"
                    placeholder="Username"
                    type="text"
                    onChange={(e) => handleLoginInfoChange(e?.target?.value, 'username')}
                    className='mr-1'
                >  
                </input>
                <LockOutlined/>
            </div>
            <div className="form-row">
                <input
                    name="password"
                    id="password"
                    placeholder="Password"
                    type="text"
                    onChange={(e) => handleLoginInfoChange(e?.target?.value, 'password')}
                    className='mr-1'
                >
                </input>
                <UserOutlined/>
            </div>
            <div>
                <Button className="hcp w-100" onClick={() => onSubmitLogin(loginInfo)}>
                    Submit
                </Button>
                <div className="flex jc-sb w-100">
                    <div className="sub-text">
                        <span className='forgot_password_text'>Forgot Password?</span>
                    </div>
                    <div className="sub-text">
                        <span 
                            className='forgot_password_text'
                            onClick={() => navigate('/signup')}    
                        >
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}