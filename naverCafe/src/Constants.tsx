//baseURL 및 기타 상수
import { useWholeBoard } from "./API/BoardAPI";
import { ArticleType, type Cafe } from "./Types";

export const baseURL =
  //  "http://ec2-15-165-161-107.ap-northeast-2.compute.amazonaws.com:8080";
  "http://localhost:8080";


// eslint-disable-next-line react-refresh/only-export-components
export const waffleCafe: Cafe = {
  name: "와플 카페 Waffle Cafe",
  url: "https://wafflecafe.shop/",
  manager: "와플 매니저",
  createdAt: "2024.01.13 개설",
  location: "서울특별시 관악구",
  description: "와플스튜디오 team7의 토이프로젝트 카페입니다.",
};

//게시판은 거의 상수처럼 사용되기 때문에 추가했습니다.
export const BoardList = () => {
  const { boardList } = useWholeBoard();
  return boardList;
};

//테스트용

// eslint-disable-next-line react-refresh/only-export-components
export const aList: ArticleType[] = [
  {
    title: "첫번째 글입니다~~",
    id: 1,
    content: "첫번째 글의 내용입니다...",
    createdAt: "2024-01-12T12:00:00Z",
    viewCount: 33,
    likeCount: 3,
    commentCount: 4,
    author: {
      id: 1,
      nickname: "허유민",
      registerDate: "2024-01-01",
      email: "",
      rank: "",
      visitCount: 4,
      articlesCount: 5,
      commentsCount: 6,
      accessToken: "yumin22224",
    },
    board: { id: 3, name: "MySQL" },
    allowComments: true,
    isNotification: true,
  },
  {
    title: "두번째 글입니다~~",
    id: 2,
    content: "두번째 글의 내용입니다...",
    createdAt: "2024-01-12T12:00:00Z",
    viewCount: 33,
    likeCount: 3,
    commentCount: 4,
    author: {
      id: 1,
      nickname: "허유민",
      registerDate: "2024-01-01",
      email: "",
      rank: "",
      visitCount: 4,
      articlesCount: 5,
      commentsCount: 6,
      accessToken: "yumin22224",
    },
    board: { id: 2, name: "장고" },
    allowComments: true,
    isNotification: false,
  },
  {
    title: "세번째 글입니다~~",
    id: 3,
    content: "세번째 글의 내용입니다...",
    createdAt: "2024-01-12T12:00:00Z",
    viewCount: 33,
    likeCount: 3,
    commentCount: 4,
    author: {
      id: 1,
      nickname: "허유민",
      registerDate: "2024-01-01",
      email: "",
      rank: "",
      visitCount: 4,
      articlesCount: 5,
      commentsCount: 6,
      accessToken: "yumin22224",
    },
    board: { id: 1, name: "스프링" },
    allowComments: true,
    isNotification: false,
  },
];
