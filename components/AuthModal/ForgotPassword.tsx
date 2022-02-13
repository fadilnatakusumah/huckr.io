import axios, { AxiosResponse } from "axios";
import { useReducer, ChangeEvent, FormEvent, useEffect } from "react";
import { FaMailBulk, FaLock } from "react-icons/fa";
import Router from "next/router";
import { authenticate, isAuth } from "../../helpers/auth";
import { API } from "../../consts/envs";
import { NextPageContext } from "next";
import { IncomingMessage } from "http";

interface ForgetPasswordFormProps extends Partial<NextPageContext> {
  onToggleAuth: () => void;
}
interface IState {
  email: string;
  password: string;

  successMessage: string;
  errors: string[];
  isSubmitting: boolean;
}
function ForgetPasswordForm({ onToggleAuth, req }: ForgetPasswordFormProps) {
  const [state, setState] = useReducer(
    (state: IState, newState: Partial<IState>) => ({ ...state, ...newState }),
    {
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
      const resp = await axios.put(`${API}/auth/forgot-password`, {
        email: state.email,
      });
      setState({
        isSubmitting: false,
        successMessage: resp.data.message,
        email: "",
      });
    } catch (errors: unknown) {
      const errResp = ((errors as any)?.response as AxiosResponse).data;
      const messages = errResp ? errResp.errors || [errResp.message] : [];
      setState({
        isSubmitting: false,
        errors: messages,
      });
    }
  };

  const { isSubmitting } = state;

  return (
    <div className="login-container">
      <h2>Forgot Password</h2>
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

        <button disabled={isSubmitting} type="submit" className="submit-btn">
          Send Request
        </button>
      </form>
      <p className="toggle-auth">
        <span className="toggle-auth-link" onClick={onToggleAuth}>
          Back
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

export default ForgetPasswordForm;
