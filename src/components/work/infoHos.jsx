import { useEffect, useState } from "react";
import {authService, dbService} from "../../firebase"
import styles from "./infoHos.module.css"
function InfoHos() {
    const user = authService.currentUser;
    const [hosInfo, setHosInfo] = useState([]);
    function createData(name, email, tel, address, info){
        return {name, email, tel, address, info}
    }

    function getInfo(setHosInfo){
        dbService.collection('hospital').where('uid', '==', `${user.uid}`).get().then(d => {
            d.forEach(e => {
                // const a = e.data().name
                // const b = e.data().name
                // const a = e.data().name
                // const a = e.data().name
                // const a = e.data().name
                createData(e.data().name, user.email, e.data().tel, e.data().address, e.data().info)
                console.log(createData)
            })
            setHosInfo()
        })
        
        
    }

    useEffect(()=> {
        getInfo.call(this, setHosInfo)
    }, [])

    
    console.log('hohohoo')
    return(
        
        <div className={styles.infoHosWarp}>
            {hosInfo}
        </div>
    );
}
export default InfoHos;