import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'; // 경로만 맞으면 import명은 내마음대로 수정 가능

export const store = configureStore({
  reducer: {
    // 'user'라는 이름으로 userReducer를 등록
    // 이제 state.user로 UserSlice의 상태에 접근 가능
    user: userReducer,
  },
});

// 용도:Redux store에 저장된 전체 상태의 구조를 TypeScript 타입으로 정의
export type RootState = ReturnType<typeof store.getState>; // 전체 Redux 상태의 타입
/*/
     위 코드는 다음과 같음:
    type RootState = {
    user: UserState
    }
    
    이걸 한 번더 풀어보면
    type RootState = {
        user: {
            email: string | null;
            role: string | null;
            isAuthenticated: boolean;
        }
    }


    그리고 
      const { role, isAuthenticated } = useSelector(
    (state: RootState) => state.user
    );    

    여기서 이거를 
 */
