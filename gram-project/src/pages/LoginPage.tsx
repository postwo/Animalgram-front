import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: any) => {
    e.preventDefault(); // 패아자거 새로고침 되는걸 막아준다
    try {
      const res = await axios.post(
        'http://localhost:8080/api/member/login',
        { email, password },
        // 로그인 할때 서버에서 쿠키값을 가져와서 저장하고
        /*이후 다른 API 요청 (withCredentials 를 true로 하면 쿠키 자동 전송)
        axios.get('/user/profile', { withCredentials: true }) */
        //서버가 Set-Cookie 헤더로 보내는 쿠키인 refreshtoken을 저장한다
        { withCredentials: true } // HttpOnly 쿠키 포함 ,쿠키를 포함한 인증 정보를 서버와 주고받을 수 있게 해주는 옵션
      );
      // 서버에서 받아온 accesstoken을 저장
      Cookies.set('accessToken', res.data.body.accessToken, {
        expires: 0.021, // 30분
        path: '/', //이 쿠키가 모든 경로에서 접근 가능하다는 의미
      });
      //   console.log('서버 응답 데이터:', res.data);
      //   alert('로그인 성공! Access Token: ' + res.data.body.accessToken);
    } catch (err: any) {
      const errorData = err.response?.data;
      const errorMessage =
        errorData?.result?.description || // Api 구조인 경우
        errorData?.message || // 일반적인 Spring 에러 구조인 경우
        JSON.stringify(errorData) || // 구조를 모를 때 전체 출력
        err.message; // 응답이 없을 때

      alert('로그인 실패: ' + errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
