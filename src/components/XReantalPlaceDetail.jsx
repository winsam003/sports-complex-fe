import './XReantalPlaceDetail.css'
import Submenu from './Submenu';
import XReantalPlaceNewone from './XReantalPlaceNewone';
import XBtnUpdatePrev from './XBtnUpdatePrev';

// 대관 시설 등록 및 변경
export default function XReantalPlaceDetail() {
    return (
        <div className='XReantalPlaceDetail_div'>
            <Submenu />
            <div className='XReantalPlaceDetail_div_div'>
                <XReantalPlaceNewone />
                <XBtnUpdatePrev />
            </div>
        </div>
    )
}