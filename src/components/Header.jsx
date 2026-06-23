import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

// import JoinPage1 from './Pages/JoinPage1';
// import FacilityInformationPage from './Pages/FacilityInformationPage';
// import BoardPage from './Pages/BoardPage';
// import FrequentlyAskedPage from './Pages/FrequentlyAskedPage';
// import Qna from './Pages/Qna';
// import Faq from './Pages/Faq';
// import Sugang from './Pages/Sugang';
// import ClassSchedule from './ClassSchedule';
// import ManagementPage from './ManagementPage';

import { TbUserPlus } from "react-icons/tb";

export default function Header({ checkAdminPage, logout, getUserName, roleList }) {



    const checkLogin = (e) => {
        alert("로그인이 필요한 서비스입니다. 로그인을 해주시기 바랍니다.");
    }

    return (

        <header>
            <div>
                <div className='goHome'><Link to='/'></Link></div>
                <Link to='/XmanagementPage' className='noneHeader' onClick={checkAdminPage}>관리자 페이지 전환</Link>
                {getUserName == null ?
                    <div>
                        <Link to='/LoginPage' className='noneHeader'>로그인</Link>
                        <Link to='/JoinPage1' className='Header_join'>회원가입<TbUserPlus className='Header_Icon' /></Link>
                    </div>
                    :
                    roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ?
                    <div>
                        <span onClick={logout} className='noneHeader logout'>로그아웃</span>
                        <Link to='/XStaffInfoPage' className='Header_join'>나의정보<TbUserPlus className='Header_Icon' /></Link>
                    </div>
                    :
                    <div>
                        <span onClick={logout} className='noneHeader logout'>로그아웃</span>
                        <Link to='/ModifyMemberPage' className='Header_join'>나의정보<TbUserPlus className='Header_Icon' /></Link>
                    </div>
                }
            </div>
            <div className='Header_clickMenu'>
                <div className='Header_logo'><Link to="/">홈으로</Link></div>
                <Link to='/FacilityInformationPage' className='Header_mainHeader Header_Header1'>체육시설</Link>
                <Link to='/BoardPage' className='Header_mainHeader Header_Header2'>고객센터</Link>
                <Link to='/EventBoardPage' className='Header_mainHeader Header_Header3'>정보마당</Link>
                <Link to='/Sugang' className='Header_mainHeader Header_Header4'>이용신청</Link>
                {
                    roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ? 
                        <Link to='/XmanagementPage' onClick={getUserName == null ? checkLogin : ''} className='Header_mainHeader Header_Header5'>관리페이지</Link>
                    :
                        <Link to={getUserName == null ? '/LoginPage' : '/ApplicationDetailsPage'} onClick={getUserName == null ? checkLogin : ''} className='Header_mainHeader Header_Header5'>마이페이지</Link>
                }
            </div>
            <div className='Header_mainMenu'>
                <div>
                    <div></div>
                    <ul>
                        <li></li>
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle1'><Link to='/BoardPage' >공지사항</Link></li>
                        <li className='Header_subMenu Header_Menutitle2'><Link to='/Faq' >자주하는 질문</Link></li>
                        <li className='Header_subMenu Header_Menutitle3'><Link to='/Qna' >문의 게시판</Link> </li>
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle4'><Link to='/EventBoardPage' >이벤트</Link></li>
                        {/* <li className='Header_subMenu Header_Menutitle5'><Link to='/ClassSchedulePage' >수업 일정표</Link></li> */}
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle6'><Link to={getUserName == null ? '/LoginPage' : '/Sugang'} onClick={getUserName == null ? checkLogin : ''} >수강 신청</Link></li>
                        <li className='Header_subMenu Header_Menutitle7'><Link to={getUserName == null ? '/LoginPage' : '/PlaceRental'} onClick={getUserName == null ? checkLogin : ''} >대관 신청</Link></li>
                        <li className='Header_subMenu Header_Menutitle8'><Link to={getUserName == null ? '/LoginPage' : '/ParkingRequest'} onClick={getUserName == null ? checkLogin : ''}>주차 신청</Link></li>
                    </ul>
                    {
                        roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ? 
                            <ul>
                                <li className='Header_subMenu Header_Menutitle9'><Link to='/XUserInfoPage' onClick={getUserName == null ? checkLogin : ''} >인적관리</Link></li>
                                <li className='Header_subMenu Header_Menutitle10'><Link to='/XClassesInfoControl' onClick={getUserName == null ? checkLogin : ''} >강의관리</Link></li>
                                <li className='Header_subMenu Header_Menutitle11'><Link to='/XSugangRequestPage' onClick={getUserName == null ? checkLogin : ''} >이용신청 관리</Link></li>
                                <li className='Header_subMenu Header_Menutitle12'><Link to='/XRentalPlaceControllPage' onClick={getUserName == null ? checkLogin : ''} >시설관리</Link></li>
                                <li className='Header_subMenu Header_Menutitle12'><Link to='/XBoardControllPage' onClick={getUserName == null ? checkLogin : ''} >게시판관리</Link></li>
                            </ul>
                        :

                            <ul>
                                <li className='Header_subMenu Header_Menutitle9'><Link to={getUserName == null ? '/LoginPage' : '/ApplicationDetailsPage'} onClick={getUserName == null ? checkLogin : ''} >신청내역</Link></li>
                                <li className='Header_subMenu Header_Menutitle10'><Link to={getUserName == null ? '/LoginPage' : '/QRCodePage'} onClick={getUserName == null ? checkLogin : ''} >QR코드</Link></li>
                                <li className='Header_subMenu Header_Menutitle11'><Link to={getUserName == null ? '/LoginPage' : '/ModifyMemberPage'} onClick={getUserName == null ? checkLogin : ''} >내 정보 수정</Link></li>
                                <li className='Header_subMenu Header_Menutitle12'><Link to={getUserName == null ? '/LoginPage' : '/PasswordChangePage'} onClick={getUserName == null ? checkLogin : ''} >비밀번호 수정</Link></li>
                            </ul>
                    }
                </div>
            </div>
        </header>
    );
};