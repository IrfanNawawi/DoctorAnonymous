const dataColors = {
    green: '#0BCAD4',
    lightGreen: '#EDFCFD',
    navy: '#112340',
    grey: '#7D8797',
    white: '#FFFFFF',
    black: '#000000',
    dark1: '#E9E9E9',
    dark2: '#495A75',
}

export const colors = {
    primary: dataColors.green,
    secondary: dataColors.navy,
    white: dataColors.white,
    black: dataColors.black,
    text: {
        primary: dataColors.navy,
        secondary: dataColors.grey,
        menuInactive: dataColors.dark2,
        menuActive: dataColors.green
    },
    button: {
        primary: {
            background: dataColors.green,
            text: dataColors.white
        },
        secondary: {
            background: dataColors.white,
            text: dataColors.navy
        }
    },
    border: dataColors.dark1,
    cardLight: dataColors.lightGreen
};