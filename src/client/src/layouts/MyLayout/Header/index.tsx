import { GithubOutlined, LinkedinOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import userActions from '../../../redux/actions/user'
import { store } from '../../../redux/store'
import './styles.css'

type Props = {
    isSidebarCollapsed?: any,
    setIsSidebarCollapsed?: any
}

export const MyLayoutHeader : React.FC<Props> = ({
    isSidebarCollapsed,
    setIsSidebarCollapsed
}) => {

    const navigate = useNavigate()

    function expandDropdown(dropdownID: any) {
        document?.getElementById(dropdownID)?.classList.toggle("show");
    }
    
    const logoutUser = () => {
        store.dispatch(userActions.logout())
    }
    

    return (
        <div className='header' id='header'>
            <div className='header-left'>
                <div className='header-left-item'>
                    <Button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className='hcp'
                        type='text'
                    >
                        {
                            isSidebarCollapsed ? (
                                <MenuUnfoldOutlined/>
                            ) : (
                                <MenuFoldOutlined/>
                            )
                        }
                    </Button>
                </div>
                {/* <div className='header-left-item ml-4'>
                    <div 
                        className='header-nav'
                        onClick={() => navigate('/')}
                    >
                        Home
                    </div>
                </div> */}
            </div>
            <div className='header-right flex'>
                <div className='mr-2 header-nav'>
                    <a href="https://github.com/RobertJephthaHogan" target="_blank">
                        <GithubOutlined
                            style={{
                                color:'#000000'
                            }}
                        />
                    </a>
                </div>
                <div className='mr-2 header-nav'>
                    <a href="https://www.linkedin.com/in/robert-hogan-378300191/" target="_blank">
                        <LinkedinOutlined
                            style={{
                                color:'#000000'
                            }}
                        />
                    </a>
                </div>
                <div 
                    className='header-nav'
                    onClick={() => expandDropdown('user-dropdown')}
                >
                    <UserOutlined className='dropbtn'/>
                    <div id='user-dropdown' className="dropdown-content">
                        <a onClick={() => store.dispatch(userActions.logout())}>Log Out</a>
                    </div>
                </div>
            </div>
        </div>
    )
}