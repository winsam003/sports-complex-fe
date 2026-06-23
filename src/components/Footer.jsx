import './Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {

    return (


        <footer>
            <div className='footer_list'>
                <ul className='footer_ul'>
                    <ol className='footer_ol'>
                        <li className='footer_li'><Link to='/InfoHandlingPolicyPage'>개인정보처리방침</Link></li>
                        <li className='footer_li'><Link to='/VideoHandlePage'>영상정보처리운영방침</Link></li>
                    </ol>
                    <ol className='footer_ol'>
                        <li className='footer_li'><Link to='/EmailCollectRefusal'>이메일수집거부</Link></li>
                        <li className='footer_li'><Link to='/VisitWayPage'>찾아오시는길</Link></li>
                    </ol>
                </ul>
            </div>

            <div className='footer_company_info'>
                <div className='footer_logo_div'>
                    <img src='img/logo.png' className='footer_logo' />
                </div>
                <p>
                    사업자등록번호 : 999&#45;99&#45;99999<br></br>
                    우&#41; 99999 서울특별시 강남구 역삼로4길 승승장구빌딩 &#40;역삼동&#41; &#124; Tel&#58;02&#45;999&#45; 9999<br></br>
                    Copyright&#169; 2024 칭찬해조엔지니어링 All Rights Reserved&#46;
                </p>
            </div >

            <div className='consulting_telNum'>
                <p>고객상담실</p>
                <p>수강신청 02&#45;999&#45;9991&#126;2&#40;ARS 0번&#41; </p>
                <p>대관신청 02&#45;999&#45;9993&#126;4&#40;ARS 1번&#41; </p>
                <p>주차신청 02&#45;999&#45;9995&#126;6 </p>
                <p>시설관리 02&#45;999&#45;9997 </p>
                <p>회원문의 02&#45;999&#45;9998 </p>
                <p>기타문의 02&#45;999&#45;9999 </p>
            </div>

        </footer >
    );
};