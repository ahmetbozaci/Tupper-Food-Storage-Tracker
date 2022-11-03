import React from 'react';
import FoodList from '../FoodList';
// import {useQuery} from '@tanstack/react-query';
// import {fetchFoodsByStorage} from '../../../api/food';

const Freezer: React.FC = () => {
  const title = 'Freezer';
  // const {data} = useQuery(['Freezer'], () => fetchFoodsByStorage(title), {
  //   enabled: true,
  //   retry: false,
  // });

  return <FoodList headerTitle={title} />;
};

export default Freezer;
