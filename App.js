/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Stack = createNativeStackNavigator();

const defaultValue = {};

const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const value = useMemo(
    () => ({
      state,
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

function SignInScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation();

  // const [username, setUsername] = useState('chintrinh@gmail.com');
  const [username, setUsername] = useState('');
  // const [pwd, setPwd] = useState('Admin@123');
  const [pwd, setPwd] = useState('');
  const [savePwdShow, setSavePwdShow] = useState(false);
  const usernameRef = useRef();
  const pwdRef = useRef();

  const handleLogin = useCallback(() => {
    setSavePwdShow(true);
    setTimeout(() => {
      signIn({ username, password: pwd });
    }, 1000);
  }, [username, pwd, signIn]);

  const navigateRegister = useCallback(() => {
    navigation.navigate('SignUp');
  }, []);

  if (savePwdShow) return null;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignIn Screen</Text>
      <ScrollView>
        <TextInput
          ref={usernameRef}
          value={username}
          onChangeText={setUsername}
          placeholder="username..."
          keyboardType="email-address"
          // textContentType="username"
          autoComplete="username"
          importantForAutofill="yes"
          onSubmitEditing={() => pwdRef.current.focus()}
        />
        <TextInput
          ref={pwdRef}
          value={pwd}
          onChangeText={setPwd}
          placeholder="password..."
          secureTextEntry
          // textContentType="password"
          autoComplete="password"
          importantForAutofill="yes"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={navigateRegister}>
          <Text>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SignUpScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation();

  // const [username, setUsername] = useState('chintrinh@gmail.com');
  const [username, setUsername] = useState('');
  // const [pwd, setPwd] = useState('Admin@123');
  const [pwd, setPwd] = useState('');
  const [confirmedPwd, setConfirmedPwd] = useState('');
  const [savePwdShow, setSavePwdShow] = useState(false);
  const usernameRef = useRef();
  const pwdRef = useRef();
  const confirmedPwdRef = useRef();

  const handleRegister = useCallback(() => {
    setSavePwdShow(true);
    setTimeout(() => {
      signIn({ username, password: pwd });
    }, 1000);
  }, [username, pwd, signIn]);

  const navigateLogin = useCallback(() => {
    navigation.navigate('SignIn');
  }, []);

  if (savePwdShow) return null;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignUp Screen</Text>
      <ScrollView>
        <View>
          <TextInput
            ref={usernameRef}
            value={username}
            onChangeText={setUsername}
            placeholder="username..."
            keyboardType="email-address"
            // textContentType="username"
            autoComplete="username"
            importantForAutofill="yes"
            onSubmitEditing={() => pwdRef.current.focus()}
          />
        </View>
        <View>
          <TextInput
            ref={pwdRef}
            value={pwd}
            onChangeText={setPwd}
            placeholder="password..."
            secureTextEntry
            // textContentType="newPassword"
            autoComplete="password"
            importantForAutofill="yes"
            onSubmitEditing={() => confirmedPwdRef.current.focus()}
          />
        </View>
        <View>
          <TextInput
            ref={confirmedPwdRef}
            value={confirmedPwd}
            onChangeText={setConfirmedPwd}
            placeholder="confirmed password..."
            secureTextEntry
            // textContentType="none"
            autoComplete="off"
            // importantForAutofill="auto"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <Button title="Register" onPress={handleRegister} />
        <TouchableOpacity onPress={navigateLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function HomeScreen() {
  const { signOut } = useAuth();

  const handleLogout = useCallback(() => {
    signOut();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

function ChangePasswordScreen() {
  const { signOut } = useAuth();

  const handleLogout = useCallback(() => {
    signOut();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const App = () => {
  const { state } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        {state.userToken == null ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const Provider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Provider;
