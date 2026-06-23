import { useState } from 'react';
import './SearchAllContentsQna.css';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router';
import { apiCall } from '../apiService/apiService';

export default function SearchAllContentsQna({ eventSearch }) {

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

    const navigate = useNavigate();
    const EventDetail = (e) => {
        let token = null;
        let formDetail = {
            eventcode: e.toString(),
            stfid: null
        }
        console.log(formDetail)
        let url = '/event/eventdetail?eventcode=' + e;
        apiCall(url, 'post', formDetail, token)
            .then((response) => {
                navigate("/EventDetailPage?eventcode=" + e, { state: response })
            }).catch((error) => {
                console.log("EventDetailPage error =", error)
            })
    }

    return (
        <div className='SearchAllContents_Containor'>
            {eventSearch && eventSearch.length > 0 ? eventSearch.slice(indexOfFirstItem, indexOfLastItem).map((it, index) => (
                <div className='SearchAllContents_Box'>
                    <div>
                        <span className='SearchAllContents_ContentsTitle' onClick={() => EventDetail(it.eventcode)}>{it.eventname}</span>
                        <span className='SearchAllContents_ContentsDate'>{it.eventtime}</span>
                    </div>
                    <div>{it.eventdetail}</div>
                    <div className='SearchAllContents_ContentsLocation'>이벤트게시판</div>
                </div>
            ))
                :
                <div className='SearchAllContents_nodata'>검색 내용이 없습니다.</div>
            }
            <div className='pagenationBox'>
                <Pagination
                    // 현재 보고있는 페이지 
                    activePage={currentPage}
                    // 한페이지에 출력할 아이템 수
                    itemsCountPerPage={5}
                    // 총 아이템수
                    totalItemsCount={eventSearch && eventSearch.length}
                    // 표시할 페이지수
                    pageRangeDisplayed={5}
                    // 페이지 변경 시 동작 설정
                    onChange={handlePageChange}>
                </Pagination>
            </div>
        </div>
    )
}