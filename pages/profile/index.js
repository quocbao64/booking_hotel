/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from "../../components/Newsletter/Newsletter";
import { Contexts } from '../../ContextUser/Contexts';
import style from '../../styles/profile.module.scss';

const index = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { dispatch } = useContext(Contexts);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        width: '350px',
        padding: '.75rem',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const handleGetUserInfo = async () => {
        await axios.get(`http://localhost:3000/users/${user?.user.user_uuid}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        }).then(res => {
            console.log(res.data.data.user_img);
            setName(res.data.data.user_name)
            setPhone(res.data.data.user_phone)
            setEmail(res.data.data.user_email)
            if (res.data.data.user_img !== null) {
                setDefaultImageUrl(res.data.data.user_img)
                setPreviewImageUrl(res.data.data.user_img)
            } 
        }).catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    timer: 2000,
                    position: "top"
                })
                setTimeout(() => {
                    dispatch({ type: 'LOG_OUT' });
                    window.location.replace("/")
                }, 2000);
            }
        })
    }

    useEffect(() => {
        handleGetUserInfo()
    }, [])

    const handleChangeInfo = async () => {
        const formData = new FormData()
        formData.append('avatar', selectedFile)
        formData.append('data', JSON.stringify({
            "user_name": name,  
            "user_phone": phone,
        }));
        await axios.patch(`http://localhost:3000/users/${user?.user.user_uuid}`, formData, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        }).then(res => {
            console.log(res);
            Toast.fire({
                icon: "success",
                title: "Sửa thông tin thành công",
                timer: 2000,
                position: "top"
            })
            const newUser = {
                token: user?.token,
                refreshToken: user?.refreshToken,
                user: res.data.data
            }
            localStorage.setItem('user', JSON.stringify(newUser))
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }).catch(err => {
            console.log(err);
            if (err?.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    timer: 2000,
                    position: "top"
                })
                setTimeout(() => {
                    dispatch({ type: 'LOG_OUT' });
                    window.location.replace("/")
                }, 2000);
            }
        })
    }

    const handleChangePassword = async () => {
        await axios.patch(`http://localhost:3000/reset-password`, {
            "new_password": password,  
            "confirm_password": confirmPassword,
        }, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        }).then(res => {
            console.log(res);
            Toast.fire({
                icon: "success",
                title: "Đặt lại mật khẩu thành công",
                timer: 2000,
                position: "top"
            })
            const newUser = {
                token: user?.token,
                refreshToken: user?.refreshToken,
                user: res.data.data
            }
            localStorage.setItem('user', JSON.stringify(newUser))
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }).catch(err => {
            console.log(err);
            if (err?.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    timer: 2000,
                    position: "top"
                })
                setTimeout(() => {
                    dispatch({ type: 'LOG_OUT' });
                    window.location.replace("/")
                }, 2000);
            }
            else if (err.response.status === 400) {
                Toast.fire({
                    icon: "error",
                    title: err.response.data,
                    timer: 2000,
                    position: "top"
                })
            }
        })
    }

    const [defaultImageUrl, setDefaultImageUrl] = useState('https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(defaultImageUrl);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImageUrl(defaultImageUrl)
        }
    };

    return (
        <div>
            <Head>
                <title>Rooms - Find your hotel</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/home_icon-icons.com_73532.ico" />
            </Head>
            <Navbar />
            <div className={style.profile}>
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row justify-content-center">
                        <div className="col-md-3 border-right" style={{border: "2px solid #682773", borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px", borderRight: "none"}}>
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5" style={{marginTop: "60px"}}>
                                <div className={style.avatar}>
                                    <img className="rounded-circle mt-5" width="150px" src={previewImageUrl} />
                                    <input type="file" title='Nhấn để tải ảnh đại diện' onChange={handleFileChange} />
                                </div>
                                <span className="font-weight-bold fs-4">{name}</span>
                                <span className="text-black-50">{email}</span>
                            </div>
                        </div>
                        <div className="col-md-6 border-right" style={{border: "2px solid #682773", borderTopRightRadius: "16px", borderBottomRightRadius: "16px", borderLeft: "none"}}>
                            <div className="p-3 py-5">
                                <div>
                                    <h2 className='text-right mb-4'>Thông tin cá nhân</h2>
                                </div>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Chỉnh sửa thông tin</h4>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <label className={style.labels}>Email</label>
                                                <input disabled type="text" className={style.form_control} placeholder="Nhập email" value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                            <div className="col-md-12">
                                                <label className={style.labels}>Tên</label>
                                                <input type="text" className={style.form_control} placeholder="Nhập tên người dùng" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="col-md-12">
                                                <label className={style.labels}>Số điện thoại</label>
                                                <input type="text" className={style.form_control} placeholder="Nhập số điện thoại" value={phone} onChange={e => setPhone(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='card mt-4'>
                                    <div className='card-body'>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Đặt lại mật khẩu</h4>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-7">
                                                <label className={style.labels}>Mật khẩu mới</label>
                                                <input type="password" className={style.form_control} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu mới"/>
                                            </div>
                                            <div className="col-md-7">
                                                <label className={style.labels}>Nhập lại mật khẩu</label>
                                                <input type="password" className={style.form_control} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button className="btn btn-primary profile-button" type="button" onClick={() => handleChangeInfo()}>Lưu thông tin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    );
};

export default index;
