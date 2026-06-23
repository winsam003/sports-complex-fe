import './XRentalPlaceSearchResult.css'
import { useEffect, useState } from 'react'
import { apiCall } from '../apiService/apiService';
import Pagination from 'react-js-pagination'

export default function XRentalPlaceSearchResult({ checkList, setCheckList, refreshList, inputReset, setInputReset, handleReset, searchPlace }) {

    // 리스트 출력
    const [spacelist, setSpaceList] = useState([]);

    useEffect(() => {
        fetchSpaceList();
    }, [refreshList]);

    const fetchSpaceList = () => {

        let url = "/space/spacelist";
        let token = JSON.parse(sessionStorage.getItem("userData")).token;

        apiCall(url, 'get', null, token)
            .then((response) => {
                setSpaceList(response);
            }).catch((error) => {
                console.log("Error: ", error);
            })
    }

    // 체크한거에 spacecode 가져가기. 
    const handleDeletePlace = (event) => {
        const spacecode = event.target.value;
        const isChecked = event.target.checked;

        // 체크 항목 value 배열. 
        let updatedCheckList = [...checkList];

        const space = spacelist.find(item => item.spacecode === spacecode);
        if (isChecked && space) {
            updatedCheckList.push(spacecode);
        } else {
            updatedCheckList = updatedCheckList.filter(code => code !== spacecode);
        }
        setCheckList(updatedCheckList);

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


        <div>
            <div className='XRentalPlaceSearchResult_SearchResult_div'>
                {/* 조회결과 index */}
                <div className='XRentalPlaceSearchResult_SearchResult_index'>
                    <p>선택</p>
                    <p>시설 코드</p>
                    <p>시설 종류</p>
                    <p>시설 이름</p>
                    <p>현재 운영 정보</p>
                </div>
                {/* 조회결과 */}

                {spacelist
                    .filter(space => {
                        return ((
                            (searchPlace.mainCategory === (space.spacecode.substring(2, 4) === 'PA' ? '주차장' : '경기장')) || searchPlace.mainCategory === '전체'
                            ) && (
                                searchPlace.subCategory === '전체' || (space.spacename).includes(searchPlace.subCategory)
                            ) && (
                                searchPlace.searchValue === '' || space.spacename.includes(searchPlace.searchValue)
                            ))
                    }).slice(indexOfFirstItem, indexOfLastItem)
                    .map(({ spacecode, spacename, parkspace, parking }, index) => (
                        <div key={spacecode} className='XRentalPlaceSearchResult_SearchResult'>
                            <div className='XRentalPlaceSearchResult_SearchResult_input'>
                                <input checked={checkList.includes(spacecode)} //체크리스트에 담겼다면 .
                                    type="checkbox"
                                    value={spacecode}
                                    onChange={handleDeletePlace}
                                />
                            </div>
                            <p>{spacecode}</p>
                            <p>{spacecode.substring(2, 4) === 'PA' ? '주차장' : '경기장'}</p>
                            <p>{spacename}</p>
                            <p>{parkspace - parking == 0 ? '대관 불가' : '가능'}</p>
                        </div>
                    ))}
                <div className='pagenationBox'>
                    <Pagination
                        // 현제 보고있는 페이지 
                        activePage={currentPage}
                        // 한페이지에 출력할 아이템 수
                        itemsCountPerPage={5}
                        // 총 아이템수
                        totalItemsCount={spacelist.length}
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