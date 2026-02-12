import './style/MemoSearch.css'
import { useState } from "react";

function MemoSearch({setSearch}) {
  const [inputValue, setInputValue] = useState(''); 

  return (
    <div className="MemoSearch">
      <div className="search-bar">
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="검색어를 입력하세요..." 
        />
        <button onClick={()=>{setSearch(inputValue)}}> 
          검색
        </button>
      </div>


      <div className="filter-container">
        <div className="filter-item">
          <p>정렬기준</p>
          <select>
            <option value="생성일">생성일</option>
          </select>
        </div>

        <div className="filter-item">
          <p>정렬순서</p>
          <select>
            <option value="내림차순">내림차순</option>
            <option value="오름차순">오름차순</option>
          </select>
        </div>

        <div className="filter-item">
          <p>핀 고정 필터</p>
          <select>
            <option value="전체">전체</option>
            <option value="핀고정">핀 고정만</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MemoSearch;