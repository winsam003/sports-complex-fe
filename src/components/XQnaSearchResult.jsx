import './XBoardSearchResult.css'
import './XQnaSearchResult.css'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

export default function XQnaSearchResult({ qanum, qaopen, qapassword, qatype, qatitle, member, qadate, qareply, qacount, onToggleCheckbox, isChecked, userData }) {
    // 모달창 팝업 상태
    const [showModal, setShowModal] = useState(false);
    // 비밀번호 확인
    const [passwordInput, setPasswordInput] = useState('');

    // 상세페이지로 이동하기
    const navigate = useNavigate();

    // 사용자 페이지 접근
    const location = useLocation();

    // apicall 데이터 요청
    const fetchQnaData = async (qanum) => {
        try {
            let url = '/qna/qnadetail';
            const response = await
                apiCall(url + `/${qanum}`, 'get', null, null)
            return response;
        } catch (error) {
            console.error('Error fetching QnA data:', error);
            throw error;
        }
    };

    // 비밀글 여부 확인
    const handleQnaResultClick = async () => {
        // Session storage에 있는 userData 가져오기
        const sessionUserData = sessionStorage.getItem('userData');
        const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';
        const isAdminOrManager = userData.roleList.includes('ADMIN') || userData.roleList.includes('MANAGER');
        if (qaopen == '0' && !isAdminOrManager) {
            setShowModal(true);
        } else {
            try {
                const qnaData = await fetchQnaData(qanum);
                navigate(location.pathname == '/Qna' ? '/QnaDetailPage' : '/XQnaBoardAnswerPage', { state: { qnaData } });
            } catch (error) {
                console.log('Error fetching QnA data : ', error);
            }
        }
    };

    // 모달창 상태관리
    const handleModalClose = () => {
        setShowModal(false);
        setPasswordInput('');
    };

    // 비밀번호 확인 후 일치하면 페이지 이동
    const handlePasswordSubmit = async () => {
        try {
            if (passwordInput === qapassword) {
                const qnaData = await fetchQnaData(qanum);
                navigate(location.pathname == '/Qna' ? '/QnaDetailPage' : '/XQnaBoardAnswerPage', { state: { qnaData } });
                // 페이지 이동 후 모달 닫기
                handleModalClose();
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.log('Error fetching QnA data : ', error);
        }
    };

    // 체크박스
    const handleCheckboxChange = (e) => {
        onToggleCheckbox(qanum);
    }

    // qadate를 연월일시분 형식으로 표현
    const formattedDate = new Date(qadate).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div className={`XQnaSearchResult_SearchResult_${location.pathname === '/Qna' ? 'user' : 'admin'}`} onClick={(e) => {
            // 페이지 이동 이벤트에서 체크박스 제외
            if (e.target.tagName.toLowerCase() !== 'input' && e.target.tagName.toLowerCase() === 'p') {
                if (!e.target.querySelector('input')) {
                    handleQnaResultClick();
                }
            }
        }}>
            {
                location.pathname == '/Qna' ?
                    <>
                        {/* 사용자 조회결과 */}
                        <p>{qanum}</p>
                        <p>{qaopen == '0' ? <img src="/img/Lock.png" className='lockimg' /> : <img src="/img/Unlock.png" className='unlockimg' />}</p>
                        <p className='XQnaSearchResult_SearchResult_title'>[{qatype}] {qatitle}</p>
                        <p>{member.id}</p>
                        <p>{formattedDate}</p>
                        <p>{qareply == null ? "답변대기" : "답변완료"}</p>
                        <p>{qacount}</p>
                    </>
                    :
                    <>
                        {/* 관리자 조회결과 */}
                        <p><input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} /></p>
                        <p>{qanum}</p>
                        <p>{qaopen == '0' ? <img src="/img/Lock.png" className='lockimg' /> : <img src="/img/Unlock.png" className='unlockimg' />}</p>
                        <p className='XQnaSearchResult_SearchResult_title'>[{qatype}] {qatitle}</p>
                        <p>{member.id}</p>
                        <p>{formattedDate}</p>
                        <p>{qareply == null ? "답변대기" : "답변완료"}</p>
                        <p>{qacount}</p>
                    </>
            }
            {
                showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <span className="close" onClick={(e) => { e.stopPropagation(); handleModalClose(); }}>&times;</span>
                            <h2 className='modalFont'>{qanum}. {qatitle}</h2>
                            <h2 className='modalFont'>비밀번호 입력</h2>
                            <input className='modal_input' type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                            <button className='modal_button' onClick={handlePasswordSubmit}>확인</button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}