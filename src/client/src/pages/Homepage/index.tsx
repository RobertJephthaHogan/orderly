import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import bg from '../../assets/images/bg.jpg'
import fc from '../../assets/images/filing_cabinet.png'
import './styles.css'



const Homepage : React.FC = () => {

    const currentUser = useSelector((state: any) => state.user?.data ?? null)
    const navigate = useNavigate()


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
                            Helping manage tasks, events, projects, and other stuff.
                        </span>
                        <div className="landing-controls">
                            <Button 
                                onClick={() => navigate('/login')} 
                                type="primary" 
                                id="login-btn"
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={() => navigate('/signup')} 
                                type="primary" 
                                className="ml-2"
                                id="signup-btn"
                            >
                                Sign Up
                            </Button>
                            <Button 
                                onClick={() => navigate('/dashboard')} 
                                type="primary" 
                                className="ml-2"
                                id="dashboard-btn"
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