import React from 'react';
import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import GradientBGIcon from './GradientBGIcon';

interface ImageBackgroundInfoProps {
    EnableBackHandler:boolean;
    imageLink_portrait:ImageProps;
    type:string;
    id:string;
    favourite:boolean;
    name:string;
    special_ingredient:string;
    ingredients:string;
    average_rating:number;
    ratings_count:string;
    roasted:string;
    BackHandler?:any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo:React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler, imageLink_portrait, type,id,favourite,name,
    special_ingredient,ingredients,average_rating, ratings_count,
    roasted,BackHandler,ToggleFavourite
}) => {
  return (
    <View>
      <ImageBackground
      source={imageLink_portrait}
      style={styles.ItemBackgroundImage}>
        {EnableBackHandler ? (
        <View style={styles.ImageHeaderBarContainerWithBack}>
            <TouchableOpacity onPress={BackHandler}>
                <GradientBGIcon name='left' size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex}/>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>
                {ToggleFavourite(favourite,type,id);
            }}>
                <GradientBGIcon name='like' size={FONTSIZE.size_16}
                color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}/>
            </TouchableOpacity>
        </View>) : (
        <View style={styles.ImageHeaderBarContainerWithoutBack}>
        <TouchableOpacity onPress={()=>{ToggleFavourite(type,id,favourite)}}>
            <GradientBGIcon name='like' size={FONTSIZE.size_16}
            color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}/>
        </TouchableOpacity>
    </View>
        )}
        <View style={styles.ImageInfoOuterContainer}>
            <View style={styles.ImageInfoInnerContainer}></View>
            <View style={styles.InfoContainerRow}></View>
            <View>
                <Text style={styles.ItemTitleText}>{name}</Text>
                <Text style={styles.ItemSubtitleText}>{special_ingredient}</Text>
            </View>
            <View style={styles.ItemPropertiesContainer}>
                <View style={styles.PropertyFirst}>
                    <CustomIcon
                    name={type=='Bean' ? 'bean' : 'beans'}
                    size={type=='Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                    color={COLORS.primaryOrangeHex}
                    />
                    <Text style={[styles.PropertyTextFirst, {marginTop:type=='Bean' ? SPACING.space_4: SPACING.space_2}]}>{type}</Text>
                </View>
            </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    ItemBackgroundImage:{
        width:'100%',
        aspectRatio:200/250,
        justifyContent:'space-between'
    },
    ImageHeaderBarContainerWithBack:{
        padding:SPACING.space_30,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    ImageHeaderBarContainerWithoutBack:{
        padding:SPACING.space_30,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    InfoContainerRow: {},
    ImageInfoOuterContainer: {},
    ImageInfoInnerContainer: {},
    ItemTitleText: {},
    ItemSubtitleText: {},
    ItemPropertiesContainer: {},
    PropertyFirst: {},
    PropertyTextFirst: {},
})

export default ImageBackgroundInfo;