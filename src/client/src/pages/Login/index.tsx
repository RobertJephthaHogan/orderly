import { LockOutlined, UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import eventActions from '../../redux/actions/event'
import noteActions from '../../redux/actions/notes'
import projectActions from '../../redux/actions/project'
import taskActions from '../../redux/actions/tasks'
import userActions from '../../redux/actions/user'
import { store } from '../../redux/store'
import { userService } from '../../services/user.service'
import './styles.css'



export const Login : React.FC = () => {

    const [loginInfo, setLoginInfo] = useState<any>({})
    const navigate = useNavigate()


    const handleLoginInfoChange = (data: any, field: any) => {
        let workingObj = {...loginInfo}
        workingObj[field] = data
        setLoginInfo(workingObj)     
    }

    
    const dispatchLoginData = (resp: any) => {
		store.dispatch(userActions.login(resp))
        store.dispatch(taskActions.setToDos(resp?.data?._id))
        store.dispatch(eventActions.setEvents(resp?.data?._id))
        store.dispatch(projectActions.setProjects(resp?.data?._id))
        store.dispatch(noteActions.setNotes(resp?.data?._id))
    }


    const onSubmitLogin = (e : any) => {
        e.preventDefault()
        userService.loginUser(loginInfo).then((resp: any) => {
			dispatchLoginData(resp.data)
			navigate('/dashboard')
        })
    }


    return (
        <div className="login_component">
            <div className='login_access_panel'>
                <form onSubmit={onSubmitLogin}>
                    <div className="flex pb-1">
                        <input
                            name="email"
                            id="email"
                            type="text"
                            value={loginInfo?.email}
                            onChange={(e) => handleLoginInfoChange(e?.target?.value, 'username')}
                            className='mr-1'
                        >  
                        </input>
                        <UserOutlined style={{color:'white'}}/>
                    </div>
                    <div className=" flex pb-1">
                        <input
                            name="password"
                            id="password"
                            type="text"
                            value={loginInfo?.password}
                            onChange={(e) => handleLoginInfoChange(e?.target?.value, 'password')}
                            className='mr-1'
                        >
                        </input>
                        <LockOutlined style={{color:'white'}}/>
                    </div>
                    <div className="flex space-between">
                        <button className="submit_login" type="submit">
                            Submit
                        </button>
                        <div>
                            <span className='forgot_password_text'>Forgot Password?</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}