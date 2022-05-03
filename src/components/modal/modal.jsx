import './modal.css'

const Modal = ({ open, header, userInfo, onClose }) => {
    // Header -> user의 Key가 된다.
    const findUserInfo = getUserInfo.call(this, userInfo, header)

    const onCloseButtonHandler = () => {
        onClose(false)
    }

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {`${header} 에약정보`}
                    </header>
                    <div>
                        <p>Name: {findUserInfo.user[header].name}</p>
                        <p>Hospital: {findUserInfo.user[header].hospital}</p>
                        <p>Pet Name: {findUserInfo.user[header].petName}</p>
                        <p>About: {findUserInfo.user[header].about}</p>
                    </div>
                    <footer>
                        <button className="close" onClick={onCloseButtonHandler}>close</button>
                    </footer>
                </section>
        ) : null}
        </div>
    );
}

function getUserInfo(userInfo, header) {
    return userInfo.find(e => e.user[header])
}

export default Modal