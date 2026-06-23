import './XEventBoardWriteContent.css'
import Submenu from './Submenu';
import { useEffect, useRef, useState } from 'react';
import { apiCall } from '../apiService/apiService';
import { useNavigate } from 'react-router';
import { API_BASE_URL } from '../apiService/app-config';
import { Link } from 'react-router-dom';

// 공지사항
export default function XEventBoardWriteContent({getUserID, detail}) {

    // 수정 버전으로 들어왔을 때, 
    useEffect(() => {
        if (detail) {
            console.log('이벤트 상세 정보:detailState : ', detail);
            // 디테일이 존재한다면 
            setEventName(detail.eventname || "");
            setEventfacilityType(""); 
            setEventfacilityName(detail.eventfacility || "");
            setEventType(detail.eventtype || "");
            setEventFor(detail.eventfor || "");
            setEventDate(detail.eventtime || "");
            setEventDetail(detail.eventdetail || "");
        }
        titleInputRef.current.focus();
    }, [detail]);
    
    
    // 마우스 커서 조정하기
    const titleInputRef = useRef();
    // 이벤트 이름. 
    const [eventName, setEventName] = useState("");
    const makeEventName = (e) => {
        setEventName(e);
    }

    useEffect(() => {
        titleInputRef.current.focus();
    }, []);


    const facilityInputRef = useRef();
    // 이벤트 이용시설. 
    const [eventfacilityType, setEventfacilityType] = useState("");
    const [eventfacilityName, setEventfacilityName] = useState("");
    const makeEventfacility = (e) => {   
        setEventfacilityType(e);
        setEventfacilityName(e);
    }
    
    // 이벤트 종류 
    const [eventType, setEventType] = useState("");
    const makeEventType = (e) => {
        setEventType(e);   
    }
    
    // 이벤트 대상
    const [eventFor, setEventFor] = useState("");
    const makeEventFor = (e) => {
        setEventFor(e);
    }
    
    // 이벤트 시간
    const [eventDate, setEventDate] = useState("");
    const makeEventTime = (e) => {
        setEventDate(e);
    }

    const detailInputRef = useRef();
    // 이벤트 내용
    const [eventDetail, setEventDetail] = useState("");
    const makeEventDetail = (e) => {
        // setEventDetail(e.replace(/(?:\r\n|\r|\n)/g, `&#10;` ));
        setEventDetail(e);
    }

    // ++이벤트 사진 등록 안했을 때의 기본 이미지. 
    const [previewImage, setPreviewImage] = useState(null);
    // 이벤트 사진
    const [eventPics, setEventPics] = useState(null);
    const makeEventfile = (e) => {
        const file = e.target.files[0];
        
        // 사진 미리보기 기능. 
        const reader = new FileReader();
        // 파일 읽기 완료 후 실행되는 이벤트 핸들러
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);

        
        setEventPics(e.target.files[0]);
    };
    
    // handleAlertClose
    const handleAlertClose = (ref) => {
        ref.current.focus();
    }

    function generateImageUrl() {
        const imageUrl = eventPics ? 
                        URL.createObjectURL(eventPics) 
                        : 
                        `${API_BASE_URL}/event/eventimages?img=${detail.eventuploadfile}`;
        return imageUrl;
    }
    
    // 등록 ////////////////////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate();
    // insert 
    const eventSubmit = () => {
        // 무결성 검사
        if(!eventName) {
            alert('이벤트 제목을 입력해주세요.');
            handleAlertClose(titleInputRef);
            return;
        }
        if(!eventfacilityName) {
            alert('이벤트 이용 시설을 입력해주세요.');
            handleAlertClose(facilityInputRef);
            return;
        }
        if(!eventType) {
            alert('이벤트 종류를 입력해주세요.');
            return;
        }
        if(!eventFor) {
            alert('이벤트 행사 대상을 입력해주세요.');
            return;
        }
        if(!eventDate) {
            alert('이벤트 행사 날짜를 입력해주세요.');
            return;
        }
        if(!eventDetail) {
            alert('이벤트 행사 내용을 입력해주세요.');
            handleAlertClose(detailInputRef);
            return;
        }
        // 검사 끝

        const formData = new FormData();
        formData.append('file', eventPics);
        
        // 수정이 있다면
        if (detail) {
            console.log('수정할 때의 detail.eventcode : ' + detail.eventcode);

            let formEvent = {
                eventcode : detail.eventcode,
                eventname : eventName, 
                eventdetail : eventDetail, 
                eventfacility : eventfacilityName,
                eventtime : eventDate, 
                eventfor : eventFor, 
                eventtype : eventType, 
                eventfilef : eventPics, 
                stfid: getUserID
            }

            console.log('수정 formEvent : ',  formEvent);

            // 수정
            let url = "/event/eventupdate";
            let token = JSON.parse(sessionStorage.getItem("userData")).token;

            if(window.confirm("이벤트 정보를 수정하시겠습니까?")) {
                apiCall(url, 'post', formEvent, token)
                    .then((response) => {
                        navigate('/XEventDetailPage?eventcode='+detail.eventcode);
                        window.scrollTo(0, 525);
                    }).catch((error) => {
                        alert('이벤트 수정 실패');
                        console.log("event error : " + error);
                    })

            }

        } else {
            // 등록
            
            let url = "/event/eventinsert";

            // 등록 폼
            let formEvent = {
                eventname : eventName, 
                eventdetail : eventDetail, 
                eventfacility :  eventfacilityName,
                eventtime : eventDate, 
                eventfor : eventFor, 
                eventtype : eventType, 
                eventfilef : eventPics, 
                stfid: getUserID
            }
            
            let token = JSON.parse(sessionStorage.getItem("userData")).token;
            console.log('등록 formEvent : ',  formEvent);
    
            apiCall(url, 'post', formEvent, token) 
                .then((response) => {
                    alert((response));
                    navigate('/XEventBoardControllPage');
                    window.scrollTo(0, 0);
                }).catch((error) => {
                    alert("이벤트 등록 실패");
                    console.log("event error : " + error);
                })
        }


    }

    const goEventList = () => {
        if(window.confirm('수정사항이 저장되지 않습니다. \n정말 나가시겠습니까?')) {
            navigate('/XEventBoardControllPage');
        }
    }



    // console.log(eventfacilityName);
    // console.log('eventName : ' + eventName);
    // console.log('eventPics : ' + eventPics);
    


    return (
        <div className='XEventBoardWriteContent_div'>
            <Submenu />
            <div className='XEventBoardWriteContent_div_div'>
                <div className='XEventBoardContent_haveto'>
                    <p>(<span className='star'>*</span>)는 반드시 작성해야 할 필수 항목입니다.</p>
                </div>
                <div className='XEventBoardContent_form'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>작성자 <span className='star'>*</span></th>
                                    <td><input type="text" name='name' id='name' value={getUserID} readOnly /></td>
                                </tr>
                                <tr>
                                    <th>제목 <span className='star'>*</span></th>
                                    <td>
                                        <input type="text" name='title' 
                                                            id='title' 
                                                            value={eventName}
                                                            onChange={(e) => makeEventName(e.target.value)} 
                                                            ref={titleInputRef}
                                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <th>이용 시설 <span className='star'>*</span></th>
                                    <td>
                                        <select name="eventfacility" id="eventfacility" 
                                                value={eventfacilityType} 
                                                onChange={(e) => makeEventfacility(e.target.value)}  >
                                            <option value="">직접 입력</option>
                                            <option value="운동장 ">운동장</option>
                                            <option value="농구장 ">농구장</option>
                                            <option value="풋살장 ">풋살장</option>
                                            <option value="테니스장 ">테니스장</option>
                                        </select>
                                        <input type="text" name='eventfacilityName' id='eventfacilityName'
                                                value={eventfacilityName}
                                                onChange={(e) => makeEventfacility(e.target.value)}
                                                ref={facilityInputRef} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>이벤트 종류</th>
                                    <td>
                                        <input type="radio" id='eventboard_sport' 
                                                name='eventboard_Type' value='스포츠 행사'
                                                checked={eventType === '스포츠 행사'}
                                                onChange={(e) => makeEventType(e.target.value)} />
                                        <label htmlFor="eventboard_sport">스포츠 행사</label>
                                        <input type="radio" id='eventboard_general' name='eventboard_Type' value='일반 행사'
                                                checked={eventType === '일반 행사'}
                                                onChange={(e) => makeEventType(e.target.value)} />
                                        <label htmlFor="eventboard_general">일반 행사</label>
                                        <input type="radio" id='eventboard_competition' name='eventboard_Type' value='대회'
                                                checked={eventType === '대회'}
                                                onChange={(e) => makeEventType(e.target.value)} />
                                        <label htmlFor="eventboard_competition">대회</label>
                                    </td>
                                </tr>
                                <tr>
                                    <th>이벤트 대상</th>
                                    <td>
                                        <select name="eventfor" id="eventfor"
                                                value={eventFor}
                                                onChange={(e) => makeEventFor(e.target.value)}>
                                                    <option value="전체">전체</option>
                                                    <option value="아이(만 10세 이하)">아이(만 10세 이하)</option>
                                                    <option value="청소년(만 19세 이하)">청소년(만 19세 이하)</option>
                                                    <option value="성인">성인</option>
                                                    <option value="중장년(만 65세 이상)">노인(만 65세 이상)</option>
                                                    {/* 노인 말고 다른 호칭이 있나요 */}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>날짜 <span className='star'>*</span></th> 
                                    <td>
                                        <input type="date" name='eventdate' id='eventdate' 
                                                value={eventDate}
                                                onChange={(e) => makeEventTime(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>내용 <span className='star'>*</span></th>
                                    <td>
                                        <textarea type="text" name='content' id='content' 
                                                defaultValue={eventDetail}
                                                onChange={(e) => makeEventDetail(e.target.value)}
                                                placeholder='1000자 이내로 작성해주세요. '
                                                ref={detailInputRef} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td className='XEventBoardContent_upload'>
                                        <input className='test' type="file" name='uploadfilef' id='uploadfilef'
                                                onChange={makeEventfile}
                                                defaultValue={eventPics} />
                                        {/* 수정이라면 */}
                                        {detail ? 
                                            // 수정인데 파일이 있다면 : 없다면
                                            (detail.eventuploadfile ?
                                                <img src={generateImageUrl()} alt="이벤트 이미지" />
                                                :    
                                                <img src="../img/noimage.png" alt="기본 이미지" />
                                            )
                                            :
                                            // 수정이 아니라면 . 
                                            (previewImage ? 
                                                <img src={previewImage} alt='이걸로 등록?' />
                                                :
                                                <img src="../img/noimage.png" alt="기본 이미지" />
                                            )
                                    }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    <div className='XEventBoardContent_btn_div'>
                        <button onClick={eventSubmit}>등록</button>
                        <button onClick={goEventList}>목록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}