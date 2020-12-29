export default class Employer {
    constructor(username, email, password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.companyName = '';
        this.webLink = '';
        this.address = '';
        this.introduce = [];
        this.banner = '';
        this.avatar = '';
        this.posts = []; //id 
        this.members = '';
    }
}