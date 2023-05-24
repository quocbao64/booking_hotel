/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import { EffectCards, EffectFade, Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import axios from 'axios';
import { addDays, format } from 'date-fns';
import Table from 'rc-table';
import { useContext, useState } from 'react';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaBed, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styleSearch from '../../components/Header/header.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import Reserve from '../../components/Reserve/Reserve';
import { Context } from '../../ContextApi/Context';
import { Contexts } from '../../ContextUser/Contexts';
import noPhoto from '../../images/no hotel.jpg';
import style from '../../styles/hotelDetail.module.scss';

const hotelDetails = ({ rooms }) => {
    const { options } = useContext(Context);
    const { user, dispatch, loading } = useContext(Contexts);
    const [sliderNum, setSliderNum] = useState(0);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(rooms.room_imgs.split(',') || [])
    

    const details = {
        facilities: [
            'Giường lớn',
            'Hỗ trợ 24/7',
            'Bếp chung',
            'Phòng tắm riêng',
            'Giặt ủi',
            'Phòng gym chung',
            'Có điều hòa',
            'Wifi tốc độ cao',
        ],
    }

    const MILISEC_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiference = Math.abs(date2.getTime() - date1.getTime());
        const differenceDays = Math.ceil(timeDiference / MILISEC_PER_DAY);
        return differenceDays === 0 ? 1 : differenceDays;
    }

    const [inpval, setInpval] = useState({
        email: '',
        password: '',
    });

    const [regisInpval, setRegisInpval] = useState({
        email: '',
        password: '',
        username: '',
        confirm_password: '',
        phone_number: ''
    });
    const [err, setErr] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };
    // const { data: session } = useSession()

    const inpLoginDetail = [
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            errMsg: 'Vui lòng nhập đúng định dạng email!',
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Mật khẩu',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
    ];

    const inpRegisterDetail = [
        {
            id: 2,
            name: 'username',
            type: 'text',
            placeholder: 'Tên người dùng',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
        {
            id: 3,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            errMsg: 'Vui lòng nhập đúng định dạng email!',
        },
        {
            id: 4,
            name: 'phone_number',
            type: 'text',
            placeholder: 'Số điện thoại',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
        {
            id: 5,
            name: 'password',
            type: 'password',
            placeholder: 'Mật khẩu',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
        {
            id: 6,
            name: 'confirm_password',
            type: 'password',
            placeholder: 'Nhập lại mật khẩu',
            required: true,
            errMsg: 'Không được bỏ trống!',
        }
    ];

    const handleChng = (e) => {
        setInpval({ ...inpval, [e.target.name]: e.target.value });
    };

    const handleRegisChng = e => {
        setRegisInpval({...regisInpval, [e.target.name]: e.target.value})
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

            await axios.post(
                'http://localhost:3000/login',
                {
                    user_email: inpval['email'],
                    user_password: inpval['password']
                }
            ).then(res => {
            console.log(res);
            if (res.data.data.code === 1) {
                return Toast.fire({
                    icon: 'error',
                    title: res.data.data.msg,
                    position: "top"
                });
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });

            Toast.fire({
                icon: 'success',
                title: 'Đăng nhập thành công',
                position: "top"
            });
            window.location.reload()
        }).catch(err => {
            setErr(err.response.data.msg)
            dispatch({type: 'LOGIN_FAILURE'})
        })
    };

    const handleRegisSubmit = async e => {
        e.preventDefault();

        await axios.post(
            'http://localhost:3000/register',
            {
                user_email: regisInpval['email'],
                user_password: regisInpval['password'],
                user_name: regisInpval['username'],
                confirm_password: regisInpval['confirm_password'],
                user_phone: regisInpval['phone_number'],
            }
        ).then(re => {
            Toast.fire({
                icon: 'success',
                title: 'Đăng ký thành công.',
            });
            closeRegisterModal()
            openLoginModal()
        }).catch(err => {
            console.log(err);
            setErr(err.response.data)
        })
    }

    const handleToggle = () => {
        setToggler(!toggler);
    };

    const handleLogOut = () => {
        dispatch({ type: 'LOG_OUT' });
    };

    const renderColumn = (value) => {
        return (
            <div>
                <a style={{color: "blue", fontSize: "20px"}}>Tên phòng: {value.room_name}</a>
                <br/>
                <span>Dãy phòng: {value.room_area}</span>
                <br/>
                <span>{value.room_desc} <FaBed /></span>
                <br/>
                <span>Số lượng phòng: {value.room_quantity}</span>
            </div>
        );
    };

    const [countChalet, setCountChalet] = useState([])
    function handleSelectChange(event, room_id) {
        const newCountChalet = {
            id: room_id,
            quantity: parseInt(event.target.value)
        };
        if (parseInt(event.target.value) === 0) {
            countChalet = countChalet.filter(item => !(item.id === room_id))
            setCountChalet(countChalet)
        }
        else setCountChalet([...countChalet, newCountChalet]);
    }

    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: 'selection'
        }
    ]);

    const handleBtn = (name, operation) => {
        setOptionsRooms((prev) => ({
                ...prev,
                [name]: operation === "i" ? optionsRooms[name] + 1 :  optionsRooms[name] - 1
            }))
    }
    const handleCalender = () => {
        setOpenDate(!openDate)
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(
                `http://localhost:3000/filter?from=${dates[0].startDate?.toISOString()}&to=${dates[0].endDate?.toISOString()}`
                )
                if (response.data.data === [] || response.data.data === undefined) {
                    dataForTable = []
                }
        } catch (err) {
            Toast.fire({
                icon: 'error',
                title: 'Đã có lỗi xảy ra!',
            });
        }   
    }

    const handleReverseSubmit = (e) => {
        localStorage.setItem("rooms", JSON.stringify(rooms))
        localStorage.setItem('dates', JSON.stringify(dates))
    }

    const columns = [
        {
            title: 'Thông tin phòng',
            dataIndex: 'info',
            key: 'info',
            width: 400,
            render: renderColumn,
        },
        {
            title: 'Số người',
            dataIndex: 'numPeople',
            key: 'numPeople',
            width: 70
        },
        {
            title: 'Giá phòng',
            dataIndex: 'price',
            key: 'price',
            width: 200,
            render: (value) => (
                <div>
                    <span style={{fontSize: "20px", fontWeight: 700, lineHeight: "24px"}}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(value))}
                    </span>
                    <br/>
                    <span style={{color: "#008009", fontSize: "14px"}}>Giá đã bao gồm thuế và phí</span>
                </div>

            )
        },
        {
            title: 'Phụ thu',
            dataIndex: 'surcharge',
            key: 'surcharge',
            width: 150,
            render: (value) => (
                <div>
                    <span style={{fontSize: "20px", fontWeight: 700, lineHeight: "24px"}}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(value))}
                    </span>
                </div>

            )
        },
        {
            title: 'Lựa chọn khác',
            dataIndex: 'other',
            key: 'other',
            width: 250,
            render: (value) => (
                <div style={{padding: "5px"}}>
                    <span style={{fontSize: "12px"}}><MdFastfood style={{marginBottom: "3px"}}/> Bữa sáng đã bao gồm trong giá</span>
                    <br/>
                    <span style={{fontSize: "12px"}}>
                        <FaCheck style={{marginBottom: "3px"}}/> 
                        <span style={{fontWeight: 700}}> KHÔNG CẦN TRẢ TRƯỚC </span> 
                        - thanh toán tại chỗ nghỉ
                    </span>
                </div>
            )
        },
        {
            title: '',
            key: "info",
            width: 200,
            render: (value) => {
                return <div style={{margin: "5px"}}>
                    <a href='/invoice'><button className={style.reverse_button} onClick={(e) => handleReverseSubmit(e)}>Đặt phòng ngay</button></a>
                </div>
            },
        },
    ];

    const data = [{
        info: {
            room_name: rooms.room_name,
            room_area: rooms.room_area,
            room_desc: rooms.room_desc,
            room_beds: rooms.room_beds,
            room_quantity: rooms.room_quantity,
            room_surcharge: rooms.room_surcharge,
        },
        numPeople: rooms.room_num_people,
        price: rooms.room_price,
        surcharge: rooms.room_surcharge,
        chalet: {
            id: rooms.room_id,
            quantity: rooms.room_quantity
        }
    }]

    function scrollToTarget() {
        const id = document.getElementById("table-room")
        id.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={style.hotel_detail}>
            <Navbar />
            <Header type="hList" />

            {/* hotel details */}
            <div className={style.hotel_detail_main}>
                <div className={style.hotel_detail_left}>
                    <h1>{rooms.room_name}</h1>
                    <Swiper
                        effect="fade"
                        navigation
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation, EffectFade, Pagination]}
                        className="mySwiper"
                    >
                        {image.length > 0 ? (
                            image.map((imgs, i) => (
                                <SwiperSlide className={style.swiper_slide} key={i}>
                                    <Image
                                        className={style.swiper_slide_img}
                                        src={imgs}
                                        height={400}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="hotels"
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide className={style.swiper_slide}>
                                <Image
                                    className={style.swiper_slide_img}
                                    src={noPhoto}
                                    height={400}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="hotels"
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <div className={style.hotel_detail_rooms}>
                        <p style={{ marginRight: '8px' }}>
                            <FaBed size={22} className={style.search_item_bed_icon} />
                            {rooms.length}
                        </p>
                    </div>
                    <div className={style.hotel_detail_desc}>
                        <p>{rooms.room_desc}</p>
                    </div>

                    <h2>Tiện nghi</h2>
                    <div className={style.hotel_detail_facilities}>
                        {details.facilities?.map((list, i) => (
                            <p key={i}>
                                <FaCheck style={{ marginRight: '5px' }} /> {list}
                            </p>
                        ))}
                    </div>
                    
                </div>

                <div className={style.hotel_detail_right}>
                    <Swiper
                        effect="cards"
                        grabCursor
                        modules={[EffectCards]}
                        className={style.mySwiper}
                    >
                        {image.length > 0 ? (
                            image.map((imgs, i) => (
                                <SwiperSlide
                                    className={style.swiper_slide2}
                                    style={{ position: 'relative' }}
                                    key={i}
                                >
                                    <Image
                                        className={style.swiper_slide_img2}
                                        src={imgs}
                                        objectFit="cover"
                                        alt="hotels"
                                        width={300}
                                        height={200}
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide
                                className={style.swiper_slide2}
                                style={{ position: 'relative' }}
                            >
                                <Image
                                    className={style.swiper_slide_img2}
                                    src={noPhoto}
                                    objectFit="cover"
                                    alt="hotels"
                                    width={300}
                                    height={200}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    

                    <div className={style.hotel_detail_booking}>
                        <h3>Hoàn hảo cho 1 ngày ở lại!</h3>
                        <p>
                            Khách sạn này được đánh giá rất tốt với <b>{5} sao</b>.
                        </p>

                        {user ? (
                            <button type="button" onClick={scrollToTarget}>
                                Đặt phòng ngay
                            </button>
                        ) : <button type="button" onClick={() => Toast.fire({
                            title: "Vui lòng đăng nhập",
                            icon: "warning",
                            timer: 3000,
                            position: "top"
                        })}>
                                Đặt phòng ngay
                            </button>}
                    </div>
                    
                </div>
                <hr />
            </div>
            {open && <Reserve setOpen={setOpen} hotelId={rooms.room_id} rooms={rooms} />}
            <div className={styleSearch.header}>
                <div className={styleSearch.header_main} style={{paddingLeft: 0, paddingRight: 0}}>
                    <div className={styleSearch.header_search} style={{margin: "0 10px", maxWidth: "1204px"}}>
                        <div className={styleSearch.header_search_item}>
                            <FaCalendarAlt className={styleSearch.header_search_icon} />
                            <span onClick={handleCalender} className={styleSearch.header_search_date}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                                {openDate && <DateRange
                                    editableDateInputs
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className={styleSearch.header_search_calender}
                                    minDate={new Date()}
                                />}
                        </div>

                        <div className={styleSearch.header_search_item}>
                            <button className={styleSearch.header_search_btn} type="button" onClick={handleSearchSubmit}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <Table id="table-room" className={style.hotel_room_table} columns={columns} data={data} />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default hotelDetails;

export async function getStaticPaths() {
    const res = await axios.get('http://localhost:3001/api/rooms');
    const hotels = await res.data.data;

    const paths = hotels.map((hotel) => ({
        params: { room: hotel.room_id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res2 = await axios.get(`http://localhost:3001/api/rooms/${params.room}`);
    const rooms = await res2.data.data;

    return {
        props: {
            rooms
        },
    };
}