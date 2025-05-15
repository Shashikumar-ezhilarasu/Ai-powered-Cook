'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dietary_preferences: string[];
  created_at: Date;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    dietary_preferences: [] as string[],
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(usersData);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        ...newUser,
        created_at: new Date(),
      });
      
      setNewUser({
        name: '',
        email: '',
        phone: '',
        dietary_preferences: [],
      });
      
      toast.success('User added successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error adding user');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      
      {/* Add User Form */}
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Dietary Preferences</label>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map((preference) => (
                <label key={preference} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newUser.dietary_preferences.includes(preference)}
                    onChange={(e) => {
                      const newPreferences = e.target.checked
                        ? [...newUser.dietary_preferences, preference]
                        : newUser.dietary_preferences.filter(p => p !== preference);
                      setNewUser({ ...newUser, dietary_preferences: newPreferences });
                    }}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>{preference}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Add User
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
        {users.map((user) => (
          <div key={user.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600 mt-2">Email: {user.email}</p>
                <p className="text-gray-600 mt-2">Phone: {user.phone}</p>
                <p className="text-gray-600 mt-2">
                  Dietary Preferences: {user.dietary_preferences.join(', ')}
                </p>
                <p className="text-gray-600 mt-2">
                  Joined: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 