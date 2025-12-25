import axios from 'axios';
import Cookies from 'js-cookie';

//이 코드는 모든 API 요청에 자동으로 토큰을 붙여주는 도우미
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 모든 요청의 기본 URL (앞에 자동으로 붙음)
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버와 주고받을 수 있게 함 , 쿠키도 함께 전송 (refresh token용)
});

// 요청 인터셉터 - 모든 API 요청이 서버로 가기 "전에" 자동으로 실행됨
axiosInstance.interceptors.request.use(
  (config) => {
    // 쿠키에서 accessToken을 가져옴
    const token = Cookies.get('accessToken');
    if (token) {
      // 요청 헤더에 "Authorization: Bearer 토큰값" 형태로 자동 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 수정된 설정을 반환 (이제 서버로 전송됨)
    return config;
  },
  // 요청 설정 중 에러가 발생하면 실행됨
  (error) => Promise.reject(error)
);

export default axiosInstance;

/*
ex) axiosInstance.get('/api/user'); 이렇게 다른데에서 요청하면
 * 실제로는 이렇게 됨
axios.get('http://localhost:8080/api/user', { withCredentials: true });

ex) axiosInstance.get('/api/user'); 내가 이렇게 쓰면
 * 인터셉터가 자동으로 이렇게 바꿔줌
axiosInstance.get('/api/user', {
  headers: {
    Authorization: 'Bearer eyJhbGci...'
  }
});
*/
