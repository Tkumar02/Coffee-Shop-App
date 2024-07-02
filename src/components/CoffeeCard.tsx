/* prettier-ignore */
/* eslint-disable */

import React from 'react';
import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import BGIcon from './BGIcon';
import CustomIcon from './CustomIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32

interface CoffeeCardProps {
    id: string;
    index: number;
    type: string;
    roasted: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ name, id, index,
    type, roasted, imagelink_square, special_ingredient,
    average_rating, price, buttonPressHandler }) => {
    return (
        <>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.CardLinearGradientContainer}
                colors={[COLORS.primaryDarkGreyHex, COLORS.primaryBlackHex]}
            >
                <ImageBackground
                    source={imagelink_square}
                    style={styles.CardImageBG}
                    resizeMode='cover'>
                    <View style={styles.CardRatingContainer}>
                        <CustomIcon name={'star'}
                            color={COLORS.primaryOrangeHex}
                            size={FONTSIZE.size_16} />
                        <Text style={styles.CardRatingText}>{average_rating}</Text>
                    </View>
                </ImageBackground>
                <Text style={styles.CardTitleText}>{name}</Text>
                <Text style={styles.CardIngredientText}>{special_ingredient}</Text>
                <View style={styles.CardFooterRow}>
                    <Text style={styles.CardPriceCurrency}>
                        $<Text style={styles.CardPrice}>{price.price}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => {
                        buttonPressHandler({
                            id, index, type, roasted, name, imagelink_square, special_ingredient, prices: [{ ...price, quantity: 1 }],
                        })
                    }}>
                        <BGIcon color={COLORS.primaryWhiteHex} name={'add'}
                            BGColor={COLORS.primaryOrangeHex} size={FONTSIZE.size_10} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden'
    },
    CardRatingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: FONTSIZE.size_12,
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        backgroundColor: COLORS.primaryBlackRGBA,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0
    },
    CardRatingText: {
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_medium,
        lineHeight: 22
    },
    CardTitleText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_medium
    },
    CardIngredientText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        fontFamily: FONTFAMILY.poppins_light
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15
    },
    CardPriceCurrency: {
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
        fontFamily: FONTFAMILY.poppins_semibold
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex,
    },
})

export default CoffeeCard;