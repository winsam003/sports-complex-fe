import PageBanner from '../PageBanner';
import ApplicationDetails from '../ApplicationDetails';

export default function MyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <ApplicationDetails />
        </div>
    )
}