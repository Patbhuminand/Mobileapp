import React from 'react';
import { StyleSheet, Text, Image, View, StatusBar,TouchableOpacity, ImageBackground, Modal,TouchableHighlight,Alert } from 'react-native';
import { Container, Header, Content, Item, Label, Button, Left, Body, Right, Icon,Footer, FooterTab, CardItem, Card, Thumbnail, Form, Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import DrawerIcon from '../Drawer/DrawerIcon';
import database from '../../database/Firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class MyProfile extends React.Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      timeout: false,
      modalVisible: false,
      firstName: '',
      lastName: '',
      email: '',
      imageuri : 'https://firebasestorage.googleapis.com/v0/b/my-project-68a2f.appspot.com/o/Task%2FLogo.png?alt=media&token=739aaaed-db36-449e-b703-ab1c8bed1ad3',
    };
  }

  onFocusFunction = async() => {
      //console.log(this.props.navigation.state.params.userID)
      database.readOnce('Dog@gmail.com',this.read_Account_success,this.read_Account_fail);
  }

  async componentDidMount () {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    })
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
  }
  }

  read_Account_success=async(account)=>{
    this.setState({firstName:account.firstName});
    this.setState({lastName:account.lastName});
    this.setState({email:account.email});
    this.setState({imageuri:account.url});
  }

    read_Account_fail=async()=>{
      Alert.alert(error);
    }

  upload_success=async(uri)=>{
    this.setState({imageuri:uri});
    Alert.alert('Upload success');
  }

  upload_fail=async(error)=>{
    Alert.alert(error);
  }

  uploading_status=async(progress)=>{

  }

  takePic= async () => {
    this.props.navigation.navigate('Camerasnap');
    this.setState({modalVisible: false});
    }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if(!result.cancelled){
      this.setState({imageuri:result.uri});
    }
    this.setState({modalVisible:false});
    database.uploadImage(this.state.email,this.state.imageuri,this.upload_success,this.upload_fail,this.uploading_status);
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    return (
        <Container>
            <Header style={{ backgroundColor: '#396fb1', marginTop: StatusBar.currentHeight }}>
                <StatusBar backgroundColor='#396fb1' barStyle="light-content" />
                <Left>
                    <DrawerIcon {...this.props} />
                </Left>
                <Body>
                    <Text style={{ marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 19}}>My Profile</Text>
                </Body>
                <Right>

                </Right>
            </Header>
            <Content>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
              >
                <Container style={{flex:1, backgroundColor: 'transparent'}}>
                <View style={{position:'absolute',bottom:0,left:0,right:0,alignSelf:'flex-end',backgroundColor: '#2564b1'}}>
                  <Content>
                  <Grid>
                  <Row></Row>
                  <Row>
                  <Card style={{ flex: 1 }}>
                    <CardItem header button onPress={this.takePic} style={{ backgroundColor: '#ececec' }}>
                      <Text style={{ color: '#396fb1', fontSize: 18 }}>Take a photo</Text>
                    </CardItem>
                    <CardItem button onPress={this.pickImage} style={{ backgroundColor: '#ececec' }}>
                      <Body>
                        <Text style={{ color: '#396fb1', fontSize: 18 }}>Select from device</Text>
                      </Body>
                    </CardItem>
                    <CardItem footer button onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                    style={{ backgroundColor: '#ececec' }}>
                      <Text style={{ color: 'red', fontSize: 18 }}>Cancel</Text>
                    </CardItem>
                  </Card>
                  </Row>
                  <Row></Row>
                  </Grid>
                  </Content>
                  </View>
                </Container>
              </Modal>

              <Grid>
                <Row>
                <Col></Col>
                <Col>
                  <View style={{ marginVertical: 20 }}>
                      <Image style={{ height: 150, width: 150 }} source={{uri:this.state.imageuri}} />
                      <TouchableOpacity style={styles.close} onPress={() => {this.setModalVisible(true);}}>
                        <Button rounded disabled warning style={{ height: 30, width: 30, justifyContent: "center" }}>
                          <Text style={{ color: 'black', fontWeight: 'bold'}}>+</Text>
                        </Button>
                      </TouchableOpacity>
                  </View>
                </Col>
                <Col></Col>
                </Row>
              </Grid>
              <Grid style={{ marginTop: 20, marginBottom: 50 }}>
              <Col></Col>
                    <Col style={{ width: 350 }}>
                        <Form>
                            <Item stackedLabel>
                            <Label>Email</Label>
                            <Input placeholder = {this.state.email} disabled />
                            </Item>
                            <Item stackedLabel>
                            <Label>Password<Label onPress={() => this.props.navigation.navigate('MyProfile1')} style={{ color: '#2E59F1' }}>  [Edit]</Label></Label>
                            <Input disabled />
                            </Item>
                            <Item stackedLabel>
                            <Label>Firstname<Label onPress={() => this.props.navigation.navigate('MyProfile2')} style={{ color: '#2E59F1' }}>  [Edit]</Label></Label>
                            <Input placeholder = {this.state.firstName} disabled />
                            </Item>
                            <Item stackedLabel last>
                            <Label>Lastname<Label onPress={() => this.props.navigation.navigate('MyProfile3')} style={{ color: '#2E59F1' }}>  [Edit]</Label></Label>
                            <Input placeholder = {this.state.lastName} disabled />
                            </Item>
                        </Form>
                    </Col>
                    <Col></Col>
              </Grid>
            </Content>
        </Container>
    );
  }
}
const styles = StyleSheet.create({
  close: {
    margin: 100,
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30
  }
});
