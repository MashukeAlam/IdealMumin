import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Storage from 'expo-storage'
import { Text, View } from '@/components/Themed';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import CircularNumberContainer from './surahs/SurahNumberContainer';
import {SvgXml} from 'react-native-svg';
import { useColorScheme } from '@/components/useColorScheme';

interface CacheMap {
  [key: number]: boolean;
}

const svgKaaba = `
  <svg  fill="#000000" width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
    <path d="M18 0L0 5v29l18 2l18-2V5z"></path>
    <path d="M18 36l18-2V5L18 0z"></path>
    <path fill="#FFD983" d="M22.454 14.507v3.407l4.229.612V15.22zm7 1.181v3.239l3.299.478v-3.161zM18 13.756v3.513l1.683.244V14.04zm18 3.036l-.539-.091v3.096l.539.078z"></path>
    <path fill="#FFAC33" d="M0 16.792v3.083l.539-.078v-3.096zm16.317-2.752v3.473L18 17.269v-3.513zm-13.07 2.204v3.161l3.299-.478v-3.239zm6.07-1.024v3.306l4.229-.612v-3.407z"></path>
    <path fill="#FFD983" d="M21.389 15.131v-.042c0-.421-.143-.763-.32-.763c-.177 0-.32.342-.32.763v.042c-.208.217-.355.621-.355 1.103c0 .513.162.949.393 1.152c.064.195.163.33.282.33s.218-.135.282-.33c.231-.203.393-.639.393-1.152c-.001-.482-.147-.886-.355-1.103zm6.999 1.069v-.042c0-.421-.143-.763-.32-.763c-.177 0-.32.342-.32.763v.042c-.208.217-.355.621-.355 1.103c0 .513.162.949.393 1.152c.064.195.163.33.282.33s.218-.135.282-.33c.231-.203.393-.639.393-1.152c0-.481-.147-.885-.355-1.103zm6.017 1.03v-.039c0-.393-.134-.712-.299-.712c-.165 0-.299.319-.299.712v.039c-.194.203-.331.58-.331 1.03c0 .479.151.886.367 1.076c.059.182.152.308.263.308s.203-.126.263-.308c.215-.189.367-.597.367-1.076c0-.45-.136-.827-.331-1.03z"></path>
    <path fill="#FFAC33" d="M14.611 15.131v-.042c0-.421.143-.763.32-.763s.32.342.32.763v.042c.208.217.355.621.355 1.103c0 .513-.162.949-.393 1.152c-.064.195-.163.33-.282.33s-.218-.135-.282-.33c-.231-.203-.393-.639-.393-1.152c.001-.482.147-.886.355-1.103zM7.612 16.2v-.042c0-.421.143-.763.32-.763s.32.342.32.763v.042c.208.217.355.621.355 1.103c0 .513-.162.949-.393 1.152c-.064.195-.163.33-.282.33s-.218-.135-.282-.33c-.231-.203-.393-.639-.393-1.152c0-.481.147-.885.355-1.103zm-6.017 1.03v-.039c0-.393.134-.712.299-.712s.299.319.299.712v.039c.194.203.331.58.331 1.03c0 .479-.151.886-.367 1.076c-.059.182-.152.308-.263.308s-.204-.127-.264-.308c-.215-.189-.367-.597-.367-1.076c.001-.45.137-.827.332-1.03zM0 11.146v3.5l18-3.268V7.614z"></path>
    <path fill="#FFD983" d="M18 7.614v3.764l18 3.268v-3.5z"></path>
  </svg>
`;

