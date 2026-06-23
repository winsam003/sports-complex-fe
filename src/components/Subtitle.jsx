import './Subtitle.css'
import {Link} from 'react-router-dom';


export default function Subtitle({ parameter, page, currentPage }) {


    return (
        <div>
            <Link to={`/${parameter}`} className={`subtitle_p ${currentPage === page ? 'subtitle_color' : ""}`}>{page}</Link>
        </div>
    )
}