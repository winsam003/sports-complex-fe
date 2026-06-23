import './XQnaBoardAnswerContent.css'
import Submenu from './Submenu'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

// 문의게시판 사용자 상세페이지
export default function QnaDetail({ }) {
    const location = useLocation();
    const qnaData = location.state ? location.state.qnaData : null;
    // 게시글 삭제 후 목록으로 이동
    const navigate = useNavigate();

    // join에서 member객체를 가져온 경우, qna entity를 직접 가져온 경우 
    const id = qnaData.id || (qnaData.member ? qnaData.member.id : '') || '';

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';
    const userID = userData.id;

    // 사용자 작성 시간과 답변 작성 시간
    const qadate = formatDateTime(qnaData.qadate);
    const qareplytime = formatDateTime(qnaData.qareplytime);

    // 날짜 및 시간을 원하는 형식으로 변환하는 함수
    function formatDateTime(dateTimeString) {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // 게시물 삭제 요청
    const handleDelete = (() => {
        let url = '/qna/qnaDelete';
        apiCall(url + `?qanum=${qnaData.qanum}`, 'get', null, null)
            .then(() => {
                navigate('/Qna');
            }).catch((error) => {
                console.log('Qna Detail Delete Error', error);
            });
    });

    // 목록으로 이동
    const goToQnaPage = () => {
        navigate('/Qna');
    };

    let displayFile = '';

    // qafile 또는 qafile.name이 존재하는 경우에만 처리
    if (qnaData.qafile && (qnaData.qafile.name || typeof qnaData.qafile === 'string')) {
        let fileNameParts = [];

        // File 객체인 경우 파일명 분할
        if (qnaData.qafile instanceof File) {
            fileNameParts = qnaData.qafile.name.split('.');
        }
        // 문자열인 경우 파일명 분할
        else if (typeof qnaData.qafile === 'string' && qnaData.qafile !== "undefined") {
            fileNameParts = qnaData.qafile.split('.');
        }

        // 파일 확장자
        const fileExtension = fileNameParts.length > 1 ? fileNameParts.pop() : '';
        const fileNameWithoutExtension = fileNameParts.join('.');

        // 파일명의 일부 선택하여 표시
        const maxFileNameLength = 20;
        const maxLengthEachPart = Math.floor((maxFileNameLength - fileExtension.length - 4) / 2);
        const truncatedFileNameStart = fileNameWithoutExtension.substring(0, maxLengthEachPart);
        const truncatedFileNameEnd = fileNameWithoutExtension.substring(fileNameWithoutExtension.length - maxLengthEachPart);
        const displayFileName = `${truncatedFileNameStart}\u00B7\u00B7\u00B7${truncatedFileNameEnd}`;

        // 화면에 표시할 파일명 및 확장자 설정
        displayFile = `${displayFileName}.${fileExtension}`;
    }

    // 파일 다운로드 클릭 이벤트 핸들러
    const handleDownloadClick = (e) => {
        e.preventDefault(); // 기본 이벤트 동작 방지
        downloadFile();
    };

    // 파일 다운로드
    const downloadFile = () => {

        let filePath = `/qna/downloadFile?fileName=${qnaData.qafile}`;

        apiCall(filePath, 'get', null, null)
            .then((response) => {
                // 파일 다운로드를 위해 Blob으로 변환
                // Blob을 URL로 변환하여 다운로드 링크 생성
                const url = window.URL.createObjectURL(new Blob([response.blob]));
                const a = document.createElement('a');

                a.href = url;
                a.download = qnaData.qafile;
                // 다운로드 링크 클릭하여 파일 다운로드 시작
                document.body.appendChild(a);
                a.click();
                // 다운로드 후 URL 객체 해제
                window.URL.revokeObjectURL(url);
            }).catch((error) => {
                console.log(" download error = " + error)
            })
    }

    return (
        <div className='XQnaBoardAnswerContent_div'>
            <Submenu />
            <div className='XQnaBoardAnswerContent_div_div'>
                <div>
                    <p className='XQnaBoardAnswerContent_title'>[{qnaData.qatype}] {qnaData.qatitle}</p>
                    <div className='XQnaBoardAnswerContent_title_content'>
                        <p>작성자</p>
                        <p>{id}</p>
                        <p>등록일시</p>
                        <p>{qadate}</p>
                        <p>조회수</p>
                        <p>{qnaData.qacount}</p>
                        <p>첨부파일</p>
                        <p><a href="#" onClick={handleDownloadClick}>{displayFile}</a></p>
                    </div>
                    <p className='XQnaBoardAnswerContent_content'>
                        {qnaData.qacontent}
                    </p>
                </div>
                <p className='XQnaBoardAnswerContent_answer'>답변</p>
                <div className='XQnaBoardAnswerContent_form'>
                    <table>
                        <tbody>
                            <tr>
                                <th>작성자</th>
                                <td>{qnaData.stfid || (qnaData.staff ? qnaData.staff.stfid : '') || ''}</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <textarea
                                        name='qareply'
                                        id='qareply'
                                        value={qnaData.qareply || ''}
                                        rows="100"
                                        style={{ resize: 'none', width: '750px', lineHeight: '1.5' }}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>작성일</th>
                                <td>{qnaData.qareplytime ? qareplytime : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='XQnaBoardAnswerContent_btn_div'>
                        {/* 작성자와 로그인된 아이디가 같으면 삭제버튼 나타남 */}
                        {userID == id && (
                            <button onClick={handleDelete}>삭제</button>
                        )}
                        <button onClick={goToQnaPage}>목록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}