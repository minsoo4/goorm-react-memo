import './style/MemoList.css'
import { useState } from 'react'
import MemoForm from './MemoForm'
import MemoItem from './MemoItem'
import MemoSearch from './MemoSearch'

function MemoList({ memos, setSearch, addMemo, updateMemo, deleteMemo, isLoading, fixMemo}) {

  const [editingMemo, setEditingMemo] = useState(null);

  const clickEditing = (memo) =>{
    setEditingMemo(memo);
  };

  const latestMemos = [...memos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const pinned = latestMemos.filter(memo => memo.isPinned === true);
  const unpinned = latestMemos.filter(memo => memo.isPinned !== true);

  const lineUpMemo = [...pinned, ...unpinned];


  return (
    <div className="MemoList">
      <MemoSearch
        setSearch={setSearch}
      />

      <MemoForm 
        addMemo={addMemo}
        updateMemo={updateMemo}
        editingMemo={editingMemo}
        setEditingMemo={setEditingMemo}
      />

      <h2>메모 목록 ({memos.length}개)</h2>


      {memos.length === 0 && !isLoading 
      ? <p>작성된 메모가 없습니다.</p> 
      : (lineUpMemo.map((memo) => (
          <MemoItem
            key={memo.id}
            memo={memo}
            updateMemo={updateMemo}
            deleteMemo={deleteMemo}
            fixMemo={fixMemo}
            onEdit={()=> clickEditing(memo)}
          />
        ))
      )}
    </div>
  );
}

export default MemoList;
