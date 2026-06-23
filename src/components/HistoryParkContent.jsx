import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination'

export default function HistoryParkContent({ myParkapp, cancelParkapp }) {
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
            {myParkapp.slice(indexOfFirstItem, indexOfLastItem)
                .map(({ parkappnum, parkappdate, parkusedate, payment, parkstate, carnum, spacecode }, index) => (
                    <div key={index} className="HistoryPark_content">
                        {/* <span>{parkappnum}</span> */}
                        <span>{parkappdate}</span>
                        <span>{parkusedate}</span>
                        <span>{carnum}</span>
                        <span>{spacecode.spacename}</span>
                        <span>{payment = 'cash' ? '현금' : '카드'}</span>
                        {/* <span>{parkstate = 'ing' ? '이용 중' : parkstate = 'Next' ? '이용 예정' : '이용 종료'}</span> */}
                        <span>
                            {(() => {
                                switch (parkstate) {
                                    case 'ing':
                                        return '이용중';
                                    case 'Next':
                                        return '이용 예정';
                                    case 'end':
                                        return '이용 종료';
                                    default:
                                        return '취소';
                                }
                            })()}
                        </span>
                        <span>
                            {parkstate === 'Next' ?
                                <button onClick={() => cancelParkapp(parkappnum, spacecode.spacecode)}>취소</button>
                                :
                                <button disabled>취소</button>}
                        </span>
                    </div>
                ))}
            <div className='pagenationBox'>
                <Pagination
                    // 현제 보고있는 페이지 
                    activePage={currentPage}
                    // 한페이지에 출력할 아이템 수
                    itemsCountPerPage={5}
                    // 총 아이템수
                    totalItemsCount={myParkapp.length}
                    // 표시할 페이지수
                    pageRangeDisplayed={5}
                    // 페이지 변경 시 동작 설정
                    onChange={handlePageChange}>
                </Pagination>
            </div>
        </div>
    )
}