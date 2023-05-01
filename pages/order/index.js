import axios from "axios";
import { format } from 'date-fns';
import Table from "rc-table";
import { FaRegCheckCircle } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import style from "../../styles/order.module.scss";

const index = ({rooms, invoices}) => {

    const dataForTable = invoices.map(e => {
        const room = rooms?.find(item => item.room_id === e.room_id);
        return {
            info: {
                room_id: room?.room_id,
                room_name: room?.room_name,
                room_beds: room.room_beds,
                room_desc: room.room_desc
            },
            quantity: e.room_quantity,
            price: e.price,
            status: e.status,
            dayBook: {
                r_date: e.r_date,
                p_date: e.p_date
            },
            updatedAt: e.updatedAt
        }
    })
    
    const columns = [
        {
            title: 'Thông tin',
            dataIndex: 'info',
            key: 'info',
            width: 300,
            render: (value) => (
                <div style={{padding: "16px"}}>
                    <div>
                        <a href={`/rooms/${value.room_id}`} style={{color: "blue", fontSize: "20px", textDecoration: 'none'}}>{value.room_name}</a>
                        <br/>
                        <span style={{fontWeight: 500}}>{value.room_desc}</span>
                        <div style={{display: "flex"}}>
                            <div>Số giường: </div>
                            <div style={{marginLeft: "16px", fontWeight: 700}}>{value.room_beds}</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Số lượng phòng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 150
        },
        {
            title: 'Giá phòng',
            dataIndex: 'price',
            key: 'price',
            width: 250,
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
            title: 'Ngày thuê',
            dataIndex: 'dayBook',
            key: 'dayBook',
            width: 250,
            render: (value) => (
                <div style={{textAlign: "center"}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        Ngày thuê: 
                        <div style={{marginLeft: "5px"}}>
                            {format(new Date(value.r_date), "dd-MM-yyyy")}
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        Ngày nhận: 
                        <div style={{marginLeft: "5px"}}>
                            {format(new Date(value.p_date), "dd-MM-yyyy")}
                        </div>
                    </div>
                </div>

            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 200,
            render: (value) => (
                <div style={{textAlign: "center"}}>
                    {value === "booked" ? "Đã đặt" :
                    value === "inprogress" ? "Đang ở" : "Đã thanh toán"}
                </div>
            )
        },
    ];

    return (
        <div>
            <Navbar />
            <div className={style.order_page}>
                <div style={{fontSize: "32px", fontWeight: 700}}>Danh sách đơn đặt phòng của bạn</div>
                <div>
                    <div style={{fontSize: "24px", fontWeight: 500, margin: "16px 0"}}>Lưu ý</div>
                    <div>
                            <div style={{display: "flex", alignItems: "center", marginBottom: "5px"}}>
                                <FaRegCheckCircle style={{marginRight: "16px", fontSize: "20px", color: "#008009"}} />
                                Bạn có thể hủy miễn phí cho đến ngày 21 tháng 5 năm 2023, vì vậy hãy giữ mức giá tuyệt vời này ngay hôm nay.
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginBottom: "5px"}}>
                                <FaRegCheckCircle style={{marginRight: "16px", fontSize: "20px", color: "#008009"}} />
                                Bạn chỉ có thể hủy đặt phòng bằng cách gọi cho chúng tôi theo số: 
                                <strong>&nbsp;0345672312</strong>
                            </div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <FaRegCheckCircle style={{marginRight: "16px", fontSize: "20px", color: "#008009"}} />
                                Không cần thanh toán ngay hôm nay. Bạn sẽ trả tiền khi nhận phòng
                            </div>
                        </div>
                </div>
            </div>
            <Table className={style.hotel_room_table} columns={columns} data={dataForTable} />
            <Footer />
        </div>
    )
}

export default index;

export async function getStaticProps() {
    const response2 = await axios.get('http://localhost:3001/api/rooms')
    const response3 = await axios.get('http://localhost:3001/api/invoices')
    const data2 = await response2.data.data
    const data3 = await response3.data.data

    return {
        props: { 
            rooms: data2, 
            invoices: data3 
        }
    }
}
