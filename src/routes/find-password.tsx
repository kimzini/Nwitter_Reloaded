import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
`;

const Form = styled.form`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 40px 30px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
`;

const Input = styled.input`
    padding: 15px 20px;
    border-radius: 50px;
    border: 1px solid #ddd;
    width: 100%;
    font-size: 16px;
    margin-bottom: 20px;
    box-sizing: border-box;

    &:focus {
        border-color: #888;
        outline: none;
    }
`;

const Send = styled.button`
    display: block;
    width: 100%;
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 14px;
    padding: 15px 20px;
    text-transform: uppercase;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e04c4c;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Message = styled.p`
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    color:black;
`;

export default function FindPassword() {
    const [isSending, setSending] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setSending(true);
            await sendPasswordResetEmail(auth, email);
            setMessage('Check your Email!');
        } catch {
            console.log(e);
        } finally {
            setSending(false);
        }
    };

    return <Wrapper>
        <Form onSubmit={onSubmit}>
            <Title>Reset Password</Title>
            <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} placeholder="Write your Email" type="email" required />
            <Send type="submit" value={isSending ? "Sending..." : "Send"}>Send!</Send>
            <Message>{message && <p>{message}</p>}</Message> {/*message가 빈 문자열 등과 같은 값이 아닐 경우 <p>태그 안에 message 변수 표시*/}
        </Form>
    </Wrapper>;
}
