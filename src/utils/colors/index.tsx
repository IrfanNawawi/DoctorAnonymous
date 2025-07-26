const dataColors = {
    green: '#0BCAD4',
    lightGreen: '#EDFCFD',
    dark1: '#112340',
    dark2: '#495A75',
    dark3: '#8092AF',
    grey1: '#7D8797',
    grey2: '#E9E9E9',
    grey3: '#EDEEF0',
    white: '#FFFFFF',
    black: '#000000',
    blackOpacity: 'rgba(0, 0, 0, 0.5)',
    transparent: 'transparent',
    red: '#E06379',
}

export const colors = {
    primary: dataColors.green,
    secondary: dataColors.dark1,
    white: dataColors.white,
    black: dataColors.black,
    disable: dataColors.grey3,
    text: {
        primary: dataColors.dark1,
        secondary: dataColors.grey1,
        menuInactive: dataColors.dark2,
        menuActive: dataColors.green,
        subTitle: dataColors.dark3
    },
    button: {
        primary: {
            background: dataColors.green,
            text: dataColors.white
        },
        secondary: {
            background: dataColors.white,
            text: dataColors.dark1
        }
    },
    border: dataColors.grey2,
    cardLight: dataColors.lightGreen,
    transparent: dataColors.transparent,
    loadingBackground: dataColors.blackOpacity,
    error: dataColors.red
};