import './Board.css'
import Submenu from './Submenu';
import XBoardSearchBox from './XBoardSearchBox';
import BoardSearchList from './BoardSearchList';
import { useEffect, useState } from 'react';
import { apiCall } from '../apiService/apiService';

export default function FaqBoard() {
    // 서치박스 검색타입, 키워드 저장, 검색, 검색 조건, input에서 엔터누를시 검색 실행 ******************************************************************************//

    //서치박스 검색타입 저장
    const [searchValue, setSearchValue] = useState('');
    const searchValueHandler = (e) => {
        setSearchValue(e.target.value);
    }
    //키워드 저장
    const [searchKeyword, setSearchKeyword] = useState('');
    const searchKeywordHandler = (e) => {
        setSearchKeyword(e.target.value);
    }
    //검색 기능 활성화
    const [search, setSearch] = useState(false);
    const searchHandler = () => {
        setSearch(true);
    }


    //검색 조건
    useEffect(() => {
        let filteredData = [];
        switch (searchValue) {
            case "공지대상":
                filteredData = rememberList.filter((item) => item.quest.includes(searchKeyword));
                break;
            case "제목":
                filteredData = rememberList.filter((item) => item.nottitle.includes(searchKeyword));
                break;
            case "작성자":
                filteredData = rememberList.filter((item) => item.stfid.includes(searchKeyword));
                break;
            case "내용":
                filteredData = rememberList.filter((item) => item.notdetail.includes(searchKeyword));
                break;
            default:
                filteredData = rememberList.filter((item) => (item.quest === searchKeyword) || item.nottitle.includes(searchKeyword)
                    || item.stfid.includes(searchKeyword) || item.notdetail.includes(searchKeyword));
        }
        setNoticeList(filteredData);
        setSearch(false);
    }, [search])


    // input에서 엔터누를 시 검색 실행
    const KeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            setSearch(true);
        }
    }
    // 서치박스 검색타입, 키워드 저장, 검색, 검색 조건, input에서 엔터누를시 검색 실행 ******************************************************************************//



    // List 불러오기 ******************************************************************************//
    const [noticeList, setNoticeList] = useState([]);
    const [rememberList, setRememberList] = useState([]);
    useEffect(() => {
        let url = "/notice/fnqList";



        // let token = JSON.parse(sessionStorage.getItem("userData")).token;

        apiCall(url, 'get', null, null)
            .then((response) => {
                setNoticeList(response);
                setRememberList(response);
            }).catch((error) => {
                if (error === 403) {
                    alert("권한이 없습니다.")
                    console.log("403 noticeList error occred = " + error);
                } else {
                    console.log("noticeList error occred = " + error);
                }
            })
    }, [])
    // List 불러오기 ******************************************************************************//

    return (
        <div>
            <div className='board_div'>
                <Submenu />
                <div className='board_div_div'>
                    <XBoardSearchBox searchValueHandler={searchValueHandler} searchHandler={searchHandler}
                        searchKeywordHandler={searchKeywordHandler} KeyPressHandler={KeyPressHandler} />
                    <BoardSearchList noticeList={noticeList} />
                </div>
            </div>
        </div>
    )
}