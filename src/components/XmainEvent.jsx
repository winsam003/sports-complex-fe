import './XmainEvent.css'

import Submenu from './Submenu'
import XeventList from './XeventList'
import { useEffect, useState } from 'react'
import XhomeBannerEventList from './XhomeBannerEventList'
import HomeDetail from './HomeDetail'
import App from './../App';
import { apiCall } from '../apiService/apiService'
import { API_BASE_URL } from '../apiService/app-config'

export default function XmainEvent() {
    
    const [eventlist, setEventlist] = useState([]);
    const [bannerlist, setBannerlist] = useState([]);

    // 리스트 출력
    useEffect(() => {
        showEvent();
        showBanner();
        showBannerImage();
    }, []);

    const showEvent = () => {
        let url = "/event/eventlist";
    
        apiCall(url, 'get', null, null)
            .then((eventlist) => {
                setEventlist(eventlist);
            }).catch((error) => {
                console.log("eventlist error: ", error);
            })
    }

    const showBanner = () => {
        let url = "/banner/bannerlist";
        
        apiCall(url, 'get', null, null) 
        .then((bannerlist)=> {
            setBannerlist(bannerlist);
        }).catch((error) => {
            console.log("bannerlist error : ", error);
        })
    }
    
    const [imagePath, setImagePath] = useState('');
    const showBannerImage = () => {
        apiCall('/banner/bannerimages', 'get', null, null)
            .then((response) => {
                    setImagePath(response);
                }).catch((error) => {
                    console.log("이미지 없음 " + error);
                })
    }

    
    // ======================================================================== 리스트

    const [eventcodeC, setEventcodeC] = useState([]);
    
    const handleEvent = (eventcode) => {
        const isChecked = eventcodeC.includes(eventcode);

        if (isChecked) {
            setEventcodeC(eventcodeC.filter(code => code !== eventcode));
        } else {
            setEventcodeC([...eventcodeC, eventcode]);
        }
        
    }
    
    // console.log('eventcodeC : ', eventcodeC);

    // ================================================= 사진 등록하기. 
    
    const [bannerimg, setBannerimg] = useState(null);
    
    const makeBannerfile = (e) => {
        const file = e.target.files[0];

        setBannerimg(file);
        
    }

    // ================================================= 등록 버튼.

    const uploadBanner = () => {

        if(eventcodeC.length != 1) {
            alert('이벤트를 하나만 선택해주세요.');
            return;
        } 
        
        const uploadEventCode = eventcodeC[0];

        if(!bannerimg) {
            alert('이미지를 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('bannerfilef', bannerimg);

        let url = "/banner/bannerinsert";

        let formBanner = {
            eventcode : uploadEventCode,
            bannerfilef : bannerimg
        }

        let token = JSON.parse(sessionStorage.getItem("userData")).token;
        console.log('등록 formBanner : ',  formBanner);

        apiCall(url, 'post', formBanner, token)
            .then((response) => {
                alert((response));
                // 체크 리스트 초기화.
                setEventcodeC([]);
                // 리스트 다시 보여주고
                console.log('등록 후 eventcodeC : ',  eventcodeC);
                showEvent();
                showBanner();
            }).catch((error) => {
                alert('배너 등록 실패');
                console.log("banner error : " + error);
                setEventcodeC([]);
            })
    }

    

    // ================================================= 배너 삭제 버튼.
    
    const [deleteBannerCheck, setDeleteBannerCheck] = useState([]);

    const handleBanner = (bannerNum) => {
        const isChecked = deleteBannerCheck.includes(bannerNum);

        if(isChecked) {
            setDeleteBannerCheck(deleteBannerCheck.filter(num => num !== bannerNum));
        } else {
            setDeleteBannerCheck([...deleteBannerCheck, bannerNum]);
        }
    }

    // console.log('deleteBannerCheck : ', deleteBannerCheck);

    // 삭제 요청
    const del = () => {
        let url = "/banner/bannerdelete";

        apiCall(url, 'post', deleteBannerCheck, null)
            .then((response) => {
                alert(response);
                // 리스트 다시 보여주기.
                showBanner();
                setDeleteBannerCheck([]);
            }).catch((error) => {
                console.log("delete error: ", error);
                setDeleteBannerCheck([]);
            })
    }



    // ========================================================================
    return(
        <div className='XmainEvent_box'>
            <Submenu />
            <div className='XmainEvent_main'>
                <div className='XmainEvent_listTitle'>이벤트 게시물 목록 </div>
                < XeventList eventlist={eventlist} 
                            handleEvent={handleEvent}
                            eventcodeC={eventcodeC} />
                {/* 여기서 사진 등록 */}
                <div className='XmainEvent_upload'>
                    <input type="file" 
                            name='bannerfilef'
                            id='bannerfilef'
                            onChange={makeBannerfile}
                            // defaultValue={bannerfilef}
                            />

                    <button onClick={uploadBanner}>등록</button>        
                </div>

                {/* ============================================= */}

                <div className='XmainEvent_listTitle'>홈 배너 광고 리스트 </div>
                <XhomeBannerEventList 
                            bannerlist={bannerlist}
                            handleBanner={handleBanner}
                            deleteBannerCheck={deleteBannerCheck} 
                             />
                <div className='XmainEvent_delete' >
                    <button onClick={del}>삭제</button>
                </div>

                <div className='XmainEvent_listTitle'>광고 사진 </div>
                <div className='XmainEvent_adPics'>
                    {bannerlist.map((item, index) => (
                        <div key={item.bannernum}>
                            <p>{index+1} 번</p>
                            <img src={API_BASE_URL + "/banner/bannerimages?img=" + item.bannerimage} 
                                 alt="bannerImage" />
                        </div>
                    ))}
                    {/* erd 뽑아오는거. 테이블에 없으면.  */}
                </div>
            </div>
        </div>
    )
}