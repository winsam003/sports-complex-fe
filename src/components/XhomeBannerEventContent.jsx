import './XhomeBannerEventContent.css'

export default function XhomeBannerEventContent({bannernum, event, bannerimage, handleBanner, deleteBannerCheck, index}) {

    const handlecheckBanner = (bannernum) => {
        handleBanner(bannernum);
    }

    return(
        <div className="XhomeBannerEventContent_Box">
            <div className="XhomeBannerEventContent_contents">
                <span><input type="checkbox"
                            value={bannernum}
                            checked={deleteBannerCheck.includes(bannernum)}
                            onChange={(e) => handlecheckBanner(bannernum)}
                        /></span>
                <span>{bannernum}</span>
                <span>{index+1}번 화면</span>
                <span>{event.eventcode}</span>
                <span>{event.eventname}</span>
                <span>{bannerimage}</span>
            </div>
        </div>
    )

    
}

