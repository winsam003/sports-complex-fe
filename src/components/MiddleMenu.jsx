import "./MiddleMenu.css"
import {Link} from 'react-router-dom';

export default function MiddleMenu() {
    return (
        <div className="middlemenu">
            <Link to='/FacilityInformationPage'><span>체육 시설 안내</span></Link>
            <Link to='/Faq'><span>자주하는질문</span></Link>
            <Link to='/VisitWayPage'><span>찾아오시는 길</span></Link>
            <Link to='/BoardPage'><span>공지사항</span></Link>
            <Link to='/EventBoardPage'><span>이벤트</span></Link>
            <Link to='/Sugang'><span>수강신청</span></Link>
        </div>
    )
}



