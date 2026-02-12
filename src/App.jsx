// App.jsx
import './App.css'
import { useState, useEffect } from "react";
import * as memoApi from './api/memos'; // API 함수 뭉치 가져오기
import Header from './components/Header';
import MemoList from './components/MemoList';

function App() {
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);     // 입력 중인 값
  const [searchQuery, setSearchQuery] = useState('');    // 적용된 검색어


  //데이터 패칭
  const fetchMemos = async () => {
      setIsLoading(true); //로딩 시작 1. loading
      setError(null);
      try { //요청 + 성공처리 4. success
        const data = await memoApi.getAllMemos({q : searchQuery});
        console.log("서버 응답:", data);
        setMemos(data.items);//아이템 배열 구조
      } catch (err) { // 에러 처리 2. error
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        console.error("에러 발생",err);
      } finally { //로딩 종료 3. empty
        setIsLoading(false); 
      }
  };  
  useEffect(()=>{
      fetchMemos();
  }, [searchQuery]);


  //메모 생성
  const handleCreate = async (title, content) => {
    try {
      const newMemo = await memoApi.createMemo({ title, content });
      setMemos(prev => [newMemo, ...prev]);  // 앞에 추가
    } catch (err) {
      setError('추가에 실패했습니다');
      console.error(err)
    }
  };

  //메모 수정
  const handleUpdate = async (id, changes) => {
    try{
      const update = await memoApi.updateMemo(id, changes);
      setMemos(prev => prev.map(memo =>
        memo.id ===id? update : memo
      ));
    } catch(err){
      setError('수정에 실패했습니다.');
      console.error(err);
    }
  };

  //메모 삭제
  const handelDelete = async (id) => {
    try{
      await memoApi.deleteMemo(id);
      setMemos(prev => prev.filter(memo=> memo.id !== id));
    } catch (err){
      setError('삭제에 실패했습니다.');
      console.error(err);
    }
  };

  //핀 고정
  const handleFix = async (id, isPinned) =>{
    try{
      const updated = await memoApi.fixMemo(id, {isPinned : !isPinned});

      setMemos(prev=>prev.map(memo =>
        memo.id === id ? updated : memo
      ));
    } catch (err){
      setError('핀 설정 실패');
      console.error(err);
    }
  };

  return (
    <div className="App">

      <div className = 'loadingspiner'>
        {isLoading && <div className='Loading'>🟠로딩 중...</div>}
        {error && <div className="error">🔴에러: {error}</div>}
        {!isLoading && !error &&<div className="success">🟢 서버 연결됨</div>}
      </div>


      <div className="box1">
        <Header/>
      </div>


      <div className="box2">
          <MemoList
            memos={memos}
            setSearch={(val)=>setSearchQuery(val)}
            addMemo={handleCreate} 
            updateMemo={handleUpdate} 
            deleteMemo={handelDelete}
            fixMemo={handleFix}
            isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;