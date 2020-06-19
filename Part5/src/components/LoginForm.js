import React from 'react'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div className="loginForm">
            <form onSubmit = {handleSubmit}>
                <div className="row">
                    <label style={{textAlign:"center"}} htmlFor="loginField">username</label>
                    <input
                        id="loginField"
                        placeholder="..."
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                    <label style={{textAlign:"center"}}  htmlFor="passwordField">password</label>
                    <input
                        id="passwordField"
                        placeholder="..."
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm;