import colors from '../constants/colors';

export const isColorValid = (color) => {
    let keys = Object.keys(colors)
    let item = keys.find(elem => elem.toLowerCase() === color.toLowerCase())
    return item
}