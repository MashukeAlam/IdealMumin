import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import CircularNumberContainer from './surahs/SurahNumberContainer';

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

export default function TabOneScreen() {
  const [surahData, setSurahData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSurahData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <View style={{ height: Dimensions.get("window").height, width: Dimensions.get("screen").width }}>
      {surahData != null ? 
      <FlashList
        data={surahData}
        renderItem={({ item }) => <TouchableOpacity style={styles.listContainer} onPress={() => router.push({pathname: "surahs/[id]", params: {id: item.number}})}><CircularNumberContainer ayahNumber={item.number}/><Text style={styles.surahName}>{item.englishName}</Text></TouchableOpacity>}
        estimatedItemSize={200}
      /> : <Text>Not loaded</Text>}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  surahName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item : {
    height: 4,
  },
  listContainer : {
    padding: 10,
    marginRight: 5,
    flex: 1,
    flexDirection: "row"
},
});
