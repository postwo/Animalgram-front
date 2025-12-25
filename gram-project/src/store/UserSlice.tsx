import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode'; // 인터페이스는 type을 붙여줘야 한다

// JWT 토큰에서 추출할 데이터의 타입 정의
interface CustomJwtPayload extends JwtPayload {
  role?: string; // 사용자 역할 (admin, user 등)
  // sub는 JwtPayload에 이미 정의되어 있음 (보통 사용자 이메일이나 ID)
}

// Redux 스토어에 저장될 사용자 상태의 타입
interface UserState {
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

// 초기 상태 - 앱이 시작될 때의 기본값
const initialState: UserState = {
  email: null,
  role: null,
  isAuthenticated: false, // 처음엔 로그인 안 된 상태
};

// Slice 생성 - 상태와 reducer를 한 곳에서 관리
const userSlice = createSlice({
  name: 'user', // 이 slice의 이름
  initialState,
  reducers: {
    // ===== Reducer 1: 토큰으로 사용자 정보 설정 =====
    setUserFromToken(state, action: PayloadAction<string>) {
      const token = action.payload; // action으로 전달받은 JWT 토큰
      try {
        // JWT 토큰을 디코딩하여 페이로드 추출
        const decoded = jwtDecode<CustomJwtPayload>(token);

        // 디코딩된 정보로 상태 업데이트
        state.email = decoded.sub || null; // sub 필드에서 이메일 추출
        state.role = decoded.role || null; // role 필드에서 역할 추출
        state.isAuthenticated = true; // 로그인 상태로 변경
      } catch {
        // 토큰이 유효하지 않거나 디코딩 실패 시
        state.email = null;
        state.role = null;
        state.isAuthenticated = false;
      }
    },
    // ===== Reducer 2: 로그아웃 =====
    logout(state) {
      Cookies.remove('accessToken'); // 쿠키에서 토큰 삭제

      // 상태를 초기값으로 리셋
      state.email = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

// Actions를 export (컴포넌트에서 사용)
export const { setUserFromToken, logout } = userSlice.actions;

// Reducer를 export (store에 등록용)
export default userSlice.reducer;
