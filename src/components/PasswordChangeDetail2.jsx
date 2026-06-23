import { useState } from 'react';
import './PasswordChangeDetail2.css';
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { apiCall } from '../apiService/apiService';
import { useNavigate } from 'react-router';

export default function PasswordChangeDetail2({ token }) {

    const [password1Save, setPassword1Save] = useState();
    const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
    const [passwordCheck, setPasswordCheck] = useState(false);
    const navigate = useNavigate();

    const password1 = (e) => {
        setPassword1Save(e.target.value);
    }
    const passwordChk = (e) => {
        if (password1Save !== e.target.value) {
            setPasswordCheckMessage("* 입력하신 비밀번호와 같은 비밀번호를 입력해야합니다. 비밀번호를 확인해주세요");
            setPasswordCheck(false);
        } else {
            setPasswordCheckMessage("");
            setPasswordCheck(true);
        }
    }

    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            requestCheckPW();
        }
    }
    console.log(JSON.parse(sessionStorage.getItem('userData')).id)
    console.log("password1Save=", password1Save)
    const requestCheckPW = () => {

        let url = '/member/mPWChange';
        let requestData = {
            id: JSON.parse(sessionStorage.getItem('userData')).id,
            password: password1Save
        }
        apiCall(url, 'post', requestData, token)
        .then((response)=>{
            alert(response);
            navigate('/');
        }).catch((error)=>{
            console.log("passwordChange Error Occured = ", error)
        })
    }



    return (
        <div className="PasswordChangeDetail2_Box">
            <div className='PasswordChangeDetail2_Box2'>
                <div className='PasswordChangeDetail2_title'>
                    <span className='PasswordChangeDetail2_logo'></span>
                    <span className='PasswordChangeDetail2_name'>비밀번호 수정</span>
                </div>
                <div className='PasswordChangeDetail2_PasswordChange'>변경 할 비밀번호를 입력해주세요</div>
                <div className='PasswordChangeDetail2_firstdiv'><RiLockPasswordLine className='PasswordChangeDetail2_reactLogo' /><input type='password' className='PasswordChangeDetail2_input' placeholder='비밀번호 입력' onChange={password1} /></div>
                <div className='PasswordChangeDetail2_lastdiv'><RiLockPasswordFill className='PasswordChangeDetail2_reactLogo' /><input type='password' className='PasswordChangeDetail2_input' placeholder='비밀번호 확인' onChange={passwordChk} onKeyPress={handleKeypress} /></div>
                <div className='PasswordChangeDetail2_passwordCheckMessage'>{passwordCheckMessage}</div>
                <div className='PasswordChangeDetail2_Check'><button onClick={requestCheckPW}>변경</button></div>
            </div>
        </div>
    )
}