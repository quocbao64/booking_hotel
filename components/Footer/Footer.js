import Link from 'next/link';
import React from 'react';
import { MdLocalHotel } from 'react-icons/md';
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
        link: 'Về chúng tôi',
        to: '/about',
    },
    {
        id: 3,
        link: 'Danh sách khách sạn',
        to: '/hotels',
    },
];

const footer_detail2 = [
    {
        id: 1,
        link: 'Về chúng tôi',
        to: '/about',
    },
    {
        id: 2,
        link: 'Dịch vụ',
        to: '/service',
    },
    {
        id: 3,
        link: 'Liên hệ',
        to: '/contact',
    },
];

const footer_detail3 = [
    {
        id: 1,
        link: 'Liên hệ',
        to: '/contact',
    },
    {
        id: 2,
        link: 'Địa chỉ',
        to: '/contact',
    },
    {
        id: 3,
        link: 'Về chúng tôi',
        to: '/about',
    },
];

function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.footer_main}>
                <div className={style.footer_left}>
                    <FooterItem footerDetail={footer_detail1} footerHeader="Liên kết nhanh" />
                    <FooterItem footerDetail={footer_detail2} footerHeader="Về chúng tôi" />
                    <FooterItem footerDetail={footer_detail3} footerHeader="Liên hệ" />
                </div>

                <div className={style.footer_right}>
                    <Link href="/">
                        <div className={style.nav_brand}>
                            <MdLocalHotel style={{ marginRight: '5px' }} className={style.brand} />{' '}
                            Rooms
                        </div>
                    </Link>
                    <p>
                    Tìm kiếm các phòng và nhà trọ tuyệt vời cho chuyến đi của bạn. Làm cho hành trình của bạn thêm thú vị và đáng nhớ hơn.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
