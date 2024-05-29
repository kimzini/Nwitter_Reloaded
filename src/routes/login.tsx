import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Input, Switcher, Title, Wrapper, Error } from "../components/auth-components";
import GithubButton from "../components/github-btn";


export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password); // 이메일 주소와 비밀번호가 일치하지 않으면 알 수 있음
            navigate("/"); // 계정 만들고 사용자 프로필 업데이트한 후 홈화면으로 navigate
        } catch (e) { // 사용자에게 오류 표시
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return <Wrapper>
        <Title>Log into 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required /> {/*required -> 필수인 항목들에 넣어줌*/}
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
            <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <Switcher>
            <Link to="/find-password">Forgot your password?</Link>
        </Switcher>
        <GithubButton />
    </Wrapper>
}