import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsFillEnvelopeFill, BsFillGeoAltFill, BsFillTelephoneFill } from "react-icons/bs";
import logo from "../../images/logo.png";
import FooterItem from '../FooterItem/FooterItem';
import style from './footer.module.scss';

const footer_detail1 = [
    {
        id: 1,
        link: 'Trang chủ',
        to: '/',
    },
    {
        id: 2,
        link: 'Danh sách phòng',
        to: '/rooms',
    },
    {
        id: 3,
        link: 'Về chúng tôi',
        to: '/about',
    },
];

const footer_detail3 = [
    {
        id: 1,
        link: 'Số 32 Lương Văn Can, Quận Hoàn Kiếm, Hà Nội',
        icon: <BsFillGeoAltFill />
    },
    {
        id: 2,
        link: '0345678912',
        icon: <BsFillTelephoneFill />
    },
    {
        id: 3,
        link: 'room@gmail.com',
        icon: <BsFillEnvelopeFill />
    },
];

function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.footer_main}>
                <div className={style.footer_left}>
                    <FooterItem footerDetail={footer_detail1} footerHeader="Liên kết nhanh" />
                    <FooterItem footerDetail={footer_detail3} footerHeader="Liên hệ" />
                </div>

                <div className={style.footer_right}>
                    <Link href="/">
                        <Image width={200} height={80} src={logo} objectFit='contain' />
                    </Link>
                    <p>
                    Tìm kiếm các phòng tuyệt vời cho chuyến đi của bạn. Làm cho hành trình của bạn thêm thú vị và đáng nhớ hơn.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
