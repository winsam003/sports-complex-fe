import { useNavigate } from "react-router";
import "./NiceAthentication.css"

export default function NiceAthentication({ memberType }) {

    const navigate = useNavigate();

    const next = (code) => {
        navigate('/JoinPage4', { state: { memberType: code } });
    }

    const handleNext = () => {
        next(memberType);
    }
    return (
        <div className="NiceAthentication_box">
            <img src="img/niceMark.jpg" alt=""
                style={{ width: "200px", height: "200px" }} />
            <div className="NiceAthentication_title">나이스 아이핀(I-PIN) 인증</div>
            <button className="NiceAthentication_button" onClick={handleNext}>인증하기</button>
            <p className="NiceAthentication_call">안내 : 1600-1522</p>
            <p>
                아이핀(I-Pin)은 발급기관과 상관없이 본인이 발급받은 아이핀을 이용하여 본인확인을 할 수 있습니다.
            </p>
        </div>

    )
}