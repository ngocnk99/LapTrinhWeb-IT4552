export default function EmployerHeader() {
    let employer = JSON.parse(localStorage.getItem('employer'));

    if (employer && employer.accessToken) {
        return { 'x-access-token': employer.accessToken }; // for Node.js Express back-end
    } else {
        return {};
    }
}