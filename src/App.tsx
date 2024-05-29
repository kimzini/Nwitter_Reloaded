import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import FindPassword from "./routes/find-password";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([ //배열을 routes에 전달
  {
    path: "/", // (슬래시)모든 경로와 맞아떨어짐
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ), // ProtectedRoute를 사용해서 layout은 로그인한 사용자만 사용할 수 있도록 함 (기본화면 => login)
    children: [ // route를 넣을 또 다른 배열
      {// 이 둘은 layout component 내부에서 render되고 있음
        path: "", // 경로에 아무것도 없을 때
        element: <Home />,
      },
      {
        path: "profile", // http://localhost:5173/profile 
        element: <Profile />,
      },
    ]
  },
  { // login이랑 create-account가 layout안에 들어가지 않도록 children 밖에서 작성
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/find-password",
    element: <FindPassword />,
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color:white;
    font-family: system-ui;
  }
`;

const Wrapper = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady(); // firebase를 통해서 로그인 여부를 알 수 있기를 기다림
    // 최초 인증 상태가 완료될 때 실행되는 promise를 return함
    setLoading(false);
  }
  useEffect(() => {
    init();
  }, []);
  return <Wrapper>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </Wrapper>;
}

export default App;
