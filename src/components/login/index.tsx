"use client";
import { UserType } from "@/types/chat";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

type UserParam = {
  username: string;
  phone: string;
};

interface CreateUserMutationResult extends UserType {}

async function createAccount({
  username,
  phone,
}: UserParam): Promise<CreateUserMutationResult> {
  const res = await fetch("http://localhost:8080/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, phone }),
  });
  const data = await res.json();
  return data;
}

async function signIn({ phone }: { phone: string }) {
  const res = await fetch("http://localhost:8080/users/phone/" + phone);
  return res.json();
}

const Login = ({
  onLogin,
  setAuth,
}: {
  onLogin: (value: boolean) => any;
  setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
}) => {
  const { mutate, data, isLoading } = useMutation(signIn);

  useEffect(() => {
    setAuth(data)
  }, [data, isLoading, setAuth])

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left basis-1/2">
          <h1 className="text-5xl font-bold">Login now!</h1>
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
                <span className="label-text">phone</span>
              </label>
              <input
                type="text"
                placeholder="phone"
                className="input input-bordered"
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={() => onLogin(false)}
                >
                  Don&apos;t have an account? Register now!
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={() => mutate({ phone: "123123" })}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateUser = ({
  onRegister,
  setAuth,
}: {
  onRegister: (value: boolean) => any;
  setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
}) => {
  const { mutate, data, error, isLoading } = useMutation<
    CreateUserMutationResult,
    unknown,
    UserParam
  >(createAccount);
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
                <span className="label-text">username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">phone</span>
              </label>
              <input
                type="text"
                placeholder="phone"
                className="input input-bordered"
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={() => onRegister(true)}
                >
                  Have you got an account? Login now!
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={() => mutate({ username: "Long", phone: "12312322" })}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CredentialForm = ({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
}) => {
  const [login, setLogin] = useState(true);

  return (
    <>
      {login ? (
        <Login onLogin={setLogin} setAuth={setAuth} />
      ) : (
        <CreateUser onRegister={setLogin} setAuth={setAuth} />
      )}
    </>
  );
};

export default CredentialForm;