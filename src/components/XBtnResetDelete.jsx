import { useLocation } from 'react-router';
import './XBtnResetDelete.css'

// 초기화 삭제 버튼
export default function XResetDeleteBtn({ del, handleReset}) {

    const location = useLocation();
    return (
        <div>
            <div className='XResetDeleteBtn'>
                <button onClick={handleReset}>초기화</button>
                {location.pathname == "/XParkingControllPage" ?
                    <div>
                        <button onClick={del}>취소</button>
                        <span id='XResetDeleteBtn_red'>취소는 이용 예정만 가능합니다. </span>
                    </div>
                    :
                    <button onClick={del}>삭제</button>
                }
            </div>
        </div>
    )
}