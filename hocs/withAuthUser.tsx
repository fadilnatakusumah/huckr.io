import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { FC, ReactNode } from "react";
import { API } from "../consts/envs";
import { getCookie } from "../helpers/auth";

interface IWithAuthUserProps {
  children: ReactNode;
}
// export function withAuthUser<T extends IWithAuthUserProps = IWithAuthUserProps>(
//   WrappedComponent: React.ComponentType<T>
// ) {
//   const Page = (props: Omit<T, keyof IWithAuthUserProps>) => (
//     <WrappedComponent {...props} />
//   );

//   return Page;
// }
export const withAuthUser = (WrappedComponent: NextPage) => {
  const Page = (props: any) => <WrappedComponent {...props} />;
  Page.getInitialProps = async (context: NextPageContext) => {
    const token = getCookie("token", context.req!);
    if (!token) {
      return context.res?.writeHead(302, { location: "/" });
    }

    try {
      const resp = await axios.get(`${API}/user/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        ...(WrappedComponent.getInitialProps
          ? await WrappedComponent.getInitialProps(context)
          : {}),
        user: resp.data.data,
        token,
      };
    } catch (error) {
      return context.res?.writeHead(302, { location: "/" });
    }
  };
  return Page;
};
