import React from 'react';
import { StyleSheet, Text, Image, View, StatusBar, ScrollView } from 'react-native';
import { Icon, Container, Content, Card, CardItem, Left, Body, Right, Thumbnail } from "native-base";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Preload from './components/Auth/Preload';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Firsttime from './components/Auth/Firsttime';
import Tab from './components/Main/Tab';
import MyProfile from './components/MyProfile/MyProfile';
import MyProfile1 from './components/MyProfile/MyProfile1';
import MyProfile2 from './components/MyProfile/MyProfile2';
import MyProfile3 from './components/MyProfile/MyProfile3';
import Camerasnap from './components/MyProfile/Camera';
import fgp from './components/Auth/fgp';

const AuthStack = createStackNavigator({
  SignUp: {
    screen: SignUp,

    navigationOptions: ({navigation}) => ({
      headerTitle: (<View style={{ flexDirection: 'row', width: 100 + '%'}}>
        <Icon name="arrow-back" style={{ marginLeft: 15 }}
        onPress={() => navigation.navigate('SignIn')}/>
        <Text style={{ marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 19}}> Sign Up </Text>
      </View>),
      headerStyle: {
        backgroundColor: '#396fb1',
      },
    })
  }
});

const TabStack = createStackNavigator({
  Tab:{
    screen: Tab,
    navigationOptions: {
      header: null
    }
  },
});

const MyProfileStack = createStackNavigator({
  MyProfile:{
    screen: MyProfile,
    navigationOptions: {
      header: null
    }
  },
  MyProfile1: {
    screen: MyProfile1,

    navigationOptions: ({navigation}) => ({
      headerTitle: (<View style={{ flexDirection: 'row', width: 100 + '%'}}>
        <Text style={{ marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 19}}> Edit Password </Text>
      </View>),
      headerStyle: {
        backgroundColor: '#396fb1',
      },
    })
  },
  MyProfile2: {
    screen: MyProfile2,

    navigationOptions: ({navigation}) => ({
      headerTitle: (<View style={{ flexDirection: 'row', width: 100 + '%'}}>
        <Text style={{ marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 19}}> Edit Firstname </Text>
      </View>),
      headerStyle: {
        backgroundColor: '#396fb1',
      },
    })
  },
  MyProfile3: {
    screen: MyProfile3,

    navigationOptions: ({navigation}) => ({
      headerTitle: (<View style={{ flexDirection: 'row', width: 100 + '%'}}>
        <Text style={{ marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 19}}> Edit Lastname </Text>
      </View>),
      headerStyle: {
        backgroundColor: '#396fb1',
      },
    })
  },

  Camerasnap: {
    screen: Camerasnap,

    navigationOptions: ({navigation}) => ({
      headerTitle: (<View style={{ flexDirection: 'row', width: 100 + '%'}}>
        <Text style={{ marginLeft: 80, color: 'white', fontWeight: 'bold', fontSize: 19}}> Camera </Text>
      </View>),
      headerStyle: {
        backgroundColor: '#396fb1',
      },
    })
  }
});

const DrawerStack = createDrawerNavigator(
  {
    Home: {
      screen: TabStack,
      navigationOptions: {
        header: null
      }
    },
    MyProfile: {
      screen: MyProfileStack,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    contentComponent: (props) => (
      <Container style={{ marginTop: StatusBar.currentHeight }}>
        <Content>
          <Card>
            <CardItem style={{ backgroundColor: '#2564b1' }}>
              <Left>
                <Thumbnail source={require('./img/Logo-new.png')} />
                <Body>
                  <Text style={{ color: 'white' }}>Theerapong Paruthum</Text>
                  <Text note style={{ color: 'white' }}>theerapong.pa@ku.th</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        <ScrollView>
          <DrawerItems
            {...props}
            getLabel = {(scene) => (
              <Content>
                <Card style={{ flex: 1 }}>
                    <CardItem header>
                      <Left>
                        {props.getLabel(scene) == 'Home' &&
                          <Icon active style={{ color: '#2564b1' }} name="cube"/>
                        }
                        {props.getLabel(scene) == 'MyProfile' &&
                          <Icon active style={{ color: '#2564b1' }} name="person"/>
                        }
                        {props.getLabel(scene) == 'Logout' &&
                          <Icon active style={{ color: '#2564b1' }} name="close-circle"/>
                        }
                        <Text style={{ color: 'black', fontSize: 14 }}>          {props.getLabel(scene)}</Text>
                      </Left>
                    </CardItem>
                </Card>
              </Content>
            )}
          />
            <Card style={{ flex: 1 }}>
              <CardItem header>
                <Left>
                  <Icon active style={{ color: '#2564b1' }} name="close-circle"/>
                  <Text style={{ color: 'black', fontSize: 14 }}>          Logout</Text>
                </Left>
              </CardItem>
            </Card>
          </ScrollView>
          </Content>
        </Container>
      ),
  }
)

export default createAppContainer(createSwitchNavigator(
  {
    Preload: Preload,
    SignIn: SignIn,
    Firsttime: Firsttime,
    AuthStack: AuthStack,
    DrawerStack: DrawerStack,
    Stack: MyProfileStack,
    fgp:fgp,
  },
  {
    initialRouteName: 'Preload',
  }
));
