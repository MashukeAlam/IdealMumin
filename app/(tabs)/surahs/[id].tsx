import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import CircularNumberContainer from './SurahNumberContainer';
import { BlurView } from 'expo-blur';

function Surah() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [surahData, setSurahData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSurahData(data.data.ayahs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

    fetchData();

    return () => {
        setSurahData(null);
    }
  }, [id]);
    return (
        <View style={{ height: Dimensions.get("window").height, width: Dimensions.get("screen").width }}>
      {surahData != null ? 
      <FlashList
        data={surahData}
        renderItem={({ item }) => <View style={styles.listContainer}>{console.log(item)}<CircularNumberContainer style={styles.ayahNumber} ayahNumber={item.numberInSurah}/><Text style={styles.textStyle}>{item.text}</Text></View>}
        estimatedItemSize={200}
      /> : <Text>Not loaded</Text>}
 </View>
    );
}

const styles = StyleSheet.create({
    textStyle : {
        fontSize: 20
    },
    listContainer : {
        padding: 10,
        marginRight: 5,
        flex: 1,
        flexDirection: "row-reverse",

    },
    blurView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
})

export default Surah;
