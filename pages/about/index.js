/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Nav } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import style from '../../styles/about.module.scss';

const index = ({ hotelList }) => {

    return (
        <div>
            <Navbar />
            <Header type="hList" />
            <div className={style.about_page}>
                <div className={style.about_page_top}>
                    <div>
                        <Nav className="flex-column">
                            <Nav.Item style={{backgroundColor: "#e7e4e4"}}>
                                <Nav.Link href="/about">Về Rooms</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contact">Liên hệ</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div>
                        <h2 style={{marginBottom: "32px"}}>Về Rooms</h2>
                        <p>
                            Chào mừng bạn đến với Rooms - trang web đặt phòng khách sạn hàng đầu tại Việt Nam. Với nhiều năm kinh nghiệm trong lĩnh vực đặt phòng khách sạn, chúng tôi cung cấp cho bạn những trải nghiệm tuyệt vời và tiện lợi khi đặt phòng khách sạn từ mọi nơi trên đất nước Việt Nam.
                        </p>
                        <p>
                            Với Rooms, bạn có thể dễ dàng tìm kiếm và đặt phòng khách sạn từ các thành phố lớn như Hà Nội, TP.HCM, Đà Nẵng và nhiều thành phố khác. Chúng tôi cung cấp một danh sách đa dạng các khách sạn đạt tiêu chuẩn 3 sao đến 5 sao, phù hợp với mọi nhu cầu và ngân sách của khách hàng.
                        </p>
                        <p>
                            Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm tuyệt vời khi đặt phòng khách sạn, với dịch vụ chăm sóc khách hàng chuyên nghiệp và hỗ trợ 24/7. Chúng tôi luôn sẵn sàng giúp bạn giải đáp mọi thắc mắc và đảm bảo bạn có một kỳ nghỉ tuyệt vời.
                        </p>
                        <p>
                            Hãy truy cập Rooms và trải nghiệm sự tiện lợi và đơn giản khi đặt phòng khách sạn tại Việt Nam. Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi!
                        </p>
                    </div>
                </div>
                
                <div className={style.about_page_bottom}>
                    <div className={style.content}>
                        <h4>Rooms cung cấp những gì?</h4>
                        <div >
                            <p>
                                Rooms cung cấp cho bạn sự lựa chọn đa dạng và phong phú trong việc tìm kiếm các chỗ ở như căn hộ sang trọng, resort nghỉ dưỡng hoặc các nhà nghỉ tại vùng quê ấm cúng - tất cả trong một nơi.
                            </p>
                            <p>
                                Cam kết cung cấp cho bạn giá tốt nhất có thể và với chính sách đảm bảo giá, bạn có thể yên tâm rằng luôn nhận được ưu đãi tốt nhất.
                            </p>
                            <p>
                                Mọi đặt phòng đều được xác nhận ngay lập tức. Bạn chỉ cần vài cú nhấp chuột để tìm kiếm chỗ ở hoàn hảo cho mình.
                            </p>
                            <p>
                                Không thu thêm bất kỳ khoản phí hành chính nào. Ngoài ra, trong nhiều trường hợp, bạn có thể hủy đặt phòng miễn phí.
                            </p>
                        </div>
                    </div>
                    <div className={style.content}>
                        <h4>Mang lại giá trị cho các khách hàng ở chỗ của chúng tôi</h4>
                        <div>
                            <p>
                                Chúng tôi tin rằng tất cả các chỗ ở tuyệt vời đều xứng đáng được khám phá. Đó là lý do tại sao chúng tôi làm cho việc tiếp thị các chỗ ở trên khắp đất nước trở nên nhanh chóng và dễ dàng, giúp các nhà cung cấp chỗ ở tiếp cận được với khách hàng mới và phát triển kinh doanh của họ thông qua nền tảng của chúng tôi.
                            </p>
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