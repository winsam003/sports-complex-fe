import './Board.css'
import Submenu from './Submenu';
import XEventSearch from './XEventSearch';
import EventBoardList from './EventBoardList';
import XBoardSearchResult from './XBoardSearchResult';
import { useEffect, useState } from 'react';
import { apiCall } from '../apiService/apiService';

export default function EventBoardPage() {

    // 체크리스트
    const [checkEvent, setCheckEvent] = useState([]);

    // 리스트 ===============================================================
    const [eventlist, seteventlist] = useState([]);

    useEffect(() => {
        
        fetchEventList();
        // 배열로 나오는것 확인, 
        console.log(checkEvent);
    }, [checkEvent]);

    const fetchEventList = () => {
        let url = "/event/eventlist";
        // console.log(apiCall(url, 'get', null, null));

        apiCall(url, 'get', null, null)
            .then((eventlist) => {
                seteventlist(eventlist);
            }).catch((error) => {
                console.log("eventlist error: ", error);
            })
    }

    // 검색창 ===============================================================
    // 검색 분야 / 키워드 
    const [searchType, setSearchType] = useState('');
    const [searchKeyWord, setSearchKeyWord] = useState('');

    // 검색 
    const [searchEvent, setSearchEvent] = useState({
        searchType: '',
        searchKeyWord: ''
    });

    // 검색버튼
    const handleSearch = (onSearch) => {
        setSearchEvent(onSearch);
    }
    // 검색버튼 눌렀을 때 나오는 것 확인.
    // console.log('searchEvent: ',searchEvent);

    // 체크 ===============================================================

    const handleEventDelete = (deleteValue) => {
        const deleteValueString = deleteValue.toString();
        if (!checkEvent.includes(deleteValueString)) {
            setCheckEvent(prevCheckEvent => [...prevCheckEvent, deleteValueString]);
        } else {
            setCheckEvent(prevCheckEvent => prevCheckEvent.filter(value => value !== deleteValueString));
        }
    }

    //=============================================================== 
    return (
        <div>
            <div className='board_div'>
                <Submenu />
                <div className='board_div_div'>
                    <XEventSearch
                        onSearch={handleSearch}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        searchKeyWord={searchKeyWord}
                        setSearchKeyWord={setSearchKeyWord} />

                    <XBoardSearchResult
                        eventlist={eventlist}
                        searchEvent={searchEvent}
                        handleEventDelete={handleEventDelete}
                        checkEvent={checkEvent}
                        setCheckEvent={setCheckEvent} />
                </div>
            </div>
        </div>
    )
}