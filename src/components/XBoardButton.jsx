import './XBoardButton.css'

// 초기화 삭제 새글등록 버튼
export default function XBoardButton() {
    return (
        <div>
            <div className='XBoardButton'>
                <div className='XBoardButton_ResetDelete'>
                    <button>초기화</button>
                    <button>삭제</button>
                </div>
                <button className='XBoardButton_NewBoard'>새 글 등록</button>
            </div>
        </div>
    )
}