import axios from 'axios';
import { differenceInDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import style from '../../components/SearchItem/searchitem.module.scss';
import noPhoto from '../../images/no hotel.jpg';
import styles from '../../styles/invoice.module.scss';

const index = ({}) => {
    const order = JSON.parse(localStorage.getItem('order'))
    const room = JSON.parse(localStorage.getItem("rooms"))
    const dates = JSON.parse(localStorage.getItem('dates'))
    const user = JSON.parse(localStorage.getItem('user'))
    const imgs = room?.room_imgs.split(',') || [];

    const totalDays = differenceInDays(
        new Date(dates[0]?.endDate),
        new Date(dates[0]?.startDate)
    );


    const originalPrice = parseInt(room.room_price)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: '250px',
        padding: '.75rem',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const handleSubmit = async () => {
        const params = {
            "price": originalPrice,
            "user_uuid": user.user.user_uuid,
            "r_date": format(new Date(dates[0].startDate), "yyyy-MM-dd"),
            "p_date": format(new Date(dates[0].endDate), "yyyy-MM-dd"),
            "room_id": room.room_id,
            "room_quantity": order?.find(e => e.id === room.room_id).quantity,
            "status" : "booked"
        }
        const res = await axios.post("http://localhost:3000/invoices", params, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (res.data.message === "success") {
            Toast.fire({
                icon: 'success',
                title: 'Đặt phòng thành công'
            })
            setTimeout(function() {
                window.history.back()
            }, 3000)
        } else {
            return Toast.fire({
                icon: 'error',
                title: res.data.message
            })
        }
    }

    return (
        <div className={styles.hotels_page}>
            <Navbar />
            <Header type="hList" />

            <div className={styles.hotels_page_main}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div className={styles.hotels_page_search}>
                        <h4 style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            padding: "20px 0    "
                        }}>Chi tiết đặt phòng của bạn</h4>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{display: "flex"}}>
                                <div style={{paddingRight: "16px", borderRight: "1px solid #e7e7e7"}}> 
                                    <div style={{fontSize: "14px"}}>Ngày nhận phòng</div>
                                    <time><span style={{fontSize: "16px", fontWeight: "700"}}>{format(new Date(dates[0]?.startDate), 'dd MMMM yyyy', { locale: vi })}</span></time>
                                </div>
                                <div style={{paddingLeft: "16px"}}> 
                                    <div style={{fontSize: "14px"}}>Ngày trả phòng</div>
                                    <time><span style={{fontSize: "16px", fontWeight: "700"}}>{format(new Date(dates[0]?.endDate), 'dd MMMM yyyy', { locale: vi })}</span></time>
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", padding: "16px 0", borderBottom: "1px solid #e7e7e7"}}>
                                <div>Tổng thời gian ở:</div> 
                                <div style={{fontWeight: "700"}}>{totalDays} ngày</div>
                            </div>
                        </div>
                        <div style={{ padding: "16px 0" }}>
                            <div style={{fontWeight: "700"}}>Lựa chọn của bạn:</div>
                            <div>Phòng {room?.room_name}</div>
                        </div>
                    </div>
                    <div  className={styles.hotels_page_search}>
                        <h4 style={{
                                fontSize: "16px",
                                fontWeight: "700",
                                padding: "20px 0    "
                            }}>Tóm tắt giá của bạn</h4>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>Giá gốc: </div>
                            <div>{new Intl
                                .NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                .format(originalPrice)
                                }
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>Giảm giá: </div>
                            <div>{new Intl
                                .NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                .format(0)
                                }</div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", marginTop: "16px"}}>
                            <div style={{fontSize: "24px", fontWeight: 700}}>Tổng</div>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                                <div style={{fontSize: "24px", fontWeight: 700}}>
                                    {new Intl
                                    .NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                    .format(originalPrice - 0)}
                                </div>
                                <div>
                                    Đã bao gồm thuế và phí
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.hotels_page_result}>
                    <div className={style.search_item} style={{backgroundColor: "white", border: "1px solid #e7e7e7", marginTop: 0}}>
                        <Link href={`/rooms/${room?.room_id}`}>
                            <div className={style.search_item_img} style={{ position: 'relative' }}>
                                <Image src={imgs.length > 0  ? imgs[0] : noPhoto} height={160} width={170} layout="responsive" alt="Hotels"  />
                            </div>
                        </Link>

                        <div className={style.search_item_details}>
                            <Link href={`/rooms/${room?.room_id}`}>
                                <h3>{room?.room_name}</h3>
                            </Link>
                            <p>{room?.room_desc}</p>
                            <p >Số giường:  <span style={{fontWeight: 500}}>{room?.room_beds}</span></p>
                        </div>

                        <div className={style.search_item_pricing}>
                            <div className={style.search_item_priceing_rating}>
                                <p className={style.priceing_rating} style={{marginBottom: 0}}>Đánh giá</p>
                                <span>{5}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor: "white", border: "1px solid #e7e7e7", marginTop: 0, padding: "16px"}}>
                        <div style={{fontSize: "20px", fontWeight: 700, marginBottom: "16px"}}>Bạn có thể cần biết: </div>
                        <div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <FaRegCheckCircle style={{marginRight: "16px", fontSize: "20px", color: "#008009"}} />
                                Bạn có thể hủy miễn phí cho đến ngày 21 tháng 5 năm 2023, vì vậy hãy giữ mức giá tuyệt vời này ngay hôm nay.
                            </div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <FaRegCheckCircle style={{marginRight: "16px", fontSize: "20px", color: "#008009"}} />
                                Không cần thanh toán ngay hôm nay. Bạn sẽ trả tiền khi nhận phòng
                            </div>
                        </div>
                    </div>
                    <button className={style.reverse_button} onClick={() => handleSubmit()}>Đặt phòng ngay</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default index
