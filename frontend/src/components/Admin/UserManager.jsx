import React, { useEffect, useState } from 'react';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '',
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error('Lỗi khi tải dữ liệu:', err);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;

        try {
            await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
            });
            fetchUsers(); // Cập nhật lại danh sách
        } catch (err) {
            console.error('Lỗi khi xóa:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            console.error('Lỗi khi cập nhật:', err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Danh sách người dùng</h2>
            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Tên</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Address</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="text-center">
                            <td className="p-2 border">{user.id}</td>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">{user.phone}</td>
                            <td className="p-2 border">{user.address}</td>
                            <td className="p-2 border">{user.role}</td>
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="px-2 py-1 bg-yellow-400 text-white rounded"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form sửa */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                        <h3 className="text-lg font-semibold mb-4">Chỉnh sửa người dùng</h3>
                        <div className="space-y-3">
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tên"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Địa chỉ"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Role"
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManager;
