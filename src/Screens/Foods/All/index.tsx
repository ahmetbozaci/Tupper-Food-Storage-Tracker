import React from 'react';
import FoodList from '../../../shared/FoodList';
import {useQuery} from '@tanstack/react-query';
import {fetchAllFoods} from '../../../api/food';

const All: React.FC = () => {
  const {data} = useQuery(['allfoods'], () => fetchAllFoods(), {
    enabled: true,
    retry: false,
  });
  return <FoodList headerTitle="All Food" data={data} />;
};

export default All;
