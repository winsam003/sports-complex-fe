// 회원 가입 현재 위치 표시해주기
import './RegistrationFlow.css'




export default function RegistrationFlow() {

    const currentPage = window.location.pathname.replace("/", "");

    return (
        <div className='RegistrationFlow_Box'>
            <ul className="RegistrationFlow_ul">
                <li>
                    <span className={`${currentPage === 'JoinPage1' ? 'textBold' : ""}`}>Step 1</span>
                    <span className={`${currentPage === 'JoinPage1' ? 'textBold' : ""}`}>약관동의</span>
                </li>
                {/* <span>&raquo;</span> */}
                <li>
                    <span className={`${currentPage === 'JoinPage2' ? 'textBold' : ""}`}>Step 2</span>
                    <span className={`${currentPage === 'JoinPage2' ? 'textBold' : ""}`}>회원유형</span>
                </li>
                {/* <span>&raquo;</span> */}
                <li>
                    <span className={`${currentPage === 'JoinPage3' ? 'textBold' : ""}`}>Step 3</span>
                    <span className={`${currentPage === 'JoinPage3' ? 'textBold' : ""}`}>본인확인</span>
                </li>
                {/* <span>&raquo;</span> */}
                <li>
                    <span className={`${currentPage === 'JoinPage4' ? 'textBold' : ""}`}>Step 4</span>
                    <span className={`${currentPage === 'JoinPage4' ? 'textBold' : ""}`}>개인정보입력</span>
                </li>
                {/* <span>&raquo;</span> */}
                <li>
                    <span>Step 5</span>
                    <span>가입 완료</span>
                </li>
            </ul>
        </div>
    );
};