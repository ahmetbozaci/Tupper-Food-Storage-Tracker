import React from 'react';
import FoodList from '../FoodList';
// import {useQuery} from '@tanstack/react-query';
// import {fetchFoodsByStorage} from '../../../api/food';

const Pantry: React.FC = () => {
  const title = 'Pantry';
  // const {data} = useQuery(['Pantry'], () => fetchFoodsByStorage(title), {
  //   enabled: true,
  //   retry: false,
  // });

  return <FoodList headerTitle={title} />;
};

export default Pantry;
