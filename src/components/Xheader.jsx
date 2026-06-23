import './Xheader.css';
import { Link } from 'react-router-dom';

import { TbUserPlus } from "react-icons/tb";

export default function Xheader({ checkAdminPage, logout, getUserName, roleList }) {


    return (
        <header>
            <div>
                <div className='goHome'><Link to='/'></Link></div>
                <Link to='/' className='noneHeader' onClick={checkAdminPage}>사용자 페이지 전환</Link>
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
                <div className='Header_logo'><Link to="/XmanagementPage">홈으로</Link></div>
                <Link to='/XmanagementPage' className='Header_mainHeader Header_Header1'>홈 화면 관리</Link>
                <Link to='/XUserInfoPage' className='Header_mainHeader Header_Header2'>인적 관리</Link>
                <Link to='/XClassesInfoControl' className='Header_mainHeader Header_Header3'>강의 관리</Link>
                <Link to='/XSugangRequestPage' className='Header_mainHeader Header_Header4'>이용신청 관리</Link>
                <Link to='/XRentalPlaceControllPage' className='Header_mainHeader Header_Header4'>시설 관리</Link>
                <Link to='/XBoardControllPage' className='Header_mainHeader Header_Header5'>게시판 관리</Link>
            </div>
            <div className='Header_mainMenu'>
                <div>
                    <div></div>
                    <ul>
                        <li></li>
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle1'><Link to='/XUserInfoPage' >회원정보 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle2'><Link to='/XStaffInfoPage' >직원정보 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle3'><Link to='/XStaffRegisterPage' >직원 등록</Link></li>
                        <li className='Header_subMenu Header_Menutitle4'><Link to='/XlecturePage' >강사정보 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle5'><Link to='/XlecturerRegisterPage' >강사 등록</Link> </li>
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle6'><Link to='/XClassesInfoControl' >강의정보 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle7'><Link to='/XNewClassUploadPage' >신규강의 등록</Link></li>
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle8'><Link to='/XSugangRequestPage' >수강신청 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle9'><Link to='/XRentalPlaceRequestControllPage' >대관신청 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle10'><Link to='/XParkingControllPage'>주차신청 관리</Link></li>
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle11'><Link to='/XRentalPlaceControllPage' >시설 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle12'><Link to='/XReantalPlaceNewonePage' >신규시설 등록</Link></li>
                    </ul>
                    <ul>
                        <li className='Header_subMenu Header_Menutitle13'><Link to='/XBoardControllPage' >공지사항 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle14'><Link to='/XEventBoardControllPage' >이벤트게시판 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle15'><Link to='/XFaqBoardControllPage' >자주하는질문 관리</Link></li>
                        <li className='Header_subMenu Header_Menutitle16'><Link to='/XQnaBoardControllPage' >문의게시판 &nbsp;관리</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};