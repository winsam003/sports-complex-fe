import './XQnaControllContent.css'
import XQnaSearchResult from './XQnaSearchResult'
import Submenu from './Submenu';
import XQnaSearchBox from './XQnaSearchBox';
import { useState, useEffect } from 'react';
import { apiCall } from '../apiService/apiService';
import Pagination from 'react-js-pagination'

export default function XQnaControllContent() {
    const [qna, setqna] = useState([]);
    // 선택된 문의게시글 정보
    const [selectedQnaBoard, setSelectedQnaBoard] = useState([]);
    // 검색 이용을 위한 select과 input
    const [qnaSearchSelect, setQnaSearchSelect] = useState('전체');
    const [qnaSearchInput, setQnaSearchInput] = useState('');
    // 검색 기능
    const [searchResult, setSearchResult] = useState([]);

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 문의게시글 불러오기
    useEffect(() => {
        const loadQnaList = async () => {
            let url = '/qna/qnaList';

            apiCall(url, 'get', null, null)
                .then((response) => {
                    setqna(response);
                    // 처음 접근 시 모든 데이터를 출력
                    setSearchResult(response);
                }).catch((error) => {
                    console.error("QnA 목록 불러오기 실패", error);
                });
        }
        loadQnaList();
    }, [selectedQnaBoard]);

    // 문의게시글 선택하기
    const handleToggleCheckbox = (qanum) => {
        setSelectedQnaBoard(prevState => {
            if (prevState.includes(qanum)) {
                return prevState.filter(num => num !== qanum);
            } else {
                return [...prevState, qanum];
            }
        });
    };

    // 문의게시글 선택 초기화
    const handleResetSelection = () => {
        setSelectedQnaBoard([]);
    };

    // 선택된 문의게시글 apiCall 요청 보내고 삭제하기
    const handleDeleteSelectedQna = (() => {
        if (selectedQnaBoard.length === 0) {
            // console.log(" 선택된 목록이 없습니다 ");
            return;
        }

        let url = '/qna/qnaDelete';

        apiCall(url + `?qanum=${selectedQnaBoard.join('&qanum=')}`, 'get', null, userData.token)
            .then(() => {
                // 삭제 후 선택된 목록 배열 초기화
                setSelectedQnaBoard([]);
            }).catch((error) => {
                console.error(`문의게시판 삭제 실패 `, error);
            });
    });

    // 검색 기능
    const handleSearch = () => {
        setSearchResult(qna.filter(qna => {
            switch (qnaSearchSelect) {
                case '전체':
                    return Object.values(qna).some(val =>
                        String(val).toLowerCase().includes(qnaSearchInput.toLowerCase())
                    );
                case '문의 종류':
                    return qna.qatype.toLowerCase().includes(qnaSearchInput.toLowerCase());
                case '제목':
                    return qna.qatitle.toLowerCase().includes(qnaSearchInput.toLowerCase());
                case '작성자':
                    return qna.member.id.toLowerCase().includes(qnaSearchInput.toLowerCase());
                case '내용':
                    return qna.qacontent.toLowerCase().includes(qnaSearchInput.toLowerCase());
                default:
                    return true; // 전체일 경우 모든 항목을 반환합니다.
            }
        }) || []);
    };

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
        <div className='XQnaControllContent_div'>
            <Submenu />
            <div className='XQnaControllContent_div_div'>
                <XQnaSearchBox onSearch={handleSearch}
                    qnaSearchSelect={qnaSearchSelect}
                    setQnaSearchSelect={setQnaSearchSelect}
                    qnaSearchInput={qnaSearchInput}
                    setQnaSearchInput={setQnaSearchInput} />
                <div className='XBoardControllContent_SearchResult_div'>
                    {/* 조회결과 index */}
                    <div className='XQnaControllContent_index'>
                        <p>선택</p>
                        <p>번호</p>
                        <p>공개여부</p>
                        <p>제목</p>
                        <p>작성자</p>
                        <p>작성일</p>
                        <p>답변여부</p>
                        <p>조회수</p>
                    </div>
                    <div>
                        {searchResult && searchResult
                            .slice(indexOfFirstItem, indexOfLastItem)
                            .map((item, index) => (
                                <XQnaSearchResult key={index} {...item} onToggleCheckbox={handleToggleCheckbox} isChecked={selectedQnaBoard.includes(item.qanum)} userData={userData} />
                            ))}
                    </div>
                </div>
                {/* 초기화 삭제 버튼 */}
                <div className='XResetDeleteBtn'>
                    <button onClick={handleResetSelection}>초기화</button>
                    <button onClick={handleDeleteSelectedQna}>삭제</button>
                </div>
                <div className='pagenationBox'>
                    <Pagination
                        // 현제 보고있는 페이지 
                        activePage={currentPage}
                        // 한페이지에 출력할 아이템 수
                        itemsCountPerPage={5}
                        // 총 아이템수
                        totalItemsCount={searchResult.length}
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
