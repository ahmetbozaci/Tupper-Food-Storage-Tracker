import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import {fontSz, heightPercentage, widthPercentage} from '../config';
import COLORS from '../color';
import Progress from '../../assets/svg/progress.svg';
import Edit from '../../assets/svg/edit.svg';
import Delete from '../../assets/svg/delete.svg';
import Food from '../interfaces/Food';

interface Props {
  item: Food;
}

const FoodCard: React.FC<Props> = ({item}) => {
  const {name, createdDate, expiryDate, quantity} = item;
  const now = moment();
  const isYesterday =
    moment(now).diff(createdDate, 'days') === 1 ? true : false;
  return (
    <View style={styles.itemCard}>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.itemLabel}>
          Added:{' '}
          <Text style={styles.value}>
            {isYesterday ? 'Yesterday' : createdDate}
          </Text>
        </Text>
        <Text style={styles.itemLabel}>
          Expires: <Text style={styles.value}>{expiryDate}</Text>
        </Text>
      </View>
      <View style={styles.action}>
        <View style={styles.row}>
          <View style={styles.qtyWrapper}>
            <Text style={styles.qty}>{quantity}</Text>
          </View>
          <TouchableOpacity>
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity>
            <Delete />
          </TouchableOpacity>
        </View>
        <Progress />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    marginVertical: heightPercentage(10),
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: widthPercentage(7),
    paddingLeft: widthPercentage(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heightPercentage(80),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 10,
  },
  details: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: fontSz(16),
    color: COLORS.black,
    marginBottom: heightPercentage(4),
  },
  itemLabel: {
    fontWeight: '500',
    fontSize: fontSz(10),
    color: '#9F9F9F',
  },
  value: {
    fontWeight: '300',
    fontSize: fontSz(10),
    color: '#9F9F9F',
  },
  action: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPercentage(75),
  },
  qtyWrapper: {
    width: widthPercentage(18),
    height: heightPercentage(18),
    borderRadius: 9,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qty: {
    fontWeight: '500',
    fontSize: fontSz(10),
    color: COLORS.black,
  },
});

export default FoodCard;
