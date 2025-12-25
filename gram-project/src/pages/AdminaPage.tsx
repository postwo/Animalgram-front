import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // 인스턴스 import

// 사용자 데이터 타입 정의 (백엔드 응답에 맞춰 수정 필요)
interface User {
  id: number;
  userName: string; // 백엔드 DTO 필드명 확인 필요 (username vs userName)
  email: string;
  role: string;
}

function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/api/admin/users');
      setUsers(res.data.body); // 사용자 목록 상태에 저장
    } catch (err) {
      console.error('사용자 목록 불러오기 실패:', err);
      alert('사용자 정보를 불러오는 데 실패했습니다.');
      navigate('/'); // 기본페이지로 이동
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="home">
      <h2>Admin 페이지입니다!</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.userName}({user.email}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
