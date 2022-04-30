import { dbService } from '../firebase';

export const newHospitalInit = (hospitalName, hospitalTel, fullAddress, extraAddress, hospitalUid) => {
     dbService.collection("hospital").doc(hospitalName).set({
        name: hospitalName,
        tel: hospitalTel,
        address: fullAddress+" "+extraAddress,
        uid: hospitalUid
    })
    .then(()=>{
        console.log('DB 저장성공')
    })
    .catch((error)=>{
        console.log('DB 저장실패',error)
    })
}

export const getHospitalInfo = (uid) => {
    dbService.collection("hospital").where("uid", "==", uid).get().then((shapShot)=>{
        shapShot.forEach((e)=>{
            // console.log(e.data());
            return e.data();
        })
        
    })
}