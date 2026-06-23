import { useState } from 'react'
import './XEventSearch.css'

export default function XEventSearch({onSearch, searchType, setSearchType, searchKeyWord, setSearchKeyWord, }) {

    // console.log('XEventSearch_searchType: ', searchType);
    // console.log('XEventSearch_searchKeyWord: ', searchKeyWord);

    const handleSearch = () => {
        onSearch({
            searchType: searchType, 
            searchKeyWord: searchKeyWord
        })
    }

    return (
        <div>
            {/* 검색 */}
            <div className='XEventSearch'>
                <select value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}>
                    <option value="">전체</option>
                    <option value="eventname">제목</option>
                    <option value="eventfacility">이용 시설</option>
                    <option value="eventfor">이용대상</option>
                    <option value="eventtype">이벤트 타입</option>
                </select>
                <input type='text' 
                       value={searchKeyWord}
                       onChange={(e) => setSearchKeyWord(e.target.value)}></input>
                       
                <button onClick={handleSearch} >검색</button>
            </div>

        </div>
    )
}