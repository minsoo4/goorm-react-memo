import MemoList from '../components/MemoList';


const Home = ({memos, isLoading, error, setSearchQuery, addMemo, updateMemo, deleteMemo, fixMemo}) =>{ 

  return (
    <>
      <div className = 'loadingspiner'>
        {isLoading && <div className='Loading'>🟠로딩 중...</div>}
        {error && <div className="error">🔴에러: {error}</div>}
        {!isLoading && !error &&<div className="success">🟢 서버 연결됨</div>}
      </div>

      <MemoList
            memos={memos}
            setSearch={(val)=>setSearchQuery(val)}
            addMemo={addMemo} 
            updateMemo={updateMemo} 
            deleteMemo={deleteMemo}
            fixMemo={fixMemo}
            isLoading={isLoading}
      />
    </>
  );
};

export default Home;