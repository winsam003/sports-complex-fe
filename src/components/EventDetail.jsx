import React, { useEffect, useState } from 'react';
import { apiCall } from '../apiService/apiService';
import './EventDetail.css'
import { MdFestival } from "react-icons/md";
import { API_BASE_URL } from '../apiService/app-config';
import { useLocation } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';

export default function EventDetail({ eventcode }) {

    const location = useLocation();
    const navigate = useNavigate();

    // 디테일 정보 가져오기 ====================================================
    const [eventDetailOne, setEventDetailOne] = useState(location.state ? location.state : "");
    const [imagePath, setImagePath] = useState('');
    // console.log(`EventDetail 에서의 eventcode : `, eventcode);

    useEffect(() => {
        // 이미지 요청
        apiCall('/event/eventimages', 'get', null, null)
            .then((response) => {
                setImagePath(response);
                // console.log(response);
                // test = response;
            }).catch((error) => {
                console.log("이미지 없음 " + error)
            })
        let url = "/event/eventdetail?eventcode=" + eventcode;

        // stfid 가 아닐 때만 조회수를 올릴 것임. 그러니 세션에서 가져다가 담아주기
        let stfid = null;
        let token = null;
        if (sessionStorage.getItem('userData') != null) {
            token = JSON.parse(sessionStorage.getItem("userData")).token;
            const userData = sessionStorage.getItem("userData");
            if (JSON.parse(userData).stfid) {
                stfid = JSON.parse(userData).stfid;
            } else {
                stfid = null;
            }
        }

        console.log("eventcode : ", eventcode);
        console.log("stfid : ", stfid);

        let formDetail = {
            eventcode: eventcode,
            stfid: stfid
        }
        console.log("token : ", token);
        apiCall(url, 'post', formDetail, token)
            .then((eventDetailOne) => {
                setEventDetailOne(eventDetailOne);
            }).catch((error) => {
                console.log("eventDetail error : ", error);
            })


    }, []);


    // 수정버튼 이벤트
    const updateEventPage = () => {
        // console.log(eventDetailOne);
        navigate(`/XEventBoardWritePage?eventcode=${eventDetailOne.eventcode}`,
            {
                state: { detail: eventDetailOne }
            });
    }
    console.log(eventDetailOne.eventdetail)

    return (
        <div className="EventDetailContainor">
            <div className='EventDetail_Box'>
                <div className="EventDetail_title">
                    <MdFestival className='EventDetail_icon' />
                    <p>{eventDetailOne.eventname}</p>
                </div>
                <div className="EventDetail_menu">
                    <p>게시물 번호</p>
                    <p>{eventDetailOne.eventcode}</p>
                </div>

                <div className='EventDetail_twin'>
                    <div className="EventDetail_menu">
                        <p>이용시설</p>
                        <p>{eventDetailOne.eventfacility}</p>
                    </div>
                    <div className="EventDetail_menu">
                        <p>구분</p>
                        <p>{eventDetailOne.eventtype}</p>
                    </div>
                </div>

                <div className='EventDetail_twin'>
                    <div className="EventDetail_menu">
                        <p>대상</p>
                        <p>{eventDetailOne.eventfor}</p>
                    </div>
                    <div className="EventDetail_menu">
                        <p>행사 일시</p>
                        <p>{eventDetailOne.eventtime}</p>
                    </div>
                </div>

                {/* 아래는 추가정보 */}
                <div className='EventDetail_twin'>
                    <div className="EventDetail_menu">
                        <p>작성날짜</p>
                        <p>{eventDetailOne.eventdate}</p>
                    </div>
                    <div className="EventDetail_menu">
                        <p>조회수</p>
                        <p>{eventDetailOne.eventcount}</p>
                    </div>
                </div>
                {/* 내용이랑 사진 */}
                <div className='EventDetail_content'>
                    {/* <div>
                        <p>{eventDetailOne.eventdetail}</p>
                    </div> */}
                    <div>
                        {eventDetailOne && eventDetailOne.eventdetail.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {index === 0 ? line : <>{'\n'}<br />{line}</>}
                            </React.Fragment>
                        ))}
                    </div>
                    {(eventDetailOne.eventuploadfile) ?
                        <div>
                            {/* <img src={API_BASE_URL + "/event/eventimages?img=" + eventDetailOne.eventuploadfile} alt="이벤트 이미지" /> */}
                            <img src={API_BASE_URL + "/event/eventimages?img=" + eventDetailOne.eventuploadfile} alt="이벤트 이미지" />
                        </div>
                        :
                        <div></div>
                    }
                    <p className='EventDetail_stfid'>작성자 : {eventDetailOne.stfid}</p>
                </div>
            </div>
            <div className='EventDetail_buttonBox'>
                {location.pathname == '/XEventDetailPage' ?
                    // <button className='EventDetail_update'>수정</button>
                    <button className='EventDetail_update'
                        onClick={updateEventPage} >수정</button>

                    :
                    <span></span>}

                {/* <button className='EventDetail_button'  onClick={() => window.history.back()} >목록</button> */}
                <Link to="/XEventBoardControllPage" className='EventDetail_button' >목록</Link>

            </div>
        </div>
    )
}