import { useEffect } from 'react';
import './VisitWayContent.css';
const { kakao } = window;

// 찾아오시는길
export default function VisitWayContent() {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.49279603423343, 127.03174714702843),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        const content1 = '<div>📍</div>';
        const position1 = new kakao.maps.LatLng(37.492910, 127.031720);
        const customOverlay1 = new kakao.maps.CustomOverlay({
            position: position1,
            content: content1,
            map: map,
        });

        const content2 = '<div class="custom-marker">Here!</div>';
        const position2 = new kakao.maps.LatLng(37.492910, 127.031720);
        const customOverlay2 = new kakao.maps.CustomOverlay({
            position: position2,
            content: content2,
            map: map,
            xAnchor: 0.5,
            yAnchor: 1.35
        });
    }, [kakao])

    return (
        <div>
            <p className='VisitWayContent_subtitle'>찾아오시는 길</p>
            <div className='VisitWayContent_map'>
                <p>지도</p>
                <div id="map">
                </div>
            </div>
            <div className='VisitWayContent_info'>
                <p>정보</p>
                <div className='VisitWayContent_info_div'>
                    <div className='VisitWayContent_info_index'>
                        <span>구분</span>
                        <span>정보</span>
                    </div>
                    <div className='VisitWayContent_info_content'>
                        <span>시설명</span>
                        <span>승승장구체육센터</span>
                        <span>주소</span>
                        <span>울특별시 강남구 역삼로4길 승승장구빌딩 (역삼동)</span>
                        <span>대표전화</span>
                        <span>02-999-9999</span>
                        <span>팩스번호</span>
                        <span>02-9999-9999</span>
                    </div>
                </div>
            </div>
            <div className='VisitWayContent_transport'>
                <p>교통안내</p>
                <div className='VisitWayContent_transport_div'>
                    <div className='VisitWayContent_transport_index'>
                        <span>구분</span>
                        <span>이용노선</span>
                        <span>이용방법</span>
                    </div>
                    <div className='VisitWayContent_transport_content'>
                        <p>버스</p>
                        <span>마을버스 서초 09번</span>
                        <span>서울 역삼초교 정류장 하차</span>
                        <span>광역 9100, 9201, M6405번</span>
                        <span>우성아파트 정류장 하차</span>
                        <span>직행 3200, 3030번</span>
                        <span>우성아파트 정류장 하차</span>
                        <p>지하철</p>
                        <span>신분당선</span>
                        <span>강남역 4번출구에서 500m 도보</span>
                        <span>2호선</span>
                        <span>강남역 1번출구에서 700m 도보</span>
                    </div>
                </div>
            </div>
        </div >
    )
}