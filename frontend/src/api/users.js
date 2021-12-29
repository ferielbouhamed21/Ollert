import axios from "axios";

const getUser = async () => {
    await axios.get('/api/users/user')
    .then(response =>console.log(response.data))
    .catch(err => console.log(err))
}

export {
    getUser
}