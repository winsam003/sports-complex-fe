import './EventBoardList.css'
import {Link} from 'react-router-dom'

export default function EventBoardList() {
    return (
        <div className='EventSearchList_Box'>
            <div className='EventSearchList_div'>
                <span>작성자</span>
                <span>제목</span>
                <span>날짜</span>
                <span>시간</span>
                <span>구분</span>
            </div>
            <Link to='/EventDetailPage' className='EventSearchList_content'>
                <span>FitNext</span>
                <span>2024 고교야구 주말리그 전반기</span>
                <span>3.16 ~ 3.17</span>
                <span>08:00 ~ 09:00</span>
                <span>스포츠경기</span>
            </Link>
        </div>
    )
}