import './XStaffList.css';
import XStaffdetail from './XStaffdetail';
import { useState, useEffect } from 'react';
import { apiCall } from '../apiService/apiService';
import Pagination from 'react-js-pagination'

export default function XStaffList() {
    // 전직원 정보
    const [staff, setstaff] = useState([]);
    // 선택된 직원 정보
    const [selectedStaffIds, setselectedStaffIds] = useState([]);
    // 부서, 직급 select 변화 감지
    const [department, setDepartment] = useState('전체');
    const [position, setPosition] = useState('전체');
    // 직원 검색창
    const [searchInput, setSearchInput] = useState('');

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    // 전직원 불러오기, 최초에만
    const loadStaffList = (() => {
        let url = '/staff/staffList';

        apiCall(url, 'get', null, userData.token)
            .then((response) => {
                setstaff(response);
            }).catch((error) => {
                console.error(" 스태프 목록 불러오기 실패 ", error);
            });
    });

    // 전직원 불러오기
    useEffect(() => {
        loadStaffList();
    }, []);

    // 직원 검색창 초기화하기
    const handleResetSearch = () => {
        setDepartment('전체');
        setPosition('전체');
        setSearchInput('');
    };

    // 직원 선택하기
    const handleToggleCheckbox = (staffId) => {
        setselectedStaffIds(prevState => {
            if (prevState.includes(staffId)) {
                return prevState.filter(id => id !== staffId);
            } else {
                return [...prevState, staffId];
            }
        });
    };

    // 선택된 직원정보 요청 보내고 삭제하기
    const handleDeleteSelectedStaff = (() => {
        if (selectedStaffIds.length === 0) {
            return;
        }
        console.log("삭제할 직원 ID 목록:", selectedStaffIds);

        let url = '/staff/staffDelete';

        apiCall(url + `?stfid=${selectedStaffIds.join('&stfid=')}`, 'get', null, userData.token)
            .then(() => {
                loadStaffList();
                // 삭제 후 선택된 목록 배열 초기화
                setselectedStaffIds([]);
            }).catch((error) => {
                console.error(`직원 삭제 실패 `, error);
            });
    });

    // 선택된 직원 초기화
    const handleResetSelection = () => {
        setselectedStaffIds([]);
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
        <div className='XStaffList_Box'>
            <div className='XStaffList_searchTitle'>직원 검색</div>
            <div className='XStaffList_SearchBox'>
                <span>부서</span>
                <select id="departmentSelect" value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="전체">전체</option>
                    <option value="강좌">강좌</option>
                    <option value="시설">시설</option>
                    <option value="일반">일반</option>
                </select>
                <span>직급</span>
                <select id="positionSelect" value={position} onChange={(e) => setPosition(e.target.value)}>
                    <option value="전체">전체</option>
                    <option value="팀장">팀장</option>
                    <option value="사원">사원</option>
                </select>
                <span>이름</span>
                <input type='search' className='XStaffList_SearchBox_input' placeholder='직원 검색'
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            <div className='XBtnResetSearch'>
                <button onClick={handleResetSearch}>초기화</button>
            </div>
            <div className='XStaffList_SearchResult'>
                <div className='XStaffList_Searchstaff'>
                    <span>체크</span>
                    <span>ID</span>
                    <span>소속</span>
                    <span>직위</span>
                    <span>전화번호</span>
                    <span>이름</span>
                    <span>직원코드</span>
                </div>
                <div>
                    {staff.filter(e => (
                        // 부서와 직급 모두 고려하여 필터링
                        (department === '전체' || e.stfdmp === department) &&
                        (position === '전체' || e.stflevel === position) &&
                        // 검색어를 이용하여 직원의 이름에 대해 필터링
                        (searchInput.trim() === '' || e.stfname.toLowerCase().includes(searchInput.toLowerCase()))
                    )).slice(indexOfFirstItem, indexOfLastItem)
                        .map((item, index) => (
                            <XStaffdetail key={index} {...item} onToggleCheckbox={handleToggleCheckbox}
                                isChecked={selectedStaffIds.includes(item.stfid)} />
                        ))}
                </div>
                <div className='XResetDeleteBtn'>
                    <button onClick={handleResetSelection}>초기화</button>
                    <button onClick={handleDeleteSelectedStaff}>삭제</button>
                </div>
                <div className='pagenationBox'>
                    <Pagination
                        // 현제 보고있는 페이지 
                        activePage={currentPage}
                        // 한페이지에 출력할 아이템 수
                        itemsCountPerPage={5}
                        // 총 아이템수
                        totalItemsCount={staff.length}
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