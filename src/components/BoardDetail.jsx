import './BoardDetail.css'

export default function BoardDetail() {
    return (
        <div>
            <p className='BoardDetail_title'>제목</p>
            <div className='BoardDetail_title_content'>
                <p>작성자</p>
                <p>작성자이름</p>
                <p>등록일시</p>
                <p>2024.03.21.14:57</p>
                <p>조회수</p>
                <p>9999+</p>
                <p>첨부파일</p>
                <p>첨부파일이름</p>
            </div>
            <p className='BoardDetail_content'>
                여기에 내용이 들어갑니다 줄넘김테스트 줄넘김테스트 줄넘김테스트 줄넘김테스트 줄넘김테스트
            </p>
        </div>
    );
};