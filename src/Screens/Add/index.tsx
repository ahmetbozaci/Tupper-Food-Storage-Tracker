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
import DATA from '../../../assets/mock/data';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

const Add: React.FC<Props> = ({visible, onRequestClose}) => {
  // const [itemName, setItemName] = useState<string>('');
  const [unit, setUnit] = useState<number>(1);

  const locationData = DATA.storages;
  const [storageLocation, setStorageLocation] = useState<string>(
    locationData[0].title,
  );
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);

  const handleLocationSelect = (id: string) => {
    const selectedLocation = locationData.find(l => l.id === id)?.title;
    setStorageLocation(selectedLocation);
    setLocationModalVisible(false);
  };

  const handleUnitControl = (option: string) => {
    if (option === '+') {
      setUnit(unit + 1);
    } else if (option === '-') {
      if (unit === 1) {
        return;
      }
      setUnit(unit - 1);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent]}>
              <Text style={styles.modalheaderTitle}>
                What would you like to add?
              </Text>
              <TextInput style={styles.itemInput} placeholder="Type Item" />
              <View style={styles.spacedRow}>
                <View>
                  <Text style={styles.label}>Storage Location</Text>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      setLocationModalVisible(!locationModalVisible)
                    }>
                    <View style={styles.select}>
                      <Text>{storageLocation}</Text>
                      <ArrowDown />
                    </View>
                  </TouchableWithoutFeedback>
                  {locationModalVisible && (
                    <View style={styles.locationDrop}>
                      {locationData.map(storage => {
                        const {id, title} = storage;
                        const isLast = id === '3' ? true : false;
                        return (
                          <TouchableOpacity
                            key={id}
                            onPress={() => handleLocationSelect(id)}
                            style={[
                              styles.storageLocation,
                              // eslint-disable-next-line react-native/no-inline-styles
                              {borderBottomWidth: !isLast ? 0.5 : 0},
                            ]}>
                            <Text>{title}</Text>
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
                      disabled={unit === 1 ? true : false}
                      onPress={() => handleUnitControl('-')}>
                      <Minus />
                    </TouchableOpacity>
                    <Text style={styles.unit}>{unit}</Text>
                    <TouchableOpacity onPress={() => handleUnitControl('+')}>
                      <Plus />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.dateView}>
                <Text style={styles.label}>Expiry Date</Text>
                <View style={styles.select}>
                  <Text>12/12/22</Text>
                  <TouchableOpacity>
                    <Calender />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: heightPercentage(82),
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
    fontWeight: '500',
    fontSize: fontSz(16),
    color: COLORS.gray7,
    paddingVertical: heightPercentage(10),
    paddingHorizontal: widthPercentage(15),
    marginBottom: heightPercentage(30),
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
    width: widthPercentage(124),
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
});

export default Add;
