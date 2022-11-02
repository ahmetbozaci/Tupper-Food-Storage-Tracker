import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import {fontSz, heightPercentage, widthPercentage} from '../../config';
import COLORS from '../../color';
import Edit from '../../../assets/svg/edit-big.svg';
import Delete from '../../../assets/svg/trash-big.svg';
import Food from '../../interfaces/Food';
import {Calendar} from 'react-native-calendars';
import Calender from '../../../assets/svg/calender.svg';
import CustomButton from '../Button';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchStorages, updateFood} from '../../api/food';
import ArrowDown from '../../../assets/svg/arrow-down.svg';
import Minus from '../../../assets/svg/circle-minus.svg';
import Plus from '../../../assets/svg/circle-plus.svg';
import {showMessage} from 'react-native-flash-message';
import TrashModal from '../TrashModal';
import Donut from './donut';

interface Props {
  item: Food;
  color: string;
}

const FoodCard: React.FC<Props> = ({item, color}) => {
  const {name, createdDate, expiryDate, quantity, id, storageId} = item;
  const now = moment();
  const isYesterday =
    moment(now).diff(createdDate, 'days') === 1 ? true : false;

  const isExpired = moment(now).isAfter(expiryDate) ? true : false;

  let expiry_percentage: number;
  const daysSpent = moment(now).diff(createdDate, 'days');
  const remainingDays = moment(expiryDate).diff(now, 'days');
  const remainder = remainingDays < 1 ? 0 : remainingDays;
  if (daysSpent === 0 && remainder === 0) {
    expiry_percentage = 100;
  } else {
    expiry_percentage = (daysSpent / (daysSpent + remainder)) * 100;
  }
  // console.log({
  //   daysSpent: daysSpent,
  //   remainingDays: remainingDays,
  //   remainder: remainder,
  // });

  const [calendarVisible, setIsCalendarVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [trashModalVisible, setTrashModalVisible] = useState<boolean>(false);

  const {data: storageData} = useQuery(['storages'], () => fetchStorages(), {
    enabled: true,
    retry: true,
  });

  const storageLocation = storageData?.find(
    (storage: any) => storage.id === storageId,
  );

  const [foodItem, setFoodItem] = useState({
    name: '',
    quantity: 1,
    storage: 'Fridge',
    expiryDate: moment().format('YY/MM/DD').toLocaleString(),
  });

  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const handleLocationSelect = (title: string) => {
    setFoodItem(prevstate => {
      return {
        ...prevstate,
        storage: title,
      };
    });
    setLocationModalVisible(false);
  };

  const handleUnitControl = (option: string) => {
    if (option === '+') {
      setFoodItem(prevState => {
        return {
          ...prevState,
          quantity: prevState.quantity + 1,
        };
      });
    } else if (option === '-') {
      if (foodItem.quantity === 1) {
        return;
      }
      setFoodItem(prevState => {
        return {
          ...prevState,
          quantity: prevState.quantity - 1,
        };
      });
    }
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!calendarVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openEditModal = (itemId: string) => {
    setEditModalVisible(true);
    setFoodItem(() => {
      return {
        name: item.name,
        quantity: item.quantity,
        storage: storageLocation?.title,
        expiryDate: item.expiryDate,
      };
    });
  };

  const closeEditModal = () => {
    setIsCalendarVisible(false);
    setEditModalVisible(false);
    setFoodItem(() => {
      return {
        name: '',
        quantity: 1,
        storage: 'Fridge',
        expiryDate: moment().format('YY/MM/DD').toLocaleString(),
      };
    });
  };

  const queryClient = useQueryClient();
  const {mutate, isLoading} = useMutation(updateFood, {
    onMutate: async () => {
      // console.log(storageLocation?.title);
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['allfoods']);
      await queryClient.cancelQueries([`${storageLocation.title}`]);
      // await queryClient.cancelQueries(['Fridge']);
      // await queryClient.cancelQueries(['Freezer']);
      // await queryClient.cancelQueries(['Pantry']);
    },
    // If the mutation fails, use the context we returned above
    onError: () => {
      showMessage({
        message: 'Error',
        description: 'Edit food item failed',
        type: 'danger',
      });
    },
    onSuccess: () => {
      showMessage({
        message: 'Success',
        description: 'Food item updated',
        type: 'success',
      });
      closeEditModal();
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['allfoods']);
      queryClient.invalidateQueries([`${storageLocation.title}`]);
      // queryClient.invalidateQueries(['Fridge']);
      // queryClient.invalidateQueries(['Pantry']);
      // queryClient.invalidateQueries(['Freezer']);
    },
  });

  const handleSubmit = () => {
    const _storageId = storageData.find(
      (storage: any) => storage.title === foodItem.storage,
    ).id;
    mutate({
      id,
      storageId: _storageId,
      name: foodItem.name,
      quantity: foodItem.quantity,
      expiryDate: moment(foodItem.expiryDate).format('YYYY-MM-DD'),
    });
  };

  const openTrashModal = () => {
    setTrashModalVisible(true);
  };

  const closeTrashModal = () => {
    setTrashModalVisible(false);
  };

  const badgeColor =
    storageLocation?.title === 'Fridge'
      ? COLORS.primary
      : storageLocation?.title === 'Freezer'
      ? COLORS.freezer
      : storageLocation?.title === 'Pantry'
      ? COLORS.pantry
      : COLORS.black;

  const badgebackground =
    storageLocation?.title === 'Fridge'
      ? '#CFFFF4'
      : storageLocation?.title === 'Freezer'
      ? '#D6F3FF'
      : storageLocation?.title === 'Pantry'
      ? '#FFF1DD'
      : COLORS.white;

  return (
    <>
      <View style={styles.itemCard}>
        <View style={styles.details}>
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.name,
                {color: isExpired ? COLORS.red : COLORS.black},
              ]}>
              {name}
            </Text>
            <View
              style={[
                styles.locationBadge,
                {backgroundColor: badgebackground, borderColor: badgeColor},
              ]}>
              <Text style={[styles.locationBadgeText, {color: badgeColor}]}>
                {storageLocation?.title}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.itemLabel,
              {color: isExpired ? COLORS.red : COLORS.gray},
            ]}>
            Added:{' '}
            <Text
              style={[
                styles.value,
                {color: isExpired ? COLORS.red : COLORS.gray},
              ]}>
              {isYesterday
                ? 'Yesterday'
                : moment(createdDate).format('YY/MM/DD').toLocaleString()}
            </Text>
          </Text>
          {isExpired ? (
            <Text style={[styles.itemLabel, {color: COLORS.red}]}>Expired</Text>
          ) : (
            <Text
              style={[
                styles.itemLabel,
                {color: isExpired ? COLORS.red : COLORS.gray},
              ]}>
              Expires:{' '}
              <Text
                style={[
                  styles.value,
                  {color: isExpired ? COLORS.red : COLORS.gray},
                ]}>
                {moment(expiryDate).format('YY/MM/DD').toLocaleString()}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.action}>
          <View style={styles.row}>
            <View style={styles.qtyWrapper}>
              <Text style={styles.qty}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => openEditModal(id)}>
              <Edit />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openTrashModal()}>
              <Delete />
            </TouchableOpacity>
          </View>
          <Donut color={color} percentage={expiry_percentage} />
        </View>
      </View>

      {/* Edit food item modal */}
      <View>
        <Modal transparent visible={editModalVisible} animationType="slide">
          <TouchableWithoutFeedback
            disabled={isLoading}
            onPress={() => {
              closeEditModal();
              // onRequestClose();
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.calendarView}>
                {calendarVisible && (
                  <Calendar
                    style={styles.calendar}
                    hideExtraDays={true}
                    // hideDayNames={true}
                    minDate={moment().toLocaleString()}
                    disableAllTouchEventsForDisabledDays={true}
                    onDayPress={day => {
                      setFoodItem(prevState => {
                        return {
                          ...prevState,
                          expiryDate: day.dateString,
                        };
                      });
                      setIsCalendarVisible(false);
                    }}
                  />
                )}
              </View>
              <TouchableWithoutFeedback>
                <View style={[styles.modalContent]}>
                  <Text style={styles.modalheaderTitle}>
                    What would you like to edit?
                  </Text>
                  <TextInput
                    value={foodItem.name}
                    onChangeText={text =>
                      setFoodItem(prevState => {
                        return {
                          ...prevState,
                          name: text,
                        };
                      })
                    }
                    style={[styles.itemInput, styles.inputText]}
                    placeholder="Type Item"
                    placeholderTextColor={COLORS.gray8}
                  />
                  <View style={styles.spacedRow}>
                    <View>
                      <Text style={styles.label}>Storage Location</Text>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          setLocationModalVisible(!locationModalVisible)
                        }>
                        <View style={styles.select}>
                          <Text style={styles.selectText}>
                            {foodItem.storage}
                          </Text>
                          <ArrowDown />
                        </View>
                      </TouchableWithoutFeedback>
                      {locationModalVisible && (
                        <View style={styles.locationDrop}>
                          {storageData?.map((storage: any) => {
                            const {id: _storageId, title} = storage;
                            const isLast = storageId === '3' ? true : false;
                            return (
                              <TouchableOpacity
                                key={_storageId}
                                onPress={() => handleLocationSelect(title)}
                                style={[
                                  styles.storageLocation,
                                  // eslint-disable-next-line react-native/no-inline-styles
                                  {borderBottomWidth: !isLast ? 0.5 : 0},
                                ]}>
                                <Text style={styles.selectText}>{title}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      )}
                    </View>
                    <View style={styles.alignView}>
                      <Text style={styles.label}>Quantity</Text>
                      <View style={styles.unitControl}>
                        <TouchableOpacity
                          disabled={foodItem.quantity === 1 ? true : false}
                          onPress={() => handleUnitControl('-')}>
                          <Minus />
                        </TouchableOpacity>
                        <Text style={styles.unit}>{foodItem.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => handleUnitControl('+')}>
                          <Plus />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.spacedRow, styles.flexEnd]}>
                    <TouchableWithoutFeedback onPress={() => toggleCalendar()}>
                      <View style={styles.dateView}>
                        <Text style={styles.label}>Expiration Date</Text>
                        <View style={styles.select}>
                          <Text style={styles.selectText}>
                            {foodItem.expiryDate}
                          </Text>
                          <Calender />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <CustomButton
                      buttonStyle={[styles.btn]}
                      buttonTextStyle={styles.btnText}
                      buttonText="Save"
                      onPress={() => handleSubmit()}
                      loading={isLoading}
                      disabled={foodItem.name === '' ? true : false}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      {/* Trash Modal */}
      <TrashModal
        visible={trashModalVisible}
        close={closeTrashModal}
        item={item}
      />
    </>
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
    height: heightPercentage(90),
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
    width: widthPercentage(85),
  },
  qtyWrapper: {
    width: widthPercentage(18),
    height: heightPercentage(18),
    borderRadius: 4,
    borderColor: COLORS.purple,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qty: {
    fontWeight: '600',
    fontSize: fontSz(10),
    color: COLORS.purple,
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

export default FoodCard;
