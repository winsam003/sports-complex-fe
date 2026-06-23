import PageBanner from "../PageBanner";
import XNewClassUpload from '../XNewClassUpload';
import { useEffect } from 'react';

export default function XNewClassUploadPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <PageBanner />
            <XNewClassUpload />
        </div>
    )
}