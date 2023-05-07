"use client";
import React, { useState } from "react";
import {useRouter} from 'next/navigation';
type UserParam = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
    const router = useRouter()
  const [form, setForm] = useState<UserParam>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleCreateUser = () => {
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left basis-1/2">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="flex-1 card w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="email"
                className="input input-bordered"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">confirm password</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={() => router.push('/login')}
                >
                  Have you got an account? Login now!
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={handleCreateUser}
                disabled={!form.email || !form.name}
              >
                {/* {isLoading ? "Loading..." : "Register"} */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
