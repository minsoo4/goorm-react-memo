## 실행 방법

### 라이브러리 설치

```bash
npm install
npm install react-router-dom
```

### 서버 실행

```bash
npm run dev
```

- 로컬 서버 접속: [http://localhost:3000/](http://localhost:5173/)
   
   1. **API 파일 구조**
      
      client.js - 공통 axios 생성
      memos.js - 서버 로직 구형
   
   3. **상태 UI 설명**
      
      
      Loding - isLoading true 상태인 경우 화면 ui에 주황불로 로딩중.. 표시
      
      Error - error 값이 있는 경우 콘솔 표시 및 ui에 빨간불로 에러 - 메시지 표시
      
      Empty - 빈값인 경우 MemoList.jsx html 배열 길이가 0인 경우 텍스트 표시
      
      Succes - 로딩 에러가 아닌 경우 초록불로 상단에 표시.
   
   5. **CRUD 구현 설명**
   
   
      getAllMemos로 전체 데이터 호출 및 로드
   
      Creat(handleCreate)
      - 제목과 내용을 입력 후 서버로 전송.
        서버에서 받은 새 메모 객체를 기존 memos 배열 앞에 추가.
        setMemos(prev => [newMemo, ...prev])
   
      Read(fetchMemos)
      - useEffect로 컴포넌트를 사용 중일 때만 서버에서 데이터 불러옴.
        서버에서 받은 데이터는 setMemos에 저장 후 업데이트.
   
      Update(handleUpdate)
      - api 호출 후 map 메서드로 배열을 탐색해 전체 메모 중 수정된 메모만 업데이트.
        memo.id === id ? update : memo
   
      Delete(handleDelete)
      - filter 메서드로 삭제된 메모의 ID를 제외한 나머지 메모로만 리스트로 상태 업데이트.
        memo.id !== id
   
   6. (선택 확장을 했다면) 무엇을 구현했는지
      
      handleFix - 메모의 중요도 버튼으로 상단에 고정 및 정렬하는 기능
      map 배열 메서드로 객체의 isPinned 상태를 변경 후 정렬 로직을 구현하여 상단에 고정함.
   
      (!추후 기존 함수를 통해 정렬 기능 선택할 수 있도록 구현)
