import {StyleSheet} from 'react-native';
import {fontSz, heightPercentage, widthPercentage} from '../../config';
import COLORS from '../../color';
const styles = StyleSheet.create({
  itemCard: {
    marginVertical: heightPercentage(10),
    marginHorizontal: widthPercentage(5),
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: widthPercentage(7),
    // paddingHorizontal: widthPercentage(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
<<<<<<< HEAD
    shadowColor: 'rgba(0, 0, 0, 1)',
=======
    height: heightPercentage(125),
    shadowColor: 'rgba(12, 104, 128, 1)',
>>>>>>> b4182e1161b2d3d145cf6d25f89890f56b852c49
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 15,
  },
  details: {
    justifyContent: 'center',
    paddingLeft: widthPercentage(15),
  },
  cardHeader: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: '600',
    fontSize: fontSz(16),
    marginBottom: heightPercentage(4),
  },
  itemLabel: {
    fontWeight: '500',
    fontSize: fontSz(10),
  },
  value: {
    fontWeight: '300',
    fontSize: fontSz(10),
  },
  action: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
<<<<<<< HEAD
    width: widthPercentage(85),
    marginBottom: heightPercentage(16),
=======
>>>>>>> b4182e1161b2d3d145cf6d25f89890f56b852c49
  },
  qtyWrapper: {
    borderRadius: 4,
    borderColor: COLORS.purple,
    borderWidth: 1.5,
  },
  qty: {
    fontWeight: '600',
    fontSize: fontSz(15),
    color: COLORS.purple,
    paddingHorizontal: 4.5,
    paddingVertical: 1.5,
  },
  editIcon: {
    marginLeft: 10,
    marginRight: 4,
  },

  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercentage(82),
    paddingTop: heightPercentage(70),
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingTop: heightPercentage(22),
    paddingBottom: heightPercentage(40),
    paddingHorizontal: widthPercentage(27),
    width: '94%',
  },
  modalheaderTitle: {
    fontWeight: '600',
    fontSize: fontSz(20),
    color: COLORS.primary,
    marginBottom: heightPercentage(10),
  },
  itemInput: {
    borderWidth: 1,
    borderColor: COLORS.gray7,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    paddingVertical: heightPercentage(10),
    paddingHorizontal: widthPercentage(15),
    marginBottom: heightPercentage(30),
  },
  inputText: {
    fontWeight: '500',
    fontSize: fontSz(16),
    color: COLORS.gray7,
  },
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '400',
    fontSize: fontSz(16),
    color: COLORS.black,
    marginBottom: heightPercentage(10),
  },
  select: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray7,
    borderRadius: 7,
    paddingVertical: heightPercentage(6),
    paddingHorizontal: widthPercentage(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: widthPercentage(134),
  },
  alignView: {
    alignItems: 'center',
  },
  unit: {
    fontWeight: '700',
    fontSize: fontSz(30),
    color: COLORS.black,
  },
  unitControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: widthPercentage(95),
  },
  dateView: {
    marginTop: heightPercentage(25),
  },
  locationDrop: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
    zIndex: 2,
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
  selectText: {
    fontWeight: '500',
    fontSize: fontSz(14),
    color: COLORS.black,
  },
  btn: {
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(46),
    // height: heightPercentage(50),
  },
  btnText: {
    fontWeight: '500',
    fontSize: fontSz(16),
  },
  calendarView: {
    width: '94%',
  },
  calendar: {
    borderRadius: 13,
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  locationBadge: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentage(44),
    height: heightPercentage(18),
    marginLeft: widthPercentage(4),
  },
  locationBadgeText: {
    fontWeight: '500',
    fontSize: fontSz(10),
  },
  // trashModalContainer: {
  //   backgroundColor: 'rgba(0,0,0,0.25)',
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: heightPercentage(82),
  //   paddingTop: heightPercentage(70),
  // },
  // trashModalContent: {
  //   backgroundColor: COLORS.white,
  //   borderRadius: 16,
  //   // borderTopRightRadius: 16,
  //   // borderTopLeftRadius: 16,
  //   paddingTop: heightPercentage(22),
  //   paddingBottom: heightPercentage(40),
  //   paddingHorizontal: widthPercentage(27),
  //   width: '94%',
  // },
});

export default styles;
