import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import type { RootState } from '../store';

function Navbar() {
  // useLocation 훅을 사용하여 현재 브라우저의 URL 경로 정보를 가져옵니다
  const location = useLocation();

  // ⭐ useSelector에 RootState 타입 명시
  const { role, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <div className="navbar-links">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">
          홈
        </Link>
        {isAuthenticated ? (
          <>{role === 'ADMIN' && <Link to="/admin">관리자</Link>}</>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
