import axios from 'axios'
import DaumPostcode from 'react-daum-postcode';
import './ModifyMember.css'
import { useEffect, useState } from 'react'
import { apiCall } from '../apiService/apiService';

export default function ModifyMember({ getUserID, roleList, token }) {


    // *********************************내정보 detail 불러오기 시작************************************ //

    // 1. 불러올 정보 저장할 객체
    const [userData, setUserData] = useState(
        {
            "membercode": "",
            "name": "",
            "birth": "",
            "id": "",
            "address": "",
            "address1": "",
            "address2": "",
            "carnum": "",
            "email": "",
            "email2": "",
            "firstPhone": "",
            "middlePhone": "",
            "lastPhone": "",
            "emailagr": "",
            "snsagr": "",
        }
    );

    // 2. 내 정보 불러오기 (불러 온 후 정보를 객체에 저장)
    let managerData;
    useEffect(() => {

        let url;
        let requestDate;

        if (roleList && roleList.length > 0) {
            if (roleList.some(item => item === "ADMIN" || item === "MANAGER")) {
                url = "/staff/staffDetail";
                requestDate = {
                    stfid: getUserID
                }

                apiCall(url, 'post', requestDate, null)
                    .then((response) => {
                        managerData = response;
                        console.log(managerData);
                    }).catch((error) => {
                        console.log("error=" + error)
                })
            } else {
                url = "/member/mDetail";
                requestDate = {
                    id: getUserID
                }
                apiCall(url, 'post', requestDate, null)
                    .then((response) => {
                        setUserData(userData => (
                            {
                                ...userData,
                                membercode: response.membercode,
                                name: response.name,
                                birth: response.birth,
                                id: response.id,
                                address: response.address,
                                address1: response.address1,
                                address2: response.address2,
                                carnum: response.carnum,
                                email: response.email.substring(0, response.email.indexOf('@')),
                                email2: response.email.substring(response.email.indexOf('@')),
                                firstPhone: response.phonenum.substring(0, 3),
                                middlePhone: (response.phonenum.length === 11 ? response.phonenum.substring(3, 7) : response.phonenum.substring(3, 6)),
                                lastPhone: (response.phonenum.length === 11 ? response.phonenum.substring(7) : response.phonenum.substring(6)),
                                emailagr: response.emailagr,
                                snsagr: response.snsagr,
                            }
                        ))
                    }).catch((error) => {
                        console.log("error=" + error)
                    })
            }
        } else {
            alert("관리자 로그인을 해야 이용하실 수 있습니다.");
        }
    }, [])
    // *********************************내정보 detail 불러오기 끝************************************ //


    // *********************************전화번호 무결성 검사 시작 / 수정 정보 저장 끝************************************ //

    // phoneNumber 무경설검사
    const [phoneMessage, setPhoneMessage] = useState('');
    const [phone1check, setPhone1check] = useState(true);
    const [phone2check, setPhone2check] = useState(true);
    const phoneNumSpecial = /^\d+$/;

    const firstNum = (e) => {
        setUserData({
            ...userData,
            firstPhone: e
        });
    }

    const secondNum = (e) => {

        if (e.length > 4) {
            // setPhoneMessage("* 전화번호는 각 자리에 4자리 이하로 작성해주세요.");
            setPhone1check(false);
        } else if (e.replace(phoneNumSpecial, '').length > 0) {
            setPhoneMessage("* 전화번호에는 숫자만 가능합니다.");
            setPhone1check(false);
        } else {
            setPhoneMessage('');
            setPhone1check(true);

            setUserData({
                ...userData,
                middlePhone: e
            });
        }


    }
    const lastNum = (e) => {
        if (e.length > 4) {
            // setPhoneMessage("* 전화번호는 각 자리에 4자리 이하로 작성해주세요.");
            setPhone2check(false);
        } else if (e.replace(phoneNumSpecial, '').length > 0) {
            setPhoneMessage("* 전화번호에는 숫자만 가능합니다.");
            setPhone2check(false);
        } else {
            setPhoneMessage('');
            setPhone2check(true);

            setUserData({
                ...userData,
                lastPhone: e
            });
        }


    }

    // 차량번호 무결성 검사
    const [carnumMessage, setCarMessage] = useState('* 예) 45가1234 와 같이 전체 차량번호를 띄어쓰기 없이 입력 하여 주시기 바랍니다.');
    const [carnumCheck, setCarnumCheck] = useState(true);
    const updatecarnum = (e) => {
        const carnumSpecial = /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
        const carnumValue = e.target.value.trim();

        if (carnumValue.replace(carnumSpecial, '').length === carnumValue.length) {
            setCarMessage("차량 번호에 특수문자나 영문이 포함될 수 없습니다.");
            setCarnumCheck(false);
        } else {
            setCarMessage("");
            setCarnumCheck(true);

            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            });
        }

    };
    // *********************************전화번호, 차량번호 무결성 검사 / 수정 정보 저장 끝************************************ //




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
        setUserData({
            ...userData,
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





    // ==========================각 수정 데이터 업데이트 시작============================//

    const updateData = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };
    const updateChecked = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.checked
        });
    };

    // ==========================각 수정 데이터 업데이트 끝============================//




    // ==========================수정 데이터 전송 요청 시작============================//
    const [reset, setReset] = useState(false);

    const modifyData = () => {
        if (phone1check && phone2check) {
            let url = '/member/mUpdate';
            let requestDate = {
                membercode: userData.membercode,
                name: userData.name,
                birth: userData.birth,
                id: userData.id,
                address: userData.address,
                address1: userData.address1,
                address2: userData.address2,
                carnum: userData.carnum,
                email: userData.email + userData.email2,
                emailagr: userData.emailagr,
                phonenum: userData.firstPhone + userData.middlePhone + userData.lastPhone,
                snsagr: userData.snsagr,
            }

            apiCall(url, 'post', requestDate, token)

            // axios.post('/member/mUpdate', {

            //     membercode: userData.membercode,
            //     name: userData.name,
            //     birth: userData.birth,
            //     id: userData.id,
            //     address: userData.address,
            //     address1: userData.address1,
            //     address2: userData.address2,
            //     carnum: userData.carnum,
            //     email: userData.email + userData.email2,
            //     emailagr: userData.emailagr,
            //     phonenum: userData.firstPhone + userData.middlePhone + userData.lastPhone,
            //     snsagr: userData.snsagr,



            .then((response) => {
                alert(response);
                setReset(!reset);

            }).catch((error) => {
                alert("회원정보 변경에 실패하였습니다. 관리자에게 문의하세요");
                console.log("modify error occured=" + error)
            })
        } else {
            alert("회원 정보를 다시 한번 확인해주세요.");
        }
    }

    // ==========================수정 데이터 전송 요청 끝============================//




    return (
        <div className='ModifyMember_joinbox'>
            <div className='ModifyMember_midbox'>
                <div className='ModifyMember_title'>회원정보 수정</div>
                <span className='ModifyMember_star'>※ * 는 필수입력사항입니다.</span>

                <table>
                    <tbody>
                        <tr>
                            <th>회원코드<span className='ModifyMember_star'>*</span></th>
                            <td><input type="text" name='membercode' id='membercode' value={userData.membercode} style={{ backgroundColor: "#ccc" }} readOnly /></td>
                        </tr>
                        <tr>
                            <th>이름 (실명) <span className='ModifyMember_star'>*</span></th>
                            <td><input type="text" name='name' id='name' value={userData.name} style={{ backgroundColor: "#ccc" }} readOnly /></td>
                        </tr>
                        <tr>
                            <th>생년월일<span className='ModifyMember_star' >*</span></th>
                            <td>
                                <input type="number" name='birth' id='birth' value={userData.birth} style={{ backgroundColor: "#ccc" }} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th>아이디<span className='ModifyMember_star'>*</span></th>
                            <td>
                                <input type="text" name='id' id='id' value={userData.id} style={{ backgroundColor: "#ccc" }} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <button onClick={toggleHandler} className='ModifyMember_button'>우편번호 찾기</button> <br />
                                {isOpen ? ('') : ((
                                    <div>
                                        <DaumPostcode
                                            onComplete={completeHandler}
                                            onClose={closeHandler}
                                        />
                                    </div>
                                ))}
                                <input type="text" name='address' id='address' value={userData.address} readOnly /> <br />
                                <input type="text" name='address1' id='address1' value={userData.address1} readOnly /> <br />
                                <input type="text" name='address2' id='address2' value={userData.address2} onChange={updateData} placeholder='상세주소' />
                            </td>
                        </tr>
                        <tr>
                            <th>차량번호</th>
                            <td>
                                <input type="text" name='carnum' id='carnum' value={userData.carnum} onChange={updatecarnum} />
                                <p style={{ color: 'red', fontSize: 'small' }}>{carnumMessage}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td className='email'>
                                <input type="email" name='email' id='email' value={userData.email} onChange={updateData} />
                                <input type="text" name='email2' id='email2' value={userData.email2} onChange={updateData} placeholder='@email.com' />
                                <select name="email2" id="email2" onChange={updateData} >
                                    <option value="">직접입력</option>
                                    <option value="@gmail.com">gmail.com</option>
                                    <option value="@daum.net">daum.net</option>
                                    <option value="@hotmail.com">hotmail.com</option>
                                    <option value="@naver.com">naver.com</option>
                                    <option value="@nate.com">nate.com</option>
                                    <option value="@yahoo.com">yahoo.com</option>
                                    <option value="@dreamwiz.com">dreamwiz.com</option>
                                </select> <br />
                                <input type="checkbox" name='emailagr' id='emailagr' checked={userData.emailagr} onChange={updateChecked} />
                                <span><label htmlFor="emailagr">뉴스레터나 공지이메일을 수신 받겠습니다.</label></span>
                            </td>
                        </tr>
                        <tr>
                            <th>휴대전화<span className='JoinMember_star'>*</span></th>
                            <td>
                                <select name="firstPhoneNum" id="firstPhoneNum" value={userData.firstPhone} onChange={(e) => { firstNum(e.target.value) }}>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="019">019</option>
                                </select>
                                <span>-</span>
                                <input type="text" name='secondPhoneNum' id='secondPhoneNum' value={userData.middlePhone} onChange={(e) => { secondNum(e.target.value) }} />
                                <span>-</span>
                                <input type="text" name='lastPhoneNum' id='lastPhoneNum' value={userData.lastPhone} onChange={(e) => { lastNum(e.target.value) }} />
                                <div className='Message'>{phoneMessage}</div>
                                <br />
                                <div>
                                    <input type="checkbox" name='snsagr' id='snsagr' checked={userData.snsagr} onChange={updateChecked} />
                                    <span><label htmlFor="snsagr">알림 문자를 수신하겠습니다.</label></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='ModifyMember_submitBox' >
                    <input type='button' onClick={modifyData} className='ModifyMember_submit' name='submit' id='submit' value={"회원정보 수정"} />
                </div>
            </div>
        </div>
    )
}