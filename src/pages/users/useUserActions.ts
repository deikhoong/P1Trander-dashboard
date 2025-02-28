import { useState, useCallback } from 'react';
import { message } from 'antd';
import { UpdateUserRequest, UserInfo } from '../../api/api.types';
import { DeleteUser, GetUser, UpdateUser } from '../../api/users';

export function useUserActions(userId: string | undefined) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await GetUser(userId);
      setUser(response.data);
    } catch (err) {
      setError('Failed to fetch user data.');
      message.error('Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateUser = useCallback(async (updatedData: UpdateUserRequest) => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      await UpdateUser(userId, updatedData);
      setUser(prevUser => ({ ...prevUser, ...updatedData } as UserInfo));
      message.success('Update successfully');
    } catch (err) {
      setError('Update failed, please try again later.');
      message.error('Update failed, please try again later.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const deleteUser = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      await DeleteUser(userId);
      message.success('Delete successfully');
    } catch (err) {
      setError('Delete failed, please try again later.');
      message.error('Delete failed, please try again later.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { user, loading, error, fetchUser, updateUser, deleteUser };
}