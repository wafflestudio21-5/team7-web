//GET
//(사실 클라이언트 쪽에서 처리해도 되긴 하지만, 서버에서 보내준다면 편해질 것 같습니다.)
export type User_SideBar = {
  name: string;
  rank: number;
  cafeVisitCount: number;
  articleCount: number;
  commentCount: number;
  signUpDate: Date;
  favoriteBoards: string[];
};

//GET
export type User = {
  id: string;
  name: string;
  image: string;
  rank: number;
  bio: string;
  cafeVisitCount: number;
  /* articleCount: number; */

  /* string[] 배열로 한 이유는 클라이언트쪽에서 전체 article 배열을 받아서 처리하기 위함입니다. */
  /* 만약 벡엔드에서 잘 처리가 된다면..? 그냥 Article[]과 같은 배열로 해도 괜찮을 것 같습니다. */
  article: string[]; //작성글
  commentedArticle: string[]; //댓글단 글
  comment: string[]; //작성댓글
  like: string[]; //좋아요한 글 (내가 아닌 카페 멤버 페이지에서는 보이지 않습니다.)
};

//POST
export type UserSignUpInput = {
  id: string;
  password: string;
  email: string;
  name: string;
  birth: string;
  phoneNumber: string;
};

//POST
export type UserLoginInput = {
  id: string;
  password: string;
};

//POST, PATCH
export type UserProfileInput = {
  name: string;
  image: string;
  bio: string;
};

//GET
export type Comment = {
  id: number;
  authorId: string;
  createdAt: Date;
  content: string;
  reComment: Comment[];
};

//POST, PATCH
export type CommentInput = {
  content: string;
};

//DELETE
//query에 id

//GET
export type Article = {
  id: number;
  authorId: number;
  createdAt: Date;
  viewCount: number;
  board: string;

  isAnnouncement: boolean;
  title: string;
  content: string;
  likedUser: string[];
  comment: Comment[];
};

//POST, PATCH
export type ArticleInput = {
  board: string;
  title: string;
  content: string;
  isAnnouncement: boolean;

  /* tag: string; */
};

//DELETE
//query에 id

//GET
export type Board = {
  name: string;
  article: Article[];
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
