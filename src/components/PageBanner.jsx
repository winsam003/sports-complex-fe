import './PageBanner.css'
import { PageBannerData as PageInfo } from './PageBannerData';

export default function PageBanner() {

    const currentPage = window.location.pathname.replace("/", "");
    let selectedPage = {
        page: '404 NotFound',
        title: '해당 페이지를 찾을 수 없습니다.'
    }

    const findCurrentPage = PageInfo.filter((page) => page.parameter === currentPage);
    selectedPage = findCurrentPage.length > 0 ? findCurrentPage[0] : selectedPage;

    return (
        <div className='pagebanner'>
            <div className='pagebanner_img_div'>
                <div className='pagebanner_img' />
            </div>
            <span className='PageBanner_page'>
                {selectedPage.page}<br></br>
            </span>
            <span>
                {selectedPage.title}
            </span>
        </div >
    );
};