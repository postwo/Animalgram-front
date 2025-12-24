import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  // 백엔드로 보내는 데이터 필드
  const [email, setEmail] = useState<string>('');
  const [memberName, setMembername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate(); // 페이지이동 할때 사용

  // e 는 제출(Submit) 이벤트 가 발생하면 그 자체에 대한 정보를 담는다
  // 쉽게 말하면 "버튼이 눌렸다!"는 신호
  const handleSignup = async (e: any) => {
    e.preventDefault(); // 패아자거 새로고침 되는걸 막아준다
    try {
      await axios.post('http://localhost:8080/api/member/register', {
        email, // 이것들은 위에 useState에 선언한걸 가져와서 사용하는거다
        memberName,
        password,
      });
      alert('회원가입 성공!');
      navigate('/login'); // 로그인으로 페이지 이동
    } catch (err: any) {
      const errorData = err.response?.data;
      const errorMessage =
        errorData?.result?.description || // Api 구조인 경우
        errorData?.message || // 일반적인 Spring 에러 구조인 경우
        JSON.stringify(errorData) || // 구조를 모를 때 전체 출력
        err.message; // 응답이 없을 때

      alert('회원가입 실패: ' + errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="이름"
          value={memberName}
          onChange={(e) => setMembername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignupPage;
