import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SectionList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontSz, heightPercentage, widthPercentage} from '../config';
import COLORS from '../color';
// import AddIcon from '../../assets/svg/add.svg';
import Sort from '../../assets/svg/sort.svg';
import Arrow from '../../assets/svg/arrow-down.svg';
import FoodCard from './FoodCard';
// import Food from '../interfaces/Food';
// import {RootState, useAppSelector} from '../features/store';
import {useQuery} from '@tanstack/react-query';
import {sortStorageFoods, sortAllFoods} from '../api/food';

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
        {/* <AddIcon /> */}
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
                  // eslint-disable-next-line react-native/no-inline-styles
                  {borderBottomWidth: !isLast ? 0.5 : 0},
                ]}>
                <Text style={styles.label}>{value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <SectionList
        contentContainerStyle={styles.sectionList}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={DATA}
        keyExtractor={(item, index) => index + '123'}
        renderSectionHeader={({section: {title: sectionTitle, data}}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              {data.length !== 0 ? sectionTitle : ''}
            </Text>
          </View>
        )}
        renderItem={({item, index, section}) => {
          const {title: _sectionTitle} = section;
          const color =
            _sectionTitle === 'Expired'
              ? COLORS.red
              : _sectionTitle === 'Expires soon'
              ? COLORS.red
              : _sectionTitle === 'Expires in a week'
              ? COLORS.yellow
              : COLORS.lightGreen;
          return <FoodCard item={item} color={color} />;
        }}
      />
      {/* <FlatList
        contentContainerStyle={styles.sectionList}
        showsVerticalScrollIndicator={false}
        // style={{backgroundColor: 'white'}}
        data={DATA}
        keyExtractor={(item, index) => index + '123'}
        renderItem={({item}) => {
          return <FoodCard item={item} />;
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: heightPercentage(21),
    paddingHorizontal: widthPercentage(33),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: fontSz(32),
    color: COLORS.black,
    marginRight: widthPercentage(5),
  },
  sortView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(4),
  },
  label: {
    fontWeight: '400',
    fontSize: fontSz(14),
    color: COLORS.gray7,
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingVertical: heightPercentage(3),
    paddingHorizontal: widthPercentage(10),
    marginLeft: widthPercentage(4),
    width: widthPercentage(120),
  },
  sortDrop: {
    alignSelf: 'flex-end',
    width: widthPercentage(120),
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 1,
    marginBottom: 6,
  },
  storageLocation: {
    paddingVertical: 6,
    borderColor: COLORS.gray7,
    paddingHorizontal: widthPercentage(10),
  },
  sectionList: {
    padding: 2,
    backgroundColor: COLORS.white,
  },
  sectionHeader: {
    marginTop: heightPercentage(11),
  },
  sectionHeaderText: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: fontSz(12),
  },
});

export default FoodList;
