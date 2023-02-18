import LogInForm from '../../components/forms/LogInForm'
import './styles.css'


export default function Login() {

    return (
        <div className="login-component">
            <div className="left-side">

            </div>
            <div className="right-side">
                <div className='login_access_panel'>
                    <LogInForm/>
                </div>
            </div>
        </div>
    )
}