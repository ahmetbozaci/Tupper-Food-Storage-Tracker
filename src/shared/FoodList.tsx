import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {fontSz, heightPercentage, widthPercentage} from '../config';
import COLORS from '../color';
import moment from 'moment';
import AddIcon from '../../assets/svg/add.svg';
import Sort from '../../assets/svg/sort.svg';
import Arrow from '../../assets/svg/arrow-down.svg';
import FoodCard from './FoodCard';
import Food from '../interfaces/Food';

interface Props {
  headerTitle: string;
  data: any;
}

const sortData = ['alphabetically', 'expiry date'];

const FoodList: React.FC<Props> = ({data, headerTitle}) => {
  const [sortBy, setSortBy] = useState<string>(sortData[0]);
  const [sortDropVisible, setSortDropVisible] = useState<boolean>(false);
  /*
    expires soon: 3days,
    expires in a week: 7days,
    expires in a month: 30days
    not soon: >30days
  */

  const expireSoon: Food[] = [];
  // const expiresInAWeek = [];
  // const expiresInAMonth = [];
  const notSoon: Food[] = [];

  const now = moment();

  data?.map((item: any) => {
    const {expiry_date} = item;
    const value = moment(expiry_date).diff(now, 'days');
    if (value < 7) {
      expireSoon.push(item);
    } else {
      notSoon.push(item);
    }
  });

  const sortedData = [
    {
      title: 'Expires Soon',
      data: expireSoon,
    },
    {
      title: 'Not soon',
      data: notSoon,
    },
  ];

  const handleSortSelect = (value: string) => {
    setSortBy(value);
    setSortDropVisible(false);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerTitle}</Text>
        <AddIcon />
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
                onPress={() => handleSortSelect(value)}
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
        style={styles.sectionList}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={sortedData}
        keyExtractor={(item, index) => index + '123'}
        renderSectionHeader={({section: {title, data: sectionData}}) => (
          <View style={styles.sectionHeader}>
            <Text>{sectionData.length !== 0 ? title : ''}</Text>
          </View>
        )}
        renderItem={({item}) => {
          return <FoodCard item={item} />;
        }}
      />
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
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.3,
    elevation: 1,
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
});

export default FoodList;
