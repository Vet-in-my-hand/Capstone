import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const Postcode = (props) => {
  const handleComplete = (data) => {
    console.log('열림');
    let fullAddress = data.address;
    let zonecode = data.zonecode;
    let extraAddress = '';


    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    console.log(data.zonecode);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    
    props.onClose()
  }

  const postcodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "600px",
    height: "600px",
    padding: "7px",
  }


  return (
    <div>        
      <DaumPostcode
      onComplete={handleComplete}
      style={postcodeStyle} />
      <button type='button' 
      onClick={() => { props.onClose() }} className='postCode_btn'>닫기</button>
    </div>
  );
}

export default Postcode;