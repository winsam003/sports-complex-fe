import { useLocation } from 'react-router';
import './SearchAll.css';
import SearchAllContents from './SearchAllContents';
import SearchAllContentsFnq from './SearchAllContentsFnq';
import SearchAllContentsQna from './SearchAllContentsQna';
import SearchAllContentsEvent from './SearchAllContentsEvent';
import { useEffect, useState } from 'react';
import { apiCall } from '../apiService/apiService';


export default function SearchAll() {

    const location = useLocation();
    const firstKeyword = location.state.keyword;

    // 검색내용 저장
    const [keyword, SetKeyword] = useState(firstKeyword)
    const search = (e) => {
        SetKeyword(e.target.value)
    }

    // 검색 keyword로 각 게시판 조회
    const [noticeSearch, setNoticeSearch] = useState();
    const [qnaSearch, setQnaSearch] = useState();
    const [eventSearch, setEventSearch] = useState();
    useEffect(() => {
        let url = '/search/searchAll?keyword=' + keyword;
        apiCall(url, 'get', null, null)
            .then((response) => {
                setNoticeSearch(response.filter((item => item.notnum !== 0)));
                setQnaSearch(response.filter((item => item.qanum !== null)));
                setEventSearch(response.filter((item => item.eventcode !== 0)));

            }).catch((error) => {
                console.log('searchAll error occured =' + error);
            })
    }, [])

    const ReSearch = () => {
        let url = '/search/searchAll?keyword=' + keyword;
        apiCall(url, 'get', null, null)
            .then((response) => {
                setNoticeSearch(response.filter((item => item.notnum !== 0)));
                setQnaSearch(response.filter((item => item.qanum !== null)));
                setEventSearch(response.filter((item => item.eventcode !== 0)));

            }).catch((error) => {
                console.log('searchAll error occured =' + error);
            })
    }

    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            ReSearch();
        }
    }

    const [searchType, setSearchType] = useState("전체");
    const sidebarClick = (e) => {
        setSearchType(e.target.innerText)
    }


    return (
        <div className='SearchAll_Containor'>
            <div className='SearchAll_sidebar'>
                <div className='SearchAll_sidebarMenu' onClick={sidebarClick} style={{ backgroundColor: searchType === '전체' ? '#00BFFF' : '' }}>전체</div>
                <div className='SearchAll_sidebarMenu' onClick={sidebarClick} style={{ backgroundColor: searchType === '공지사항' ? '#00BFFF' : '' }}>공지사항</div>
                <div className='SearchAll_sidebarMenu' onClick={sidebarClick} style={{ backgroundColor: searchType === '자주하는질문' ? '#00BFFF' : '' }}>자주하는질문</div>
                <div className='SearchAll_sidebarMenu' onClick={sidebarClick} style={{ backgroundColor: searchType === '문의게시판' ? '#00BFFF' : '' }}>문의게시판</div>
                <div className='SearchAll_sidebarMenu' onClick={sidebarClick} style={{ backgroundColor: searchType === '이벤트게시판' ? '#00BFFF' : '' }}>이벤트게시판</div>
            </div>



            {searchType === '전체' ?
                <div className='SearchAll_main'>
                    <div className='SearchAll_SearchBox'>
                        <div className='SearchAll_SearchBox_title'>&#8220;{searchType}&#8221; 로 검색</div>
                        <div className='SearchAll_SearchBox_SearchContainor'>
                            <input type='text' className='SearchAll_SearchBox_Search' onChange={search} value={keyword} onKeyPress={handleKeypress}></input>
                            <button className='SearchAll_SearchBox_SeacrchBtn' onClick={ReSearch}>검색</button>
                        </div>
                    </div>
                    <div>
                        <div className='SearchAll_SearchDetail'>
                            <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;공지사항&#8221; 검색내용</div>
                            <SearchAllContents noticeSearch={noticeSearch} />
                        </div>
                        <div className='SearchAll_SearchDetail'>
                            <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;자주하는 질문&#8221; 검색내용</div>
                            <SearchAllContentsFnq noticeSearch={noticeSearch} />
                        </div>
                        <div className='SearchAll_SearchDetail'>
                            <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;문의게시판&#8221; 검색내용</div>
                            <SearchAllContentsQna qnaSearch={qnaSearch} />
                        </div>
                        <div className='SearchAll_SearchDetail'>
                            <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;이벤트게시판&#8221; 검색내용</div>
                            <SearchAllContentsEvent eventSearch={eventSearch} />
                        </div>
                    </div>
                </div>
                :
                searchType === '공지사항' ?
                    <div className='SearchAll_main'>
                        <div className='SearchAll_SearchBox'>
                            <div className='SearchAll_SearchBox_title'>&#8220;{searchType}&#8221; 로 검색</div>
                            <div className='SearchAll_SearchBox_SearchContainor'>
                                <input type='text' className='SearchAll_SearchBox_Search' onChange={search} value={keyword} onKeyPress={handleKeypress}></input>
                                <button className='SearchAll_SearchBox_SeacrchBtn' onClick={ReSearch}>검색</button>
                            </div>
                        </div>
                        <div>
                            <div className='SearchAll_SearchDetail'>
                                <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;공지사항&#8221; 검색내용</div>
                                <SearchAllContents noticeSearch={noticeSearch} />
                            </div>
                        </div>
                    </div>
                    :
                    searchType === '자주하는질문' ?
                        <div className='SearchAll_main'>
                            <div className='SearchAll_SearchBox'>
                                <div className='SearchAll_SearchBox_title'>&#8220;{searchType}&#8221; 로 검색</div>
                                <div className='SearchAll_SearchBox_SearchContainor'>
                                    <input type='text' className='SearchAll_SearchBox_Search' onChange={search} value={keyword} onKeyPress={handleKeypress}></input>
                                    <button className='SearchAll_SearchBox_SeacrchBtn' onClick={ReSearch}>검색</button>
                                </div>
                            </div>
                            <div>
                                <div className='SearchAll_SearchDetail'>
                                    <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;자주하는 질문&#8221; 검색내용</div>
                                    <SearchAllContentsFnq noticeSearch={noticeSearch} />
                                </div>
                            </div>
                        </div>
                        :
                        searchType === '문의게시판' ?
                            <div className='SearchAll_main'>
                                <div className='SearchAll_SearchBox'>
                                    <div className='SearchAll_SearchBox_title'>&#8220;{searchType}&#8221; 로 검색</div>
                                    <div className='SearchAll_SearchBox_SearchContainor'>
                                        <input type='text' className='SearchAll_SearchBox_Search' onChange={search} value={keyword} onKeyPress={handleKeypress}></input>
                                        <button className='SearchAll_SearchBox_SeacrchBtn' onClick={ReSearch}>검색</button>
                                    </div>
                                </div>
                                <div>
                                    <div className='SearchAll_SearchDetail'>
                                        <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;문의게시판&#8221; 검색내용</div>
                                        <SearchAllContentsQna qnaSearch={qnaSearch} />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='SearchAll_main'>
                                <div className='SearchAll_SearchBox'>
                                    <div className='SearchAll_SearchBox_title'>&#8220;{searchType}&#8221; 로 검색</div>
                                    <div className='SearchAll_SearchBox_SearchContainor'>
                                        <input type='text' className='SearchAll_SearchBox_Search' onChange={search} value={keyword} onKeyPress={handleKeypress}></input>
                                        <button className='SearchAll_SearchBox_SeacrchBtn' onClick={ReSearch}>검색</button>
                                    </div>
                                </div>
                                <div>
                                    <div className='SearchAll_SearchDetail'>
                                        <div className='SearchAll_SearchBox_title SearchAll_SearchBox_detailTitle'>&#8220;이벤트게시판&#8221; 검색내용</div>
                                        <SearchAllContentsEvent eventSearch={eventSearch} />
                                    </div>
                                </div>
                            </div>
            }


        </div>
    )
}