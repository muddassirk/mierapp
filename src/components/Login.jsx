import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'

const Login = () => {
    return (
        <div id='login-page'>
            <div id='login-card'>
                <h2>
                    Welcome to mierapp
                </h2>
                <div className="login-button google">
                    <GoogleOutlined /> Sign in with google
                </div>
                <br />
                <br />
                <div className="login-button facebook">
                    <FacebookOutlined /> Sign in with facebook
                </div>
            </div>
        </div>
    )
}

export default Login
