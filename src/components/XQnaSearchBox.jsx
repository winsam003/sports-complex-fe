import './XQnaSearchBox.css'

export default function XQnaSearchBox({ onSearch, qnaSearchSelect, setQnaSearchSelect, qnaSearchInput, setQnaSearchInput }) {
    const handleSearch = () => {
        onSearch(qnaSearchSelect, qnaSearchInput);
    }
    return (
        <div>
            {/* 검색 */}
            <div className='XQnaSearchBox'>
                <select id="XQnaSearchSelect" value={qnaSearchSelect} onChange={(e) => setQnaSearchSelect(e.target.value)}>
                    <option value="전체">전체</option>
                    <option value="문의 종류">문의 종류</option>
                    <option value="제목">제목</option>
                    <option value="작성자">작성자</option>
                    <option value="내용">내용</option>
                </select>
                <input type='search' value={qnaSearchInput} onChange={(e) => setQnaSearchInput(e.target.value)}></input>
                <button onClick={handleSearch}>검색</button>
            </div>

        </div>
    )
}