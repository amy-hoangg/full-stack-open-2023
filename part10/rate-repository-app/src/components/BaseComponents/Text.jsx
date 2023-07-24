import {Text as NativeText,
        StyleSheet} from 'react-native'
import theme from '../../theme';

//styles su dung cua theme
const styles = StyleSheet.create({
    //text = textPrimary
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },

    colorTextSecondary:{
        color: theme.colors.textSecondary
    },
    colorPrimary: {
        color: theme.colors.primary
    },

    fontSizeSubheading:{
        fontSize: theme.fontSizes.subheading
    },
    
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold
    }
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {

    const textStyle = [
        styles.text,

        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,

        fontSize === 'subheading' && styles.fontSizeSubheading,

        fontWeight === 'bold' && styles.fontWeightBold,

        style,
      ];
    

    return (
      <NativeText 
        style={textStyle} {...props} />
    );
  }
  
  export default Text;

//cai native text -> native text la text co san cua reatc 