/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import GradientBGIcon from './GradientBGIcon';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imageLink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler, imageLink_portrait, type, id, favourite, name,
    special_ingredient, ingredients, average_rating, ratings_count,
    roasted, BackHandler, ToggleFavourite
}) => {
    return (
        <View>
            <ImageBackground
                source={imageLink_portrait}
                style={styles.ItemBackgroundImage}>
                {EnableBackHandler ? (
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity onPress={BackHandler}>
                            <GradientBGIcon name='left' size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                ToggleFavourite(favourite, type, id);
                            }}>
                            <GradientBGIcon name='like' size={FONTSIZE.size_16}
                                color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} />
                        </TouchableOpacity>
                    </View>) : (
                    <View style={styles.ImageHeaderBarContainerWithoutBack}>
                        <TouchableOpacity onPress={() => { ToggleFavourite(type, id, favourite) }}>
                            <GradientBGIcon name='like' size={FONTSIZE.size_16}
                                color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer}>
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={styles.ItemTitleText}>{name}</Text>
                                <Text style={styles.ItemSubtitleText}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.ItemPropertiesContainer}>
                                <View style={styles.PropertyFirst}>
                                    <CustomIcon
                                        name={type == 'Bean' ? 'bean' : 'beans'}
                                        size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={[styles.PropertyTextFirst, { marginTop: type == 'Bean' ? SPACING.space_4 + SPACING.space_2 : 0 }]}>{type}</Text>
                                </View>
                                <View style={styles.PropertyFirst}>
                                    <CustomIcon
                                        name={type == 'Bean' ? 'location' : 'drop'}
                                        size={FONTSIZE.size_24}
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={styles.PropertyTextFirst}>{ingredients}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.InfoContainerRow}>
                            <View style={styles.RatingContainer}>
                                <CustomIcon
                                    name={'star'}
                                    color={COLORS.primaryOrangeHex}
                                    size={FONTSIZE.size_20}
                                />
                                <Text style={styles.RatingText}>{average_rating}</Text>
                                <Text style={styles.RatingCountText}>({ratings_count})</Text>
                            </View>
                            <View style={styles.RoastedContainer}>
                                <Text style={styles.RoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 200 / 250,
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex
    },
    ItemSubtitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20
    },
    PropertyFirst: {
        height: 55,
        width: 55,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    },
    RatingContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    RatingText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
    RatingCountText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    },
    RoastedContainer: {
        height: 55,
        width: 55 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    RoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    }
})

export default ImageBackgroundInfo;