export default class User {
    constructor(username, email, password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.posts = [];
        this.cv = '';
    }
}