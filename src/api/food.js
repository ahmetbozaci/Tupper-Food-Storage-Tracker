import {baseURL} from '../config';
import {requestTimeout} from '../utils/network';
import {fetchStorage} from './asyncStorage';

export const fetchStorages = async () => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food/storages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData.message);
  }
  const resData = await response.json();
  return resData.data;
};

export const fetchAllFoods = async () => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData.message);
  }
  const resData = await response.json();
  return resData.data;
};

export const sortAllFoods = async ({sortBy}) => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food?sort=${sortBy}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    // console.log('error.sort.response', resData);
    throw new Error(resData.message);
  }
  const resData = await response.json();
  return resData.data;
};

export const fetchFoodsByStorage = async title => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food/storages/${title}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    // console.log('error.response', resData);
    throw new Error(resData.message);
  }
  const resData = await response.json();
  return resData.data;
};

export const sortStorageFoods = async ({title, sortBy}) => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food/storages/${title}?sort=${sortBy}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    // console.log('error.sort.response', resData);
    // console.log('title', title);
    throw new Error(resData.message);
  }
  const resData = await response.json();
  return resData.data;
};

export const addFood = async ({
  storageId,
  name,
  quantity,
  createdDate,
  expiryDate,
}) => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        storageId,
        name,
        quantity,
        createdDate,
        expiryDate,
      }),
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData);
  }
  const resData = await response.json();
  return resData.data;
};

export const updateFood = async ({
  id,
  storageId,
  name,
  quantity,
  expiryDate,
}) => {
  // console.log('id', id);
  // console.log('updates', {
  //   storageId,
  //   name,
  //   quantity,
  //   expiryDate,
  // });
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        storageId,
        name,
        quantity,
        expiryDate,
      }),
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData);
  }
  const resData = await response.json();
  return resData.data;
};

export const deleteFood = async id => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/food/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData);
  }
  const resData = await response.json();
  return resData.data;
};
