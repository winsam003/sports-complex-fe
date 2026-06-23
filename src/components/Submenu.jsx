import './Submenu.css'
import Subtitle from './Subtitle'
import { PageBannerData as PageInfo } from './PageBannerData'


export default function Submenu() {
    const currentPage = window.location.pathname.replace("/", "");
    let findCurrentPageAll = {
        "id": "",
        "parameter": '',
        "page": '',
        "title": '',
        "checkMenu": ''
    }


    // 현재 페이지의 데이터를 찾음
    const findCurrentPage = PageInfo.filter((page) => page.parameter === currentPage);

    // 전체데이터에서 같은 현재 페이지의 id를 찾음
    findCurrentPageAll = PageInfo.filter((page) => page.id === findCurrentPage[0].id);

    // 같은 id에서 서브메뉴에 이름이 들어갈 데이터만 찾음
    findCurrentPageAll = findCurrentPageAll.filter((page) => page.checkMenu === 'Y');

    return (
        <div>
            <div className='submenu_div'>
                {findCurrentPageAll.map((it) => (<Subtitle parameter={it.parameter} page={it.page} currentPage={findCurrentPage[0].page} key={it.parameter} />))}
            </div>
        </div>
    )
}
