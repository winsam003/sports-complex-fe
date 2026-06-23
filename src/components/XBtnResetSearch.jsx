import './XBtnResetSearch.css'

// 초기화 조회 버튼
export default function XBtnResetSearch({reset, handleSearch}) {
    return (
        <div>
            <div className='XBtnResetSearch'>
                <button onClick={reset}>초기화</button>
                <button onClick={handleSearch}>조회</button>
            </div>
        </div>
    )
}