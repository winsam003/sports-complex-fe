import './XBoardWriteContent.css';
import Submenu from './Submenu';
import { useState } from 'react';
import { apiCall } from '../apiService/apiService';
import { useLocation, useNavigate } from 'react-router';


// 공지사항
export default function XBoardWriteContent({ getUserID, token }) {

    const location = useLocation();
    const navigate = useNavigate();


    const [questype, setQuestype] = useState('')
    const questypeHandler = (e) => {
        setQuestype(e.target.value);
    }

    const [noticeTitle, setNoticeTitle] = useState('');
    const noticeTitleHandler = (e) => {
        setNoticeTitle(e.target.value);
    }


    const [noticeContent, setNoticeContent] = useState('');
    const noticeContentHandler = (e) => {
        setNoticeContent(e.target.value);
    }


    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }


    const noticeSubmit = () => {
        let url;
        let requestData;
        if (location.pathname.indexOf("/XBoardWritePage") !== -1) {           // 공지사항 등록
            url = "/notice/noticeSubmit";
            const formData = new FormData();
            formData.append('file', selectedFile);

            requestData = {
                stfid: getUserID,
                quest: questype,
                nottitle: noticeTitle,
                notdetail: noticeContent,
                file: formData.get('file'),
                notdate: new Date(),
                nottype: 'A',
                notcount: 0
            }
        } else {
            url = "/notice/noticeSubmit";
            const formData = new FormData();
            formData.append('file', selectedFile);

            requestData = {
                stfid: getUserID,
                quest: questype,
                nottitle: noticeTitle,
                notdetail: noticeContent,
                file: formData.get('file'),
                notdate: new Date(),
                nottype: 'B',
                notcount: 0
            }

        }


        apiCall(url, 'post', requestData, token)
            .then((response) => {
                alert(response);
                if (location.pathname.indexOf("XBoardWritePage") !== -1) {       // 공지사항 게시판일 경우 공지사항 list로 이동
                    navigate("/XBoardControllPage");
                } else {                                                    // 자주묻는질문 게시판일 경우 자주묻는질문 list로 이동
                    navigate("/XFaqBoardControllPage");
                }
            }).catch((error) => {
                alert("등록에 실패하였습니다. 관리자에게 문의해주세요.");
                if (location.pathname.indexOf("XBoardControllPage" !== -1)) {       // 공지사항 게시판일 경우 공지사항 에러 발생
                    console.log("Notice board writing error occured = " + error);
                } else {                                                    // 자주묻는질문 게시판일 경우 자주묻는질문 에러 발생
                    console.log("Faq board writing error occured = " + error);
                }
            })
    }

    return (
        <div className='XBoardWriteContent_div'>
            <Submenu />
            <div className='XBoardWriteContent_div_div'>
                <div className='XBoardWriteContent_haveto'>
                    <p>(<span className='star'>*</span>)는 반드시 작성해야 할 필수 항목입니다.</p>
                </div>
                <div className='XBoardWriteContent_form'>
                    <table>
                        <thead>
                            <tr>
                                <th>작성자 <span className='star'>*</span></th>
                                <td><input type="text" name='name' id='name' value={getUserID} placeholder='로그인하면 자동으로 채워집니다.' readOnly /></td>
                            </tr>
                            <tr>
                                <th>공지사항 종류</th>
                                <td>
                                    <input type="radio" id='board_space' name='board_Type' value={'시설'} onChange={questypeHandler} />
                                    <label htmlFor="board_space">시설</label>
                                    <input type="radio" id='board_sugang' name='board_Type' value={'강좌'} onChange={questypeHandler} />
                                    <label htmlFor="board_sugang">강좌</label>
                                    <input type="radio" id='board_general' name='board_Type' value={'일반'} onChange={questypeHandler} />
                                    <label htmlFor="board_general">일반</label>
                                </td>
                            </tr>
                            <tr>
                                <th>제목 <span className='star'>*</span></th>
                                <td>
                                    <input type="text" name='title' id='title' onBlur={noticeTitleHandler} />
                                </td>
                            </tr>
                            <tr>
                                <th>내용 <span className='star'>*</span></th>
                                <td>
                                    <textarea type="text" name='content' id='content' onBlur={noticeContentHandler} />
                                </td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td className='InquiryRegistration_upload'>
                                    <input className='test' type="file" name='uploadfilef' id='uploadfilef' onChange={handleFileChange} />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>작성일</th>
                                <td>{new Date().toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='XBoardWriteContent_btn_div'>
                        <button onClick={noticeSubmit}>등록</button>
                        <button onClick={() => window.history.back()}>목록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}