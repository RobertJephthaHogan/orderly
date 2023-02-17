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
import bg from '../../assets/images/bg.jpg'
import fc from '../../assets/images/filing_cabinet.png'
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
                <div className=' w-100 flex vc content-center'>
                    <div className="homepage_title_content">
                        <span className="intro-mini-font">
                            Welcome to 
                        </span>
                        <span className="my-name">
                            Orderly
                        </span>
                        <span className="intro-content">
                            Helping manage tasks, events, projects, and 
                        </span>
                        <div className="landing-controls">
                            <Button 
                                onClick={() => navigate('/login')} 
                                type="primary" 
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={() => navigate('/signup')} 
                                type="primary" 
                                className="ml-2"
                            >
                                Sign Up
                            </Button>
                            <Button 
                                onClick={() => navigate('/dashboard')} 
                                type="primary" 
                                className="ml-2"
                            >
                                Dashboard
                            </Button>
                        </div>
                    </div>
                    <div className="flex jc-c">
                        <img
                            alt="example"
                            src={fc}
                            style={{
                                marginLeft: '100px',
                                width: '275px',
                                height: '230px'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;