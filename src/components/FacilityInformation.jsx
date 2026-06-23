// 체육시설안내
import './FacilityInformation.css'
import BoxFacilityInformation from './BoxFacilityInformation'

export default function FacilityInformation() {
    return (
        <div>
            <p className='greetings'>인사말</p>
            <div>
                <p className='greetings_subtitle'>FITNEST 스포츠센터 홈페이지를 방문해주신 고객님들 환영합니다.</p>

                <div className='greetings_content'>
                    <p>저희 FITNEST 스포츠센터 홈페이지를 방문해주신 고객님들 환영합니다.</p>
                    <p>FITNEST 스포츠센터는 쾌적한 환경제공을 통해 시민의 체력증진 및 공공복지증진을 도모하여 고객만족서비스 구현을 위해 최선을 다할 것을 약속드리겠습니다. </p>
                    <p>끝으로 시민 여러분께서 저희 운동장 시설물을 이용하시면서 느끼신 불편이나 건의 또는 개선사항이 있을 때에는 언제든지 저희 홈페이지를 방문하시어 애정 어린 참여를 적극적으로 부탁드리며, 모든 가정에 행복이 가득하시길 기원합니다.</p>
                    <p>감사합니다.</p>
                </div>
            </div>

            <p className='greetings'>시설 안내</p>

            <BoxFacilityInformation />
        </div>
    );
};
