import React from 'react';
import { BiBody, BiSwim } from 'react-icons/bi';
import { FaBed, FaCar, FaTaxi } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import Facility from '../Facility/Facility';
import styles from './whyus.module.scss';

const Facilities = [
    {
        id: 1,
        title: 'Phòng sang trọng',
        text: 'Tất cả các phòng và hoạt động đều được chọn lựa cẩn thận bởi chúng tôi. Phòng sang trọng với trang thiết bị và tiện nghi đẳng cấp.',
        icon: <FaBed className={styles.icon} />,
    },
    {
        id: 2,
        title: 'Đồ ăn ngon',
        text: 'Đảm bảo giá tốt nhất và không phát sinh phiền toái! Thực đơn đa dạng với các món ăn ngon.',
        icon: <MdFastfood className={styles.icon} />,
    },
    {
        id: 3,
        title: 'Chỗ đậu xe',
        text: 'Tất cả các địa điểm và hoạt động đều được chọn lựa cẩn thận bởi chúng tôi. Chỗ đậu xe rộng rãi và an toàn.',
        icon: <FaCar className={styles.icon} />,
    },
    {
        id: 4,
        title: 'Trung tâm thể hình',
        text: 'Đảm bảo giá tốt nhất và không phát sinh phiền toái! Trang bị đầy đủ máy móc, thiết bị thể dục thể thao.',
        icon: <BiBody className={styles.icon} />,
    },
    {
        id: 5,
        title: 'Bể bơi',
        text: 'Tất cả các địa điểm và hoạt động đều được chọn lựa cẩn thận bởi chúng tôi. Bể bơi với nước trong, sạch sẽ và an toàn..',
        icon: <BiSwim className={styles.icon} />,
    },
    {
        id: 6,
        title: 'Xe taxi sân bay',
        text: 'Đảm bảo giá tốt nhất và không phát sinh phiền toái! Xe taxi đưa đón sân bay với dịch vụ chuyên nghiệp.',
        icon: <FaTaxi className={styles.icon} />,
    },
];

function WhyUs() {
    return (
        <div className={styles.why_us}>
            <div className={styles.why_us_main}>
                <div className={styles.why_us_title}>
                    <h2>Tại sao bạn nên chọn chúng tôi?</h2>
                    <p>Những cơ sở & dịch vụ chúng tôi cung cấp cho bạn.</p>
                </div>

                <div className={styles.why_us_item}>
                    {Facilities.map((facilities) => (
                        <Facility key={facilities.id} facilities={facilities} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyUs;
