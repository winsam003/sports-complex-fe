import QRCode from 'qrcode.react';
import './QRCodeDetail.css';

export default function QRCodeDetail({ getUserID }) {

    const handleDownloadClick = () => {

        const canvas = document.querySelector('canvas');
        const url = canvas ? canvas.toDataURL('image/png') : '';
        const link = document.createElement('a');
        link.href = url;
        link.download = `${getUserID}_qrCode.png`;
        link.click();
    };


    return (
        <div className="QRCodeDetail_Containor">
            <div className="QRCodeDetail_Box">

                <div className='QRCodeDetail_QRCode'>
                    <QRCode className="QRCodeDetail_QRCodeL" value={getUserID} size={500} onClick={handleDownloadClick} />
                </div>
            </div>
            <span className="QRCodeDetail_message">
               &#42; QR코드를 클릭하시면 QR코드를 다운로드 받으실 수 있습니다.
            </span>
        </div>
    )
}