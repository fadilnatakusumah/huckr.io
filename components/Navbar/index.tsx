import { useState } from "react";
import Image from "next/image";

import AuthModal from "../AuthModal";
import { isAuth, logout } from "../../helpers/auth";
import Link from "next/link";

function Navbar() {
  const [isShowAuthModal, setShowAuthModal] = useState(false);
  const isAuthenticated = isAuth();
  return (
    <nav className="nav-container">
      <div>
        <Link href="/home">
          <a>
            <Image
              alt=""
              height={50}
              width={70}
              src="https://algogenes.com/wp-content/uploads/2021/01/logo-social-sq.png"
            />
          </a>
        </Link>
      </div>
      <ul className="list-container">
        <li>
          <input placeholder="Search for topics" />
        </li>
        {isAuthenticated && isAuthenticated.role === "ADMIN" && (
          <li>
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </li>
        )}

        {isAuthenticated ? (
          <li onClick={logout}>Logout</li>
        ) : (
          <li onClick={() => setShowAuthModal(true)}>Sign Up / Sign In</li>
        )}
      </ul>
      <AuthModal
        show={isShowAuthModal}
        onToggle={() => setShowAuthModal(!isShowAuthModal)}
      />{" "}
      <style jsx>{`
        .nav-container {
          padding: 10px 20px;
          display: flex;
          width: 100%;
          justify-content: space-between;
        }

        .list-container {
          list-style: none;
          display: flex;
          gap: 10px;
        }
        .list-container li {
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
