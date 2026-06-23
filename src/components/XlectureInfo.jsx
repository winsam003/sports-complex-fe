import './XlectureInfo.css';
import Submenu from './Submenu';
import XlectureList from './XlecturerList';
import XlectureSerachBox from './XlectureSerachBox';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';
import Pagination from 'react-js-pagination'

export default function XlectureInfo({ onTeacherSelect, isSingleSelection }) {
    const [lecture, setLecture] = useState([]);
    // 검색 이용을 위한 select과 input
    const [lectureSearchSelect, setLectureSearchSelect] = useState('전체');
    const [lectureSearchInput, setLectureSearchInput] = useState('');
    // 검색 기능
    const [searchResult, setSearchResult] = useState([]);

    // 선택된 문의게시글 정보
    const [selectedLecture, setSelectedLecture] = useState([]);

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    const location = useLocation();

    // 강사 불러오기
    useEffect(() => {
        const loadLectureList = async () => {
            let url = '/teach/teachList';

            apiCall(url, 'get', null, userData.token)
                .then((response) => {
                    setLecture(response);
                    // 처음 접근 시 모든 데이터를 출력
                    setSearchResult(response);
                }).catch((error) => {
                    console.error("teach 목록 불러오기 실패", error);
                });
        }
        loadLectureList();
    }, [selectedLecture]);

    // 검색 기능
    const handleSearch = () => {
        setSearchResult(lecture.filter(item => {
            switch (lectureSearchSelect) {
                case '전체':
                    return Object.values(item).some(val =>
                        String(val).toLowerCase().includes(lectureSearchInput.toLowerCase())
                    );
                case '강사코드':
                    return item.teachcode.toLowerCase().includes(lectureSearchInput.toLowerCase());
                case '강사이름':
                    return item.teachname.toLowerCase().includes(lectureSearchInput.toLowerCase());
                case '자격증':
                    return item.teachlicense.toLowerCase().includes(lectureSearchInput.toLowerCase());
                default:
                    // 전체일 경우 모든 항목을 반환합니다.
                    return true;
            }
        }) || []);
    };

    // 강사 선택하기
    const handleToggleCheckbox = (teachnum, teachname) => {
        if (isSingleSelection) {
            setSelectedLecture([teachnum]);
            onTeacherSelect(teachnum, teachname);
        } else {
            setSelectedLecture(prevState => {
                if (prevState.includes(teachnum)) {
                    return prevState.filter(num => num !== teachnum);
                } else {
                    return [...prevState, teachnum];
                }
            });
            onTeacherSelect(teachnum, teachname);
        }
    };

    // 강사 선택 초기화
    const handleResetSelection = () => {
        setSelectedLecture([]);
        onTeacherSelect('', '');
    };

    // 선택된 문의게시글 apiCall 요청 보내고 삭제하기
    const handleDeleteSelected = (() => {
        if (selectedLecture.length === 0) {
            console.log(" 선택된 목록이 없습니다 ");
            return;
        }

        let url = '/teach/teachDelete';

        const teachNums = selectedLecture.join(',');

        apiCall(url + `?teachnum=${teachNums}`, 'get', null, userData.token)
            .then(() => {
                // 삭제 후 선택된 목록 배열 초기화
                setSelectedLecture([]);
            }).catch((error) => {
                console.error(`강사 삭제 실패 `, error);
            });
    });

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
        <div className='XlectureInfo_Box'>
            {location.pathname !== '/XNewClassUploadPage' && <Submenu />}
            <div className='XlectureInfo'>
                <XlectureSerachBox onSearch={handleSearch}
                    lectureSearchSelect={lectureSearchSelect}
                    setLectureSearchSelect={setLectureSearchSelect}
                    lectureSearchInput={lectureSearchInput}
                    setLectureSearchInput={setLectureSearchInput} />
                <div className='XlectureInfoList_Index'>
                    <span>체크</span>
                    <span>강사번호</span>
                    <span>강사코드</span>
                    <span>이름</span>
                    <span>생년월일</span>
                    <span>연락처</span>
                    <span>자격증</span>
                    <span>계좌번호</span>
                </div>
                <div>
                    {searchResult && searchResult.slice(indexOfFirstItem, indexOfLastItem)
                        .map((item, index) => (
                            <XlectureList
                                key={index}
                                {...item}
                                onToggleCheckbox={(teachnum, teachname) => handleToggleCheckbox(teachnum, item.teachname)}
                                isChecked={selectedLecture.includes(item.teachnum)} />
                        ))}
                </div>
                <div className='XResetDeleteBtn'>
                    {location.pathname === '/XNewClassUploadPage' ? (
                        <button onClick={handleResetSelection}>초기화</button>
                    ) : (
                        <>
                            <button onClick={handleResetSelection}>초기화</button>
                            <button onClick={handleDeleteSelected}>삭제</button>
                        </>
                    )}
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