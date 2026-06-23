import Pagination from 'react-js-pagination';
import './XeventList.css'
import React, { useState } from 'react';

export default function XeventList({ eventlist, eventcodeC, checkedEvent, handleEvent }) {

    const handlecheckEvent = (eventcode) => {
        handleEvent(eventcode);
    }

        // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 아이템 수
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // 페이지 변경 시 동작 설정
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 보여줄 아이템의 인덱스 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    return (
        <div className='XeventList'>
            <div className='XeventList_div'>
                <span>선택</span>
                <span>번호</span>
                <span>제목</span>
                <span>작성자</span>
                <span>등록일시</span>
                {/* <span>첨부파일</span> */}
            </div>
            <div className='XeventList_content'>
                {eventlist
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((it, index) => (
                    <div key={index} className="XeventContentList_Box">
                        <div className="XeventContentList_contents">
                            <span><input type="checkbox"
                                value={it.eventcode}
                                checked={eventcodeC.includes(it.eventcode)}
                                onChange={(e) => handlecheckEvent(it.eventcode)}
                            /></span>
                            <span>{it.eventcode}</span>
                            <span>{it.eventname}</span>
                            <span>{it.stfid}</span>
                            <span>{it.eventdate}</span>
                        </div>
                    </div>
                ))}
                
                <div className='pagenationBox'>
                    <Pagination
                        // 현제 보고있는 페이지 
                        activePage={currentPage}
                        // 한페이지에 출력할 아이템 수
                        itemsCountPerPage={10}
                        // 총 아이템수
                        totalItemsCount={eventlist.length}
                        // 표시할 페이지수
                        pageRangeDisplayed={5}
                        // 페이지 변경 시 동작 설정
                        onChange={handlePageChange}>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

