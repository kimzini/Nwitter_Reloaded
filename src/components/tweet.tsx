import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
    display:grid;
    grid-template-columns:3fr 1fr;
    padding:20px;
    border:1px solid rgba(255, 255, 255, 0.5);
    border-radius:15px;
`;

const Column = styled.div`

`;

const Photo = styled.img`
    width:100px;
    height:100px;
    border-radius:15px;
`;

const Username = styled.span`
    font-weight:600;
    font-size:15px;
`;

const Payload = styled.p`
    margin:10px 0px;
    font-size:18px;
`;

const DeleteButton = styled.button`
    background-color:tomato;
    color:white;
    font-weight:600;
    border:0;
    font-size:12px;
    padding:5px 10px;
    text-transform:uppercase;
    border-radius:5px;
    cursor:pointer;
`;


export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
    const user = auth.currentUser;
    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this tweet?");
        if (!ok || user?.uid !== userId) return; // 로그인한 유저 ID와 트윗 작성자 ID가 같지 않으면 함수종료
        try {
            await deleteDoc(doc(db, "tweets", id)); // tweets 컬렉션에 있는 문서 삭제(문서 ID는 timeline 컴포넌트에서 받음)
            if (photo) { // 사진 있는지 확인
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`); // storage 인스턴스 제공, 경로 제공(사진 경로 : tweets 폴더안의 userid 폴더), 사진명 = 트윗ID
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {
            //
        }
    };
    return <Wrapper>
        <Column>
            <Username>{username}</Username>
            <Payload>{tweet}</Payload>
            {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
        </Column>
        <Column>
            {photo ? (<Photo src={photo} />) : null}
        </Column>
    </Wrapper>
}