import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
    baseURL: 'http://api.themoviedb.org/3',
    params :{
        api_key: 'd52bf989a4c04f4e52516758475641ef',
        language : 'ko-KR',
    }
})

export default instance;