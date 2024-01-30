export type BoardType = {
  id: number;
  name: string;
};

export type GroupType = {
  id: number;
  name: string;
  boards: BoardType[];
};

export type BriefMyInfo = {
  nickname: string;
  rank: string;
  visit_count: number;
  my_article_count: number;
  my_comment_count: number;
  register_date: string;
  image?: string;
};
export type myProfile = {
  nickname: string;
  introduction: string;
  image: string;
};
export type ArticleBriefType = {
  content: ArticleType[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { empty: boolean; unsorted: boolean; sorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: { empty: boolean; unsorted: boolean; sorted: boolean; };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
export type ArticleType = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  author: {
    id: number;
    nickname: string;
    registerDate: string;
    email: string;
    rank: string;
    visitCount: number;
    articlesCount: number;
    commentsCount: number;
    accessToken?: string;
  };
  board: {
    id: number;
    name: string;
  };
  allowComments?: boolean;
  isNotification: boolean;
};

export type CommentType = {
  id: number;
  content: string;
  lastModified: string;
  nickname: string;
  recomments: {
    id: number;
    content: string;
    lastModified: string;
    nickname: string;
    isSecret: boolean;
  }[];
  isSecret: boolean;
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
