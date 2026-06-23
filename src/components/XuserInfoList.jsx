import './XuserInfoList.css';
import XuserInfoListContents from './XuserInfoListContents';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiCall } from '../apiService/apiService';
import Pagination from 'react-js-pagination'
import emailjs from 'emailjs-com';


export default function XuserInfoList({ token }) {





    //******************************* 체크된 user 저장 시작 *********************************//
    const [checkedUsers, setCheckedUsers] = useState([]);
    const userDelete = (userID, checked) => {
        if (checked) {
            setCheckedUsers([...checkedUsers, userID]);
        } else {
            setCheckedUsers(checkedUsers.filter(id => id !== userID));
        }
    };
    //******************************* 체크된 user 저장 끝 *********************************//





    //******************************* 체크된 유저 삭제 시작 *********************************//
    const [deleteRequest, setDeleteRequest] = useState(false);

    const deleteReq = () => {

        let url = "/member/mdelete";

        apiCall(url, 'post', checkedUsers, token)
            .then((response) => {
                alert(response);
                setUserInfoList([]);
                setDeleteRequest(!deleteRequest);
                setInOrFo('');
                setMemberAge('');
                setKeyword('');
            }).catch((error) => {
                console.log('deleteError => ', error)
            })
    }
    //******************************* 체크된 유저 삭제 끝 *********************************//




    //******************************* UserList 불러오기 요청 시작 *********************************//
    const [rememberList, setRememberList] = useState([]);       // 최초 요청시 리스트 저장
    const [userInfoList, setUserInfoList] = useState([]);       // 출력할 리스트 저장
    useEffect(() => {

        let url = "/member/memberList";

        apiCall(url, 'get', null, token)
            .then((userList) => {
                setUserInfoList(userList);
                setRememberList(userList);     // 불러온 최초 값 저장
            }).catch((error) => {
                console.error("Error fetching member list:", error);
            });
    }, [deleteRequest])
    //******************************* UserList 불러오기 요청 끝 *********************************//





    //******************************* 검색 filter 기능 시작 *********************************//
    // 1. 내/외국인, 이름, 검색키워드를 필터해서 다른 곳에 저장한다.
    const [InOrFo, setInOrFo] = useState('');
    const [memberAge, setMemberAge] = useState('');
    const [keyword, setKeyword] = useState('');

    // 내/외국인 저장
    const isInOrFo = (e) => {
        setInOrFo(e.target.value);
    }

    // 이름 저장
    const ismemberAge = (e) => {
        setMemberAge(e.target.value);
    }

    // 키워드 저장
    const iskeyword = (e) => {
        setKeyword(e.target.value);
    }



    // 2. UserList 불러오기에서 불러온 userInfoList에서 내/외국인, 분류, 이름을 필터해서 출력 할 userList에 재 저장한다.
    // rememberList 는 최초 불러온 데이터 값이다. (54행)
    const searchMember = () => {

        const searchRequirement = InOrFo + memberAge;                                                               // 유저코드 조합
        let searchRequirementList = rememberList.filter((list) => list.membercode.includes(searchRequirement));     // 유저코드가 포함된 리스트 필터링

        if (InOrFo === '' && memberAge === '' && keyword === '') {           // 전체, 전체, 키워드 없는경우 미리 저장한 최초 리스트 값을 출력
            setUserInfoList(rememberList);
        } else if (keyword === '') {                                          // 키워드가 없을 시 조합된 유저코드를 필터 한 값을 출력
            setUserInfoList(searchRequirementList);
        } else {                                                              // 키워드가 있을 시 유저코드 필터 값에서 키워드를 한번 더 필터링해서 출력
            searchRequirementList = searchRequirementList.filter((list) => list.name.includes(keyword));
            setUserInfoList(searchRequirementList);
        }
    }

    //******************************* 검색 filter 기능 끝 *********************************//




    //******************************* 회원정보조회 초기화 버튼 시작 *********************************//
    const [isrefresh, setIsrefresh] = useState(false);
    const searBoxRefresh = () => {
        setInOrFo('');
        setMemberAge('');
        setKeyword('');
        setIsrefresh(!isrefresh);
    }
    const checkBoxRefresh = () => {
        setCheckedUsers([]);
    }

    //******************************* 회원정보조회 초기화 버튼 끝 *********************************//




    //******************************* 회원 정보 조회 엔터 키 누를 시 조회 *********************************//

    const handKeyPress = (e) => {
        if (e.key == 'Enter') {
            searchMember();
        }
    }



    //******************************* 회원 정보 조회 엔터 키 누를 시 조회 *********************************//

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 아이템 수
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // 페이지 변경 시 동작 설정
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 보여줄 아이템의 인덱스 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;





    //******************************* 메일보내기 API 실행 *********************************//

    const [emailContents, setEmailContents] = useState(`

     1. ** 이용 시간 변경 안내 **
    - 특정 날짜에 따른 이용 시간 변경 사항을 안내드립니다. 
    - 변경된 이용 시간에 맞춰서 이용해 주시기 바랍니다. 변경된 시간에 대한 자세한 내용은 별도로 공지될 예정입니다.

    2. ** 시설 점검 일정 안내 **
    - 점검 일정 및 관련 안내 사항에 대해 안내드립니다. 이용 시 불편함이 없도록 참고해 주시기 바랍니다. 
    - 점검 일정은 미리 예고되며, 이용 시설에 불편함이 발생하지 않도록 최선을 다하겠습니다.

    3. ** 프로그램 및 이벤트 안내 **
    - 다가오는 프로그램 및 이벤트에 대한 안내를 드립니다. 참여하실 분은 미리 신청해주시기 바랍니다. 
    - 다양한 프로그램과 이벤트를 통해 즐거운 시간을 보내실 수 있습니다.

    4. ** 시설 이용 안내 **
    - 체육시설 이용에 관한 주요 안내사항을 안내드립니다. 시설 이용 시 유의사항을 숙지하고 이용해 주시기 바랍니다. 
    - 모든 이용자 분들이 안전하고 쾌적하게 이용할 수 있도록 최선을 다하겠습니다.

    5. ** 기타 공지사항 **
    - 기타 중요한 공지사항이나 안내사항을 안내드립니다. 꼭 확인해주시기 바랍니다. 
    - 더 많은 정보는 저희 웹사이트나 공지판을 통해 확인하실 수 있습니다.

    6. ** 모두 정말 고생하셨습니다. **
    - 마지막 프로젝트까지 재미있었어요! 반 분위기가 좋아서 재미있게 공부했습니다! 다들 취뽀 빨리 성공하길 빌어요~~!

    `)
    const emailDetail = (e) => {
        setEmailContents(e.target.value);
    }



    const sendVerificationEmail = () => {
        const checkedUserEmails = rememberList.filter(item => checkedUsers.some(it => item.id === it));         // 체크된 유저의 email

        const emailToken = process.env.REACT_APP_EMAIL_KEY
        for (let i = 0; i < checkedUserEmails.length; i++) {
            if (checkedUserEmails[i].emailagr) {
                // 이메일 보내기
                // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
                const templateParams = {
                    to_email: checkedUserEmails[i].email,
                    to_name: checkedUserEmails[i].name,
                    from_name: "FitNest Admin",
                    from_email: "winsam003@gmail.com",
                    message: emailContents,
                };
                emailjs
                    .send(
                        'winsam003', // 서비스 ID
                        'SportsComplexAdmin', // 템플릿 ID
                        templateParams,
                        emailToken, // public-key
                    )
                    .then((response) => {
                        alert('이메일이 성공적으로 보내졌습니다');
                        console.log('이메일이 성공적으로 보내졌습니다:', response);
                        setEmailContents('');
                        // 이메일 전송 성공 처리 로직 추가
                    })
                    .catch((error) => {
                        alert('이메일 보내기 실패, 관리자에게 문의하세요.');
                        console.error('이메일 보내기 실패:', error);
                        // 이메일 전송 실패 처리 로직 추가
                    });
            } else {
                console.log('이메일 수신 거부 유저입니다.');
            }
        };

    }
    //******************************* 메일보내기 API 실행 *********************************//


    //******************************* 이메일 초기화 실행 *********************************//

    const emailRefresh = () => {
        setEmailContents('');
    }

    //******************************* 이메일 초기화 실행 *********************************//


    return (
        <div className='XuserInfoList_Box'>
            <div className='XuserInfoList_searchTitle'>회원 정보 조회</div>
            <div className='XuserInfoList_SearchBox'>
                <span>내/외국인</span>
                <select value={InOrFo} onChange={isInOrFo}>
                    <option value="">전체</option>
                    <option value="IN">내국인</option>
                    <option value="FO">외국인</option>
                </select>
                <span>상세분류</span>
                <select value={memberAge} onChange={ismemberAge}>
                    <option value="">전체</option>
                    <option value="AD">성인</option>
                    <option value="KI">아동</option>
                    <option value="OL">65세이상</option>
                </select>
                <span>이름</span>
                <input value={keyword} onChange={iskeyword} type='search' className='XuserInfoList_SearchBox_input' placeholder='이름 검색' onKeyPress={handKeyPress} />
            </div>
            <div className='XBtnResetSearch'>
                <button onClick={searBoxRefresh}>초기화</button>
                <button onClick={searchMember}>조회</button>
            </div>
            <div>
                <div className='XuserInfoList_SearchedUser'>
                    <span>체크</span>
                    <span>ID</span>
                    <span>이름</span>
                    <span>생년월일</span>
                    <span>연락처</span>
                    <span>주소</span>
                    <span>차량번호</span>
                    {/* <span>강사등록</span> */}
                </div>
                <div>
                    {userInfoList.slice(indexOfFirstItem, indexOfLastItem)
                        .map((it, index) => (
                            <XuserInfoListContents key={index} {...it} userDelete={userDelete} isChecked={checkedUsers.includes(it.id)} />
                        ))}
                </div>
                <div className='pagenationBox'>
                    <Pagination
                        // 현제 보고있는 페이지 
                        activePage={currentPage}
                        // 한페이지에 출력할 아이템 수
                        itemsCountPerPage={5}
                        // 총 아이템수
                        totalItemsCount={userInfoList.length}
                        // 표시할 페이지수
                        pageRangeDisplayed={5}
                        // 페이지 변경 시 동작 설정
                        onChange={handlePageChange}>
                    </Pagination>
                </div>
                <div className='XuserInfoList_UserButton'>
                    <button onClick={checkBoxRefresh}>초기화</button>
                    <button onClick={deleteReq}>삭제</button>
                </div>
            </div>
            <div className='XuserInfoList_searchTitle'>이메일 발송</div>
            <div className='XuserInfoList_textMessage'>
                <textarea name='textMessage' id='textMessage' placeholder='메일 내용 입력' onChange={emailDetail} value={emailContents} style={{ resize: 'none' }} />
            </div>
            <div className='XuserInfoList_UserButton'>
                <button onClick={emailRefresh}>초기화</button>
                <button onClick={sendVerificationEmail}>발송</button>
            </div>

        </div>
    )
}