import './XParkingControll.css'
import Submenu from './Submenu'
import XBtnResetDelete from './XBtnResetDelete'
import { useEffect, useState } from 'react'
import { apiCall } from '../apiService/apiService'
import Pagination from 'react-js-pagination'

export default function XParkingControll({ token }) {

    // 리스트 뽑기
    const [parkappList, setParkappList] = useState([]);
    // 체크
    const [checkPark, setCheckPark] = useState([]);


    useEffect(() => {
        parklist();
        setSearchAll({
            parkingFloor: parkingFloor,
            parkingState: parkingState,
            parkingMonth: parkingMonth,
            searchSelect: searchSelect,
            searchText: searchText
        })
    }, [checkPark]);

    const parklist = () => {
        let token = JSON.parse(sessionStorage.getItem("userData")).token;
        let url = "/parkapp/parkapplist";

        apiCall(url, 'get', null, token)
            .then((list) => {
                if (!list || list.length === 0) {
                    setParkappList(['리스트없음']);
                } else {
                    setParkappList(list);
                }
            }).catch((error) => {
                console.log("Error: ", error);
            })
    }

    // console.log("parkappList : ", parkappList);

    // ==========================================================================

    // 검색 값 담기
    const [parkingFloor, setParkingFloor] = useState('all');
    const [parkingState, setParkingState] = useState('all');
    const [parkingMonth, setParkingMonth] = useState('');
    const [searchSelect, setSearchSelect] = useState('');
    const [searchText, setSearchText] = useState('');

    // 주차장 담기
    const handleFloorChange = (event) => {
        setParkingFloor(event.target.value);
    }
    // 상태 담기
    const handleState = (event) => {
        setParkingState(event.target.value);
        console.log(parkingMonth);
    }
    // 날짜
    const handleMonth = (event) => {
        setParkingMonth(event.target.value);
    }
    // 검색 셀렉
    const handleSearchSelect = (event) => {
        setSearchSelect(event.target.value);
    }
    // 검색 키워드
    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    }

    useEffect(() => {
        if (!searchSelect) {
            setSearchText('');
        }
    }, [searchSelect]);

    const [searchAll, setSearchAll] = useState({});

    // 검색 버튼 : 검색 사항들 searAll에 담아주기.
    const handleSearch = () => {
        setSearchAll({
            parkingFloor: parkingFloor,
            parkingState: parkingState,
            parkingMonth: parkingMonth,
            searchSelect: searchSelect,
            searchText: searchText
        })
    }

    // 초기화 버튼
    const handleResetSearchPark = () => {
        setParkingFloor('all');
        setParkingState('all');
        setParkingMonth('');
        setSearchSelect('');
        setSearchText('');
    }

    // 필터링된 목록
    const filteredParkappList = parkappList.filter(park => {
        if (searchAll.searchSelect === '') {
            return (
                searchAll.parkingFloor === park.spacecode.spacename || searchAll.parkingFloor === 'all'
            ) && (
                    searchAll.parkingState === park.parkstate || searchAll.parkingState === 'all'
                ) && (
                    searchAll.parkingMonth === park.parkusedate || searchAll.parkingMonth === ''
                );
        } else if (searchAll.searchSelect === 'name') {
            return (
                searchAll.parkingFloor === park.spacecode.spacename || searchAll.parkingFloor === 'all'
            ) && (
                    searchAll.parkingState === park.parkstate || searchAll.parkingState === 'all'
                ) && (
                    searchAll.parkingMonth === park.parkusedate || searchAll.parkingMonth === ''
                ) && (
                    park.id.name && park.id.name.toString().includes(searchAll.searchText)
                );
        } else {
            return (
                searchAll.parkingFloor === park.spacecode.spacename || searchAll.parkingFloor === 'all'
            ) && (
                    searchAll.parkingState === park.parkstate || searchAll.parkingState === 'all'
                ) && (
                    searchAll.parkingMonth === park.parkusedate || searchAll.parkingMonth === ''
                ) && (
                    park.carnum && park.carnum.toString().includes(searchAll.searchText)
                );
        }
    });

    // ==========================================================================
    // 페이지네이션

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 아이템 수
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 보여줄 아이템의 인덱스 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // ==========================================================================

    // 체크
    
    const handlecheckPark = (event) => {
        const deletevalue = event.target.value.toString();
 
        if(!checkPark.includes(deletevalue)) {
            setCheckPark(preCheck => [...preCheck, deletevalue]);
        } else {
            setCheckPark(preCheck => preCheck.filter(value => value !== deletevalue));

        }
    }

    const del = () => {
        if(checkPark.length === 0){
            alert('취소할 신청을 선택해주세요.');
        } else{
            
            let url = "/parkapp/parkappcancel";
            let token = JSON.parse(sessionStorage.getItem("userData")).token;
            console.log('checkPark : ', checkPark);
    
            let cancelParkForm = checkPark.map(parkappnum => {
                let parkItem = filteredParkappList.find(park => park.parkappnum.toString() === parkappnum);
                // console.log('pakrItem: ', pakrItem);
                return {
                    parkAppNum : parkItem.parkappnum, 
                    spacecode : parkItem.spacecode.spacecode
                }
            })
    
            console.log('cancelParkForm : ', cancelParkForm);
        
            if(window.confirm("주차 신청을 취소하시겠습니까?")){
                apiCall(url, 'post', cancelParkForm, token)
                    .then((response) => {
                        alert(response);
                        setCheckPark([]);
                        // fetchEventList();
                    }).catch((error) => {
                        console.log("delete error: ", error);
                        alert('관리자가 취소할 수 없는 주차 신청 입니다. ');
                    })
            }
        }
        

    }

    const handleReset = () => {
        setCheckPark([]);
    }


    return (
        <div className='XParkingControll_div'>
            <Submenu />
            <div className='XParkingControll_div_div'>
                <div >
                    <p className='XParkingControll_searchblock'>
                        <span className='XParkingControll_searchTitle'>주차장</span>
                        <span className='XParkingControll_inputbox'>
                            <input type="radio" id='all' name="floor"
                                value='all'
                                checked={parkingFloor === 'all'}
                                onChange={handleFloorChange} /> <span><label htmlFor='all'>전체</label></span>
                            <input type="radio" id='1Floor' name="floor"
                                value='주차장 지하 1층'
                                onChange={handleFloorChange} /> <span><label htmlFor='1Floor'>지하 1층</label></span>
                            <input type="radio" id='2Floor' name="floor"
                                value='주차장 지하 2층'
                                onChange={handleFloorChange} /> <span><label htmlFor='2Floor'>지하 2층</label></span>
                            <input type="radio" id='3Floor' name="floor"
                                value='주차장 지하 3층'
                                onChange={handleFloorChange} /> <span><label htmlFor='3Floor'>지하 3층</label></span>
                        </span>
                    </p>
                    <p className='XParkingControll_searchblock'>
                        <span className='XParkingControll_searchTitle'>상태</span>
                        <span className='XParkingControll_inputbox'>
                            <input type="radio" id='allstate' name="usePark"
                                value='all'
                                checked={parkingState === 'all'}
                                onChange={handleState} /> <span><label htmlFor='allstate'>전체</label></span>
                            <input type="radio" id='Next' name="usePark"
                                value='Next'
                                onChange={handleState} /> <span><label htmlFor='Next'>이용 예정</label></span>
                            <input type="radio" id='ing' name="usePark"
                                value='ing'
                                onChange={handleState} /> <span><label htmlFor='ing'>이용중</label></span>
                            <input type="radio" id='end' name="usePark"
                                value='end'
                                onChange={handleState} /> <span><label htmlFor='end'>이용 종료</label></span>
                            <input type="radio" id='cancel' name="usePark"
                                value='cancel'
                                onChange={handleState} /> <span><label htmlFor='cancel'>취소</label></span>
                        </span>
                    </p>
                    <p className='XParkingControll_searchblock'>
                        <span className='XParkingControll_searchTitle'>날짜</span>
                        <span className='XParkingControll_inputbox'>
                            <input type="month" value={parkingMonth} onChange={handleMonth} />
                        </span>
                    </p>
                    <p className='XParkingControll_searchblock'>
                        <span className='XParkingControll_searchTitle'>검색</span>
                        <span className='XParkingControll_inputbox'>
                            <select value={searchSelect}
                                onChange={handleSearchSelect}>
                                <option value="">선택</option>
                                <option value="name">이름</option>
                                <option value="carnum">차량번호</option>
                            </select>
                            <input type='text'
                                value={searchText}
                                onChange={handleSearchText}
                                disabled={!searchSelect} ></input>
                        </span>
                    </p>
                    <div className='XRentalPlaceSearchBox_bottondiv'>
                        <button className='XRentalPlaceSearchBox_botton'
                            onClick={handleResetSearchPark}> 검색 초기화</button>
                        <button className='XRentalPlaceSearchBox_botton'
                            onClick={handleSearch}>검색 조회</button>
                    </div>
                    <p id='XParkingControll_result'>[ 검색 결과 : {filteredParkappList.length} ] </p>
                </div>

                {/* ====== ======= ======= 리스트 ====== ======== ====== */}

                <div className='XParkingControllSearchResult_div'>
                    <div className='XParkingControllSearchResult_index'>
                        <span>선택</span>
                        <span>주차신청번호</span>
                        <span>주차 신청 날</span>
                        <span>주차장 이용 달</span>
                        <span>주차장</span>
                        <span>이름</span>
                        <span>연락처</span>
                        <span>차량번호</span>
                        <span>상태</span>
                    </div>
                    {filteredParkappList.length === 0 && <div id='XParkingControll_nolist'>목록이 없습니다</div>}
                    {filteredParkappList.slice(indexOfFirstItem, indexOfLastItem)
                        .map(({ parkappnum, parkappdate, parkusedate, carnum, parkstate, id, spacecode }, index) => (
                            <div className='XParkingControllSearchResult_content' key={index}>
                                <div>
                                    <input type='checkbox'
                                        value={parkappnum}
                                        onChange={handlecheckPark}
                                        checked={checkPark.includes(parkappnum.toString())}
                                        disabled={!(parkstate === 'Next')}></input>
                                </div>
                                <span>{parkappnum}</span>
                                <span>{parkappdate}</span>
                                <span>{parkusedate}</span>
                                <span>{spacecode.spacename.substring(4)}</span>
                                <span>{id.name}</span>
                                <span>{id.phonenum.substring(0, 3) + "-" + id.phonenum.substring(3, 7) + "-" + id.phonenum.substring(7)}</span>
                                <span>{carnum}</span>
                                <span>
                                    {parkstate === 'Next' ? '이용 예정' : (parkstate === 'ing' ? '이용 중' : (parkstate === 'end' ? '이용 종료' : '취소'))} 
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
                            totalItemsCount={filteredParkappList.length}
                            // 표시할 페이지수
                            pageRangeDisplayed={5}
                            // 페이지 변경 시 동작 설정
                            onChange={handlePageChange}>
                        </Pagination>
                    </div>
                </div>
                <XBtnResetDelete del={del} handleReset={handleReset} />
            </div>
        </div>
    )
}