import { useLocation } from 'react-router';
import './XBoardSearchBox.css'

export default function XBoardSearchBox({ searchValueHandler, searchHandler, searchKeywordHandler, KeyPressHandler, enterInsertPage }) {

    const location = useLocation();

    return (
        <div>
            {/* 검색 */}
            <div className='XBoardSearchBox_div'>
                <div className='XBoardSearchBox_SearchBox'>
                    <span className='XBoardSearchBox_SearchBoxSpan1'>
                        {location.pathname.indexOf("/Faq") !== -1 || location.pathname.indexOf("/BoardPage") !== -1  ? "" : <button className='XBoardSearchBox_insertBtn' onClick={enterInsertPage}>등록</button>}
                    </span>
                    <span>
                        <select onChange={searchValueHandler}>
                            <option value="">전체</option>
                            <option value="공지대상">공지대상</option>
                            <option value="제목">제목</option>
                            <option value="작성자">작성자</option>
                            <option value="내용">내용</option>
                        </select>
                        <input type='text' onChange={searchKeywordHandler} onKeyPress={KeyPressHandler}></input>
                        <button className='XBoardSearchBox_SearchBtn' onClick={searchHandler} >검색</button>
                    </span>
                </div>
            </div>

        </div>
    )
}