import client from './client';
//api 함수 정의
//http://54.180.25.65:3001/swagger/index.html#/

// 목록 조회(get)
export const getAllMemos = async (params = {}) => {
  const response = await client.get('/memos', { params });
  return response.data;
};

// 목록 조회(get)
export const getMemos = async (id ,params = {}) => {
  const response = await client.get(`/memos/${id}`, { params });
  return response.data;
};

// 생성(post)
export const createMemo = async (payload) => {
  const response = await client.post('/memos', payload);
  return response.data;
};

// 수정(patch)
export const updateMemo = async (id, payload) => {
  const response = await client.patch(`/memos/${id}`, payload);
  return response.data;
};

// 전체삭제(delete)
export const deleteAllMemo = async () => {
  await client.delete('/memos');
};
// 단일 삭제(delete)
export const deleteMemo = async (id) => {
  await client.delete(`/memos/${id}`);
};

// 핀 고정
export const fixMemo = async(id, payload) =>{
  const response = await client.patch(`/memos/${id}/pin`, payload);
  return response.data;
}