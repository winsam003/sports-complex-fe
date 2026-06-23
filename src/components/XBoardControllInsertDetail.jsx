import './XBoardControllInsertDetail.css';
import { MdFestival } from "react-icons/md";

export default function XBoardControllInsertDetail() {
    return (
        <div className="XBoardControllInsertDetail_Containor">
            <div className='EventDetail_Box'>
                <div className="EventDetail_title">
                    <MdFestival className='EventDetail_icon' />
                    <p>{}</p>
                </div>
                <div className="EventDetail_menu">
                    <p>게시물 번호</p>
                    <p>{}</p>
                </div>

                <div className='EventDetail_twin'>
                    <div className="EventDetail_menu">
                        <p>이용시설</p>
                        <p>{}</p>
                    </div>
                    <div className="EventDetail_menu">
                        <p>구분</p>
                        <p>{}</p>
                    </div>
                </div>

                <div className='EventDetail_twin'>
                    <div className="EventDetail_menu">
                        <p>대상</p>
                        <p>{}</p>
                    </div>
                    <div className="EventDetail_menu">
                        <p>행사 일시</p>
                        <p>{}</p>
                    </div>
                </div>

                {/* 아래는 추가정보 */}
                <div className='EventDetail_twin'>
                    <div className="EventDetail_menu">
                        <p>작성날짜</p>
                        <p>{}</p>
                    </div>
                    <div className="EventDetail_menu">
                        <p>조회수</p>
                        <p>{}</p>
                    </div>
                </div>
                {/* 내용이랑 사진 */}
                <div className='EventDetail_content'>
                    <div>
                        <p>{}</p>
                    </div>
                    <div>
                        {/* <img src={`../img/${}`} alt="이벤트 이미지" /> */}
                    </div>
                </div>
            </div>
            <div className='EventDetail_buttonBox'>

                <button className='EventDetail_button'
                    onClick={() => window.history.back()} >목록</button>
            </div>
        </div>
    )
}