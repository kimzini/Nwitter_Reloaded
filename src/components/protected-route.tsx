import { Navigate } from "react-router-dom";
import { auth } from "../firebase";


// firebase에게 로그인한 사용자가 누구인지 물어보는 route
export default function ProtectedRoute(
    { children }: {
        children: React.ReactNode;
    }) {
    const user = auth.currentUser; // 유저가 로그인했는지 알려줌 (user값을 넘겨주거나 null값을 넘겨줌)
    if (!user) {  // null이면 로그인 페이지로 user === null
        return <Navigate to="/login" />;
    }
    return children;
}