import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';

import { TbUser } from "react-icons/tb";
import { TbLock } from "react-icons/tb";
import { TbKeyframe } from "react-icons/tb";
import { useState } from "react";
import { apiCall } from '../apiService/apiService';
import KakaoLogin from "./kakaoLogin";

export default function Login({ setLogincheck, loginCheck }) {

    const navigate = useNavigate();

    // 1. 로그인, 비밀번호 정보를 저장한다.
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 2. 로그인 버튼을 누른 순간 서버로 axios 요청을 보낸다.

    const requestLogin = () => {

        let url = "/member/mlogin";
        const requstData = {
            id: id,
            password: password
        }
        apiCall(url, 'post', requstData, null
        ).then((response) => {
            // 3. 200번일 경우 로그인성공 alert창 띄우고 홈페이지로 이동
            sessionStorage.setItem('userData', JSON.stringify(response));

            alert(`안녕하세요 ${response.name} 님`);
            setLogincheck(!loginCheck);
            navigate('/');
        }).catch((error) => {
            // 4. 그 외일 경우 alert창 띄우고 재 로그인 유도
            alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
            console.log("login Error occured => " + error)
        })
    }


    // 3. 관리자 로그인인 경우 요청을 달리 보낸다.
    const ManagerRequestLogin = () => {

        let url = "/staff/staffLogin";
        const requstData = {
            stfid: id,
            stfpassword: password
        }
        apiCall(url, 'post', requstData, null
        ).then((response) => {
            // 3. 200번일 경우 로그인성공 alert창 띄우고 홈페이지로 이동
            sessionStorage.setItem('userData', JSON.stringify(response));

            alert(`안녕하세요 ${response.stfname} 관리자 님`);
            setLogincheck(!loginCheck);
            navigate('/');
        }).catch((error) => {
            // 4. 그 외일 경우 alert창 띄우고 재 로그인 유도
            alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
            console.log("login Error occured => " + error)
        })
    }


    const loginRefresh = () => {
        setId('');
        setPassword('');
    }



    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            requestLogin();
        }
    }
    const mhandleKeypress = (e) => {
        if (e.key === 'Enter') {
            ManagerRequestLogin();
        }
    }

    const [mangerLogin, setMangerLogin] = useState(true)
    const loginBoxHandler = () => {
        setMangerLogin(!mangerLogin);

    }
    return (
        <div>
            {mangerLogin ?
                <div>
                    <div className="login_Page">
                        <div className="login_Title">
                            <div className="login_logo"></div>
                            <div className="login_instructions">
                                FITNEST 체육복합시설에 <br />
                                방문해주셔서 감사합니다!</div>
                        </div>
                        <div className="login_Box">
                            <div className="login_Box_div">
                                <span><TbUser className='login_Icon' /></span>
                                <input type="text" name="id" id="id" size={"50"} placeholder="아이디를 입력해주세요. " value={id} onChange={(e) => setId(e.target.value)} />
                            </div>
                            <div className="login_Box_div">
                                <span><TbLock className='login_Icon' /></span>
                                <input type="password" name="password" id="password" size={"50"} placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeypress} />
                            </div>
                            <div className="login_submitAndReset">
                                <span><TbKeyframe className='login_Icon' id="login_iconnone" /></span>
                                <input type="button" onClick={requestLogin} value={"로그인"} /> &nbsp;&nbsp;
                                <input type="button" value={"초기화"} onClick={loginRefresh} />
                                <KakaoLogin />
                            </div>
                            {/* <div className="login_Box_div">
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <label htmlFor="rememberMe">아이디 저장</label>
                            </div> */}
                            <div className="login_joinandfind">
                                <Link to="/JoinPage1">회원가입</Link>
                                <Link to="/FindIDPage">아이디 찾기</Link>
                                <Link to="/FindPasswordPage">비밀번호 찾기</Link>
                            </div>
                            <div className="login_managerLoginBox">
                                <span className="login_managerLogin" onClick={loginBoxHandler}>관리자로그인 전환</span>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className="loginManagement_Page">
                        <div className="login_Title">
                            <div className="login_logo"></div>
                            <div className="login_instructions">
                                FITNEST 체육복합시설 <br />
                                관리자로그인 입니다.</div>
                        </div>
                        <div className="login_Box">
                            <div className="login_Box_div">
                                <span><TbUser className='login_Icon' /></span>
                                <input type="text" name="id" id="id" size={"50"} placeholder="관리자 아이디를 입력해주세요. " value={id} onChange={(e) => setId(e.target.value)} />
                            </div>
                            <div className="login_Box_div">
                                <span><TbLock className='login_Icon' /></span>
                                <input type="password" name="password" id="password" size={"50"} placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={mhandleKeypress} />
                            </div>
                            <div className="login_submitAndReset">
                                <span><TbKeyframe className='login_Icon' id="login_iconnone" /></span>
                                <input type="button" onClick={ManagerRequestLogin} value={"로그인"} /> &nbsp;&nbsp;
                                <input type="button" value={"초기화"} onClick={loginRefresh} />
                            </div>
                            {/* <div className="login_Box_div">
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <label htmlFor="rememberMe">아이디 저장</label>
                            </div> */}
                            <div className="login_joinandfind">
                                <Link to="/JoinPage1">회원가입</Link>
                                <Link to="/FindIDPage">아이디 찾기</Link>
                                <Link to="/FindPasswordPage">비밀번호 찾기</Link>
                            </div>
                            <div className="login_managerLoginBox">
                                <span className="login_managerLogin" onClick={loginBoxHandler}>사용자로그인 전환</span>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
