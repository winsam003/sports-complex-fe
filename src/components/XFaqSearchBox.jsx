import './XFaqSearchBox.css'

export default function XFaqSearchBox({ searchValueHandler, searchHandler, searchKeywordHandler, KeyPressHandler, enterInsertPage }) {
    return (
        <div>
            {/* 검색 */}
            <div className='XFaqSearchBox'>
                <select>
                    <option value="">전체</option>
                    <option value="">질문 종류</option>
                    <option value="">제목</option>
                    <option value="">작성자</option>
                    <option value="">내용</option>
                </select>
                <input type='text'></input>
                <button>검색</button>
            </div>

        </div>
    )
}