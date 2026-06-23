import './BoxFacilityInformation.css'

export default function BoxFacilityInformation() {
    return (
        <div className='BoxFacilityInformation_div'>
            <div className='BoxFacilityInformation_img_div'>
                <img src='img/info.jpg' className='BoxFacilityInformation_img'></img>
            </div>
            <p>시설명</p>
            <p>FitNest 종합운동장</p>
            <p className='BoxFacilityInformation_top_p'>건축면적</p>
            <p className='BoxFacilityInformation_top_p'>29,220㎡</p>
            <p className='BoxFacilityInformation_top_p'>연면적</p>
            <p className='BoxFacilityInformation_top_p'>91,720㎡</p>
            <p className='BoxFacilityInformation_top_p'>주차장</p>
            <p className='BoxFacilityInformation_top_p'>300면</p>
            <p className='BoxFacilityInformation_top_p'>준공연도</p>
            <p className='BoxFacilityInformation_top_p'>2024년</p>
        </div>
    );
};