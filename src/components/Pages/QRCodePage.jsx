import PageBanner from '../PageBanner';
import QRCode from '../QRCode';

export default function QRCodePage({ getUserID }){
    return (
        <div>
            <PageBanner />
            <QRCode getUserID={getUserID}/>
        </div>
    )
}