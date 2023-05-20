import React from 'react'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">Login</h1>
        </div>
        <div className="card w-full max-w-lg shadow-2xl bg-base-100">
          <div className="card-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
