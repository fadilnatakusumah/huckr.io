import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useEffect, useReducer } from "react";
import { FaLock, FaMailBulk, FaUser } from "react-icons/fa";
import { isAuth } from "../../helpers/auth";
import Router from "next/router";
import { API } from "../../consts/envs";

interface RegisterFormProps {
  onToggleAuth: () => void;
}

interface IState {
  name: string;
  email: string;
  password: string;

  successMessage: string;
  errors: string[];
  isSubmitting: boolean;
}

function RegisterForm({ onToggleAuth }: RegisterFormProps) {
  const [state, setState] = useReducer(
    (state: IState, newState: Partial<IState>) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      password: "",
      errors: [],

      successMessage: "",
      isSubmitting: false,
    }
  );

  const onChangeHandler =
    (keyState: string) => (evt: ChangeEvent<HTMLInputElement>) => {
      setState({
        [keyState]: evt.target.value,
      });
    };

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setState({
      isSubmitting: true,
      errors: [],
      successMessage: "",
    });

    try {
      const resp = await axios.post(`${API}/auth/register`, {
        name: state.name,
        email: state.email,
        password: state.password,
      });
      setState({
        isSubmitting: false,
        successMessage: resp.data.message,
        name: "",
        email: "",
        password: "",
      });
    } catch (errors: unknown) {
      const messages =
        ((errors as any)?.response as AxiosResponse).data.errors || [];
      setState({
        isSubmitting: false,
        errors: messages,
      });
    }
  };

  const { isSubmitting } = state;

  return (
    <div className="login-container">
      <h2>Welcome to Huckr.io</h2>
      <hr />
      {state.successMessage && (
        <p className="success-message">{state.successMessage}</p>
      )}
      {state.errors.map((msg: string) => (
        <p className="error-message" key={msg}>
          {msg}
        </p>
      ))}
      <form onSubmit={onSubmitHandler}>
        <div className="input-field">
          <span>
            <FaUser />
          </span>
          <input
            disabled={isSubmitting}
            value={state.name}
            onChange={onChangeHandler("name")}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="input-field">
          <span>
            <FaMailBulk />
          </span>
          <input
            disabled={isSubmitting}
            value={state.email}
            onChange={onChangeHandler("email")}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input-field">
          <span>
            <FaLock />
          </span>
          <input
            disabled={isSubmitting}
            value={state.password}
            onChange={onChangeHandler("password")}
            type="password"
            placeholder="Password"
          />
        </div>
        <button disabled={isSubmitting} type="submit" className="submit-btn">
          {state.isSubmitting ? "Submitting" : "Create Account"}
        </button>
      </form>
      <p className="toggle-auth">
        Already have an account?{" "}
        <span className="toggle-auth-link" onClick={onToggleAuth}>
          Login
        </span>
      </p>
      <style jsx>{`
        .login-container {
          min-width: 500px;
          padding: 20px 40px;
        }
        h2 {
          text-align: center;
        }
        .toggle-auth {
          text-align: center;
        }
        .toggle-auth-link {
          color: blue;
          cursor: pointer;
        }
        form {
          padding-top: 20px;
          width: 100%;
          height: 100%;
        }
        .submit-btn {
          transition: 0.5s;
          background-color: cornflowerblue;
          color: white;
          padding: 14px;
          width: 100%;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .submit-btn:hover {
          background-color: darkblue;
        }
        .submit-btn:disabled {
          background-color: grey;
          cursor: not-allowed;
        }

        .input-field:active {
          border: 1px solid blue;
        }

        .input-field {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 10px;
          border: 1px solid grey;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .input-field span:first-child {
          color: grey;
        }

        .input-field input {
          padding: 10px 0;
          outline: none;
          border: none;
          height: 100%;
          width: 100%;
        }

        p.error-message {
          margin: 0;
          padding: 0;
          color: red;
        }
        p.success-message {
          margin: 0;
          padding: 0;
          color: green;
        }
      `}</style>
    </div>
  );
}

export default RegisterForm;
