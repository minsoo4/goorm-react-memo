import './style/MemoItem.css'

function MemoItem({memo, deleteMemo, onEdit, fixMemo}){
  const { id, title, content, isPinned, createdAt, updatedAt} = memo;


// 삭제 버튼 클릭 함수
  const onClickDelete=()=>{
    if (window.confirm("이 메모를 삭제할까요.")){
      deleteMemo(id);
    };
  };

  const onClickPin = ()=>{
    fixMemo(id, isPinned);
  };

  return(
    <div className="MemoItem">
      <input 
        type="checkbox"
      />
      
      <div className="info-box">
        <div className="title">{title}</div>
        <div className="content">{content}</div>

        <div className="createdAt">
          작성 : {new Date(createdAt).toLocaleString()}
        
        </div>
        {updatedAt !== createdAt &&(
        <div className="createdAt">
          수정 : {new Date(updatedAt).toLocaleString()}
        </div>
        )}
      </div>
      
      <div className="button-set" >
        <button 
          onClick={onClickPin}
          style={{backgroundColor:isPinned
                          ? 'orange'
                          : 'white'
          }}
        >
          📌
        </button>
        <button onClick={onEdit}>수정</button>
        <button onClick={onClickDelete}>삭제</button>
      </div>

    </div>
  );
}

export default MemoItem;

