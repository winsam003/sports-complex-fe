import Pagination from 'react-js-pagination';
import './SearchAllContentsQna.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { apiCall } from '../apiService/apiService';

export default function SearchAllContentsQna({ qnaSearch }) {
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
    const QnaDetail = (e) => {
        let url = '/qna/qnadetail/'+e;
        apiCall(url, 'get', null, null)
            .then((response) => {
                console.log(response)
                navigate("/QnaDetailPage", { state: {qnaData: response} })
            }).catch((error) => {
                console.log("FaqControllPageDetail error =", error)
            })
    }




    return (
        <div className='SearchAllContents_Containor'>
            {qnaSearch && qnaSearch.length > 0 ? qnaSearch.slice(indexOfFirstItem, indexOfLastItem).map((it, index) => (
                <div className='SearchAllContents_Box'>
                    <div>
                        <span className='SearchAllContents_ContentsTitle' onClick={() => QnaDetail(it.qanum)}>{it.qatitle}</span>
                        <span className='SearchAllContents_ContentsDate'>{it.qadate}</span>
                    </div>
                    <div>{it.qacontent}</div>
                    <div className='SearchAllContents_ContentsLocation'>문의게시판</div>
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
                    totalItemsCount={qnaSearch && qnaSearch.length}
                    // 표시할 페이지수
                    pageRangeDisplayed={5}
                    // 페이지 변경 시 동작 설정
                    onChange={handlePageChange}>
                </Pagination>
            </div>
        </div>
    )
}