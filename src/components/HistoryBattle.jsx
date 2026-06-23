import { useEffect, useState } from 'react';
import './HistoryBattle.css'
import HistoryRentalBattleContents from './HistoryRentalBattleContents';
import { apiCall } from '../apiService/apiService';
import Pagination from 'react-js-pagination'

export default function HistoryBattle({ token, getUserID }) {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        let url = '/spaceRentApp/historyBattle';
        let id = getUserID;
        apiCall(url, 'post', id, token)
            .then((response) => {
                setHistory(response);
            }).catch((error) => {
                console.log("HistroyRental error Occured = " + error);
            })
    }, [])


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
        <div className="HistoryBattle_box">
            <div className="HistoryBattle_index">
                <span>대관신청번호</span>
                <span>장소명</span>
                <span>경기신청일자</span>
                <span>금액</span>
                <span>결제방법</span>
                <span>경기신청여부</span>
                <span>상태</span>
            </div>
            <div>
                {history.slice(indexOfFirstItem, indexOfLastItem)
                    .map((item, index) => (
                        <HistoryRentalBattleContents key={index} {...item} token={token} />
                    ))}
            </div>
            <div className='pagenationBox'>
                <Pagination
                    // 현제 보고있는 페이지 
                    activePage={currentPage}
                    // 한페이지에 출력할 아이템 수
                    itemsCountPerPage={5}
                    // 총 아이템수
                    totalItemsCount={history.length}
                    // 표시할 페이지수
                    pageRangeDisplayed={5}
                    // 페이지 변경 시 동작 설정
                    onChange={handlePageChange}>
                </Pagination>
            </div>
        </div>
    )
}