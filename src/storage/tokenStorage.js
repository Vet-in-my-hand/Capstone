const key = "userToken"

export class Token {
    constructor(uid) {
        this.id = uid
    }

    // login
    save() {
        localStorage.setItem(key, this.id)
    }

    getId() {
        return localStorage.getItem(key)
    }

    // logout
    clear() {
        localStorage.clear();
    }
}