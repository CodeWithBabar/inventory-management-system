import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosClient from '../api/axiosClient';

export default function useCrud(endpoint) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async ({ page = 1, pageSize = 10, search = '', filters = {} } = {}) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(endpoint, { params: { page, pageSize, search, ...filters } });
      setItems(data.items || data.data || []);
      setPagination({ page: data.page || page, pageSize: data.pageSize || pageSize, total: data.total || 0 });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load records.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const fetchOne = async (id) => {
    const { data } = await axiosClient.get(`${endpoint}/${id}`);
    return data.item || data.data || data;
  };

  const createItem = async (payload) => {
    await axiosClient.post(endpoint, payload);
    toast.success('Record created successfully.');
  };

  const updateItem = async (id, payload) => {
    await axiosClient.put(`${endpoint}/${id}`, payload);
    toast.success('Record updated successfully.');
  };

  const deleteItem = async (id) => {
    await axiosClient.delete(`${endpoint}/${id}`);
    toast.success('Record deleted successfully.');
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, pagination, loading, fetchItems, fetchOne, createItem, updateItem, deleteItem };
}
