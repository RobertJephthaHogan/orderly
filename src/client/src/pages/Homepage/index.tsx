import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import eventActions from "../../redux/actions/event";
import noteActions from "../../redux/actions/notes";
import projectActions from "../../redux/actions/project";
import taskActions from "../../redux/actions/tasks";
import userActions from "../../redux/actions/user";
import { store } from "../../redux/store";
import { userService } from "../../services/user.service";
import './styles.css'



const Homepage : React.FC = () => {

    const [loginInfo, setLoginInfo] = useState<any>({})
    const currentUser = useSelector((state: any) => state.user?.data ?? null)
    const navigate = useNavigate()


    const handleLoginInfoChange = (data: any, field: any) => {
        let workingObj = {...loginInfo}
        workingObj[field] = data
        setLoginInfo(workingObj)     
    }

    const dispatchLoginData = (resp: any) => {
        navigate('/')
		store.dispatch(userActions.login(resp?.data))
        store.dispatch(taskActions.setToDos(resp?.data?.data?._id))
        store.dispatch(eventActions.setEvents(resp?.data?.data?._id))
        store.dispatch(projectActions.setProjects(resp?.data?.data?._id))
        store.dispatch(noteActions.setNotes(resp?.data?.data?._id))
    }

    const onSubmitLogin = (e : any) => {
        e.preventDefault()
        userService.loginUser(loginInfo).then((resp: any) => {
			dispatchLoginData(resp)
        })
    }

    return (
        <div className='homepage'>
            <div className="homepage_landing_section" >
                <div className="w-100 flex space-between">
                    <div className="h-100 ">
                        <div className=' w-100 flex vc content-center'>
                            <div className="homepage_title_content">
                                {
                                    currentUser?._id ? (
                                        <div className="homepage_access_panel">
                                            <div className="flex content-center w-100">
                                                {`Hello ${currentUser?.data?.firstName}`}
                                            </div>
                                            <div className="flex content-center w-100">
                                                <button
                                                    onClick={() => navigate('/dashboard')}
                                                    className="hp-btn"
                                                >
                                                    Dashboard
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div 
                                            className="homepage_access_panel"
                                        >
                                            <div className="flex content-center w-100 pt-3">
                                                <span className="homepage_title_text mb-2">Please Enter Credentials.</span>
                                            </div>
                                            <div className="flex content-center">
                                                <form onSubmit={onSubmitLogin}>
                                                    <div className="pb-1 flex">
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
                                                    <div className="pb-1 flex">
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
                                                            <span className="forgot_password_text">Forgot Password?</span>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;