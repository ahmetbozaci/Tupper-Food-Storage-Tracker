import React from 'react';

import DATA from '../../../../assets/mock/data';
import FoodList from '../../../shared/FoodList';

const Freezer: React.FC = () => {
  const data = DATA.storages.find(
    storage => storage.title === 'Freezer',
  )?.items;
  return <FoodList headerTitle="Freezer" data={data} />;
};

export default Freezer;
