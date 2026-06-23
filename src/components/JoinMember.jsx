import { useState } from 'react';
import './JoinMember.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import DaumPostcode from 'react-daum-postcode';
import { apiCall } from '../apiService/apiService';

export default function JoinMember({ memberType }) {


    // ==========================전화번호 병합 시작============================//
    const [firstPhoneNum, setFirstPhoneNum] = useState("010");
    const [secondPhoneNum, setSecondPhoneNum] = useState("");
    const [lastPhoneNum, setLastPhoneNum] = useState("");

    // phoneNumber 무경설검사
    const [phoneMessage, setPhoneMessage] = useState('* 연락 가능한 전화번호를 입력해주세요. ');
    const [phone1check, setPhone1check] = useState();
    const [phone2check, setPhone2check] = useState();
    const phoneNumSpecial = /^\d+$/;

    const firstNum = (e) => {
        setFirstPhoneNum(e);
        const fullNumber = e + secondPhoneNum + lastPhoneNum;
        setFormData({
            ...formData,
            phonenum: fullNumber
        });
    }
    const secondNum = (e) => {

        if (e.length > 4) {
            setPhoneMessage("* 전화번호는 각 자리에 4자리 이하로 작성해주세요.");
            setPhone1check(false);
        } else if (e.replace(phoneNumSpecial, '').length > 0) {
            setPhoneMessage("* 전화번호에는 숫자만 가능합니다.");
            setPhone1check(false);
        } else {
            setPhoneMessage('');
            setPhone1check(true);


            setSecondPhoneNum(e);
            const fullNumber = firstPhoneNum + e + lastPhoneNum;
            setFormData({
                ...formData,
                phonenum: fullNumber
            });
        }


    }
    const lastNum = (e) => {
        if (e.length > 4) {
            setPhoneMessage("* 전화번호는 각 자리에 4자리 이하로 작성해주세요.");
            setPhone2check(false);
        } else if (e.replace(phoneNumSpecial, '').length > 0) {
            setPhoneMessage("* 전화번호에는 숫자만 가능합니다.");
            setPhone2check(false);
        } else {
            setPhoneMessage('');
            setPhone2check(true);

            setLastPhoneNum(e);
            const fullNumber = firstPhoneNum + secondPhoneNum + e;
            setFormData({
                ...formData,
                phonenum: fullNumber
            });
        }


    }
    // ==========================전화번호 병합 끝============================//




    // ==========================이메일 병합 시작============================//
    const [firstMemberEmail, setFirstMemberEmail] = useState("");
    const firstEmail = (e) => {
        setFirstMemberEmail(e);
        const fullEmail = e + lastMemberEmail;
        setFormData({
            ...formData,
            email: fullEmail
        });
    }

    const [lastMemberEmail, setLastMemberEmail] = useState("");
    const lastEmail = (e) => {
        setLastMemberEmail(e);
        const fullEmail = firstMemberEmail + e;
        setFormData({
            ...formData,
            email: fullEmail
        });
    }
    // ==========================이메일 병합 끝============================//








    // ==========================체크박스 true/false 지정 시작============================//
    const [isSnsChecked, setIsChecked] = useState(false);
    const snsChecking = (e) => {
        setIsChecked(!isSnsChecked);
        setFormData({
            ...formData,
            [e.target.name]: !isSnsChecked,
        });
    }


    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const emailChecking = (e) => {
        setIsEmailChecked(!isEmailChecked);
        setFormData({
            ...formData,
            [e.target.name]: !isEmailChecked,
        });
    }
    // ==========================체크박스 true/false 지정 끝============================//






    // ==========================아이디 중복확인 시작============================//

    const [isDuplication, setIsDuplication] = useState(false);

    // 1. 서버에서 memberList를 받는다.
    const duplication = () => {
        if (idcheck) {

            let url = "/member/memberList"
            apiCall(url, 'get', null, null
            ).then((response) => {
                const memberlist = response;

                // 2. 입력한 아이디와 memberList의 아이디들과 비교해서 같은 것을 찾는다.
                const duplicationCheck = memberlist.filter((list) => list.id === formData.id);

                if (duplicationCheck.length > 0) {
                    // 3. 중복이 있다면 재 입력 유도
                    alert("중복된 ID입니다. 다시 입력해주세요.")
                } else {
                    // 4. 중복이 없다면 중복확인 완료 alert창 + readOnly + 배경화면 회색 + 리렌더링
                    alert("사용가능한 ID 입니다.");
                    setIsDuplication(true);
                }
            }).catch((error) => {

            })
        } else {
            alert("ID를 확인해주세요.");
        }
    }
    // ==========================아이디 중복확인 끝============================//




    // ==========================다음 주소찾기 API 시작============================//
    const [isOpen, setIsOpen] = useState('false');
    const [zodecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');


    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };




    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
        setFormData({
            ...formData,
            address: zonecode,
            address1: address
        });
    };

    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE') {
            setIsOpen(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
        }
    };

    // ==========================다음 주소찾기 API 끝============================//







    // ==========================insert 서버 송신용 form 정보 병합 시작 + 무결성 검사 시작============================//

    // form 정보 병합용 객체
    const [formData, setFormData] = useState({
        membercode: memberType,
        name: '',
        birth: '',
        id: '',
        password: '',
        address: '',
        address1: '',
        address2: '',
        carnum: '',
        email: '',
        phonenum: '',
    })
    // id 무결성 검사
    const [idMessage, setIdMessage] = useState('* 4글자 이상 12글자 이하로 입력해주세요.');
    const [idcheck, setIdcheck] = useState();
    const idSpecial = /[a-z.0-9]/gi;

    // password 무결성 검사
    const [pwMessage, setPwMessage] = useState('* 9자리 이상으로 입력해주세요. ');
    const [pwcheck, setPwcheck] = useState();
    const pwSpecial = /[!-*.@]/gi;

    // password2 무결성 검사
    const [pw2Message, setPw2Message] = useState('* 동일한 비밀번호를 입력해주시기 바랍니다. ');
    const [pw2check, setPw2check] = useState();

    // carnum 무결성 검사
    const [carnumMessage, setCarMessage] = useState('* 예) 45가1234 와 같이 전체 차량번호를 띄어쓰기 없이 입력 하여 주시기 바랍니다.');
    const [carnumCheck, setCarnumCheck] = useState();


    // 정보 변경 시 값 전달 렌더링 (정보 입력 + 무결성 검사 용도)
    const handleChange = (e) => {
        const tagName = e.target.name;
        const tagValue = e.target.value;

        // id 무결성 검사
        if (tagName == 'id') {
            if (tagValue.length < 4 || tagValue.length > 12) {
                setIdMessage('* 4글자 이상 12글자 이하로 입력해주세요.');
                setIdcheck(false);
            } else if (tagName == 'id' && tagValue.replace(idSpecial, '').length > 0) {
                setIdMessage('* 숫자와 영문만 사용가능합니다.');
                setIdcheck(false);
            } else {
                setIdMessage('');
                setIdcheck(true);
            }
        }

        // password 무결성 검사
        if (tagName == 'password') {
            if (tagValue.length < 9) {
                setPwMessage('* 9자리 이상으로 입력해주세요.');
                setPwcheck(false);
            } else if (tagValue.replace(pwSpecial, '').length == tagValue.length) {
                setPwMessage('* password는 특수문자를 포함해야 합니다.');
                setPwcheck(false);
            } else {
                setPwMessage('');
                setPwcheck(true);
            }
        }


        // password2 무결성 검사
        if (tagName == 'password2') {
            if (tagValue != formData.password) {
                setPw2Message('* 동일한 비밀번호를 입력해주시기 바랍니다.');
                setPw2check(false);
            } else {
                setPw2Message('');
                setPw2check(true);
            }
        }

        // 휴대전화 무결성검사는 휴대전화 번호 결합 시 하겠습니다. (10행 코드)


        // 각 정보 객체에 입력
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    // 차량번호 무결성 검사
    const updatecarnum = (e) => {
        const carnumSpecial = /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
        const carnumValue = e.target.value.trim();

        if (carnumValue.replace(carnumSpecial, '').length === carnumValue.length) {
            setCarMessage("차량 번호에 특수문자나 영문이 포함될 수 없습니다.");
            setCarnumCheck(false);
        } else {
            setCarMessage("");
            setCarnumCheck(true);

            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }

    };
    // ==========================insert 서버 송신용 form 정보 병합 끝 + 무결성 검사 시작============================//





    // ==========================insert 서버 송신 시작============================//
    const navigate = useNavigate();
    const memberInsert = () => {
        if (memberType === undefined) {
            alert("비정상적인 접근입니다. 다시 진행해주세요.");
            navigate('/');
        } else if (idcheck && pwcheck && pw2check && phone1check && phone2check && isDuplication) {

            let url = "/member/mjoin";

            apiCall(url, 'post', formData, null)
                .then((response) => {
                    alert(response);
                    navigate('/LoginPage');
                }).catch((error) => {
                    console.error("Error fetching member list:", error);
                })
        } else {
            alert("입력정보를 확인해주세요.");
        }
    }
    // ==========================insert 서버 송신 끝============================//






    return (
        <div className='JoinMember_joinbox'>
            <div className='JoinMember_midbox'>
                <div className='JoinMember_title'>개인정보입력</div>
                <p>회원가입을 위해 아래의 양식에 내용을 입력해주세요.</p>
                <span className='JoinMember_star'>※ * 는 필수입력사항입니다.</span>

                <table>
                    <tbody>
                        <tr className='JoinMember_code'>
                            <th>회원코드</th>
                            <td><input type="text" name='membercode' id='membercode' defaultValue={memberType} readOnly /></td>
                        </tr>
                        <tr>
                            <th>이름 (실명) <span className='JoinMember_star'>*</span></th>
                            <td><input type="text" name='name' id='name' placeholder='본인인증에서 가져오기를 해야하지만 일단 readonly를 빼고 입력 하겠음' onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th>생년월일<span className='JoinMember_star'>*</span></th>
                            <td>

                                <input type="text" name='birth' id='birth' placeholder='본인인증에서 가져오기를 해야하지만 일단 readonly를 빼고 입력 하겠음' onChange={handleChange} />
                            </td>
                        </tr>
                        {/* <tr>
                                <th>성별<span className='JoinMember_star'>*</span></th>
                                <td>
                                    <input type="radio" id='men' name='gender' value={'men'} />
                                    <label htmlFor="men">남자</label>
                                    <input type="radio" id='women' name='gender' value={'women'} />
                                    <label htmlFor="women">여자</label>
                                </td>
                            </tr> */}
                        <tr>
                            <th>아이디<span className='JoinMember_star'>*</span></th>
                            <td>
                                <input type="text" name="id" id="id" onChange={handleChange} readOnly={isDuplication ? true : false} style={isDuplication ? { backgroundColor: 'lightgray' } : {}} />
                                <button className='duplication' onClick={() => { duplication() }}>중복확인</button>
                                {/* <button type='button' id='idDup' >중복확인</button> */}
                                <div className='Message'>{idMessage}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호<span className='JoinMember_star'>*</span></th>
                            <td>
                                <input type="password" name='password' id='password' placeholder='문자, 숫자, 특수문자(@$!%^*#?&)를 포함한 9자리 이상 입력해주십시오.' onChange={handleChange} />
                                <div className='Message'>{pwMessage}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인<span className='JoinMember_star'>*</span></th>
                            <td>
                                <input type="password" name='password2' id='password2' placeholder='동일한 비밀번호를 입력해주시기 바랍니다.' onChange={handleChange} />
                                <div className='Message'>{pw2Message}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <button className='JoinMember_findAddress' onClick={toggleHandler}>우편번호 찾기</button> <br />
                                {isOpen ? ('') : ((
                                    <div>
                                        <DaumPostcode
                                            onComplete={completeHandler}
                                            onClose={closeHandler}
                                        />
                                    </div>
                                ))}
                                <input type="text" name='address' id='address' value={zodecode} placeholder='우편주소' readOnly /> <br />
                                <input type="text" name='address1' id='address1' value={address} placeholder='도로명/지번 주소' readOnly /> <br />
                                <input type="text" name='address2' id='address2' placeholder='상세주소' onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>차량번호</th>
                            <td>
                                <input type="text" name='carnum' id='carnum' onChange={updatecarnum} />
                                <div className='Message'>{carnumMessage}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td className='email'>
                                <input type="text" name='firstEmail' id='firstEmail' onChange={(e) => { firstEmail(e.target.value) }} />
                                <input type="text" name='emailAdd' id='emailAdd' placeholder='@email.com' value={lastMemberEmail} onChange={(e) => { lastEmail(e.target.value) }} />
                                <select name="emailAddSelect" id="emailAddSelect" onChange={(e) => { lastEmail(e.target.value) }} >
                                    <option value="">직접입력</option>
                                    <option value="@gmail.com">gmail.com</option>
                                    <option value="@daum.net">daum.net</option>
                                    <option value="@hotmail.com">hotmail.com</option>
                                    <option value="@naver.com">naver.com</option>
                                    <option value="@nate.com">nate.com</option>
                                    <option value="@yahoo.com">yahoo.com</option>
                                    <option value="@dreamwiz.com">dreamwiz.com</option>
                                </select> <br />
                                {/* <input type="text" name='email' id='email' value={fullMemberEmail} className='femail' /> */}
                                <input type="checkbox" name='emailagr' id='emailagr' onChange={emailChecking} />
                                <span><label htmlFor="emailagr">뉴스레터나 공지이메일을 수신 받겠습니다.</label></span>
                            </td>
                        </tr>
                        <tr>
                            <th>휴대전화<span className='JoinMember_star'>*</span></th>
                            <td>
                                <select name="firstPhoneNum" id="firstPhoneNum" value={firstPhoneNum} onChange={(e) => { firstNum(e.target.value) }}>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="019">019</option>
                                </select>
                                <span>-</span>
                                <input type="text" name='secondPhoneNum' id='secondPhoneNum' onChange={(e) => { secondNum(e.target.value) }} />
                                <span>-</span>
                                <input type="text" name='lastPhoneNum' id='lastPhoneNum' onChange={(e) => { lastNum(e.target.value) }} />
                                <div className='Message'>{phoneMessage}</div>
                                <br />
                                <input type="checkbox" name='snsagr' id='snsagr' onChange={snsChecking} />
                                <label htmlFor="snsagr"><span>알림문자를 받겠습니다.</span></label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='JoinMember_submitBox' >
                    <input type="submit" name='submit' id='submit' value={"회원가입"} onClick={memberInsert} />
                </div>

            </div>
        </div>
    )
}