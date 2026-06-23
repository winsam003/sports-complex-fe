
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomeDetail.css';
import { TbUser } from "react-icons/tb";
import { TbLock } from "react-icons/tb";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TbCalendar } from "react-icons/tb";
import { useCallback, useEffect, useState } from 'react';
import { CiViewList } from "react-icons/ci";
import { BsQrCode } from "react-icons/bs";
import { GrContactInfo } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { apiCall } from '../apiService/apiService';
import { MdOutlineRememberMe } from "react-icons/md";
import { MdOutlinePlayLesson } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { API_BASE_URL } from '../apiService/app-config';

export default function HomeDetail({ setLogincheck, loginCheck, logout, getUserName, roleList }) {


    // **********************************slick settings 시작***********************************//
    const settings = {
        dots: true,            // 하단 페이지 위치 점 표시
        infinite: true,         // 끝에 도달하면 슬라이드 무한루프
        speed: 500,             // 슬라이드 전환 속도
        slidesToShow: 1,        // 한번에 보여지는 슬라이드 수
        slidesToScroll: 1,      // 한번에 스크롤되는 슬라이드 수
        autoplay: true,         // 자동 재생 기능
        autoplaySpeed: 3000,    // 자동 재생 시 다음 슬라이드 전환 속도
        arrows: false           // 페이지전환 화살표 숨기기
    };
    // **********************************slick settings 끝***********************************//





    // ********************************로그인 시작*************************************//
    const navigate = useNavigate();

    // 1. 로그인, 비밀번호 정보를 저장한다.
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 2. 로그인 버튼을 누른 순간 서버로 axios 요청을 보낸다.

    const requestLogin = () => {

        let url = "/member/mlogin";
        const requstData = {
            id: id,
            password: password
        }
        apiCall(url, 'post', requstData, null
        ).then((response) => {
            // 3. 200번일 경우 로그인성공 alert창 띄우고 홈페이지로 이동
            sessionStorage.setItem('userData', JSON.stringify(response));

            alert(`안녕하세요 ${response.name} 님`);
            setLogincheck(!loginCheck);
            navigate('/');
        }).catch((error) => {
            // 4. 그 외일 경우 alert창 띄우고 재 로그인 유도
            alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
            console.log("login Error occured => " + error)
        })
    }

    // 비밀번호에서 enter키 누르면 로그인 요청
    const handleKeypress = (e) => {
        if (e.target.name === 'password') {
            if (e.key === 'Enter') {
                requestLogin();
            }
        } else {
            if (e.key === 'Enter') {
                SearchAll(e);
            }
        }
    }

    // ********************************로그인 끝*************************************//


    const idHandler = (value) => {
        setId(value);
    }
    const passwordHandler = (value) => {
        setPassword(value);
    }

    // ============================================배너
    // 배너 요청

    const [bannerlist, setBannerlist] = useState([]);
    const showBanner = async () => {
        try {
            let url = "/banner/bannerlist";
            const bannerlist = await apiCall(url, 'get', null, null);
            setBannerlist(bannerlist);
            console.log('bannerlistbannerlistbannerlistbannerlist', bannerlist);
        } catch (error) {
            console.log("bannerlist error : ", error);
        }
    }

    useEffect(() => {
        showBanner();
    }, []);

    useEffect(() => {
        if (bannerlist.length > 0) {
            showBannerImage();
        }
    }, [bannerlist]);

    // 배너 이미지 경로 요청
    const [imagePath, setImagePath] = useState('');
    const showBannerImage = useCallback(() => {
        if (bannerlist.length > 0) {
            apiCall('/banner/bannerimages', 'get', null, null)
                .then((response) => {
                    setImagePath(response);
                }).catch((error) => {
                    console.log("이미지 없음 " + error);
                })
        }
    }, [bannerlist]);

    // 배너 이미지 클릭시 디테일로 이동.
    const goEventDetail = useCallback((eventcode) => {
        try {
            console.log("goEventDetail", eventcode);
            navigate(`/EventDetailPage?eventcode=${eventcode}`);
            window.scrollTo(0, 0);
        } catch (error) {
            console.log('Error eventDetail from HomeDetail : ', error);
        }
    }, [navigate]);


    // 전체 게시판 검색 ======================================================================================

    // 전체 게시판 이동

    // 검색내용 저장
    const [keyword, SetKeyword] = useState()
    const search = (e) => {
        SetKeyword(e.target.value)
    }

    const SearchAll = () => {
        if (keyword != null) {
            navigate("/SearchAllPage", { state: { keyword } });
        } else {
            alert("검색내용을 입력해주세요.")
        }
    }
    // 전체 게시판 검색 ======================================================================================

    return (
        <div className='homeDetail_container'>
            <div className='homeDetail_items1'>
                <div>
                    <input id='search' name='search' type="text" placeholder='검색어를 입력해주세요.' onChange={search} onKeyPress={handleKeypress} />
                    <input className='searchbtn' id='search' name='search' type="submit" value='검색' onClick={SearchAll} />
                </div>
                <div>
                    {/* <div className='homeDetail_Calenderbox'>
                        <div className='homeDetail_CalendarCaption'>월간일정<TbCalendar className='homeDetail_Icon' /></div>
                        <div className='homeDetail_Calendar'>
                            <div>1월</div>
                            <div>2월</div>
                            <div>3월</div>
                            <div>4월</div>
                            <div>5월</div>
                            <div>6월</div>
                            <div>7월</div>
                            <div>8월</div>
                            <div>9월</div>
                            <div>10월</div>
                            <div>11월</div>
                            <div>12월</div>
                        </div>
                    </div> */}
                    <div className='slideBox'>
                        <Slider {...settings}>
                            {bannerlist && bannerlist.map((item, index) => (
                                <div key={item.bannernum}>
                                    <img
                                        className={`slide${index}`}

                                        src={API_BASE_URL + "/banner/bannerimages?img=" + item.bannerimage}
                                        onClick={() => goEventDetail(item.event.eventcode)}
                                        alt='bannerImage' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>


            </div>
            <div className='homeDetail_items2'>
                {getUserName == null ?
                    <div className='homeDetail_items2_fir'>
                        <table className='homeDetail_loginbox'>
                            <tbody>
                                <tr>
                                    <th><TbUser className='homeDetail_Icon' /></th>
                                    <td><input id='id' name='id' type="text" placeholder='아이디를 입력하세요.' value={id} onChange={(e) => idHandler(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <th><TbLock className='homeDetail_Icon' /></th>
                                    <td><input id='password' name='password' type="password" placeholder='비밀번호를 입력하세요.' value={password} onChange={(e) => passwordHandler(e.target.value)} onKeyPress={handleKeypress} /></td>
                                </tr>
                                <tr className="homeDetail_login">
                                    <td></td>
                                    <td><button onClick={requestLogin} id='homeDetail_loginbtn'>로그인</button></td>
                                </tr>
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                        <div className='homeDetail_helpLogin'>
                            <Link to="/FindIDPage">아이디찾기</Link>
                            <Link to="/FindPasswordPage">비밀번호찾기</Link>
                            <Link to="/JoinPage1">회원가입</Link>
                        </div>
                    </div>
                    :
                    <div className='homeDetail_loginDiv'>
                        <div className='homeDetail_loginUserName'>{getUserName} 님</div>
                        <div className='homeDetail_firstMenuBox'>

                            {/* 직원일 경우, 회원일 경우 구분해서 링크 박스 변경 */}
                            {roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ? <Link to='/UserInfoPage' className='homeDetail_firstMenuBox_s1'><MdOutlineRememberMe className='homeDetail_icons' />인적관리</Link>
                                : <Link to='/ApplicationDetailsPage' className='homeDetail_firstMenuBox_s1'><CiViewList className='homeDetail_icons' />신청내역</Link>}

                            {roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ? <Link to='/XClassesInfoControl' className='homeDetail_firstMenuBox_s1'><MdOutlinePlayLesson className='homeDetail_icons' />강의관리</Link>
                                : <Link to='/QRCodePage' className='homeDetail_firstMenuBox_s2'><BsQrCode className='homeDetail_icons' />QR코드</Link>}

                            {roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ? <Link to='/XSugangRequestPage' className='homeDetail_firstMenuBox_s1'><CiViewList className='homeDetail_icons' />신청관리</Link>
                                : <Link to='/ModifyMemberPage' className='homeDetail_firstMenuBox_s3'><GrContactInfo className='homeDetail_icons' />내 정보 수정</Link>}

                            {roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ? <Link to='/XRentalPlaceControllPage' className='homeDetail_firstMenuBox_s1'><TbSoccerField className='homeDetail_icons' />시설관리</Link>
                                : <Link to='/PasswordChangePage' className='homeDetail_firstMenuBox_s4'><RiLockPasswordLine className='homeDetail_icons' />비밀번호 수정</Link>}

                            {roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER") ? <Link to='/XBoardControllPage' className='homeDetail_firstMenuBox_s1'><HiClipboardDocumentList className='homeDetail_icons' />게시판관리</Link>
                                : ""}
                        </div>

                        <div className='homeDetail_lastMenuBox'>
                            <span onClick={() => { logout(); setLogincheck(!loginCheck); }}><IoIosLogOut className='homeDetail_icons' />로그아웃</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};