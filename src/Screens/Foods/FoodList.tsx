/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Sort from '../../../assets/svg/sort.svg';
import Arrow from '../../../assets/svg/arrow-down.svg';
import FoodCard from '../../shared/FoodCard';

import {useQuery} from '@tanstack/react-query';
import {sortStorageFoods, sortAllFoods} from '../../api/food';

import styles from './styles';
import {widthPercentage} from '../../config';

interface Props {
  headerTitle: string;
  data?: any;
}

const sortData = ['alphabetically', 'expiry date'];

const FoodList: React.FC<Props> = ({headerTitle}) => {
  const [sortBy, setSortBy] = useState<string>(sortData[0]);
  const [sortDropVisible, setSortDropVisible] = useState<boolean>(false);

  const queryKey = headerTitle === 'All Food' ? null : headerTitle;
  const title = headerTitle === 'All Food' ? null : headerTitle;
  const sortValue = sortBy === 'expiry date' ? 'expiry_date' : sortBy;

  const {data: storageSort, refetch: storageSortRefetch} = useQuery(
    [queryKey],
    () => sortStorageFoods({title, sortBy: sortValue}),
    {
      enabled: true,
      retry: false,
    },
  );

  useEffect(() => {
    storageSortRefetch();
  }, [sortBy, storageSortRefetch]);

  const {data: allFoodSort, refetch: allFoodSortRefetch} = useQuery(
    ['allfoods'],
    () => sortAllFoods({sortBy: sortValue}),
    {
      enabled: true,
      retry: false,
    },
  );

  useEffect(() => {
    allFoodSortRefetch();
  }, [allFoodSortRefetch, sortBy]);

  const DATA = headerTitle === 'All Food' ? allFoodSort : storageSort;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
      <View style={styles.sortView}>
        <Text style={[styles.label, {marginRight: widthPercentage(4)}]}>
          sort
        </Text>
        <Sort />
        <TouchableWithoutFeedback
          onPress={() => setSortDropVisible(!sortDropVisible)}>
          <View style={styles.select}>
            <Text style={styles.label}>{sortBy}</Text>
            <Arrow />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {sortDropVisible && (
        <View style={styles.sortDrop}>
          {sortData.map((value, index) => {
            const isLast = index === sortData.length - 1 ? true : false;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSortBy(value);
                  setSortDropVisible(false);
                }}
                style={[
                  styles.storageLocation,
                  {borderBottomWidth: !isLast ? 0.5 : 0},
                ]}>
                <Text style={styles.label}>{value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <FlatList
        contentContainerStyle={styles.sectionList}
        showsVerticalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item, index) => index + '123'}
        renderItem={({item}) => {
          return <FoodCard item={item} color="red" />;
        }}
      />
    </View>
  );
};

export default FoodList;
