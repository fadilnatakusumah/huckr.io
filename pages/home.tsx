import axios from "axios";
import { NextPageContext } from "next";
import { AppContext } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { API } from "../consts/envs";
import { getCookie } from "../helpers/auth";
import { withAuthUser } from "../hocs/withAuthUser";

function Home({ user }: any) {
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  return (
    <Layout>
      <h1>HOME PAGE</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
}

// Home.getInitialProps = async ({ req }: NextPageContext) => {
//   const token = getCookie("token", req!);
//   if (!token) {
//     return { user: {} };
//   }

//   try {
//     const resp = await axios.get(`${API}/user/me`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return { user: resp.data.data };
//   } catch (error) {
//     return { user: {} };
//   }
// };

export default withAuthUser(Home);
