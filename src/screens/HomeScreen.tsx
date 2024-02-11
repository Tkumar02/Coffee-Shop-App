import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CoffeeCard from '../components/CoffeeCard';
import CustomIcon from '../components/CustomIcon';
import HeaderBar from '../components/HeaderBar';
import { useStore } from '../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const getCategoriesFromData = (data:any) => {
  let temp: any = {};
  for(let i=0;i<data.length;i++){
    if(temp[data[i].name]==undefined){
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories
}

const getCoffeeList = (category: string, data:any) => {
  if(category=="All"){
    return data;
  } else {
    let coffeelist = data.filter((item:any)=>item.name ==category)
    return coffeelist;
  }
}

export default function HomeScreen() {
  const CoffeeList = useStore((state:any)=>state.CoffeeList);
  const BeanList = useStore((state:any)=>state.BeanList)

  const[categories,setCategories] = useState(getCategoriesFromData(CoffeeList))
  const[searchText,setSearchText] = useState('')
  const[categoryIndex,setCategoryIndex] = useState({
    index:0,
    category: categories[0],
  });
  const[sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category,CoffeeList));

  const tabBarHeight = useBottomTabBarHeight();
  
  //console.log('sortedCoffee = ', sortedCoffee.length,'LOOK HERE', sortedCoffee[1].prices[0].price)

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar/>

        <Text style={styles.ScreenTitle}>Find the best {'\n'} coffee for you</Text>
        
        {/* Search Input */}

        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={()=>{}}>
            <CustomIcon style={styles.InputIcon} name='search' size={FONTSIZE.size_18} color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}/>
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchText}
            onChangeText={text=> setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
        </View>
        <View>
          {/* Category Scroller */}
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
            {categories.map((category,index)=>
              <View style={styles.CategoryScrollViewContainer} key={index.toString()}>
                <TouchableOpacity
                  style={styles.CategoryScrollViewItem}
                  onPress={()=>{
                    setCategoryIndex({index:index, category:categories[index]}),
                    setSortedCoffee([
                      ...getCoffeeList(categories[index],CoffeeList)])
                  }}>
                  <Text style={[styles.CategoryText, categoryIndex.index == index ? {color: COLORS.primaryOrangeHex} : {}]}>{category}</Text>
                  {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory}></View>
                  ) : (
                    <Text></Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      
      {/* Coffe FlatList  */}
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={sortedCoffee}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item=>item.id)}
      renderItem={({item})=>{
        return <TouchableOpacity onPress={()=>{}}>
          <CoffeeCard
            name={item.name} id={item.id} index={item.index}
            type={item.type} roasted={item.roasted}
            imagelink_square={item.imagelink_square}
            special_ingredient={item.special_ingredient}
            average_rating={item.average_rating} price={item.prices[2]}
            buttonPressHandler={()=>{}}
          />
        </TouchableOpacity>
        }}
      />

      <Text style={styles.CoffeeBeanTitle}>Coffee Beans</Text>
      {/* Bean FlatList */}
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={sortedCoffee}
      contentContainerStyle={[styles.FlatListContainer, {marginBottom:tabBarHeight}]}
      keyExtractor={(item=>item.id)}
      renderItem={({item})=>{
        return <TouchableOpacity onPress={()=>{}}>
          <CoffeeCard
            name={item.name} id={item.id} index={item.index}
            type={item.type} roasted={item.roasted}
            imagelink_square={item.imagelink_square}
            special_ingredient={item.special_ingredient}
            average_rating={item.average_rating} price={item.prices[2]}
            buttonPressHandler={()=>{}}
          />
        </TouchableOpacity>
      }}
      />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow: 1,
  },
  ScreenTitle:{
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent:{
    flexDirection:'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems:'center'
  },
  InputIcon:{
    marginHorizontal: SPACING.space_20
  },
  TextInputContainer:{
    flex:1,
    height:SPACING.space_20*3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex
  },
  CategoryScrollViewStyle:{
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color:COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  ActiveCategory:{
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex
  },
  CategoryScrollViewContainer:{
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem:{
    alignItems:'center'
  },
  FlatListContainer:{
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30
  },
  CoffeeBeanTitle:{
    fontSize: FONTSIZE.size_10,
    marginLeft: SPACING.space_10,
    marginTop: SPACING.space_12,
    fontFamily: FONTFAMILY.poppins_medium,
    color:COLORS.secondaryLightGreyHex
  }
})