import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import moment from 'moment'
import { dbService } from "../../firebase";

import styles from './helloHos.module.css'
import 'react-calendar/dist/Calendar.css'

function HelloHos() {
    const [reserve, setReserve] = useState([])

    useEffect(() => {
        getHospitalName.call(this, setReserve)
    }, [])

    return(
        <div className={styles.body}>
            <Calendar 
                tileClassName={({ date }) => {
                    if (reserve.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
                        return "highlight";
                    }
                }}
            />
        </div>
    )
}

function getHospitalName(setReserve) {
    const key = 'userToken'
    dbService.collection('hospital').where('uid', '==', localStorage.getItem(key)).get().then(d => {
        d.docs.forEach(data => {
            getReservation(data.data().name, setReserve)
        })
    })
}

function getReservation(hospitalName, setReserve) {
    dbService.collection('reservation').where('hospital', '==', `${hospitalName}`).get().then(d => {
        const reserve = []
        d.forEach(data => {
            const date = data.data().date.toDate()
            reserve.push(moment(date).format("DD-MM-YYYY"))
        })
        setReserve(reserve)
    })
}

export default HelloHos;