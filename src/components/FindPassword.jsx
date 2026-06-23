import "./FindPassword.css"
import NiceAthentication from "./NiceAthentication"
import PhoneAthentication from "./PhoneAthentication"

export default function FindPassword({ memberType }) {
    return (
        <div className="FindPassword_Page">
            <div>본인확인 </div>
            <p>
                * 본인확인 설정을 위해 본인인증을 해주세요. <br />
                * 본인 인증방법을 선택 해주세요. <br />
                * 본인인증 관련 장애 발생 시 반드시 브라우저의 '팝업 차단'을 해제해 주시기 바랍니다. 
            </p>
            <div className="FindPassword_Authentication">
                <NiceAthentication memberType={memberType} />
                <PhoneAthentication memberType={memberType} />
            </div>
            <p>
                * 아동(만 14세 미만)은 부모님(법정대리인) 동의가 필요합니다. <br />
                * 타인의 개인 정보를 부정하게 사용하는 경우 3년 이하의 징역 또는 1천만 원 이하의 벌금에 처해질 수 있습니다. 
            </p>
        </div>
    )
}

