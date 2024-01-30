import styled from "styled-components";
import { usePagination } from "./PaginationContext";

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

export const Pagination = () => {
  const { page, setPage, totPage } = usePagination();

  return (
    <StyledPagination>
      {Array.from({ length: totPage }, (_, index) => index + 1).map(
        (number, index) => (
          <StyledButton
            tabIndex={index}
            className="page"
            $on={number === page+1}
            onClick={() => setPage(number-1)}
          >
            {number}
          </StyledButton>
        )
      )}
    </StyledPagination>
  );
};
