// App.jsx
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import { useState, useReducer, useEffect } from "react";
import * as memoApi from './api/memos'; 
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import MemoForm from "./pages/MemoForm";
import NotFounde from "./pages/NotFound";
import Layout from './components/Layout';
import { ThemeContext } from './context/ThemeContext';

const memoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEMOS':
      return action.payload;

    case 'ADD_MEMO':
      return [action.payload, ...state];

    case 'UPDATE_MEMO':
      return state.map(memo =>
        (memo.id === action.payload.id)
          ? action.payload 
          : memo
      );

    case 'DELETE_MEMO':
      return state.filter(memo =>
        memo.id !== action.payload
      );

    case 'FIX_MEMO':
      return state.map(memo =>
        memo.id === action.payload.id 
        ? action.payload 
        : memo
      );

    default:
      return state;
  }
};


function App(){
  const [theme, setTheme] = useState('light');
  const [memos, dispatch] = useReducer(memoReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemos = async () => {
      setIsLoading(true);
      try {
        const data = await memoApi.getAllMemos({ q: searchQuery });
        dispatch({ type: 'SET_MEMOS', payload: data.items || data });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemos();
  }, [searchQuery]);

      
          //메모 생성
        const handleCreate = async (title, content) => {
          try {
            const newMemo = await memoApi.createMemo({ title, content });
            dispatch({ type: 'ADD_MEMO', payload: newMemo }); 
          } catch (err) {
            setError('추가에 실패했습니다');
            console.error(err)
          }
        };
      
        //메모 수정
        const handleUpdate = async (id, changes) => {
          try{
            const update = await memoApi.updateMemo(id, changes);
            dispatch({ type: 'UPDATE_MEMO', payload: update });
          } catch(err){
            setError('수정에 실패했습니다.');
            console.error(err);
          }
        };
      
        //메모 삭제
        const handelDelete = async (id) => {
          try{
            await memoApi.deleteMemo(id);
            dispatch({ type: 'DELETE_MEMO', payload: id });
          } catch (err){
            setError('삭제에 실패했습니다.');
            console.error(err);
          }
        };
      
        //핀 고정
        const handleFix = async (id, isPinned) =>{
          try{
            const updated = await memoApi.fixMemo(id, {isPinned : !isPinned});
      
            dispatch({ type: 'FIX_MEMO', payload: updated });
          } catch (err){
            setError('핀 설정 실패');
            console.error(err);
          }
        };
  

  const toggleTheme =() =>
    setTheme(t => t=== 'light' ? 'dark' : 'light');


  return(
    <>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme}`}>
        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Home 
              memos={memos} 
              isLoading={isLoading}
              error={error}
              dispatch={dispatch}
              setSearchQuery={setSearchQuery}
              addMemo={handleCreate} 
              updateMemo={handleUpdate} 
              deleteMemo={handelDelete}
              fixMemo={handleFix}
            />} />

            <Route path="/memos/new" element={<MemoForm
              memos={memos}  
              addMemo={handleCreate}
              updateMemo={handleUpdate}
              editingMemo={handelDelete}
            />} />

            <Route path="/memos/:id" element={<Detail  
              memos={memos}
              deleteMemo={handelDelete}
              />} />

            <Route path="/memos/:id/edit" element={<MemoForm
              updateMemo={handleUpdate}
              memos={memos}
            />} />
            
            <Route path="*" element={<NotFounde />} />
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
    </>
  );

};
export default App;