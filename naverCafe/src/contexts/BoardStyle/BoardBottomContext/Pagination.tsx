import styled from "styled-components";
import { usePagination } from "./PaginationContext";
import { itemsPerPage } from "../../../Constants";
import { useEffect } from "react";

//currentPage, non-currentPage css 미구현

const StyledPagination = styled.div`
  background-color: #f9f9f9;
  margin-top: 32px;
  height: 40px;
  padding-top: 16px;
  text-align: center;
`;

const StyledButton = styled.button<{ $on: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0 2px;
  box-sizing: border-box;
  line-height: 24px;
  font-family: arial, sans-serif;
  border: solid 1px ${(props) => (props.$on ? "#e5e5e5" : "transparent")};
  background-color: ${(props) => (props.$on ? "#fff" : "transparent")};
  color: ${(props) => (props.$on ? "#03c75a" : "#333")};

  &:hover {
    text-decoration: underline;
  }
`;

export const Pagination = ({ boardId }: { boardId: number }) => {
  const { currentPage, articleLength, setCurrentPage } = usePagination(boardId);

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(articleLength! / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledPagination>
      {pageNumbers.map((number) => (
        <StyledButton
          className="page"
          $on={number === currentPage}
          onClick={() => {
            setCurrentPage(number);
          }}
        >
          {number}
        </StyledButton>
      ))}
    </StyledPagination>
  );
};
