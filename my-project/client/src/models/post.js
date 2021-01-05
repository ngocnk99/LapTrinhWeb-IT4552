export default class Posts {
    constructor(companyName, employerId, address) {
        this.companyName = companyName;
        this.employer = employerId;
        this.employerName = ''
        this.avatar = '';
        this.address = address;
        this.title = '';
        this.career = '';
        this.dateline = '';
        this.numberOfPeople = '';
        this.formOfWork = '';
        this.experience = '';
        this.salary = '';
        this.sex = '';
        this.introduce = [];
        this.request = [];
        this.benefitsEnjoyed = [];
        this.jobkers = []; //[{id:,status:,},{}] jobker.status 0 đã ứng tuyển, 1 chấp nhận,2 từ chối 
        this.status = {}; //{status: ,notify: } status 0: mặc đinh , 1: đã đăng , 2: đã xóa , notify :0 chua xem, 1 da xem
    }
}