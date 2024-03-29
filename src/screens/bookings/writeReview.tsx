import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAppContext} from '../../context';
import {AppButton} from '../../components';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../../constants';
import StarRating from 'react-native-star-rating-widget';
import {addHandymanReviews} from '../../utils/apiRequests';

export default function WriteReview() {
  const {theme, token} = useAppContext();
  const {params} = useRoute() as {params: {workerId: string}};
  const styles = styleSheet({theme});
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [reviewInfo, setReviewInfo] = useState<{
    rating: number;
    comment: string;
  }>({
    rating: 0,
    comment: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      workerId: params.workerId,
      ...reviewInfo,
    };
    try {
      await addHandymanReviews(token, payload);
      navigation.goBack();
    } catch (ex: any) {
      console.log(ex.response?.data?.error || ex.message);
      Alert.alert(
        'Something failed',
        ex?.response?.data?.error?.message || ex.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {showReviewBox ? (
              <View>
                <Text style={styles.label}>Write your review</Text>
                <TextInput
                  style={styles.textInput}
                  multiline={true}
                  placeholder="What do you think about the service?"
                  placeholderTextColor={theme === 'dark' ? Colors.grey : 'auto'}
                  value={reviewInfo.comment}
                  onChangeText={text =>
                    setReviewInfo(prev => ({...prev, comment: text}))
                  }
                />
              </View>
            ) : (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>How was the service?</Text>
                <StarRating
                  color="#ffb700"
                  rating={reviewInfo.rating}
                  animationConfig={{scale: 1}}
                  starSize={55}
                  enableHalfStar={false}
                  emptyColor={theme === 'dark' ? Colors.darkGrey : '#c9c9c9'}
                  starStyle={styles.starStyle}
                  enableSwiping
                  onChange={newRating => {
                    setReviewInfo(prev => ({...prev, rating: newRating}));
                    setTimeout(() => {
                      setShowReviewBox(true);
                    }, 500);
                  }}
                />
              </View>
            )}
          </View>
          {showReviewBox && (
            <AppButton
              title="Submit Review"
              full
              onPress={handleSubmit}
              isLoading={isLoading}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: 16,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    label: {
      fontWeight: '700',
      color: theme === 'dark' ? Colors.white : Colors.dark,
      marginBottom: 10,
      fontSize: 18,
    },
    textInput: {
      color: theme === 'dark' ? Colors.white : Colors.dark,
      borderWidth: 1.5,
      borderColor: '#b2beb590',
      borderRadius: 8,
      padding: 12,
      paddingTop: 12,
      height: 150,
      textAlignVertical: 'top',
    },
    ratingContainer: {
      marginBottom: 32,
      marginTop: 16,
      alignItems: 'center',
    },
    ratingTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 8,
      color: theme === 'dark' ? Colors.white : Colors.dark,
    },
    starStyle: {
      marginHorizontal: -2,
    },
  });
