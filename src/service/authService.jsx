import { dbService } from '../firebase';

export const newHospitalInit = (hospitalName, hospitalTel, fullAddress, extraAddress, hospitalUid) => {
     dbService.collection("hospital").doc(hospitalName).set({
        name: hospitalName,
        tel: hospitalTel,
        address: fullAddress+" "+extraAddress,
        uid: hospitalUid
    })
}