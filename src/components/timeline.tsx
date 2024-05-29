import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display:flex;
    gap:10px;
    flex-direction:column;
    overflow-y:scroll;
    overflow-y:hidden;
`;

export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([]); // ITweet 배열이고 기본값은 빈 배열
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"), // tweets 컬렉션을 대상으로 지정, firestore 인스턴스를 매개변수로(db)
                orderBy("createdAt", "desc"), // createdAt 기준으로 정렬
                limit(25) // 트윗 개수 제한(비용 절약)
            );
            /* const snapshot = await getDocs(tweetsQuery); // 문서 가져오기(getDocs)
            const tweets = snapshot.docs.map((doc) => {
                const { tweet, createdAt, userId, username, photo } = doc.data();
                return {
                    tweet, createdAt, userId, username, photo,
                    id: doc.id,
                }
            }); */
            // 데이터베이스 및 쿼리와 실시간 연결을 생성하고, 해당 쿼리에 새 요소가 생성, 요소가 삭제, 업데이트 됐을 때 쿼리에 알려줌
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => { // 트윗 객체 생성
                    const { tweet, createdAt, userId, username, photo } = doc.data();
                    return {
                        tweet, createdAt, userId, username, photo,
                        id: doc.id,
                    }
                });
                setTweet(tweets); // tweets 배열에 위 값들을 넣고 상태에 저장
            })
        };
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe(); //unsubscribe가 null이 아니라면 unsubscribe를 return함
            // timeline 컴포넌트를 안 볼때(유저 로그아웃, 다른 화면에 있을 때) cleanup이 실행됨
        }
    }, [])
    return <Wrapper>
        {tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
    </Wrapper>;
}