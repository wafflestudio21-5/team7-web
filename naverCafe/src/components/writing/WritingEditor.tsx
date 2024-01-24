import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Wrapper = styled.div`
  & > .quill {
    & > .ql-toolbar {
      /* padding-left: 60px; */
      /* text-align: left; */
    }
    & > .ql-container {
      min-height: 300px;
      padding: 0 30px;
      padding-top: 50px;

      & > .ql-editor {
        &::before {
          text-indent: 30px;
        }
      }
    }
  }
`;
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
    ],
    handlers: {},
  },
};
const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "header",
  "list",
  "indent",
  "direction",
  "size",
  "color",
  "background",
  "font",
  "align",
];
interface PropsWritingEditor {
  inputContent: string;
  setInputContent: (value: string) => void;
}
const WritingEditor = ({
  // inputContent,
  setInputContent,
}: PropsWritingEditor) => {
  // content는 html 태그들로 이루어진 string으로 저장이 되는데, 이를 실제로 읽을 때는 dangerouslySetInnerHTML 을 사용해야지 해킹에서 벗어날 수 있다고 하네요

  return (
    <Wrapper>
      <ReactQuill
        placeholder="내용을 입력해주세요."
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={setInputContent}
      />
    </Wrapper>
  );
};

export default WritingEditor;
