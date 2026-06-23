import XhomeBannerEventContent from './XhomeBannerEventContent';
import './XhomeBannerEventList.css';

export default function XhomeBannerEventList({bannerlist, handleBanner, deleteBannerCheck}) {

    return(
        <div className="XhomeBannerEventList">
            <div className="XhomeBannerEventList_div">
                <span>선택</span>
                <span>배너 번호</span>
                <span>화면 번호</span>
                <span>이벤트 코드</span>
                <span>이벤트 이름</span>
                <span>배너 이미지</span>
            </div>
            <div className="XhomeBannerEventList_content">
                {bannerlist.map((it, index) => (
                    <XhomeBannerEventContent key={index} index={index} {...it} handleBanner={handleBanner} deleteBannerCheck={deleteBannerCheck} />
                ))}
            </div>
        </div>
    )
}
