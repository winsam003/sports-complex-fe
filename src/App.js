import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import FindIDPage from './components/Pages/FindIDPage';
import FindPasswordPage from './components/Pages/FindPasswordPage';
import JoinPage1 from './components/Pages/JoinPage1';
import JoinPage2 from './components/Pages/JoinPage2';
import JoinPage3 from './components/Pages/JoinPage3';
import JoinPage4 from './components/Pages/JoinPage4';
import BoardPage from './components/Pages/BoardPage';
import FacilityInformationPage from './components/Pages/FacilityInformationPage';
import Inquiry from './components/Pages/Inquiry';
import FrequentlyAskedPage from './components/Pages/FrequentlyAskedPage';
import EventBoardPage from './components/Pages/EventBoardPage';
import EventDetailPage from './components/Pages/EventDetailPage';
import Faq from './components/Pages/Faq';
import Qna from './components/Pages/Qna';
import QnaDetailPage from './components/Pages/QnaDetailPage';
import Sugang from './components/Pages/Sugang';
import ClassSchedulePage from './components/Pages/ClassSchedulePage';
import PasswordChangePage from './components/Pages/PasswordChangePage';
import PasswordChangePage2 from './components/Pages/PasswordChangePage2';
import ModifyMemberPage from './components/Pages/ModifyMemberPage';
import QRCodePage from './components/Pages/QRCodePage';
import PlaceRentalInfo from './components/Pages/PlaceRentalInfo';
import PlaceRental from './components/Pages/PlaceRental';
import ParkingRequest from './components/Pages/ParkingRequest';
import ApplicationDetailsPage from './components/Pages/ApplicationDetailsPage';
import InfoHandlingPolicyPage from './components/Pages/InfoHandlingPolicyPage';
import VideoHandlePage from './components/Pages/VideoHandlePage';
import EmailCollectRefusal from './components/Pages/EmailCollectRefusal';
import VisitWayPage from './components/Pages/VisitWayPage';
import BoardControllPageDetailPage from './components/Pages/BoardControllPageDetailPage';
import FaqControllPageDetailPage from './components/Pages/FaqControllPageDetailPage';
import SearchAllPage from './components/Pages/SearchAllPage';
import NotFoundPage from './components/Pages/NotFoundPage';

import XmanagementPage from './components/Pages/XmanagementPage';
import XBoardWritePage from './components/Pages/XBoardWritePage';
import XEventBoardWritePage from './components/Pages/XEventBoardWritePage';
import XFaqBoardWritePage from './components/Pages/XFaqBoardWritePage';
import XQnaBoardAnswerPage from './components/Pages/XQnaBoardAnswerPage';
import XUserInfoPage from './components/Pages/XuserInfoPage';
import XmainEvent from './components/XmainEvent';
import XBoardControllPage from './components/Pages/XBoardControllPage';
import XEventBoardControllPage from './components/Pages/XEventBoardControllPage';
import XFaqBoardControllPage from './components/Pages/XFaqBoardControllPage';
import XQnaBoardControllPage from './components/Pages/XQnaBoardControllPage';
import XRentalPlaceControllPage from './components/Pages/XRentalPlaceControllPage';
import XReantalPlaceNewonePage from './components/Pages/XReantalPlaceNewonePage';
import XReantalPlaceDetailPage from './components/Pages/XReantalPlaceDetailPage';
import XlecturePage from './components/Pages/XlecturePage';
import XlectureDetailPage from './components/Pages/XlectureDetailPage';
import XlectureModifyPage from './components/Pages/XlectureModifyPage';
import XlecturerRegisterPage from './components/Pages/XlecturerRegisterPage';
import XParkingControllPage from './components/Pages/XParkingControllPage';
import XClassesInfoControl from './components/Pages/XClassesInfoControl';
import XNewClassUploadPage from './components/Pages/XNewClassUploadPage';
import XSugangRequestPage from './components/Pages/XSugangRequestPage';
import XRentalPlaceRequestControllPage from './components/Pages/XRentalPlaceRequestControllPage';
import XStaffInfoPage from './components/Pages/XStaffInfoPage';
import XStaffRegisterPage from './components/Pages/XStaffRegisterPage';
import XBoardControllPageDetailPage from './components/Pages/XBoardControllPageDetailPage';
import XBoardControllInsertPage from './components/Pages/XBoardControllInsertPage';
import XFnqControllPageDetailPage from './components/Pages/XFnqControllPageDetailPage';
import XFaqWritePage from './components/Pages/XFaqWritePage';
import XStaffModifyPage from './components/Pages/XStaffModifyPage';

