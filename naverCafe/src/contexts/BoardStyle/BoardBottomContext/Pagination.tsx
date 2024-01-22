import styled from "styled-components";
import { usePagination } from "./PaginationContext";
import { itemsPerPage } from "../../../Constants";

const StyledPagination = styled.div`
  background-color: #f9f9f9;
  margin-top: 32px;
  height: 40px;
  padding-top: 16px;
  text-align: center;

  button {
    all: unset;
  }

  .page {
    border: solid 1px #e5e5e5;
    background-color: #fff;
    color: #03c75a;

    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 0 2px;
    box-sizing: border-box;
    line-height: 24px;
    font-family: arial, sans-serif;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Pagination = ({ boardId }: { boardId: number }) => {
  const { articleLength, setCurrentPage } = usePagination(boardId);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(articleLength! / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
    
  return (
    <StyledPagination>
      {pageNumbers.map((number) => (
        <button className="page" onClick={()=>setCurrentPage(number)}>{number}</button>
      ))}
    </StyledPagination>
  );
};


