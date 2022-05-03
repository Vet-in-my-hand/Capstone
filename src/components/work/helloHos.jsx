import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Modal from '../modal/modal'
import moment from 'moment'
import 'reactjs-popup/dist/index.css';
import { dbService } from "../../firebase"

import styles from './helloHos.module.css'
import 'react-calendar/dist/Calendar.css'

function HelloHos() {
    const [reserve, setReserve] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [title, setTitle] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    useEffect(() => {
        getHospitalName.call(this, setReserve, setUserInfo)
    }, [])

    const onCalendarChangeHandler = (date) => {
        if (reserve.find(item => item === moment(date).format("DD-MM-YYYY"))) {
            setTitle(moment(date).format("DD-MM-YYYY"))
            setIsPopupOpen(true)
        } else {
            setIsPopupOpen(false)
        }
    }

    const onCloseButtonHandler = (props) => {
        setIsPopupOpen(props)
    }

    return(
        <div className={styles.body}>
            <Calendar
                onChange={onCalendarChangeHandler}
                tileClassName={({ date }) => {
                    if (reserve.find((x) => x === moment(date).format("DD-MM-YYYY"))) return "highlight"
                }}
            />
            { isPopupOpen && 
                <Modal 
                    open={isPopupOpen} 
                    header={title} 
                    userInfo={userInfo}
                    onClose={onCloseButtonHandler} 
                /> 
            }
        </div>
    )
}

function getHospitalName(setReserve, setUserInfo) {
    const key = 'userToken'
    dbService.collection('hospital').where('uid', '==', localStorage.getItem(key)).get().then(d => {
        d.docs.forEach(data => {
            getReservation(data.data().name, setReserve, setUserInfo)
        })
    })
}

function getReservation(hospitalName, setReserve , setUserInfo) {
    dbService.collection('reservation').where('hospital', '==', `${hospitalName}`).get().then(d => {
        const reserve = []
        const reservedUser = []
        d.forEach(data => {
            const allData = data.data()
            const date = moment(data.data().date.toDate()).format("DD-MM-YYYY")
            reservedUser.push({
                user: {
                    [date]: allData
                }
            })
            reserve.push(date)
        })
        setUserInfo(reservedUser)
        setReserve(reserve)
    })
}

export default HelloHos;