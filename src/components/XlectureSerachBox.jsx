import './XlectureSerachBox.css'

export default function XlectureSerachBox({ onSearch, lectureSearchSelect, setLectureSearchSelect, lectureSearchInput, setLectureSearchInput }) {

    const handleSearch = () => {
        onSearch(lectureSearchSelect, lectureSearchInput);
    }

    return (
        <div>
            {/* 검색 */}
            <div className='XQnaSearchBox'>
                <select id="XQnaSearchSelect" value={lectureSearchSelect} onChange={(e) => setLectureSearchSelect(e.target.value)}>
                    <option value="전체">전체</option>
                    <option value="강사코드">강사코드</option>
                    <option value="강사이름">강사이름</option>
                    <option value="자격증">자격증</option>
                </select>
                <input type='search' value={lectureSearchInput} onChange={(e) => setLectureSearchInput(e.target.value)}></input>
                <button onClick={handleSearch}>검색</button>
            </div>

        </div>
    )
}