import { useState } from 'react';
import './BoardSearchList.css'
import BoardSearchList2 from './BoardSearchlist2';
import Pagination from 'react-js-pagination'

export default function BoardSearchList({ noticeList }) {

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 아이템 수
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // 페이지 변경 시 동작 설정
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 보여줄 아이템의 인덱스 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return (
        <div>
            <div className='BoardSearchList'>
                <div className='BoardSearchList_div'>
                    <p>번호</p>
                    <p>제목</p>
                    <p>공지대상</p>
                    <p>작성일</p>
                    <p>작성자</p>
                    <p>조회수</p>
                </div>

                {noticeList && noticeList
                    .slice(indexOfFirstItem, indexOfLastItem)
                    .map((it, index) => (
                    <BoardSearchList2 key={index} {...it} />))
                }

            </div>
            <div className='pagenationBox'>
                <Pagination
                    // 현제 보고있는 페이지 
                    activePage={currentPage}
                    // 한페이지에 출력할 아이템 수
                    itemsCountPerPage={5}
                    // 총 아이템수
                    totalItemsCount={noticeList.length}
                    // 표시할 페이지수
                    pageRangeDisplayed={5}
                    // 페이지 변경 시 동작 설정
                    onChange={handlePageChange}>
                </Pagination>
            </div>
        </div>
    )
}