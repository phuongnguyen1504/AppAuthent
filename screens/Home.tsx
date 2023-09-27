import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import MainHeader from '../components/MainHeader';
import ScreenHeader from '../components/ScreenHeader';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import { PLACES, TOP_PLACES } from '../data';
import SectionHeader from '../components/SectionHeader';
import TripsList from '../components/TripsList';

const Home = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        //Make a call to a protected endpoint
        const result = await axios.get(`${API_URL}/users`);
        // console.log("🚀 ~ file: Home.tsx:15 ~ loadUser ~ result:", result.data)

        setUsers(result.data);
      } catch (e: any) {
        alert(e.message)
      }
    };
    loadUser();
  }, [])

  return (
    // <ScrollView>
    //   {users.map((user) => {
    //     return <Text key={user._id} >{user._id}</Text>
    //   })}
    // </ScrollView>
    <View style={styles.container}>
      <MainHeader title="Travel App"/>
      <ScreenHeader mainTitle="Find Your" secondTitle='Ocean Trip'/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader 
          title="Popular Trips" 
          onPress={() => {}} 
          buttonTitle="See All"
        />
        <TripsList list={PLACES}/> 
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})

export default Home