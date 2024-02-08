import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import CircularNumberContainer from './SurahNumberContainer';
import Storage from 'expo-storage';

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
                await Storage.setItem({
                    key: `${id}`,
                    value: JSON.stringify(data.data.ayahs)
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const configureData = async (key: string) => {
            const jsonValue = await Storage.getItem({ key: key });

            if (jsonValue !== null) {
                console.log("No loading was needed.");
                setSurahData(JSON.parse(jsonValue));

            } else {
                console.log("Fresh loading was needed this time.");
                fetchData();
            }
        }

        configureData(`${id}`);

        fetchData();

        return () => {
            setSurahData(null);
        }
    }, [id]);
    return (
        <View style={{ height: Dimensions.get("screen").height * 0.85, width: Dimensions.get("screen").width }}>
            {surahData != null ?
                <FlashList
                    data={surahData}
                    renderItem={({ item }) => (<View style={styles.listContainer}><CircularNumberContainer style={styles.ayahNumber} ayahNumber={item.numberInSurah} /><Text style={styles.textStyle}>{item.text}</Text></View>)}
                    estimatedItemSize={200}
                /> : <View style={styles.loading}><Text>Please wait</Text></View>}
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 25,
        fontFamily: "Uthman",
    },
    listContainer: {
        padding: 10,
        marginRight: 5,
        flex: 1,
        flexDirection: "row-reverse",
        borderBottomWidth: 0.3,
        borderBottomColor: "rgb(50, 50, 50)",
    },
    blurView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    loading: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Surah;
