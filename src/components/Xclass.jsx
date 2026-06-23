import './Xclass.css';
import Submenu from './Submenu';
import SugangReciptInfo from './SugangReciptInfo';
import XclassSearchBox from './XclassSearchBox';
import XSugangRequestSearchResult from './XSugangRequestSearchResult';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';
import Pagination from 'react-js-pagination'

export default function Xclass() {
    const [classes, setClasses] = useState([]);
    // 선택된 강의 정보
    const [selectedClasses, setSelectedClasses] = useState([]);
    // 검색 이용을 위한 select과 input
    const [classesSearchBTSelect, setClassesSearchBTSelect] = useState('전체');
    const [classesSearchSTSelect, setClassesSearchSTSelect] = useState('전체');
    const [classesSearchDaySelect, setClassesSearchDaySelect] = useState('전체');
    const [classesSearchTargetSelect, setClassesSearcTargetSelect] = useState('전체');
    const [classesSearchInput, setClassesSearchInput] = useState('');
    // 검색 기능
    const [searchResult, setSearchResult] = useState([]);
    // 강좌 신청 갯수, 현황
    const [classAppStatusCounts, setClassAppStatusCounts] = useState({});

    // 사용자 페이지 접근
    const location = useLocation();

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 강의 목록 불러오기
    useEffect(() => {
        const loadClassesList = async () => {
            let url = '/classes/classesList';

            await apiCall(url, 'get', null, null)
                .then(async (classes) => {
                    const updatedClasses = await Promise.all(classes.map(async (item) => {
                        // 신청 갯수, 대기 갯수
                        const counts = await apiCall('/classApp/classAppStatusCounts', 'post', [item.clnum], userData.token);
                        return { ...item, classAppStatusCounts: counts || {} };
                    }));
                    setClasses(updatedClasses);
                    setSearchResult(updatedClasses);
                }).catch((error) => {
                    console.error(" 강좌 목록 불러오기 실패 ", error);
                });
        }
        loadClassesList();
    }, [classAppStatusCounts, selectedClasses])

    // 강의 선택
    const handleToggleCheckbox = (clnum) => {
        setSelectedClasses(prevState => {
            if (prevState.includes(clnum)) {
                return prevState.filter(num => num !== clnum);
            } else {
                return [...prevState, clnum];
            }
        });
    };

    // 선택 초기화
    const handleResetSelection = () => {
        setSelectedClasses([]);
    };

    // 선택 강좌 삭제
    const handleDeleteSelectedClasses = (() => {
        if (selectedClasses.length === 0) {
            return;
        }

        let url = '/classes/classesDelete';

        apiCall(url + `?clnum=${selectedClasses.join('&clnum=')}`, 'get', null, userData.token)
            .then(() => {
                setSelectedClasses([]);
            }).catch((error) => {
                console.error(`강좌 삭제 실패 : `, error);
            });
    });

    // 검색
    const handleSearch = () => {
        const filteredResult = classes.filter(classes => {

            // 대분류, 세부종목, 요일, 대상이 모두 '전체'인 경우
            if (classesSearchBTSelect === '전체' && classesSearchSTSelect === '전체' &&
                classesSearchDaySelect === '전체' && classesSearchTargetSelect === '전체') {
                return true;
            }
            // 각 조건에 따른 필터링
            if (classesSearchBTSelect !== '전체' && classesSearchBTSelect !== classes.classcode.substring(2, 4)) {
                return false;
            }
            if (classesSearchSTSelect !== '전체' && classesSearchSTSelect !== classes.classcode.substring(4, 6)) {
                return false;
            }
            if (classesSearchDaySelect !== '전체' && !classes.cldays.includes(classesSearchDaySelect)) {
                return false;
            }
            if (classesSearchTargetSelect !== '전체' && classesSearchTargetSelect !== classes.clfor) {
                return false;
            }
            return true;
        });

        setSearchResult(filteredResult);
    };

    // 검색 초기화
    const reset = () => {
        setClassesSearchBTSelect('전체');
        setClassesSearchSTSelect('전체');
        setClassesSearchDaySelect('전체');
        setClassesSearcTargetSelect('전체');
        setClassesSearchInput('');
    }

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
        <div className='Xclass_Box'>
            <Submenu />
            <div className='Xclass_Box_div'>
                {location.pathname == '/Sugang' ?
                    <SugangReciptInfo /> : ''
                }
                <XclassSearchBox onSearch={handleSearch} onReset={reset}
                    classesSearchBTSelect={classesSearchBTSelect} setClassesSearchBTSelect={setClassesSearchBTSelect}
                    classesSearchSTSelect={classesSearchSTSelect} setClassesSearchSTSelect={setClassesSearchSTSelect}
                    classesSearchDaySelect={classesSearchDaySelect} setClassesSearchDaySelect={setClassesSearchDaySelect} classesSearchTargetSelect={classesSearchTargetSelect}
                    setClassesSearcTargetSelect={setClassesSearcTargetSelect}
                    classesSearchInput={classesSearchInput} setClassesSearchInput={setClassesSearchInput} />
                <div className='XclassListDetail_Container'>
                    <div className={location.pathname === '/Sugang' ? 'XclassListDetail_category_sugangStyle' : 'XclassListDetail_category'}>
                        {location.pathname == '/Sugang' ?
                            // 사용자
                            <>
                                <p>번호</p>
                                <p>강좌명</p>
                                <p>강의 날짜</p>
                                <p>시간</p>
                                <p>대상</p>
                                <p>현재원</p>
                                <p>대기원</p>
                                <p>금액</p>
                                <p>현황</p>
                            </>
                            :
                            // 관리자
                            <>
                                <p>선택</p>
                                <p>번호</p>
                                <p>강좌명</p>
                                <p>강의 날짜</p>
                                <p>시간</p>
                                <p>대상</p>
                                <p>현재원</p>
                                <p>대기원</p>
                                <p>금액</p>
                                <p>현황</p>
                            </>
                        }
                    </div>
                    {searchResult && searchResult.filter((item) => (
                        (classesSearchInput.trim() === '' || item.clname.toLowerCase().includes(classesSearchInput.toLowerCase()))
                    )).slice(indexOfFirstItem, indexOfLastItem)
                        .map((item, index) => (
                            <XSugangRequestSearchResult key={index} {...item} onToggleCheckbox={handleToggleCheckbox} isChecked={selectedClasses.includes(item.clnum)}
                                setClassAppStatusCounts={setClassAppStatusCounts} />
                        ))}
                    {
                        location.pathname == '/Sugang' ?
                            ''
                            :
                            <div className='XResetDeleteBtn'>
                                <button onClick={handleResetSelection}>초기화</button>
                                <button onClick={handleDeleteSelectedClasses}>삭제</button>
                            </div>
                    }
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
        </div>
    )
}