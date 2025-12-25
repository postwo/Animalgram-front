import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'; // 경로만 맞으면 import명은 내마음대로 수정 가능

export const store = configureStore({
  reducer: {
    // 'user'라는 이름으로 userReducer를 등록
    // 이제 state.user로 UserSlice의 상태에 접근 가능
    user: userReducer,
  },
});
