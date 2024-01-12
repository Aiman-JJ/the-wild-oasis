import styled from "styled-components";

import { useUser } from "./../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1) load authenticated users
  const { isAuthenticated, isLoading } = useUser();

  //2) if No auth then redirect to login pageXOffset

  useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3) show spinner while happening
  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );
  //4) if there is user, render the app

  if(isAuthenticated) return children;
}

export default ProtectedRoute;
