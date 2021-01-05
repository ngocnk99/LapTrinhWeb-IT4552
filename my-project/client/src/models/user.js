export default class User {
    constructor(username, email, password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = ''
        this.posts = []; //[{id: ,status: , notify:,}]. status = 0,1,2 :ung tuye, chap nhan, tu choi. notify= 0,1 : co /khong co 
        this.avatar = '';
        this.academic = '';
        this.jobPosition = '';
        this.cv = '';
    }
}