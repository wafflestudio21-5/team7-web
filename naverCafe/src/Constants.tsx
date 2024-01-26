//baseURL 및 기타 상수
import { useWholeBoard } from "./API/BoardAPI";
import { ArticleType, type Cafe } from "./Types";

export const baseURL = "http://localhost:8080";

export const waffleCafe: Cafe = {
  name: "와플카페",
  url: "https://cafe.naver.com/wafflecafe",
  manager: "매니저",
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

export const aList: ArticleType[] = [
  {
    title: "첫번째 글입니다~~",
    id: 1,
    content: "첫번째 글의 내용입니다...",
    nickname: "허유민",
    created_at: "2024-01-12T12:00:00Z",
    view_cnt: 33,
    like_cnt: 3,
    like_users: [
      { nickname: "사용자A", liked_at: "2024-01-21T12:00:00Z" },
      { nickname: "사용자B", liked_at: "2024-01-21T12:00:00Z" },
      { nickname: "사용자B", liked_at: "2024-01-21T12:00:00Z" },
    ],
    user: {
      nickname: "허유민",
      username: "yumin22224",
    },
    board: { board_id: 3, board_name: "MySQL" },
    allow_comments: true,
    is_notification: true,
  },
  {
    title: "두번째 글입니다~~",
    id: 2,
    content: "두번째 글의 내용입니다...",
    nickname: "허유민",
    created_at: "2024-01-14T12:00:00Z",
    view_cnt: 10,
    like_cnt: 1,
    like_users: [
      { nickname: "사용자A", liked_at: "2024-01-21T12:00:00Z" },
    ],
    user: {
      nickname: "허유민",
      username: "yumin22224",
    },
    board: { board_id: 1, board_name: "스프링" },
    allow_comments: true,
    is_notification: true,
  },
  {
    title: "세번째 글입니다~~",
    id: 3,
    content: "세번째 글의 내용입니다...",
    nickname: "허유민",
    created_at: "2024-01-18T12:00:00Z",
    view_cnt: 3,
    like_cnt: 0,
    like_users: [],
    user: {
      nickname: "허유민",
      username: "yumin22224",
    },
    board: { board_id: 3, board_name: "MySQL" },
    allow_comments: true,
    is_notification: false,
  },
];
