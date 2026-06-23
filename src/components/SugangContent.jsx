import './SugangReciptInfo.css'
import './SugangContent.css'
import Submenu from './Submenu';
import SugangReciptInfo from './SugangReciptInfo';
import XclassSearchBox from './XclassSearchBox';
import SugangSearchList from './SugangSearchList';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiCall } from '../apiService/apiService';

export default function SugangContent() {
    const [classes, setClasses] = useState([]);
    // 선택된 강의 정보
    const [selectedClasses, setSelectedClasses] = useState([]);
    // 검색 이용을 위한 select과 input
    const [classesSearchBTSelect, setClassesSearchBTSelect] = useState('전체');
    const [classesSearchSTSelect, setClassesSearchSTSelect] = useState('전체');
    const [classesSearchDaySelect, setClassesSearchDaySelect] = useState('월');
    const [classesSearchTargetSelect, setClassesSearcTargetSelect] = useState('성인');
    const [classesSearchInput, setClassesSearchInput] = useState('');
    // 검색 기능
    const [searchResult, setSearchResult] = useState([]);

    const location = useLocation();

    // Session storage에 있는 userData 가져오기
    const sessionUserData = sessionStorage.getItem('userData');
    const userData = sessionUserData ? JSON.parse(sessionUserData) : 'null';

    useEffect(() => {
        const loadClassesList = async () => {
            let url = '/classes/classesList';

            apiCall(url, 'get', null, null)
                .then((classes) => {
                    console.log(` classes = ${classes}`);
                    setClasses(classes);
                    setSearchResult(classes);
                }).catch((error) => {
                    console.error(" 강좌 목록 불러오기 실패 ", error);
                });
        }
        loadClassesList();
    }, [selectedClasses])

    // 강의 선택
    const handleToggleCheckbox = (clnum) => {
        selectedClasses(prevState => {
            if (prevState.includes(clnum)) {
                return prevState.filter(num => num !== clnum);
            } else {
                return [...prevState, clnum];
            }
        });
    };

    // 선택 초기화
    const handleResetSelection = () => {
        setSelectedClasses([]);
    };

    // 선택 강좌 삭제
    const handleDeleteSelectedClasses = (() => {
        if (selectedClasses.length === 0) {
            return;
        }

        let url = '/classes/classesDelete';

        apiCall(url + `?clnum=${selectedClasses.join('&clnum=')}`, 'get', null, userData.token)
            .then(() => {
                setSelectedClasses([]);
            }).catch((error) => {
                console.error(`문의게시판 삭제 실패 : `, error);
            });
    });

    // 검색
    const handleSearch = () => {
        setSearchResult(classes.filter(classes => {
            switch (classesSearchBTSelect) {
                case '전체':
                    return Object.values(classes).some(val =>
                        String(val).toLowerCase().includes(classesSearchInput.toLowerCase())
                    );
                case '구기':
                    return (classes.classcode.toLowerCase().substring(2, 4) === 'ba') && classes.clname.toLowerCase().includes(classesSearchInput.toLowerCase());
                case '수상':
                    return (classes.classcode.toLowerCase().substring(2, 4) === 'wa') && classes.clname.toLowerCase().includes(classesSearchInput.toLowerCase());
                case '댄스':
                    return (classes.classcode.toLowerCase().substring(2, 4) === 'dc') && classes.clname.toLowerCase().includes(classesSearchInput.toLowerCase());
                case '라켓':
                    return (classes.classcode.toLowerCase().substring(2, 4) === 'la') && classes.clname.toLowerCase().includes(classesSearchInput.toLowerCase());
                case '웨이트':
                    return (classes.classcode.toLowerCase().substring(2, 4) === 'we') && classes.clname.toLowerCase().includes(classesSearchInput.toLowerCase());
                default:
                    return true; // 전체일 경우 모든 항목을 반환합니다.
            }
        }) || []);
    };

    // 검색 초기화
    const reset = () => {
        setClassesSearchBTSelect('전체');
        setClassesSearchSTSelect('전체');
        setClassesSearchDaySelect('월');
        setClassesSearcTargetSelect('성인');
        setClassesSearchInput('');
    }

    return (
        <div>
            <div className='board_div'>
                <Submenu />
                <div className='board_div_div'>
                    <SugangReciptInfo />
                    <XclassSearchBox onSearch={handleSearch}
                        onReset={reset}
                        classesSearchBTSelect={classesSearchBTSelect}
                        setClassesSearchBTSelect={setClassesSearchBTSelect}
                        classesSearchSTSelect={classesSearchSTSelect}
                        setClassesSearchSTSelect={setClassesSearchSTSelect}
                        classesSearchDaySelect={classesSearchDaySelect} setClassesSearchDaySelect={setClassesSearchDaySelect} classesSearchTargetSelect={classesSearchTargetSelect} setClassesSearcTargetSelect={setClassesSearcTargetSelect}
                        classesSearchInput={classesSearchInput}
                        setClassesSearchInput={setClassesSearchInput}
                    />
                    <div className='SugangSearchList_div'>
                        <div className='SugangSearchList_index'>
                            <span>종목</span>
                            <span>강좌명</span>
                            <span>시간</span>
                            <span>대상</span>
                            <span>등록인원</span>
                            <span>대기인원</span>
                            <span>금액</span>
                            <span>구분</span>
                        </div>
                        {searchResult && searchResult.map((item, index) => (
                            <SugangSearchList key={index} {...item} onToggleCheckbox={handleToggleCheckbox} isChecked={selectedClasses.includes(item.clnum)} />
                        ))}
                    </div>
                </div>
                {
                    location.pathname == '/Sugang' ?
                        ''
                        :
                        <div className='XResetDeleteBtn'>
                            <button onClick={handleResetSelection}>초기화</button>
                            <button onClick={handleDeleteSelectedClasses}>삭제</button>
                        </div>
                }
            </div>
        </div>
    )
}