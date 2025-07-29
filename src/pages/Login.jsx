import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

import Spinner from "../ui/Spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { isAuth, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (isAuth) return <Navigate to="/" replace />;

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
