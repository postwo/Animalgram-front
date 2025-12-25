import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { store } from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  // Provider로 전체 앱을 감싸서 모든 컴포넌트에서 Redux store에 접근 가능하게 함
  <Provider store={store}>
    <App />
  </Provider>
);
