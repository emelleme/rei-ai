
import { Colors, Typography, Spacings } from 'react-native-ui-lib';

// Configure RNUI with our design system
Colors.loadColors({
  primary: '#000000',
  secondary: '#FFFFFF', 
  separator: '#F5F5F5',
  textPrimary: '#000000',
  textSecondary: '#666666',
  background: '#FFFFFF',
  surface: '#F5F5F5',
});

Typography.loadTypographies({
  heading: { fontSize: 24, fontFamily: 'Poppins-SemiBold', fontWeight: '600' },
  subheading: { fontSize: 18, fontFamily: 'Poppins-Medium', fontWeight: '500' },
  body: { fontSize: 16, fontFamily: 'Poppins-Regular', fontWeight: '400' },
  caption: { fontSize: 14, fontFamily: 'Poppins-Light', fontWeight: '300' },
  button: { fontSize: 16, fontFamily: 'Poppins-Medium', fontWeight: '500' },
});

Spacings.loadSpacings({
  page: 24,
  card: 16,
  gridGutter: 12,
  section: 8,
});
