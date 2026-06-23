import './XReantalPlaceNew.css'
import Submenu from './Submenu';
import XReantalPlaceNewone from './XReantalPlaceNewone';
import XBtnInsertPrev from './XBtnInsertPrev';

// 대관 시설 등록 및 변경
export default function XReantalPlaceNew() {
    return (
        <div className='XReantalPlaceNew_div'>
            <Submenu />
            <div className='XReantalPlaceNew_div_div'>
                <XReantalPlaceNewone /> 
            </div>
        </div>
    )
}