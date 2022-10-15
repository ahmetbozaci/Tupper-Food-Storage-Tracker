import React from 'react';

import DATA from '../../../../assets/mock/data';
import FoodList from '../../../shared/FoodList';

const Fridge: React.FC = () => {
  const data = DATA.storages.find(storage => storage.title === 'Fridge')?.items;
  return <FoodList headerTitle="Fridge" data={data} />;
};

export default Fridge;
