import { useParams, useNavigate } from "react-router-dom";

const Detail = ({ memos, deleteMemo }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const memo = memos.find((m) => String(m.id) === String(id));

    const onClickDelete=()=>{
    if (window.confirm("이 메모를 삭제할까요.")){
      deleteMemo(id);

      navigate("/");
    };
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>
        목록으로
      </button>

      <h2>
        {memo?.title}
      </h2>

      <div>
        {memo?.content}
      </div>

      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
};

export default Detail;