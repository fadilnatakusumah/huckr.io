import axios from "axios";
import { NextPage } from "next";
import { WithRouterProps } from "next/dist/client/with-router";
import { Router, withRouter } from "next/router";
import { useEffect, useState } from "react";
import { API } from "../../../consts/envs";

interface IActivateAccount {
  router?: Router;
}

const ActivateAccount: NextPage<IActivateAccount & WithRouterProps> = (
  props: IActivateAccount
) => {
  const [isActive, setIsActive] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { router } = props;
  const token = router?.query.token;
  useEffect(() => {
    if (token) {
      axios
        .post(`${API}/auth/activate`, { token })
        .then((resp) => {
          console.log("🚀 ~ file: [token].tsx ~ line 24 ~ .then ~ resp", resp);
          setIsActive(true);
          setApiMessage(resp.data.message);
        })
        .catch((err) => {
          setIsActive(true);
          setApiMessage(err.response?.data?.message || "");
        });
    }
  }, [token]);

  return <div>{!isActive ? <h1> Loading...</h1> : <h1>{apiMessage}</h1>}</div>;
};

export default withRouter(ActivateAccount);