import Footer from './components/Footer';
import Xheader from './components/Xheader';
import Header from './components/Header';
import XEventDetailPage from './components/Pages/XEventDetailPage';
import Modal from 'react-modal';

function App() {

  const [loginCheck, setLogincheck] = useState(false);

  // 로그인 / 로그아웃
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate('/'); // 기본 홈 페이지로 이동
    window.location.reload(); // 현재 페이지 새로 고침
  }

  let getUserName;
  let getUserID;
  let token;
  let roleList;

  if (sessionStorage.getItem('userData') != null) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData.name != null) {     // 사용자일 경우 
      getUserName = userData.name;
      getUserID = userData.id;
      token = userData.token;
      roleList = userData.roleList
    } else {                          // 직원일 경우
      getUserName = userData.stfname;
      getUserID = userData.stfid;
      token = userData.token;
      roleList = userData.roleList
    }
  }
  // roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER"

  const [isAdminPage, setIsAdminPage] = useState(window.location.pathname.includes('X'));
  const checkAdminPage = (e) => {
    if (!(roleList && roleList.length > 0 && roleList.some(item => item === "ADMIN" || item === "MANAGER"))) {
      console.log("TEST");
      alert("관리자 계정으로 로그인이 되어야 이용 가능합니다.");
      e.preventDefault();
    } else if (window.location.pathname.includes('X')) {
      setIsAdminPage(true);
    } else {
      setIsAdminPage(false);
    }
  }


  // const ModalExample = () => {
    const [modalIsOpen, setModalIsOpen] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: 10,
      position: "fixed",
      top: 0,
      left: 0,
    },
    content: {
      width: "360px",
      height: "370px",
      zIndex: 150,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };

  return (
    <div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles}>
        <h2>🤾‍♀ 피트네스트 로그인 🤾‍♂</h2>
        <pre>
          📌유저 로그인<br />
          user123<br />
          user123!!<br />
          <br />
          📌관리자 로그인<br />
          manager123<br />
          manager123!!<br />
          <br />
          관리자 로그인 후 상단에 있는 '관리자 페이지 전환' 클릭✔<br />
        </pre>
        <div className='Modal_button'>
          <button onClick={closeModal}>닫기</button>
        </div>
      </Modal>

      {window.location.pathname.includes('X') ?
        <Xheader checkAdminPage={checkAdminPage} logout={logout} getUserName={getUserName} roleList={roleList} />
        :
        <Header checkAdminPage={checkAdminPage} logout={logout} getUserName={getUserName} roleList={roleList} />}

      <Routes>
        <Route path='/' element={<HomePage setLogincheck={setLogincheck} loginCheck={loginCheck} logout={logout} getUserName={getUserName} roleList={roleList} />} />
        <Route path='/JoinPage1' element={<JoinPage1 />} />
        <Route path='/JoinPage1' element={<JoinPage1 />} />
        <Route path='/JoinPage2' element={<JoinPage2 />} />
        <Route path='/JoinPage3' element={<JoinPage3 />} />
        <Route path='/JoinPage4' element={<JoinPage4 />} />
        <Route path='/BoardPage' element={<BoardPage />} />
        <Route path='/BoardControllPageDetailPage' element={<BoardControllPageDetailPage />} />
        <Route path='/FacilityInformationPage' element={<FacilityInformationPage />} />
        <Route path='/FrequentlyAskedPage' element={<FrequentlyAskedPage />} />
        <Route path='/LoginPage' element={<LoginPage setLogincheck={setLogincheck} loginCheck={loginCheck} />} />
        <Route path='/FindPasswordPage' element={<FindPasswordPage />} />
        <Route path='/FindIDPage' element={<FindIDPage />} />
        <Route path='/Inquiry' element={<Inquiry />} />
        <Route path='/EventBoardPage' element={<EventBoardPage />} />
        <Route path='/EventDetailPage' element={<EventDetailPage />} />
        <Route path='/Faq' element={<Faq />} />
        <Route path='/Qna' element={<Qna />} />
        <Route path='/QnaDetailPage' element={<QnaDetailPage />} />
        <Route path='/Sugang' element={<Sugang />} />
        <Route path='/ClassSchedulePage' element={<ClassSchedulePage />} />
        <Route path='/PasswordChangePage' element={<PasswordChangePage getUserID={getUserID} />} />
        <Route path='/PasswordChangePage2' element={<PasswordChangePage2 token={token} />} />
        <Route path='/ModifyMemberPage' element={<ModifyMemberPage getUserID={getUserID} roleList={roleList} token={token} />} />
        <Route path='/QRCodePage' element={<QRCodePage getUserID={getUserID} />} />
        <Route path='/PlaceRentalInfo' element={<PlaceRentalInfo roleList={roleList} />} />
        <Route path='/PlaceRental' element={<PlaceRental getUserName={getUserName} getUserID={getUserID} token={token} />} />
        <Route path='/ParkingRequest' element={<ParkingRequest getUserName={getUserName} getUserID={getUserID} />} />
        <Route path='/ApplicationDetailsPage' element={<ApplicationDetailsPage token={token} getUserID={getUserID} />} />
        <Route path='/InfoHandlingPolicyPage' element={<InfoHandlingPolicyPage />} />
        <Route path='/VideoHandlePage' element={<VideoHandlePage />} />
        <Route path='/EmailCollectRefusal' element={<EmailCollectRefusal />} />
        <Route path='/VisitWayPage' element={<VisitWayPage />} />
        <Route path='/FaqControllPageDetailPage' element={<FaqControllPageDetailPage />} />
        <Route path='/SearchAllPage' element={<SearchAllPage />} />

        <Route path='/XmanagementPage' element={<XmanagementPage />} />
        <Route path='/XBoardWritePage' element={<XBoardWritePage getUserID={getUserID} token={token} />} />
        <Route path='/XEventBoardWritePage' element={<XEventBoardWritePage getUserID={getUserID} />} />
        <Route path='/XFaqBoardWritePage' element={<XFaqBoardWritePage />} />
        <Route path='/XQnaBoardAnswerPage' element={<XQnaBoardAnswerPage />} />
        <Route path='/XUserInfoPage' element={<XUserInfoPage token={token} />} />
        <Route path='/XmainEvent' element={<XmainEvent />} />
        <Route path='/XBoardControllPage' element={<XBoardControllPage />} />
        <Route path='/XEventBoardControllPage' element={<XEventBoardControllPage />} />
        <Route path='/XFaqBoardControllPage' element={<XFaqBoardControllPage />} />
        <Route path='/XQnaBoardControllPage' element={<XQnaBoardControllPage />} />
        <Route path='/XRentalPlaceControllPage' element={<XRentalPlaceControllPage />} />
        <Route path='/XReantalPlaceNewonePage' element={<XReantalPlaceNewonePage />} />
        <Route path='/XReantalPlaceDetailPage' element={<XReantalPlaceDetailPage />} />
        <Route path='/XlecturePage' element={<XlecturePage />} />
        <Route path='/XlectureDetailPage' element={<XlectureDetailPage />} />
        <Route path='/XlectureModifyPage' element={<XlectureModifyPage />} />
        <Route path='/XlecturerRegisterPage' element={<XlecturerRegisterPage />} />
        <Route path='/XParkingControllPage' element={<XParkingControllPage token={token} />} />
        <Route path='/XClassesInfoControl' element={<XClassesInfoControl />} />
        <Route path='/XNewClassUploadPage' element={<XNewClassUploadPage />} />
        <Route path='/XSugangRequestPage' element={<XSugangRequestPage />} />
        <Route path='/XRentalPlaceRequestControllPage' element={<XRentalPlaceRequestControllPage token={token} />} />
        <Route path='/XStaffInfoPage' element={<XStaffInfoPage />} />
        <Route path='/XStaffRegisterPage' element={<XStaffRegisterPage token={token} />} />
        <Route path='/XBoardControllPageDetailPage' element={<XBoardControllPageDetailPage />} />
        <Route path='/XBoardControllInsertPage' element={<XBoardControllInsertPage />} />
        <Route path='/XFnqControllPageDetailPage' element={<XFnqControllPageDetailPage />} />
        <Route path='/XStaffModifyPage' element={<XStaffModifyPage />} />
        <Route path='/XFaqWritePage' element={<XFaqWritePage getUserID={getUserID} token={token} />} />


        <Route path='/XEventDetailPage' element={<XEventDetailPage token={token} />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>



      <Footer />
    </div>
  );
}
// }

export default App;