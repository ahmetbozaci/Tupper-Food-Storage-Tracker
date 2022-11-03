import {StyleSheet} from 'react-native';
import {fontSz, heightPercentage, widthPercentage} from '../../config';

import COLORS from '../../color';
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

export default styles;
