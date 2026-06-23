import './XBtnResetDeleteUpdate.css'

export default function XBtnResetDeleteUpdate() {
    return (
        <div>
            <div className='XBtnResetDeleteUpdate'>
                <div className='XBtnResetDeleteUpdate_ResetDelete'>
                    <button>초기화</button>
                    <button>삭제</button>
                </div>
                <button className='XBtnResetDeleteUpdate_Update'>변경</button>
            </div>
        </div>
    )
}