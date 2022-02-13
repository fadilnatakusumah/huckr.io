import { useState } from "react";
import ForgetPasswordForm from "./ForgotPassword";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  show: boolean;
  onToggle: () => void;
}

export enum AUTH_TYPE {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}

function AuthModal({ show, onToggle }: AuthModalProps) {
  const [authType, setAuthType] = useState<AUTH_TYPE>(AUTH_TYPE.REGISTER);
  if (!show) return null;

  const toggleAuth = () =>
    setAuthType(
      authType === AUTH_TYPE.LOGIN ? AUTH_TYPE.REGISTER : AUTH_TYPE.LOGIN
    );

  const toggleForgetPassword = () => setAuthType(AUTH_TYPE.FORGOT_PASSWORD);

  return (
    <div className="modal--container">
      <div className="modal--backdrop" onClick={onToggle} />
      <div className="modal--dialog">
        {authType === AUTH_TYPE.LOGIN && (
          <LoginForm
            onToggleAuth={toggleAuth}
            onToggleModal={onToggle}
            onToggleForgetPassword={toggleForgetPassword}
          />
        )}
        {authType === AUTH_TYPE.REGISTER && (
          <RegisterForm onToggleAuth={toggleAuth} />
        )}
        {authType === AUTH_TYPE.FORGOT_PASSWORD && (
          <ForgetPasswordForm onToggleAuth={toggleAuth} />
        )}
      </div>
      <style jsx>{`
        .modal--container {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .modal--backdrop {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .modal--dialog {
          position: absolute;
          top: 50%; /* position the top  edge of the element at the middle of the parent */
          left: 50%; /* position the left edge of the element at the middle of the parent */

          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          border-radius: 15px;
          background-color: white;
        }
      `}</style>
    </div>
  );
}

export default AuthModal;
