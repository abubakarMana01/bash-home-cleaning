import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../constants';
import {useAppContext} from '../context';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IAppTextInput {
  label?: string;
  placeholder?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters';
  icon?: React.ReactNode;
  autoComplete?: any;
  autoCorrect?: boolean;
  handleBackArrowPress?: () => void;
  value?: string;
  onBlur?: (e: any) => void;
  onChangeText?: (e: string | React.ChangeEvent<any>) => void;
  touched?: boolean;
  autoFocus?: boolean;
}

const AppTextInput = ({
  label = '',
  placeholder = '',
  error = '',
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  autoComplete = 'off',
  autoCorrect = false,
  autoFocus = false,
  handleBackArrowPress,
  icon,
  value,
  onBlur,
  onChangeText,
  touched,
}: IAppTextInput) => {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  return (
    <View>
      {label ? (
        <View style={styles.labelAndErrorContainer}>
          {<Text style={styles.label}>{label}</Text>}
          {error && touched ? (
            <View>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      <View style={styles.textInputContainer}>
        {handleBackArrowPress && (
          <TouchableOpacity onPress={handleBackArrowPress}>
            <Ionicons
              name="arrow-back"
              color={theme === 'dark' ? Colors.lightGrey : Colors.black}
              size={24}
              style={styles.backArrow}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          placeholderTextColor={theme === 'dark' ? Colors.darkGrey : 'auto'}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
          autoFocus={autoFocus}
        />
        {icon && icon}
      </View>
    </View>
  );
};

export default AppTextInput;

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    labelAndErrorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontWeight: '600',
      color: theme === 'dark' ? Colors.white : Colors.dark,
      marginBottom: 5,
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: '#b2beb590',
      borderRadius: 8,
      // paddingVertical: 8,
      paddingHorizontal: 12,
    },
    backArrow: {
      marginRight: 10,
    },
    textInput: {
      flex: 1,
      height: 45,
      color: theme === 'dark' ? Colors.white : Colors.dark,
    },
    error: {
      color: 'red',
      fontSize: 12,
      alignSelf: 'flex-end',
    },
  });
