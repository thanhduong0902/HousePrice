import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../API/apis';

function SignUp() {
  const [focused, setFocused] = useState(false);
  const [values, setValues] = useState({
    username: "",
    name: "",
    password: "",
    phone: ""
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Tài khoản",

      label: "Tài khoản",

      required: true,
    },
    {
      id: 2,
      name: "name",
      type: "text",
      placeholder: "Tên",
      label: "Tên",

      require: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Mật khẩu",

      label: "Mật khẩu",

      required: true,
    },
  ];
  const navigate = useNavigate();
  const signUpMutation = useMutation(signUp);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    signUpMutation.mutate(body, {
      onSuccess: (response) => {
        
              navigate("/");
      }
    });
  };
  const handleFocus = (e) => {
    setFocused(true);
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Đăng Ký</h1>
        {inputs.map((input, index) => (
          <div className="formInput" key={index}>
            <label>{input.label}</label>
            <input
              onBlur={handleFocus}
              value={values[input.name]}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              required={input.required}
              onChange={onChange}
            ></input>
          </div>
        ))}
        <button>Đăng Ký</button>
      </form>
    </div>
  );
}

export default SignUp
