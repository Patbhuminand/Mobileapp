import React from 'react';
import { StyleSheet, Text, Image, View, StatusBar,TouchableOpacity, ImageBackground,Alert } from 'react-native';
import { Container, Header, Content, Item, Label, Button, Left, Body, Right, Icon
,Footer, FooterTab, CardItem, Card, Thumbnail, Form, Input,TextInput } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import DrawerIcon from '../Drawer/DrawerIcon'
import database from '../../database/Firebase';

export default class MyProfile1 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      timeout: false,
      oldPassword: '',
      newPassword: '',
      renewPassword: '',
    };
  }

  onPressUpdatePassword = () => {
    if(this.state.newPassword == this.state.renewPassword)
    {
      database.updatePasswordAut(this.state.newPassword);
      database.readOnce('Patbhuminand.s@ku.th',this.read_Account_success,this.read_Account_fail)
    }
    else {
      Alert.alert("Your new password and Repassword not match");
    }
    }

  read_Account_success=async(account)=>{
    if(this.state.oldPassword == account.password)
    {
      database.updatePassword(account,this.state.newPassword,this.update_Account_success,this.update_Account_fail)
    }
    else {
      {
        Alert.alert("Your old password not match");
      }
    }
  }

  read_Account_fail=async()=>{

  }

  update_Account_success=async(id)=>{
  Alert.alert("Change password success");
  this.props.navigation.navigate("MyProfile")
  }

  update_Account_fail=async()=>{
    console.log('Create Account fail');
  }


  onChangeTextPasswordold = oldPassword => this.setState({ oldPassword });
  onChangeTextPasswordnew = newPassword => this.setState({ newPassword });
  onChangeTextPasswordrenew = renewPassword => this.setState({ renewPassword });

  render(){
    return (
        <Container>
            <Content>
              <Grid style={{ marginTop: 50, marginBottom: 50 }}>
              <Col></Col>
                    <Col style={{ width: 350 }}>
                        <Form>
                            <Item floatingLabel>
                            <Label>Old Password</Label>
                            <Input onChangeText={this.onChangeTextPasswordold} />
                            </Item>
                            <Item floatingLabel>
                            <Label>New Password</Label>
                            <Input onChangeText={this.onChangeTextPasswordnew} />
                            </Item>
                            <Item floatingLabel last>
                            <Label>New Password</Label>
                            <Input onChangeText={this.onChangeTextPasswordrenew} />
                            </Item>
                        </Form>

                        <Button onPress={this.onPressUpdatePassword} block style={{ backgroundColor: '#2E59F1', marginVertical: 50 }}>
                            <Text style={{ color: 'white' }}>Confirm</Text>
                        </Button>
                    </Col>
                    <Col></Col>
              </Grid>
            </Content>
        </Container>
    );
  }
}
