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
                    type="text"
                    onChange={(e) => handleLoginInfoChange(e?.target?.value, 'username')}
                    className='mr-1'
                >  
                </input>
            </div>
            <div className="form-row">
                <input
                    name="password"
                    id="password"
                    type="text"
                    onChange={(e) => handleLoginInfoChange(e?.target?.value, 'password')}
                    className='mr-1'
                >
                </input>
            </div>
            <div className="flex jc-sb">
                <button className="hcp" onClick={() => onSubmitLogin(loginInfo)}>
                    Submit
                </button>
                <div>
                    <span className='forgot_password_text'>Forgot Password?</span>
                </div>
            </div>
        </div>
    )
}