/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
FlatList,
TouchableOpacity,
StyleSheet,
Text,
View,
Image,
ActivityIndicator,Modal
} from 'react-native';

const COLOR_ODD='#ffffff';
const COLOR_EVEN='#F2F2F2';
const App= () => {
const [results,setResults]=useState([]);
const [isLoading,setLoading]=useState(false);
const [modalVisible,setModalVisible]=useState(false);
const [itemDetails,setItemsDetails]=useState([]);

useEffect(()=>{
  getData();
 },[]);
const renderItem=(item,index)=>{
 let style_item=index%2==0 ?{backgroundColor:COLOR_ODD}:{backgroundColor:COLOR_EVEN}
 return(
<TouchableOpacity
onPress={()=>{
  getobjectToArray(item);
  setModalVisible(true);

}}
style={[styles.itemStyle,style_item]}>
<Image
source={{uri:item.artworkUrl60}}
style={styles.img}
/>
<View style={{flexDirection:'column',margin:4}}>
<Text multiline={true}>{item.collectionName}</Text>
<Text style={{color:'#ff0000'}}>{item.currency+' : '+item.trackPrice}</Text>
</View>
</TouchableOpacity>
  );
}


const getobjectToArray=item=>{
 let data =[];
 const objectArray = Object.entries(item);
  objectArray.forEach(([key, value]) => {
   let itemData= {key:key.replace(/([a-z])([A-Z])/g, '$1 $2'),value:value};
    data.push(itemData);
  });
  setItemsDetails(data);

}

const getModal=()=>{

  return(
    <Modal 
    animationType="slide"
    visible={
      modalVisible
    }
    >
      <View style={{flex:1}}>
<View
style={{backgroundColor:'#00D100',padding:10,width:'100%',height:70,paddingTop:40,
}}
>
<Text style={{color:'#ffffff',fontWeight:'bold',textAlign:'center',fontSize:20}}>
  Music Details
</Text>
</View>

<TouchableOpacity
onPress={()=>{
  getobjectToArray([]);
  setModalVisible(false);

}}
style={{alignItems:'center',
backgroundColor:'#f00000',
padding:10,
width:'100%'
}}
>
  <Text>Close</Text>
</TouchableOpacity>

<FlatList
styles={{flex:1}}
data={itemDetails}
renderItem={({ item,index }) => 

<View style={{flexDirection:'row',margin:8}}>
  <Text style={{fontWeight:'600'}}>{item.key.toUpperCase()+' : '}</Text>
  <Text multiline={true}>{item.value}</Text>
</View> 
  // return a component using that data
}
keyExtractor={(item,index) => index.toString()}
/>

</View>
    </Modal>
  )

  
}

const getData=async()=>{

    try {
      setLoading(true);
      let response = await fetch(
        'https://itunes.apple.com/search?term=Michael+jackson'
      );
      let json = await response.json();
      setLoading(false);
      setResults(json.results);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
 }
  return (
<View style={{flex:1}}>
  {getModal()}
<View
style={{backgroundColor:'#00D100',padding:10,width:'100%',height:70,paddingTop:40,
}}
>
<Text style={{color:'#ffffff',fontWeight:'bold',textAlign:'center',fontSize:20}}>
  Music List
</Text>
</View>
{isLoading ?    <ActivityIndicator size="large" />:
<FlatList
styles={{flex:1}}
data={results}
renderItem={({ item,index }) => 

  renderItem(item,index) 
  // return a component using that data
}
keyExtractor={(item,index) => index.toString()}
/>
}
</View>  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  itemStyle:{width:'100%',margin:1,padding:5,flexDirection:'row'},
  img:{height:80 ,width:80}
});

export default App;
