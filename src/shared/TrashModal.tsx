import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {updateFood, deleteFood} from '../api/food';
import {fontSz, heightPercentage, widthPercentage} from '../config';
import COLORS from '../color';
import Minus from '../../assets/svg/circle-minus.svg';
import Plus from '../../assets/svg/circle-plus.svg';
import Ate from '../../assets/svg/ate.svg';
import Trash from '../../assets/svg/trash.svg';
import Donate from '../../assets/svg/donate.svg';
import {showMessage} from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';

interface Props {
  close: () => void;
  visible: boolean;
  item: any;
}

const TrashModal: React.FC<Props> = ({visible, close, item}) => {
  const {quantity, id, storageId, name, expiryDate} = item;

  const [trashQty, setTrashQty] = useState<number>(1);
  const [donateViewVisible, setDonateViewVisible] = useState<boolean>(false);

  const handleUnitControl = (option: string) => {
    if (option === '+') {
      if (quantity === trashQty) {
        return;
      } else {
        setTrashQty(trashQty + 1);
      }
    } else if (option === '-') {
      if (trashQty === 1) {
        return;
      } else {
        setTrashQty(trashQty - 1);
      }
    }
  };

  // update mutation for if trashQty < quantity
  const queryClient = useQueryClient();
  const {mutate: updateMutation, isLoading: updateLoading} = useMutation(
    updateFood,
    {
      onMutate: async () => {
        // console.log('updatedFood', updatedFood);
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['allfoods']);
        await queryClient.cancelQueries(['Fridge']);
        await queryClient.cancelQueries(['Freezer']);
        await queryClient.cancelQueries(['Pantry']);

        // Snapshot the previous value
        // const previousFood = queryClient.getQueryData([
        //   'allfoods',
        //   updatedFood.id,
        // ]);

        // Optimistically update to the new value
        // queryClient.setQueryData(['allfoods', updatedFood.id], updatedFood);

        // Return a context with the previous and new todo
        // return {previousFood, updatedFood};
      },
      // If the mutation fails, use the context we returned above
      onError: () => {
        // queryClient.setQueryData(
        //   ['allfoods', context?.updatedFood.id],
        //   context?.previousFood,
        // );
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
        setDonateViewVisible(false);
        close();
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(['allfoods']);
        queryClient.invalidateQueries(['Fridge']);
        queryClient.invalidateQueries(['Pantry']);
        queryClient.invalidateQueries(['Freezer']);
      },
    },
  );

  const {mutate: deleteMutation, isLoading: deleteLoading} = useMutation(
    deleteFood,
    {
      onMutate: async () => {
        // console.log('updatedFood', updatedFood);
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['allfoods']);
        await queryClient.cancelQueries(['Fridge']);
        await queryClient.cancelQueries(['Freezer']);
        await queryClient.cancelQueries(['Pantry']);

        // Snapshot the previous value
        // const previousFood = queryClient.getQueryData([
        //   'allfoods',
        //   updatedFood.id,
        // ]);

        // Optimistically update to the new value
        // queryClient.setQueryData(['allfoods', updatedFood.id], updatedFood);

        // Return a context with the previous and new todo
        // return {previousFood, updatedFood};
      },
      // If the mutation fails, use the context we returned above
      onError: () => {
        // queryClient.setQueryData(
        //   ['allfoods', context?.updatedFood.id],
        //   context?.previousFood,
        // );
        showMessage({
          message: 'Error',
          description: 'delete food item failed',
          type: 'danger',
        });
      },
      onSuccess: () => {
        showMessage({
          message: 'Success',
          description: 'Food item removed',
          type: 'success',
        });
        setDonateViewVisible(false);
        close();
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(['allfoods']);
        queryClient.invalidateQueries(['Fridge']);
        queryClient.invalidateQueries(['Pantry']);
        queryClient.invalidateQueries(['Freezer']);
      },
    },
  );

  const handleTrashing = (option: string) => {
    // based on option increase record data
    // if trashQty === quantity (delete item from record)
    // if trashQty < quantity (update item qty)
    // if option === donate, show donate modal & update or delete item
    if (option === 'donate') {
      setDonateViewVisible(true);
      setTimeout(() => {
        setDonateViewVisible(false);
      }, 5000);

      if (trashQty < quantity) {
        // increase donate count
        // update item quantity
        updateMutation({
          id,
          storageId,
          name,
          expiryDate,
          quantity: quantity - trashQty,
        });
      } else {
        // increase donate count
        // delete item
        deleteMutation(id);
      }
    } else {
      if (trashQty < quantity) {
        // increase count based on option
        // update item quantity
        updateMutation({
          id,
          storageId,
          name,
          expiryDate,
          quantity: quantity - trashQty,
        });
      } else {
        // ncrease count based on option & qty
        // delete item
        deleteMutation(id);
      }
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={close}
        disabled={updateLoading || deleteLoading}>
        <View style={styles.trashModalContainer}>
          {donateViewVisible && (
            <Animatable.View
              animation="slideInDown"
              duration={1000}
              style={[styles.trashModalContent, styles.donateView]}>
              <Text style={styles.modalheaderTitle}>Donate!</Text>
              <Text
                style={[styles.modalText, {maxWidth: widthPercentage(198)}]}>
                Have extra food? Find your local food bank and donate today!
              </Text>
            </Animatable.View>
          )}
          <View style={styles.trashModalContent}>
            <Text style={[styles.modalheaderTitle]}>
              Select quantity and choose where items go!
            </Text>
            <Text style={styles.modalText}>Where do you want to put them?</Text>
            <View>
              <Text style={styles.qty}>Quantity</Text>
              <View style={styles.unitControl}>
                <TouchableOpacity onPress={() => handleUnitControl('-')}>
                  <Minus />
                </TouchableOpacity>
                <Text style={styles.unit}>{trashQty}</Text>
                <TouchableOpacity onPress={() => handleUnitControl('+')}>
                  <Plus />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.icons}>
              <TouchableOpacity
                onPress={() => handleTrashing('ate')}
                disabled={updateLoading || deleteLoading}>
                <Ate />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTrashing('trash')}
                disabled={updateLoading || deleteLoading}>
                <Trash />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTrashing('donate')}
                disabled={updateLoading || deleteLoading}>
                <Donate />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View
            style={[
              styles.trashModalContent,
              {marginTop: heightPercentage(35)},
            ]}>
            <Text>Donate!</Text>
          </View> */}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  trashModalContainer: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentage(82),
    paddingTop: heightPercentage(70),
  },
  trashModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    // borderTopRightRadius: 16,
    // borderTopLeftRadius: 16,
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
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: fontSz(16),
    fontWeight: '500',
    color: COLORS.black,
  },
  qty: {
    textAlign: 'center',
    fontSize: fontSz(16),
    fontWeight: '400',
    color: COLORS.black,
    marginTop: heightPercentage(25),
    marginBottom: heightPercentage(6),
  },
  unitControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unit: {
    fontWeight: '700',
    fontSize: fontSz(30),
    color: COLORS.black,
    marginHorizontal: widthPercentage(15),
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentage(23),
  },
  donateView: {
    marginBottom: heightPercentage(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrashModal;
