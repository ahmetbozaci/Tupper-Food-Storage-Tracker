import React from 'react';
import DATA from '../../../../assets/mock/data';
import FoodList from '../../../shared/FoodList';
import Food from '../../../interfaces/Food';

const All: React.FC = () => {
  const AllFoods: Food[] = [];
  DATA.storages.map(storage => storage.items.map(item => AllFoods.push(item)));
  return <FoodList headerTitle="All Food" data={AllFoods} />;
};

export default All;
