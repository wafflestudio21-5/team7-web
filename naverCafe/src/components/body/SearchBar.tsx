import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculatePastDateISO,
  useSearch,
} from "../../contexts/BoardContext/SearchContext";
import { start } from "repl";
const Wrapper = styled.div`
  display: inline-block;
  width: 1080px;
  text-align: right;
`;
const SearchBarDiv = styled.div`
  display: flex;
  padding: 8px 0;
  position: relative;
  left: 778px;
  //position: relative로 위치를 맞추는 것이 적절한지 모르겠습니다.
  input {
    width: 232px;
    height: 33px;
    background-color: #fff;
    color: #333;
    border: 1px solid #d3d3d3;
    padding: 0px 6px;
  }
  button {
    width: 56px;
    height: 35px;
    background-color: #03c75a;
    font-size: 13px;
    border: none;
    color: #fff;
    box-sizing: border-box;
    cursor: pointer;
  }
`;

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { setItem, setContentOp, setStartDate, setEndDate } =
    useSearch();
  const navigate = useNavigate();
  const onClickSearch = () => {
    if (keyword === "") {
      alert("검색어를 입력하세요");
    } else {
      navigate(`/searchBoard/${keyword}`);
      setItem(keyword);
      setContentOp(0);
      setKeyword("");

      const now = new Date();
      setStartDate(calculatePastDateISO("전체기간"));
      setEndDate(now.toISOString().split(".")[0]);
    }
  };

  return (
    <Wrapper>
      <SearchBarDiv>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={() => onClickSearch()}>검색</button>
      </SearchBarDiv>
    </Wrapper>
  );
};
export default SearchBar;
