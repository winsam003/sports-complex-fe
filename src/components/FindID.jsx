import { useState } from 'react';
import './FindID.css';
import { apiCall } from '../apiService/apiService';
import { useNavigate } from 'react-router-dom';

export default function FindID() {

    const navigate = useNavigate();

    const [saveUserName, setSaveUserName] = useState();
    const saveName = (e) => {
        setSaveUserName(e.target.value);
    }
    const [saveUserPhone, setSaveUserPhone] = useState();
    const [saveUserPhoneCheck, setSaveUserPhoneCheck] = useState(false);
    const [saveUserPhoneMessage, setSaveUserPhoneMessage] = useState("");
    const savePhone = (e) => {
        const phoneNumSpecial = /[^0-9]+/;
        const checkValue = e.target.value;
        
        if (checkValue.replace(phoneNumSpecial, "").length !== checkValue.length) {
            setSaveUserPhoneMessage("* 하이픈(-) 없이 숫자만 입력해주세요.");
            setSaveUserPhoneCheck(false);
        } else {
            setSaveUserPhoneMessage("");
            setSaveUserPhoneCheck(true);
            setSaveUserPhone(e.target.value);
        }
    }

    const findIDRequest = () => {

        if (saveUserPhoneCheck){
            let url = "/member/mfindID";
            let requestData = {
                name: saveUserName,
                phonenum: saveUserPhone
            }
    
            apiCall(url, 'post', requestData, null)
                .then((response) => {
                    alert(response);
                    navigate("/");
                }).catch((error) => {
                    alert("ID를 찾을 수 없습니다.");
                    console.log("findIDRequest error occred =" + error);
                })
        }else{
            alert("입력하신 정보를 확인해주세요.");
        }
    }
    // enter키 누르면 아이디 찾기 요청
    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            findIDRequest();
        }
    }
    return (
        <div className='FindID_FindIDContainer'>
            <div className='FindID_text'>
                <p>아이디 찾기</p>
                <p>이름(실명)과 휴대전화번호를 입력해주세요</p>
                <div className='FindID_Detail'>
                    <div>
                        <input className="FindID_data FindID_name" type="text" placeholder="이름(실명)을 입력해주세요." onChange={saveName} />
                    </div>
                    <div>
                        <input className="FindID_data" type="text" placeholder="휴대전화번호를 입력해주세요." onChange={savePhone} onKeyPress={handleKeypress} />
                        {saveUserPhoneCheck ? <div></div>: <div className='FindID_Message'>{saveUserPhoneMessage}</div>}
                    </div>
                    <div>
                        <button className="FindID_submit" onClick={findIDRequest}>아이디 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}