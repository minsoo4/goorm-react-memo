import './style/MemoList.css'
import { useNavigate } from 'react-router-dom'
import MemoItem from './MemoItem'
import MemoSearch from './MemoSearch'

function MemoList({ memos, setSearch, updateMemo, deleteMemo, isLoading, fixMemo}) {

  const navigate = useNavigate();

  const latestMemos = [...memos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const pinned = latestMemos.filter(memo => memo.isPinned === true);
  const unpinned = latestMemos.filter(memo => memo.isPinned !== true);

  const lineUpMemo = [...pinned, ...unpinned];


  return (
    <div className="MemoList">
      <MemoSearch
        setSearch={setSearch}
      />
    
      <div className="list-header">
        <h2>메모 목록 ({memos.length}개)</h2>
        <button onClick={() => navigate("/memos/new")}>
          메모 추가하기
        </button>
      </div>

      {memos.length === 0 && !isLoading 
      ? <p>작성된 메모가 없습니다.</p> 
      : (lineUpMemo.map((memo) => (
          <MemoItem
            key={memo.id}
            memo={memo}
            updateMemo={updateMemo}
            deleteMemo={deleteMemo}
            fixMemo={fixMemo}
          />
        ))
      )}
    </div>
  );
}

export default MemoList;
