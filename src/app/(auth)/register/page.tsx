import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">Register</h1>
        </div>
        <div className="card w-full max-w-lg shadow-2xl bg-base-100">
          <div className="card-body">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
