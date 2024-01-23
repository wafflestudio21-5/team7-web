

export type Board = {
  id: number;
  name: string;
};

export type Article = {
  id: number;
  title: string;
  createdAt: string;
  viewCnt: number;
  likeCnt: number;
  comment_count: number;
  user: { id: number; username: string };
  board: Board;
  isNotification: boolean;
};

//GET (activity)
/* 제외한 사항: 모바일카페명 & 카페아이콘, 카페 스탭, 주제, 카페 검색어, 카페 성격, 가입 방식, 카페 활동 - 총 방문자, 우리 카페 바로가기 앱 추가수, 카페 랭킹, 멤버 관리 */
export type Cafe = {
  name: string; //카페 이름
  url: string; //카페 주소
  manager: string; //카페 매니저
  createdAt: string; //카페 설립일
  location: string; //지역
  description: string; //카페 설명
  /* activity: { memberCount: number; articleCount: number }; */
  //activity만 서버로부터 받아오면 될 것 같습니다.
  //CafeAPI에 따로 빼두었습니다.
};

//DELETE
//GET을 했을 때 서버로부터 배열이 온다면 POST로도 구현이 가능하다.
//
