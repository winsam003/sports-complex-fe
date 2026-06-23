import './InquiryRegistration.css'
import Submenu from './Submenu'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

export default function InquiryRegistration() {
    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';
    const userID = {
        id: userData.id
    }

    // 새글쓰기 내용
    const [qnaNewOneData, setQnaNewOneDate] = useState({
        id: userID.id,
        qatype: '시설문의',
        qaopen: '1',
        qacount: '0',
    });

    // 약관동의 체크 상태
    const [checkBoxes, setCheckBoxes] = useState({
        AgreePersonal: false,
        AgreeInfo: false,
        AgreeShare: false
    });

    // 약관동의 위치로 Refs 설정
    const AgreePersonalRef = useRef(null);
    const AgreeInfoRef = useRef(null);
    const AgreeShareRef = useRef(null);

    // userID에 일치하는 정보 가져오기
    useEffect(() => {
        let url = '/member/mDetail';

        apiCall(url, 'post', userID, userData.token)
            .then((response) => {
                setQnaNewOneDate(userData => (
                    {
                        ...userData,
                        phonenum: response.phonenum,
                        email: response.email,
                    }
                ));
            }).catch((error) => {
                console.log("LoginID info pull fail : ", error);
            })
    }, []);

    // 등록 후 상세페이지 이동
    const navigate = useNavigate();

    // 약관동의 변경
    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setCheckBoxes(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    // 문의글 제목, 내용
    const handleQnaContent = (e) => {
        const { name, value, files } = e.target;
        // 파일 선택 시 처리
        if (name == 'qafile') {
            // 파일을 선택한 경우에만 처리
            if (files.length > 0) {
                setQnaNewOneDate(prevData => ({
                    ...prevData,
                    [name]: files[0]
                }));
            } else {
                // 파일을 선택하지 않은 경우 처리
                setQnaNewOneDate(prevData => ({
                    ...prevData,
                    qafile: null
                }));
            }
        } else {
            // 다른 입력란에 대한 처리
            setQnaNewOneDate(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    // // qadate에 현재 시간, 파일 추가
    // const handleQaDate = () => {
    //     const currentTime = new Date().toISOString();
    //     return currentTime;
    // }

    // 문의게시판 새글등록 요청보내기
    const RegisterQna = (() => {

        // 무결성 검사
        // 동의여부 확인
        if (!checkBoxes.AgreePersonal) {
            alert('개인정보 수집이용에 동의해주세요');
            AgreePersonalRef.current.scrollIntoView();
            return;
        }
        if (!checkBoxes.AgreeInfo) {
            alert('정보통신망법에 동의해주세요');
            AgreeInfoRef.current.scrollIntoView();
            return;
        }
        if (!checkBoxes.AgreeShare) {
            alert('민원신청 내용 공유에 동의해주세요');
            AgreeShareRef.current.scrollIntoView();
            return;
        }

        // 제목, 게시글 입력확인
        if (!qnaNewOneData.qatitle) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!qnaNewOneData.qacontent) {
            alert('내용을 입력해주세요.');
            return;
        }

        // 공개글 선택시 입력한 비밀번호 초기화
        if (qnaNewOneData.qaopen == '1') {
            setQnaNewOneDate(prevData => ({
                ...prevData,
                qapassword: null
            }));
        }

        // 비밀글 비밀번호 검사
        if (qnaNewOneData.qaopen == '0' && !/^\d{4}$/.test(qnaNewOneData.qapassword)) {
            alert('비밀번호는 숫자로 이루어진 4자리여야 합니다.');
            return;
        }

        // qadate에 현재 시간, 파일 추가
        qnaNewOneData.qadate = new Date().toISOString();

        // 파일을 건네주기 위한 formData객체 생성
        const formData = new FormData();
        // 파일 추가
        formData.append('file', qnaNewOneData.qafile);
        qnaNewOneData.qafile = formData.get('file');

        let url = '/qna/qnaInsert'
        apiCall(url, 'post', qnaNewOneData, userData.token)
            .then(() => {
                navigate('/QnaDetailPage', { state: { qnaData: { ...qnaNewOneData } } });
            }).catch((error) => {
                console.log("QnaWrite Error : ", error);
            })
    });

    return (
        <div className='InquiryRegistration_box' >
            <Submenu />
            <div className='InquiryRegistration_InquiryInfo'>
                <h1>문의게시판 등록</h1>
                <div className='InquiryRegistration_infoBox'>
                    <h3>게시판 이용 주의사항</h3>
                    <ul>
                        <li>개인정보가 불법적으로 이용되는 것을 막기 위해 이용자께서는 e-메일, 주소, 주민번호, 전화번호 등 개인정보에 관한 사항을 내용에 게시하는것을 주의하시기 바랍니다.</li>
                        <li>이용자가 게시한 자료중 상업적 광고, 불건전한 내용, 특정인에 대한 비방, 명예훼손 등의 우려가 있는 내용, 정치적 목적이나 성향이 있는 게시물, 개인정보가 포함된 게시물 등은 관리자에 의거 사전 통보없이 삭제됩니다.</li>
                    </ul>
                </div>

                <h2 className='InquiryRegistration_miniTitle'>개인정보 수집 및 이용에 대한 안내</h2>
                <div className='InquiryRegistration_infoBox'>
                    <p>피트네스트 는 고객의 소리 등 민원에 대한 소관 업무의 수행을 위하여 다음과 같이 개인정보를 수집 및 이용합니다.</p>
                    <ul>
                        <li>개인정보의 수집·이용목적</li>
                        <ul>
                            <li>관계법령 등에서 정하는 소관 업무의 수행을 위하여 다음과 같이 개인정보를 수집 및 이용합니다.</li>
                            <li>수집된 개인정보는 정해진 목적 이외의 용도로는 이용되지 않습니다.</li>
                        </ul>
                        <li>개인정보의 수집·이용 항목</li>
                        <ul>
                            <li>필수항목 : 성명, 연락처(휴대폰 또는 전화번호 중 택일)</li>
                            <li>선택항목 : 이메일</li>
                        </ul>
                        <li>개인정보의 보유·이용기간 : 3년</li>
                        <li>개인정보 수집을 원하지 않을 경우 동의를 거부할 수 있으며, 이 경우 민원 신청 서비스가 제한됩니다.</li>
                    </ul>
                </div>
                <div className='InquiryRegistration_check' ref={AgreePersonalRef}>
                    <input type="checkbox" name='AgreePersonal' id='AgreePersonal' checked={checkBoxes.AgreePersonal} onChange={handleCheckBoxChange} />
                    <span><label htmlFor="AgreePersonal">위의 개인정보 수집이용에 동의합니다.</label></span>
                </div>

                <h2 className='InquiryRegistration_miniTitle'>정보통신망법 등 동의 안내</h2>
                <div className='InquiryRegistration_infoBox'>
                    <p>귀하가 공개하신 내용은 타인이 볼 수도 있습니다. 타인의 개인정보(전자우편 등)를 정보주체의 동의 없이 취득하거나 공개하는 경우, 인권을 침해하는 경우 등은 관련 법에 의해 처리될 수 있습니다.</p>
                    <ul>
                        <li>개인정보보호법</li>
                        <li>정보통신망이용촉진 및 정보보호등에 관한 법률(이하'정보통신망법') 등</li>
                    </ul>
                </div>
                <div className='InquiryRegistration_check' ref={AgreeInfoRef}>
                    <input type="checkbox" name='AgreeInfo' id='AgreeInfo' checked={checkBoxes.AgreeInfo} onChange={handleCheckBoxChange} />
                    <span><label htmlFor="AgreeInfo">정보통신망법에 동의합니다.</label></span>
                </div>

                <h2 className='InquiryRegistration_miniTitle'>민원공유동의 안내</h2>
                <div className='InquiryRegistration_infoBox'>
                    <p>동의를 거부할 수 있으며, 거부에 따른 불이익은 없습니다.</p>
                </div>
                <div className='InquiryRegistration_check' ref={AgreeShareRef}>
                    <input type="checkbox" name='AgreeShare' id='AgreeShare' checked={checkBoxes.AgreeShare} onChange={handleCheckBoxChange} />
                    <span><label htmlFor="AgreeShare">귀하의 민원신청 내용을 공유하는 것에 동의하십니까?</label></span>
                </div>
                <div className='InquiryRegistration_haveto'>
                    <p>문의 게시글 작성
                    </p>
                    <p>(<span className='star'>*</span>)는 반드시 작성해야 할 필수 항목입니다.</p>
                </div>
                <div className='InquiryRegistration_form'>
                    <table>
                        <tbody>
                            <tr>
                                <th>작성자 </th>
                                <td><input type="text" name='name' id='name' readOnly value={userID.id} /></td>
                            </tr>
                            <tr>
                                <th>연락처 </th>
                                <td>
                                    <input type="text" name='phoneNum' id='phoneNum' readOnly value={qnaNewOneData.phonenum || ''} />
                                </td>
                            </tr>
                            <tr>
                                <th>이메일 </th>
                                <td>
                                    <input type="text" name='email' id='email' readOnly value={qnaNewOneData.email || ''} />
                                </td>
                            </tr>
                            <tr>
                                <th>민원종류</th>
                                <td>
                                    <label htmlFor="qatype">
                                        <input type="radio" id='qatype1' name='qatype' value='시설문의'
                                            checked={qnaNewOneData.qatype == '시설문의'} onChange={handleQnaContent} />
                                        시설문의</label>
                                    <label htmlFor="qatype">
                                        <input type="radio" id='qatype2' name='qatype' value='일반문의'
                                            checked={qnaNewOneData.qatype == '일반문의'} onChange={handleQnaContent} />
                                        일반문의</label>
                                    <label htmlFor="qatype">
                                        <input type="radio" id='qatype3' name='qatype' value='수강문의'
                                            checked={qnaNewOneData.qatype == '수강문의'} onChange={handleQnaContent} />
                                        수강문의</label>
                                </td>
                            </tr>
                            <tr>
                                <th>제목 <span className='star'>*</span></th>
                                <td>
                                    <input type="text" name='qatitle' id='qatitle'
                                        value={qnaNewOneData.qatitle} onChange={handleQnaContent} />
                                </td>
                            </tr>
                            <tr>
                                <th>내용 <span className='star'>*</span></th>
                                <td>
                                    <textarea
                                        name='qacontent'
                                        id='qacontent'
                                        value={qnaNewOneData.qacontent || ''}
                                        onChange={handleQnaContent}
                                        rows="100"
                                        style={{ resize: 'none', width: '750px', lineHeight: '1.5' }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td className='InquiryRegistration_upload'>
                                    <input className='test' type="file" name='qafile' id='qafile'
                                        onChange={handleQnaContent} />
                                </td>
                            </tr>
                            <tr>
                                <th>공개/비공개 </th>
                                <td>
                                    <label htmlFor="open">
                                        <input type="radio" id='qaopen1' name='qaopen' value='1'
                                            checked={qnaNewOneData.qaopen == '1'} onChange={handleQnaContent} />
                                        공개</label>
                                    <label htmlFor="private">
                                        <input type="radio" id='qaopen0' name='qaopen' value='0'
                                            checked={qnaNewOneData.qaopen == '0'} onChange={handleQnaContent} />
                                        비공개</label>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호 </th>
                                <td>
                                    <input type="password" name='qapassword' id='qapassword'
                                        placeholder={qnaNewOneData.qaopen == '0' ? '4자리 숫자를 입력해주세요' : ''}
                                        value={qnaNewOneData.qaopen === '1' ? '' : qnaNewOneData.qapassword || ''}
                                        onChange={handleQnaContent}
                                        disabled={qnaNewOneData.qaopen == '1'}
                                        style={{ backgroundColor: qnaNewOneData.qaopen == '1' ? '#e9ecef' : 'white' }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='InquiryRegistration_btn_div'>
                    <button onClick={RegisterQna}>등록</button>
                    <button onClick={() => window.history.back()}>목록</button>
                </div>
            </div>
        </div>
    )
}

