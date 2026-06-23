import { useLocation, useNavigate } from 'react-router';
import './XBoardControllContentDateil2.css'
import { MdFestival } from "react-icons/md";
import { apiCall } from "../apiService/apiService";
import { useEffect, useState } from 'react';
import React from 'react';


export default function XBoardControllContentDateil2() {

    const location = useLocation();
    const receivedInfo = location.state;

    // qadate를 연월일시분 형식으로 표현
    const formattedDate = new Date(receivedInfo.notdate).toLocaleString('ko-KR', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 오전/오후 표기를 제거하기 위해
    }).replace(/\./g, '');


    const fileDownloadLink = () => {
        let filePath = `/notice/downloadFile?fileName=${receivedInfo.notuploadfile}`;

        apiCall(filePath, 'get', null, null)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.blob]));
                const a = document.createElement('a');

                a.href = url;
                a.download = receivedInfo.notuploadfile;

                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }).catch((error) => {
                console.log("error occured = " + error)
            })
    }



    const [noticeContent, setNoticeContent] = useState('');
    const noticeContentHandler = (e) => {
        setNoticeContent(e.target.value);
    }


    const [selectedFile, setSelectedFile] = useState();
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        receivedInfo.notuploadfile = e.target.files[0].name;
    }

    const [modifyOn, setModifyOn] = useState(false);
    const modify = () => {
        setModifyOn(true);
    }

    const navigate = useNavigate();
    const noticeModify = () => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        let token = userData.token;
        if (window.confirm("정말 수정하시겠습니까?")) {
            let url = '/notice/noticeModify';
            const formData = new FormData();
            formData.append('file', selectedFile);

            const getUserName = JSON.parse(sessionStorage.getItem('userData')).stfid;
            let requestData = {
                stfid: getUserName,
                notnum: receivedInfo.notnum,
                notdetail: noticeContent,
                file: formData.get('file')
            }
            apiCall(url, 'post', requestData, token)
                .then((response) => {
                    alert(response);
                    setModifyOn(false);
                    if (window, location.pathname.includes('XBoardControllPageDetailPage')) {
                        navigate(`/XBoardControllPage`);
                    } else {
                        navigate(`/XFaqBoardControllPage`);
                    }
                }).catch((error) => {
                    alert("게시글 수정에 실패하였습니다. 관리자에게 문의해주세요.");
                    console.log('modify error occured = ' + error)
                })
        }
    }


    useEffect(() => {
        setNoticeContent(receivedInfo.notdetail);
        setSelectedFile(receivedInfo.notuploadfile);
    }, [])

    return (
        <div className='XBoardControllContentDateil2_div'>
            <div className="XBoardControllContentDateil2Containor">
                <div className='XBoardControllContentDateil2_Box'>

                    {location.pathname.indexOf("/BoardControllPageDetailPage") !== -1 || location.pathname.indexOf("/FaqControllPageDetailPage") !== -1 ?
                        ""
                        :
                        <div className='XBoardControllContentDateil2_modityBtnBox'>
                            <button className='XBoardControllContentDateil2_modityBtn' onClick={modify}>수정하기</button>
                        </div>
                    }



                    <div className="XBoardControllContentDateil2_title">
                        <MdFestival className='EventDetail_icon' />
                        <p className="XBoardControllContentDetail2_title2" >{receivedInfo.nottitle}</p>
                    </div>
                    <div className='XBoardControllContentDateil2_twin'>
                        <div className="XBoardControllContentDateil2_menu">
                            <p>게시글 번호</p>
                            <p className="XBoardControllContentDetail2_title2" >{receivedInfo.notnum}</p>
                        </div>
                        <div className="XBoardControllContentDateil2_menu">
                            <p>공지대상</p>
                            <p className="XBoardControllContentDetail2_title2" >{receivedInfo.quest}</p>
                        </div>
                    </div>

                    <div className='XBoardControllContentDateil2_twin'>
                        <div className="XBoardControllContentDateil2_menu">
                            <p>작성자</p>
                            <p className="XBoardControllContentDetail2_title2" >{receivedInfo.stfid}</p>
                        </div>
                        <div className="XBoardControllContentDateil2_menu">
                            <p>작성날짜</p>
                            <p className="XBoardControllContentDetail2_title2" >{formattedDate}</p>
                        </div>
                    </div>

                    {/* 아래는 추가정보 */}
                    <div className='XBoardControllContentDateil2_twin'>
                        <div className="XBoardControllContentDateil2_menu">
                            <p>파일</p>
                            {modifyOn ?
                                <span>
                                    <span className='XBoardControllContentDateil2_selectedFile'>{receivedInfo.notuploadfile ? receivedInfo.notuploadfile : ""}</span>
                                    <input className='test' type="file" name='uploadfilef' id='uploadfilef' onChange={handleFileChange} />
                                </span>
                                :
                                <p className='XBoardControllContentDetail2_title2 XBoardControllContentDateil2_file' onClick={fileDownloadLink}>{receivedInfo.notuploadfile}</p>
                            }
                        </div>
                        <div className="XBoardControllContentDateil2_menu">
                            <p>조회수</p>
                            <p className="XBoardControllContentDetail2_title2" >{receivedInfo.notcount}</p>
                        </div>
                    </div>
                    <div className="XBoardControllContentDateil2_contents">
                        {modifyOn ?
                            <textarea className='XBoardControllContentDateil2_modifiedContents' type="text" name='content' id='content' value={noticeContent} onChange={noticeContentHandler}></textarea>
                            :

                            <div>
                                {receivedInfo.notdetail.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {index === 0 ? line : <>{'\n'}<br />{line}</>}
                                    </React.Fragment>
                                ))}
                            </div>

                        }
                    </div>
                    <div>
                        {/* <img src='../public/img/dora.jpg' alt="이벤트 이미지" /> */}
                    </div>
                </div>



                <div className='XBoardControllContentDateil2_buttonBox'>
                    {modifyOn ?
                        <button className='XBoardControllContentDateil2_button' onClick={noticeModify}>수정하기</button>
                        :
                        ""
                    }
                    <button className='XBoardControllContentDateil2_button' onClick={() => window.history.back()}>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}
