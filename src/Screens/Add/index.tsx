import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../color';
import {fontSz, heightPercentage, widthPercentage} from '../../config';
import ArrowDown from '../../../assets/svg/arrow-down.svg';
import Plus from '../../../assets/svg/circle-plus.svg';
import Minus from '../../../assets/svg/circle-minus.svg';
import Calender from '../../../assets/svg/calender.svg';
import CustomButton from '../../shared/Button';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {addFood, fetchStorages} from '../../api/food';
import {showMessage} from 'react-native-flash-message';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

const Add: React.FC<Props> = ({visible, onRequestClose}) => {
  const [calendarVisible, setIsCalendarVisible] = useState(false);

  const {data: storageData} = useQuery(['storages'], () => fetchStorages(), {
    enabled: true,
    retry: true,
  });

  const [foodItem, setFoodItem] = useState({
    name: '',
    quantity: 1,
    storage: 'Fridge',
    expiryDate: moment().format('YYYY-MM-DD').toLocaleString(),
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

  const queryClient = useQueryClient();
  const {mutate, isLoading} = useMutation(addFood, {
    onMutate: async newFood => {
      const newToAdd = {
        name: newFood.name,
        quantity: newFood.quantity,
        createdDate: newFood.createdDate,
        expiryDate: newFood.expiryDate,
      };
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([`${foodItem.storage}`]);
      await queryClient.cancelQueries(['allfoods']);
      await queryClient.cancelQueries(['storages']);

      // Snapshot the previous value
      const previousFoods = queryClient.getQueryData([`${foodItem.storage}`]);

      // Optimistically update to the new value
      queryClient.setQueryData([`${foodItem.storage}`], (old: any) => [
        newToAdd,
        ...old,
      ]);

      // Return a context object with the snapshotted value
      return {previousFoods};
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, newFood, context) => {
      queryClient.setQueryData([`${foodItem.storage}`], context?.previousFoods);
      showMessage({
        message: 'Error',
        description: 'unable to add item',
        type: 'danger',
      });
    },
    onSuccess: () => {
      setFoodItem(() => {
        return {
          name: '',
          quantity: 1,
          storage: 'Fridge',
          expiryDate: moment().format('YYYY-MM-DD').toLocaleString(),
        };
      });
      onRequestClose();
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([`${foodItem.storage}`]);
      queryClient.invalidateQueries(['allfoods']);
      queryClient.invalidateQueries(['storages']);
    },
  });

  const handleSubmit = () => {
    const storageId = storageData.find(
      (storage: any) => storage.title === foodItem.storage,
    ).id;
    mutate({
      storageId,
      name: foodItem.name,
      quantity: foodItem.quantity,
      expiryDate: moment(foodItem.expiryDate).format('YYYY-MM-DD'),
      createdDate: moment().format('YYYY-MM-DD'),
    });
  };

  return (
    <View>
      <Modal transparent visible={visible} animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => {
            setIsCalendarVisible(false);
            onRequestClose();
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
                  What would you like to add?
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
                          const {id, title} = storage;
                          const isLast = id === '3' ? true : false;
                          return (
                            <TouchableOpacity
                              key={id}
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
                      <TouchableOpacity onPress={() => handleUnitControl('+')}>
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
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
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
});

export default Add;
