import './PasswordChangeDetail.css';

import { TbLock } from "react-icons/tb";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { apiCall } from '../apiService/apiService';

export default function PasswordChangeDetail({ getUserID }) {

    const navigate = useNavigate();

    const [currentPW, setCurrentPW] = useState();
    const currentPWhandler = (e) => {
        setCurrentPW(e.target.value)
    }

    const checkPassword = () => {

        let url = '/member/pwcheck';
        let requestData = {
            id: getUserID,
            password: currentPW
        }

        apiCall(url, 'post', requestData, null)
            .then((response)=>{
                alert(response);
                navigate('/PasswordChangePage2');
            }).catch((error)=>{
                console.log("pwcheck response error occured = " + error)
        })
    }

    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    }


    return (
        <div className="PasswordChangeDetail_Box">
            <div className='PasswordChangeDetail_Box2'>
                <div className='PasswordChangeDetail_title'>
                    <span className='PasswordChangeDetail_logo'></span>
                    <span className='PasswordChangeDetail_name'>비밀번호 수정</span>
                </div>
                <div className='PasswordChangeDetail_PasswordChange'>현재 비밀번호를 입력해주세요</div>
                <div className='PasswordChangeDetail_input'><TbLock className='PasswordChangeDetail_Icon' /><input type='password' placeholder='비밀번호 입력' onChange={currentPWhandler} onKeyPress={handleKeypress} /></div>
                <div className='PasswordChangeDetail_Check'><button onClick={checkPassword}>확인</button></div>
            </div>
        </div>
    )
}