import { useState } from "react";
import { authService } from "../../firebase";
import { getHospitalInfo } from "../../service/authService";
import { useNavigate } from "react-router-dom"
function HelloHos() {

    const navigate = useNavigate();
    const user = authService.currentUser;
    const test =()=>{
        setA({...getHospitalInfo(user.uid)});
        console.log(a);
    }
    const out = () => {
        authService.signOut().then(()=>{
            navigate("/login");
        })    
    }

    const test2 = (event)=> setA(event.target.value);
    const [a, setA] = useState({});

    return(
        <>
        <input
            onChange={test2}
        ></input>
        <button
        type="button"
        onClick={test}
        >
        
        test</button>

        <button
        type="button"
        onClick={out}
        >
        
        out</button>
        </>
    )
}
export default HelloHos;