import axios, { AxiosResponse } from "axios";
import { WithRouterProps } from "next/dist/client/with-router";
import { Router, withRouter } from "next/router";
import { ChangeEvent, FormEvent, useReducer } from "react";
import { FaLock } from "react-icons/fa";
import { API } from "../../../consts/envs";

// interface IResetPasswordAccountForm {
//   router?: Router;
// }

interface IState {
  new_password: string;

  successMessage: string;
  errors: string[];
  isSubmitting: boolean;
}

function ResetPasswordAccountForm({ router }: WithRouterProps) {
  console.log(
    "🚀 ~ file: [token].tsx ~ line 20 ~ ResetPasswordAccountForm ~ router",
    router
  );
  const token = router?.query.token;
  console.log(
    "🚀 ~ file: [token].tsx ~ line 21 ~ ResetPasswordAccountForm ~ router?.query",
    router?.query
  );
  const [state, setState] = useReducer(
    (state: IState, newState: Partial<IState>) => ({ ...state, ...newState }),
    {
      new_password: "",
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

    console.log(
      "🚀 ~ file: [token].tsx ~ line 51 ~ onSubmitHandler ~ state",
      state
    );
    console.log(
      "🚀 ~ file: [token].tsx ~ line 54 ~ onSubmitHandler ~ token",
      token
    );
    try {
      const resp = await axios.post(`${API}/auth/reset-password`, {
        new_password: state.new_password,
        reset_password_link: token,
      });
      setState({
        isSubmitting: false,
        successMessage: resp.data.message,
        new_password: "",
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

  const { successMessage, isSubmitting } = state;

  return (
    <div className="reset-password-container">
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
      {!successMessage && (
        <form onSubmit={onSubmitHandler}>
          <div className="input-field">
            <span>
              <FaLock />
            </span>
            <input
              disabled={isSubmitting}
              value={state.new_password}
              onChange={onChangeHandler("new_password")}
              type="password"
              placeholder="New Password"
            />
          </div>

          <button disabled={isSubmitting} type="submit" className="submit-btn">
            Reset Password
          </button>
        </form>
      )}
      <style jsx>{`
        .reset-password-container {
          margin: 0 auto;
          max-width: 500px;
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

export default withRouter(ResetPasswordAccountForm);
