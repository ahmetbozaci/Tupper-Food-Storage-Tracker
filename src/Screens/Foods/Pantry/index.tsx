import React from 'react';
import DATA from '../../../../assets/mock/data';
import FoodList from '../../../shared/FoodList';

const Pantry: React.FC = () => {
  const data = DATA.storages.find(storage => storage.title === 'Pantry')?.items;
  return <FoodList headerTitle="Pantry" data={data} />;
};

export default Pantry;
