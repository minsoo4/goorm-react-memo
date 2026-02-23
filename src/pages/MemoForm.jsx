import './style/MemoForm.css'
import {useState, useRef, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function MemoForm({addMemo, updateMemo, memos}){
  const { id } = useParams(); // 2. URL에서 id를 가져옵니다.
  const navigate = useNavigate();
  
  const editingMemo = Boolean(id);
  const targetMemo = memos?.find(m => String(m.id) === String(id));

  const[title, setTitle] = useState("");
  const[content, setContent] = useState(""); // 입력값 상태 관리

  const inputRef = useRef(); // 입력창에 포커스 주기 위한 ref
  
  useEffect(() => {
    if (editingMemo && targetMemo) {
      // 수정 모드: 기존 데이터 채우기
      setTitle(targetMemo.title);
      setContent(targetMemo.content);
      inputRef.current.focus();
    } else {
      // 작성 모드: 입력창 초기화
      setTitle("");
      setContent("");
    }
  }, [id, targetMemo, editingMemo]);

  //제목 내용 전송 이벤트 핸들러
  const onChangeTitle=(e)=>setTitle(e.target.value);
  const onChangeContent = (e) => setContent(e.target.value);
  const totalSubmit = (e) => {
    e.preventDefault(); 
    
    if (title.trim() === "" || content.trim() === "") {
      alert("빈칸입니다.");
      inputRef.current.focus();
      return; 
    }

    if (editingMemo) {
      updateMemo(id, { title, content });
      navigate(`/memos/${id}`); 
    } else {
      addMemo(title, content);
      navigate("/"); 
    }

    setTitle("");
    setContent("");
  };

    const onCancel = () => {
      navigate(-1); // 이전 페이지로 돌아가기
    };
  


  return(
      <form className ="MemoForm">
        <h2>{editingMemo 
              ? "메모 수정하기" 
              : "새 메모 작성"}
        </h2>
        <p>제목</p>
        <input
          ref={inputRef} 
          value={title}
          onChange={onChangeTitle} 
          placeholder="제목을 입력하세요."
        />
        <p>내용</p>
        <input
          value={content}
          onChange={onChangeContent} 
          placeholder="내용을 입력하세요."
        />
        <button onClick={totalSubmit}>
          {editingMemo 
            ? "수정완료"
            : "추가"}
        </button>
        {editingMemo && (
          <button type="button" onClick={onCancel}>
            취소
          </button>
        )}
      </form>
    );
  };
export default MemoForm;

