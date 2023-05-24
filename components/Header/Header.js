/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaCalendarAlt } from 'react-icons/fa';
import { MdLocalHotel, MdStarRate } from 'react-icons/md';
import { Context } from '../../ContextApi/Context';
import { Contexts } from '../../ContextUser/Contexts';
import style from './header.module.scss';

function Header({type}) {
    const [openDate, setOpenDate] = useState(false)
    const [openOption, setOpenOption] = useState(false)
    const [quantity, setQuantity] = useState()
    const [rate, setRate] = useState()
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    const router = useRouter()

    const handleBtn = (name, operation) => {
        setOptions((prev) => ({
                ...prev,
                [name]: operation === "i" ? options[name] + 1 :  options[name] - 1
            }))
    }

    const handleCalender = () => {
        setOpenDate(!openDate)
        setOpenOption(false)
    }

    const handleRoomss = () => {
        setOpenOption(!openOption)
        setOpenDate(false)
    }
    
    const {dispatch} = useContext(Context);
    const {user} = useContext(Contexts);
    const states = {
        quantity,
        rate
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({type: 'NEW_SEARCH', payload: {quantity, dates, rate}})
        router.push({
            pathname: '/rooms',
            query: states
        })
    }

    return (
        <div className={style.header}>
            <div className={style.header_main}>
                {type !== "hList" && (
                    <>
                        
                    <h1>Khách sạn tuyệt vời cho những du khách yêu tự do.</h1>
                    <p>
                        Một cuộc đời được giảm giá? - Chúng tôi có tất cả những gì bạn cần. Đơn giản là: bạn ở lại càng lâu, bạn sẽ được giảm giá càng nhiều!
                    </p>

                    {user ? (
                        <div className={style.username}></div>
                    ) : (
                        <div className={style.username}></div>
                    )}

                    <div className={style.header_search}>
                            <div className={style.header_search_item}>
                                <MdLocalHotel className={style.header_search_icon_first} />
                                <input
                                    type="number"
                                    placeholder="Số giường"
                                    min={1}
                                    max={5}
                                    className={style.searc_inp}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className={style.header_search_item}>
                                <FaCalendarAlt className={style.header_search_icon} />
                                <span onClick={handleCalender} className={style.header_search_date}>{`${format(dates[0].startDate, "MM/dd/yyyy")} đến ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                    {openDate && <DateRange
                                        editableDateInputs
                                        onChange={item => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className={style.header_search_calender}
                                        minDate={new Date()}
                                    />}
                            </div>

                            <div className={style.header_search_item}>
                                <MdStarRate className={style.header_search_icon_first} />
                                <input
                                    type="number"
                                    placeholder="Đánh giá"
                                    min={1}
                                    max={5}
                                    className={style.searc_inp}
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                />
                            </div>

                            <div className={style.header_search_item}>
                                <button className={style.header_search_btn} type="button" onClick={handleSubmit}>Search</button>
                            </div>
                        </div>
                </>
                )}
            </div>
        </div>
    );
}

export default Header;
