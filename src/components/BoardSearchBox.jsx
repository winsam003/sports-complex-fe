import './BoardSearchBox.css'

export default function BoardSearchBox() {
    return (
        <div>
            <div className='BoardSearchBox_div'>
                <select>
                    <option value="">공지사항 종류1</option>
                    <option value="">공지사항 종류2</option>
                    <option value="">공지사항 종류3</option>
                </select>
                <input type='text'></input>
                <button>검색</button>
            </div>
        </div>
    )
}