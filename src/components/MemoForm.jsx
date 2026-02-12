import './style/MemoForm.css'
import {useState, useRef, useEffect} from 'react'

function MemoForm({addMemo, updateMemo, editingMemo, setEditingMemo}){
  const[title, setTitle] = useState("");
  const[content, setContent] = useState(""); // 입력값 상태 관리

  const inputRef = useRef(); // 입력창에 포커스 주기 위한 ref

  //제목 내용 전송 이벤트 핸들러
  const onChangeTitle=(e)=>setTitle(e.target.value);
  const onChangeContent = (e) => setContent(e.target.value);
  const totalSubmit=(e)=>{
    e.preventDefault() // 새로고침 방지
    
    title.trim() === "" || content.trim() === ""
      ? alert("빈칸입니다.") 
      : (editingMemo 
        ? updateMemo(editingMemo.id, {title, content}) //수정
        : addMemo(title, content)// 추가
      );
    //입력창 초기화
    setTitle("");
    setContent("");
    inputRef.current.focus() 
  };
  //수정 취소버튼 클릭 시 로직
  const onCancel = () =>{
    setEditingMemo(null);
    setTitle("");
    setContent("");
  };
  //수정 시
  useEffect(()=>{
    if (editingMemo) { //editingMemo = true 이전 내역 채우기
      setTitle(editingMemo.title);
      setContent(editingMemo.content);
      inputRef.current.focus();
      } else {
        setTitle('');
        setContent('');
      }
    }, [editingMemo]); //변경될 때만 실행!

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
}

export default MemoForm;

