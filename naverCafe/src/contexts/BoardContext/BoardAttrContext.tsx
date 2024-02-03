//head 유무
//Home: x , 나머지: o

//좋아요 유무
//Home: x, Total: x, Popular: o&x, Common: o

export type Boards =
  | "HomeBoard"
  | "TotalBoard"
  | "PopularBoard"
  | "CommonBoard"
  | "SearchBoard";

export type BoardType = {
  type: string;
  likeCol?: boolean | string;
  firstCol: string;
  noticeRow: boolean;
  head: boolean;
};

export type BoardAttrType = {
  [key in Boards]: BoardType;
};

export const boardAttribute: BoardAttrType = {
  HomeBoard: {
    type: "home",
    likeCol: false,
    firstCol: "dot",
    noticeRow: true,
    head: false,
  },
  TotalBoard: {
    type: "total",
    likeCol: false,
    firstCol: "boardName",
    noticeRow: true,
    head: true,
  },
  PopularBoard: {
    type: "popular",
    firstCol: "ranking",
    noticeRow: false,
    head: true,
  },
  CommonBoard: {
    type: "common",
    likeCol: "sort",
    firstCol: "number",
    noticeRow: true,
    head: true,
  },
  SearchBoard: {
    type: "popular",
    likeCol: false,
    firstCol: "number",
    noticeRow: false,
    head: true,
  },
};
