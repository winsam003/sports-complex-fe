import './XStaffRegisterContent.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { apiCall } from '../apiService/apiService';

export default function XStaffRegisterContent() {


    const location = useLocation();
    const receivedInfo = location.state;

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';
    // 아이디 중복확인
    const [idDuplication, setIdDuplication] = useState(false);

    // 서버에서 staff정보를 받아옴
    const duplication = () => {
        let url = '/staff/staffList';

        apiCall(url, 'get', null, userData.token)
            .then((response) => {
                const stafflist = response;
                // 입력한 아이디와 staff id를 비교해 같은 id인지 확인
                const idDuplicationCheck = stafflist.filter((list) => list.stfid === staffData.stfid);

                if (idDuplicationCheck.length > 0) {
                    alert("중복된 ID입니다. 다른 아이디를 사용해주세요.");
                    setIdMessage("중복된 ID입니다. 다른 아이디를 사용해주세요.");
                } else {
                    alert("사용가능한 ID입니다.");
                    setIdMessage("사용가능한 ID입니다.");
                    setIdDuplication(true);
                }
            }).catch((error) => {
                console.log(`ID중복체크 error = ${error}`);
            })
    }

    // 직원등록 데이터 전송
    const [staffData, setstaffData] = useState({
        stfid: '',
        stfpassword: '',
        stfdmp: '시설',
        stflevel: '팀장',
        stfname: '',
        stfpnum: '',
        stfcode: 'STSPBJ'
    });

    // id 무결성 검사
    const [idMessage, setIdMessage] = useState('');
    const [idcheck, setIdcheck] = useState(false);
    const idSpecial = /^[a-zA-Z0-9]+$/;

    // password 무결성 검사
    const [pwMessage, setPwMessage] = useState('');
    const [pwcheck, setPwcheck] = useState(false);
    const pwSpecial = /[!-*.@]/gi;

    // 이름 무결성 검사
    const [nameMessage, setNameMessage] = useState('');
    const [nameCheck, setNameCheck] = useState(false);
    const nameKorean = /^[가-힣]+$/;
    const nameEnglish = /^[a-zA-Z]+$/;

    // 휴대전화 무결성 검사
    const [phoneNumMessage, setPhoneNumMessage] = useState('');
    const [phoneNumCheck, setPhoneNumCheck] = useState(false);
    const phoneNumSpecial = /^[0-9]+$/;

    // 직원코드조합
    const handleChange = (e) => {
        const { name, value } = e.target;

        // id 무결성 검사
        if (name === 'stfid') {
            if (value.length < 4 || value.length > 12) {
                setIdMessage('* 4글자 이상 12글자 이하로 입력해주세요.');
                setIdcheck(false);
            } else if (value.replace(idSpecial, '').length > 0) {
                setIdMessage('* 숫자와 영문만 사용가능합니다.');
                setIdcheck(false);
            } else {
                setIdMessage('');
                setIdcheck(true);
            }
        }

        // password 무결성 검사
        if (name === 'stfpassword') {
            if (value.length < 9) {
                setPwMessage('* 9자리 이상으로 입력해주세요.');
                setPwcheck(false);
            } else if (value.replace(pwSpecial, '').length === value.length) {
                setPwMessage('* password는 특수문자를 포함해야 합니다.');
                setPwcheck(false);
            } else {
                setPwMessage('');
                setPwcheck(true);
            }
        }

        // 이름 무결성 검사
        if (name === 'stfname') {
            if (value.length < 2 || value.length > 10) {
                setNameMessage('올바른 이름을 입력해주세요');
                setNameCheck(false);
            } else if (!nameKorean.test(value) && !nameEnglish.test(value)) {
                setNameMessage('한글 또는 영어 하나만 사용해주세요');
                setNameCheck(false);
            } else {
                setNameMessage('');
                setNameCheck(true);
            }
        }

        // 전화번호 무결성 검사
        if (name === 'stfpnum') {
            if (value.length < 9 || value.length > 12) {
                setPhoneNumMessage('올바른 번호를 입력해주세요');
                setPhoneNumCheck(false);
            } else if (value.replace(phoneNumSpecial, '').length === value.length) {
                setPhoneNumMessage('숫자만 입력해주세요');
                setPhoneNumCheck(false);
            } else {
                setPhoneNumMessage('');
                setPhoneNumCheck(true);
            }
        }

        // 부서코드조합
        if (name === 'stfdmp') {
            let code = 'ST';
            if (value === '시설') {
                code += 'SP';
            } else if (value === '강좌') {
                code += 'CL';
            } else if (value === '일반') {
                code += 'GE';
            }
            setstaffData({ ...staffData, [name]: value, stfcode: code + staffData.stfcode.substring(4) });
        } else if (name === 'stflevel') {
            // 직위코드조합
            let code = staffData.stfcode.substring(0, 4);
            if (value === '팀장') {
                code += 'BJ';
            } else if (value === '사원') {
                code += 'SF';
            }
            setstaffData({ ...staffData, [name]: value, stfcode: code });
        } else {
            setstaffData({ ...staffData, [name]: value });
        }
    };

    // 직원 등록 데이터 보내기
    const navigate = useNavigate();
    const joinStaff = () => {
        let token;
        if (sessionStorage.getItem('userData') != null) {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            token = userData.token;
        }


        if (location.pathname.indexOf("/XStaffModifyPage") !== -1) {
            if (idcheck && pwcheck && nameCheck && phoneNumCheck) {
                if (window.confirm("직원 정보를 수정하시겠습니까?")) {
                    let url = '/staff/staffModify';

                    apiCall(url, 'post', staffData, token)
                        .then((response) => {
                            alert("직원 등록에 성공하였습니다.");
                            navigate('/XStaffInfoPage');
                        }).catch(error => {
                            if (error === 403) {
                                alert("[403] 해당 기능 접근 권한이 없습니다.");
                            } else {
                                console.error('staffInsert :' + error);
                            }
                        });
                }
            } else {
                alert("입력정보를 확인해주세요.");
            }
        } else {
            if (idcheck && pwcheck && nameCheck && phoneNumCheck) {
                if (window.confirm("직원을 등록하시겠습니까?")) {
                    let url = '/staff/staffInsert';

                    apiCall(url, 'post', staffData, token)
                        .then((response) => {
                            alert("직원 등록에 성공하였습니다.");
                            navigate('/XStaffInfoPage');
                        }).catch(error => {
                            if (error === 403) {
                                alert("[403] 해당 기능 접근 권한이 없습니다.");
                            } else {
                                console.error('staffInsert :' + error);
                            }
                        });
                }
            } else {
                alert("입력정보를 확인해주세요.");
            }

        }
    };

    useEffect(() => {
        if (receivedInfo !== null) {
            setstaffData({
                stfid: receivedInfo.stfid,
                stfdmp: receivedInfo.stfdmp,
                stflevel: receivedInfo.stflevel,
                stfname: receivedInfo.stfname,
                stfpnum: receivedInfo.stfpnum,
                stfcode: receivedInfo.stfcode
            })
            setIdcheck(true);
            setPwcheck(true);
            setNameCheck(true);
            setPhoneNumCheck(true);
        }
    }, [])

    return (
        <div>
            {location.pathname.indexOf("/XStaffModifyPage") !== -1 ?
                <table className='XStaffRegisterContent_talbe'>
                    <caption className='XStaffRegisterContent_Caption'>직원 정보수정</caption>
                    <tbody>
                        <tr>
                            <th className='JoinStaff_title'> ID <span className='JoinLecture_star'>*</span></th>
                            <td>
                                <input className="XStaffRegisterContent_input2" type="text" name='stfid' placeholder='4-12글자 로 입력해주세요.' value={staffData.stfid} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>소속<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <select className='XStaffRegisterContent_select' name="stfdmp" value={staffData.stfdmp} onChange={handleChange}>
                                    <option value="시설">시설</option>
                                    <option value="강좌">강좌</option>
                                    <option value="일반">일반</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>직위<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <select className='XStaffRegisterContent_select' name="stflevel" value={staffData.stflevel} onChange={handleChange}>
                                    <option value="팀장">팀장</option>
                                    <option value="사원">사원</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'> 이름 <span className='JoinLecture_star'>*</span></th>
                            <td><input className="XStaffRegisterContent_input" type="text" name='stfname' value={staffData.stfname} onChange={handleChange} />
                                <div className='Message'>{nameMessage}</div></td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>휴대전화<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <input className="XStaffRegisterContent_input" type="text" name="stfpnum" value={staffData.stfpnum} onChange={handleChange} />
                                <div className='Message'>{phoneNumMessage}</div>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>직원코드</th>
                            <td><input className="XStaffRegisterContent_input" type="text" value={staffData.stfcode} readOnly /></td>
                        </tr>
                    </tbody>
                </table>
                :
                <table className='XStaffRegisterContent_talbe'>
                    <caption className='XStaffRegisterContent_Caption'>직원 등록</caption>
                    <tbody>
                        <tr>
                            <th className='JoinStaff_title'> ID <span className='JoinLecture_star'>*</span></th>
                            <td>
                                <input className="XStaffRegisterContent_input" type="text" name='stfid' placeholder='4-12글자 로 입력해주세요.' onChange={handleChange} readOnly={idDuplication ? true : false} />
                                <button type='button' className='idCheck' onClick={() => { duplication() }}>중복확인</button>
                                <div className='Message' style={{ color: idMessage === "사용가능한 ID입니다." ? 'black' : 'red' }}>{idMessage}</div>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'> 비밀번호 <span className='JoinLecture_star'>*</span></th>
                            <td>
                                <input className="XStaffRegisterContent_input" type="text" name='stfpassword' placeholder='@$!%^*#?&를 포함해 9자리 이상 입력해주세요.' onChange={handleChange} />
                                <div className='Message'>{pwMessage}</div>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>소속<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <select className='XStaffRegisterContent_select' name="stfdmp" value={staffData.stfdmp} onChange={handleChange}>
                                    <option value="시설">시설</option>
                                    <option value="강좌">강좌</option>
                                    <option value="일반">일반</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>직위<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <select className='XStaffRegisterContent_select' name="stflevel" value={staffData.stflevel} onChange={handleChange}>
                                    <option value="팀장">팀장</option>
                                    <option value="사원">사원</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'> 이름 <span className='JoinLecture_star'>*</span></th>
                            <td><input className="XStaffRegisterContent_input" type="text" name='stfname' onChange={handleChange} />
                                <div className='Message'>{nameMessage}</div></td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>휴대전화<span className='JoinLecture_star'>*</span></th>
                            <td>
                                <input className="XStaffRegisterContent_input" type="text" name="stfpnum" placeholder='- 없이 입력해주세요.' onChange={handleChange} />
                                <div className='Message'>{phoneNumMessage}</div>
                            </td>
                        </tr>
                        <tr>
                            <th className='JoinStaff_title'>직원코드</th>
                            <td><input className="XStaffRegisterContent_input" type="text" value={staffData.stfcode} readOnly /></td>
                        </tr>
                    </tbody>
                </table>
            }
            {location.pathname.indexOf("/XStaffModifyPage") !== -1 ?
                <div className='JoinStaff_submitBox' >
                    <input className="JoinStaff_submitInput" type="button" value={"정보수정"} onClick={joinStaff} />
                </div>
                :
                <div className='JoinStaff_submitBox' >
                    <input className="JoinStaff_submitInput" type="button" value={"직원등록"} onClick={joinStaff} />
                </div>
            }

        </div>
    )
}