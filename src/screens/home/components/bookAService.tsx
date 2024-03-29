import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../../../context';
import ServiceCard from './serviceCard';

interface IBookService {
  data: IService[];
}

const BookService = ({data}: IBookService) => {
  const {theme} = useAppContext();
  const styles = stylesheet({theme});
  const [firstRow, setFirstRow] = useState<IService[]>([]);
  const [secondRow, setSecondRow] = useState<IService[]>([]);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (i < data.length / 2) {
        setFirstRow(prev => [...prev, data[i]]);
      } else {
        setSecondRow(prev => [...prev, data[i]]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row'}}>
            {firstRow.map((service, index) => (
              <ServiceCard
                bonus={{category: 'new', text: 'New'}}
                key={service._id}
                service={service}
                isFirst={!index}
              />
            ))}
          </View>

          <View style={{flexDirection: 'row', marginTop: 24}}>
            {secondRow.map((service, index) => (
              <ServiceCard
                bonus={{category: 'new', text: 'New'}}
                key={service._id}
                service={service}
                isFirst={!index}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookService;

const stylesheet = ({}: IStyleSheet) =>
  StyleSheet.create({
    container: {},
  });
