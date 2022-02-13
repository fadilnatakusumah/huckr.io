import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { isAuth } from "../helpers/auth";

const Home: NextPage = () => {
  useEffect(() => {
    if (isAuth()) Router.push("/home");
  }, []);
  return <Layout>Hello World</Layout>;
};

export default Home;
