import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  // useLocation 훅을 사용하여 현재 브라우저의 URL 경로 정보를 가져옵니다
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* 로고 영역 */}
      <div className="navbar-logo">MyApp</div>
      <div className="navbar-links">
        {/*location.pathname === "/login" ? "active" : ""
          해석: "지금 주소가 /login이면 클래스 이름을 active로 하고, 아니면 비워둬라."
          CSS 파일에서 .active { color: blue; } 처럼 설정해두면, 현재 머물고 있는 메뉴만 파란색으로 변하게 됩니다. */}
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">
          홈
        </Link>
        <Link
          className={location.pathname === '/login' ? 'active' : ''}
          to="/login"
        >
          로그인
        </Link>
        <Link
          className={location.pathname === '/signup' ? 'active' : ''}
          to="/signup"
        >
          회원가입
        </Link>
        <Link
          className={location.pathname === '/admin' ? 'active' : ''}
          to="/admin"
        >
          관리자
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
