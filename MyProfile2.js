import React from 'react';
import { StyleSheet, Text, Image, View, StatusBar,TouchableOpacity, ImageBackground,Alert } from 'react-native';
import { Container, Header, Content, Item, Label, Button, Left, Body, Right, Icon
,Footer, FooterTab, CardItem, Card, Thumbnail, Form, Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import DrawerIcon from '../Drawer/DrawerIcon'
import database from '../../database/Firebase';

export default class MyProfile2 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      timeout: false,
      newFirstname: '',
    };
  }

  onPressUpdateFirstname = () => {
    database.readOnce('Good@gmail.com',this.read_Account_success,this.read_Account_fail)
    }

    read_Account_success=async(account)=>{
        database.updateFirstname(account,this.state.newFirstname,this.update_Account_success,this.update_Account_fail);
    }

    read_Account_fail=async()=>{

    }

    update_Account_success=async(id)=>{
        Alert.alert("Change firstname success");
    }

    update_Account_fail=async()=>{
        Alert.alert("Change firstname fail");
    }


    onChangeTextnewFirstname = newFirstname => this.setState({ newFirstname });

  render(){
    return (
        <Container>
            <Content>
              <Grid style={{ marginTop: 50, marginBottom: 50 }}>
              <Col></Col>
                    <Col style={{ width: 350 }}>
                        <Form>
                            <Item floatingLabel last>
                            <Label>New Firstname</Label>
                            <Input onChangeText={this.onChangeTextnewFirstname} />
                            </Item>
                        </Form>

                        <Button onPress={this.onPressUpdateFirstname} block style={{ backgroundColor: '#2E59F1', marginVertical: 50 }}>
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