const svgMedinaah = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 383.594 383.594" xml:space="preserve">
<path d="M375.701,201.29c0-1.98-1.078-3.693-2.668-4.629c6.516-5.986,10.561-12.909,10.561-22.79
	c0-29.125-35.504-34.861-35.504-48.258c0,13.397-35.504,19.133-35.504,48.258c0,9.88,4.044,16.803,10.561,22.789
	c-1.59,0.936-2.668,2.648-2.668,4.63c0,2.875,2.253,5.201,5.09,5.355v28.777c-2.837,0.153-5.09,2.48-5.09,5.355
	c0,2.876,2.253,5.205,5.09,5.358v15.025h-66.557v-21.915h-7.639v-15.089h-0.633c13.466-13.113,21.715-28.355,21.715-49.633
	c0-60.061-66.449-76.349-78.719-101.6c2.155,0.536,4.375,0.826,6.614,0.826c8.364,0,16.176-3.724,21.432-10.217
	c1.828-2.263,3.285-4.783,4.329-7.492l0.162-0.421l-0.379,0.246c-4.421,2.865-9.556,4.38-14.849,4.38
	c-6.209,0-12.294-2.157-17.136-6.073c-9.198-7.449-12.541-19.877-8.316-30.927l0.161-0.42l-0.378,0.245
	c-2.43,1.577-4.592,3.526-6.425,5.792c-4.631,5.72-6.758,12.9-5.987,20.219c0.77,7.319,4.347,13.9,10.068,18.53
	c2.213,1.791,4.693,3.198,7.318,4.223c-10.849,25.883-79.213,41.769-79.213,102.688c0,21.277,8.246,36.52,21.713,49.633h-0.633
	v15.089h-7.637v21.915H58.021v-15.092c2.84-0.153,5.1-2.481,5.1-5.355c0-2.875-2.26-5.203-5.1-5.355v-28.779
	c2.84-0.153,5.1-2.48,5.1-5.355c0-1.979-1.082-3.691-2.675-4.626c6.514-5.984,10.561-12.907,10.561-22.788
	c0-29.125-35.508-34.865-35.508-48.263c0,13.397-35.5,19.138-35.5,48.263c0,9.882,4.047,16.805,10.563,22.788
	c-1.592,0.936-2.672,2.647-2.672,4.626c0,2.874,2.258,5.201,5.094,5.355v28.779c-2.836,0.154-5.094,2.481-5.094,5.355
	c0,2.873,2.258,5.201,5.094,5.355v15.092h-0.031v99.607H57.18v-38.402c0-15.941,22.84-26.385,22.84-26.385
	s22.838,10.443,22.838,26.385v38.402h56.912v-54.822c0-22.352,32.027-36.995,32.027-36.995s32.025,14.644,32.025,36.995v54.822
	h56.912v-38.402c0-15.941,22.838-26.385,22.838-26.385s22.84,10.443,22.84,26.385v38.402h44.227V261.16h-0.029v-15.025
	c2.836-0.152,5.092-2.481,5.092-5.358c0-2.875-2.256-5.203-5.092-5.355v-28.776C373.445,206.493,375.701,204.165,375.701,201.29z"/>
</svg>
`;

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  const svgKaabaTSX = <SvgXml fill={colorScheme === 'dark' ? "grey" : "black"} style={styles.revelationIcon} xml={svgKaaba} height={10} width={10} />;
  const svgMedinaahTSX = <SvgXml fill={colorScheme === 'dark' ? "grey": "black"} style={styles.revelationIcon} xml={svgMedinaah} height={10} width={10} />
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

  const surahRevelationType = (id: number) => {
    if (surahData === null) return <View></View>;
    return surahData[id]["revelationType"] == "Meccan" ? svgKaabaTSX : svgMedinaahTSX;
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
    <View style={{ height: Dimensions.get("screen").height * 0.84, width: Dimensions.get("screen").width }}>
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
                  <View style={styles.surahBottomLineContainer}>
                    <Text style={styles.surahNameTranslation}>
                      {item.englishNameTranslation}
                    </Text>
                    {surahRevelationType(item.number)}
                  </View>
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
        <View style={styles.loading}><Text>Please wait</Text></View>
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
  },
  surahBottomLineContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 1
  },
  revelationIcon: {
    margin: 5,
    color: "green",
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
