import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box>
        <Text>Notfound</Text>

        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </Box>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
//   linkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
