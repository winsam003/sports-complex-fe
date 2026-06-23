import './XQnaBoardAnswerContent.css'
import Submenu from './Submenu'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

// 문의게시판 답변하기
export default function XQnaBoardAnswerContent({ qnaData }) {
    // 현재 시간
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString();

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';
    const userID = userData.stfid;

    // 답변작성직원ID,답변내용 상태변화
    const [qnaReplyData, setQnaReplyData] = useState({
        'qanum': qnaData.qanum,
        'qareply': qnaData.qareply || '',
        'qareplytime': formattedTime,
        'stfid': qnaData.staff ? qnaData.staff.stfid : userID
    });

    // 등록 후 상세페이지 이동
    const navigate = useNavigate();

    // 입력값 변경
    const qnaReplyDataChange = (e) => {
        const { name, value } = e.target;
        setQnaReplyData({
            ...qnaReplyData, [name]: value,
            // 답변 변화가 있다면 기존 답변을 작성한 직원ID를 현재 작성자로 교체
            'stfid': value ? userID : qnaData.staff ? qnaData.sfaff.stfid : userID
        });
    }

    const formattedDate = formatDateTime(qnaData.qadate);

    // 날짜 및 시간을 원하는 형식으로 변환하는 함수
    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // 답변작성직원ID, 답변내용, 답변시간 추가
    const RegisterQnaReply = async () => {
        // 빈데이터 입력 방지
        if (!qnaReplyData.qareply.trim() || !qnaReplyData.stfid.trim()) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        let url = '/qna/qnaReplyInsert';

        apiCall(url, 'POST', qnaReplyData, null)
            .then((response) => {
                console.log("문의게시글 답변 등록 성공 : ", response);
                navigate('/QnaDetailPage', { state: { qnaData: { ...qnaData, stfid: qnaReplyData.stfid, qareply: qnaReplyData.qareply, qareplytime: qnaReplyData.qareplytime } } });
            }).catch((error) => {
                console.error("RegisterQnaReply fail", error);
            })
    };

    return (
        <div className='XQnaBoardAnswerContent_div'>
            <Submenu />
            <div className='XQnaBoardAnswerContent_div_div'>
                <div>
                    <p className='XQnaBoardAnswerContent_title'>{qnaData.qatitle}</p>
                    <div className='XQnaBoardAnswerContent_title_content'>
                        <p>작성자</p>
                        <p>{qnaData.member.id}</p>
                        <p>등록일시</p>
                        <p>{formattedDate}</p>
                        <p>조회수</p>
                        <p>{qnaData.qacount}</p>
                        <p>첨부파일</p>
                        <p>{qnaData.qafile}</p>
                    </div>
                    <p className='XQnaBoardAnswerContent_content'>
                        {qnaData.qacontent}
                    </p>
                </div>
                <p className='XQnaBoardAnswerContent_answer'>답변하기</p>
                <div className='XQnaBoardAnswerContent_haveto'>
                    <p>(<span className='star'>*</span>)는 반드시 작성해야 할 필수 항목입니다.</p>
                </div>
                <div className='XQnaBoardAnswerContent_form'>
                    <table>
                        <tbody>
                            <tr>
                                <th>작성자<span className='star'>*</span></th>
                                <td><input type="text" name='stfid' id='stfid' readOnly value={qnaReplyData.stfid} onChange={qnaReplyDataChange} /></td>
                            </tr>
                            <tr>
                                <th>내용 <span className='star'>*</span></th>
                                <td>
                                    <textarea
                                        name='qareply'
                                        id='qareply'
                                        value={qnaReplyData.qareply}
                                        onChange={qnaReplyDataChange}
                                        rows="100"
                                        style={{ resize: 'none', width: '750px', lineHeight: '1.5' }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='XQnaBoardAnswerContent_btn_div'>
                        <button onClick={RegisterQnaReply}>등록</button>
                        <button onClick={() => window.history.back()}>목록</button>
                    </div>
                </div>
            </div>
        </div >
    )
}