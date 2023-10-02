import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import MainHeader from '../components/MainHeader';
import ScreenHeader from '../components/ScreenHeader';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import { PLACES, TOP_PLACES } from '../data';
import SectionHeader from '../components/SectionHeader';
import TripsList from '../components/TripsList';
import { sizes } from '../constant/theme';

const Home = () => {
  // const [users, setUsers] = useState<any[]>([]);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       //Make a call to a protected endpoint
  //       const result = await axios.get(`${API_URL}/users`);
  //       // console.log("🚀 ~ file: Home.tsx:15 ~ loadUser ~ result:", result.data)

  //       setUsers(result.data);
  //     } catch (e: any) {
  //       alert(e.message)
  //     }
  //   };
  //   loadUser();
  // }, [])
  const scrollY = useRef(new Animated.Value(0)).current;
  const offSetAnim = useRef(new Animated.Value(0)).current;
  const CONTAINER_HEIGHT = sizes.height;
  const clampScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp'
      }),
      offSetAnim,
    ),
    0,
    CONTAINER_HEIGHT
  )

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        CONTAINER_HEIGHT,
      )
    });
    offSetAnim.addListener(({value}) => {
      _offsetValue = value;
    })
  },[])
  const headerTranslate = clampScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: 'clamp'
  })
  return (
    // <ScrollView>
    //   {users.map((user) => {
    //     return <Text key={user._id} >{user._id}</Text>
    //   })}
    // </ScrollView>
    <View style={styles.container}>
      {/* <MainHeader title="Travel App"/> */}
      <Animated.View style={[styles.header, {transform:[{translateY: headerTranslate}]}]}>
        <MainHeader title="Travel App"/>
      </Animated.View>
      <ScreenHeader mainTitle="Find Your" secondTitle='Ocean Trip'/>
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{nativeEvent:{contentOffset:{y:scrollY}}}],
          {useNativeDriver: true}
          )}
      >
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader 
          title="Popular Trips" 
          onPress={() => {}} 
          buttonTitle="See All"
        />
        <TripsList list={PLACES}/> 
      </Animated.ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: sizes.height,
  }
})

export default Home