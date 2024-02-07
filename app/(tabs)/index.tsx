import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Storage from 'expo-storage'
import { Text, View } from '@/components/Themed';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import CircularNumberContainer from './surahs/SurahNumberContainer';

interface CacheMap {
  [key: number]: boolean;
}

export default function TabOneScreen() {
  const [surahData, setSurahData] = useState(null);

  const [cacheMap, setCacheMap] = useState<CacheMap>(() => {
    const initialMap: CacheMap = {};
    for (let i = 1; i <= 114; i++) {
      initialMap[i] = false;
    }
    return initialMap;
  });

  const surahNameStyle = (id: number) => {
    return cacheMap[id] ? styles.surahNameGreen : styles.surahName;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSurahData(data.data);
        await Storage.setItem({
          key: `surahList`,
          value: JSON.stringify(data.data)
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

    const checkAvailabity = async () => {
      for (var i = 0; i < 114; i++) {
        const fetchedJson = await Storage.getItem({ key: `${i}` });
        if (fetchedJson !== null) {
          setCacheMap((prevMap) => ({
            ...prevMap,
            [i]: true
          }));
        }
      }
    }

    checkAvailabity();
    configureData("surahList");
  }, []);


  return (
    <View style={{ height: Dimensions.get("screen").height * 0.85, width: Dimensions.get("screen").width }}>
      {surahData != null ? (
        <FlashList
          data={surahData}
          renderItem={({ item }) => (
            <TouchableOpacity

              style={styles.listContainer}
              onPress={() =>
                router.push({
                  pathname: "surahs/[id]",
                  params: { id: item.number },
                })
              }
            >
              <View style={styles.motherContainer}>
                <CircularNumberContainer ayahNumber={item.number} />
                <View style={styles.nameContainer}>
                  <Text style={surahNameStyle(item.number)}>{item.englishName}</Text>
                  <Text style={styles.surahNameTranslation}>
                    {item.englishNameTranslation}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.surahNameArabic}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          estimatedItemSize={150}
        />
      ) : (
        <Text>Not loaded</Text>
      )}

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
    fontSize: 18,
    fontWeight: '600',
  },
  surahNameGreen: {
    fontSize: 18,
    fontWeight: '600',
    color: "limegreen"
  },
  surahNameTranslation: {
    fontSize: 11,
    fontWeight: '300',
  },
  surahNameArabic: {
    fontSize: 19,
    fontFamily: "Uthman"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    height: 4,
  },
  listContainer: {
    padding: 10,
    marginRight: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "rgb(70, 70, 70)"
  },
  motherContainer: {
    flex: 1,
    flexDirection: "row"
  },
  nameContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10
  }
});
