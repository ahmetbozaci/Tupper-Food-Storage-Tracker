import React from 'react';
import FoodList from '../FoodList';
// import {useQuery} from '@tanstack/react-query';
// import {fetchFoodsByStorage} from '../../../api/food';

const Fridge: React.FC = () => {
  const title = 'Fridge';
  // const {data} = useQuery(['Fridge'], () => fetchFoodsByStorage(title), {
  //   enabled: true,
  //   retry: false,
  // });

  return <FoodList headerTitle={title} />;
};

export default Fridge;
