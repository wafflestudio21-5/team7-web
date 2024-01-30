// 맨 처음 뜨는 게시판(최신글 우선 정렬)
import styled from "styled-components";
import { StyledHomeBoard } from "../../../contexts/BoardStyle/BoardHeaderContext";
import { ArticleTable } from "../../../contexts/BoardStyle/ArticleBoardContext/Table";
import { boardAttribute } from "../../../contexts/BoardContext/BoardAttrContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentBoardContext } from "../../../contexts/BoardContext/CurrentBoardContext";
import { ArticleBriefType, ArticleType } from "../../../Types";
import { wholeArticle } from "../../../API/ArticleAPI";

const CafeIntro = styled.div`
  width: 860px;
  float: left;
  border-color: #eee;
  clear: both;
  box-sizing: border-box;
  border-style: solid;
  border-width: 4px;

  .gate-box {
    position: relative;
    margin: 0 8px;
  }
`;

const StyledTable = styled.table`
  width: 836px;
  table-layout: fixed;
  overflow: hidden;
  border-collapse: separate;
  margin: auto;

  .cafe_default_gate {
    padding: 40px 0 23px 46px;
    background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/bg-default-gate.svg);
    background-position: 490px 25px;
    background-repeat: no-repeat;
    background-size: 267px auto;

    text-align: left;

    .tit_default {
      font-size: 33px;
      line-height: 47px;
      font-weight: 600;
      color: #212121;
    }

    .txt_default {
      font-size: 16px;
      line-height: 24px;
      padding-top: 10px;
      font-weight: 200;
      color: #212121;

      margin: 16px 0 16px 0;
    }
  }
`;

const StyledHomeArticle = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const StyledBoardTitle = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid #666;
  color: #333;

  .list-tit {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h3 {
      margin: 0;
      padding: 0;
      max-width: 85%;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    span {
      padding-top: 2px;
      color: #999;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }

      &::after {
        display: inline-block;
        background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
        background-repeat: no-repeat;
        content: "";
        margin: 0 0 0 3px;
        background-position: -306px -171px;
        width: 6px;
        height: 10px;
        vertical-align: baseline;
      }
    }
  }
`;

// 26개까지 띄우고, 나머지 게시물은 띄우지 않습니다.
const HomeBoard = () => {
  const navigate = useNavigate();
  const { setCurBoardState } = useContext(CurrentBoardContext);
  const [wholeArticles, setWholeArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    setCurBoardState(-2);

    async function fetchWholeArticle() {
      try {
        const fetchedWholeArticles: ArticleBriefType = await wholeArticle(
          26,
          0
        );
        console.log(fetchedWholeArticles);
        setWholeArticles(fetchedWholeArticles.content);
      } catch (err) {
        console.log("Error fetching whole articles in HomeBoard");
      }
    }

    fetchWholeArticle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledHomeBoard>
      <CafeIntro>
        <div className="gate-box">
          <StyledTable>
            <tbody>
              <tr>
                <td style={{ height: "12px" }}></td>
              </tr>
              <tr>
                <td className="editorMainContent">
                  <div className="img_tit_area">
                    <div className="cafe_default_gate">
                      <strong className="tit_default">
                        카페에 오신 것을 환영합니다.
                      </strong>
                      <p className="txt_default">
                        혼자보단 둘이, 둘보단 셋이 더 재미있을 거예요. <br></br>
                        함께 재미있는 이야기 나누며 행복한 카페를 만들어가요!
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ height: "12px" }} className="td02"></td>
              </tr>
              <tr>
                <td style={{ height: "12px" }}></td>
              </tr>
            </tbody>
          </StyledTable>
        </div>
      </CafeIntro>
      <StyledHomeArticle>
        <StyledBoardTitle>
          <div className="list-tit">
            <h3 onClick={() => navigate("/totalboard")}>전체글보기</h3>
            <span onClick={() => navigate("/totalboard")}>더보기</span>
          </div>
        </StyledBoardTitle>
        <ArticleTable
          board={boardAttribute.HomeBoard}
          articleList={wholeArticles}
        ></ArticleTable>
      </StyledHomeArticle>
    </StyledHomeBoard>
  );
};
export default HomeBoard;
