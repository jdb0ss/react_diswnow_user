import React ,{ useState, useEffect, useStore }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from "react-native-maps";
import { connect } from 'react-redux';
import { 
    View,
    Dimensions,
    StyleSheet,
    Image, 
    TouchableOpacity, 
    BackHandler,
} from "react-native";

import { Text } from '../../../component/common';
import CustomCallout from '../../../component/common/customCallout';

const StoreMap = (props) => {
    const { navigation } = props;   //뒤로가기 isReservation == false ? TabBooked : ListMenu
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');
    const name = navigation.getParam('name');
    const theme = navigation.getParam('theme');
    const isReservation = navigation.getParam('isReservation');


    useEffect(()=>{
        console.log(navigation);
        console.log(latitude);
        console.log(longitude,isReservation);
    },[])

    return(
        <View style ={{flex :1}}>
        
           <MapView 
           style = {{flex :1}}
           initialRegion = {{latitude,longitude,latitudeDelta: 0.0162,longitudeDelta: 0.00421}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton 
            >
          <Marker
                coordinate={{
                    latitude : latitude,
                    longitude : longitude
                }}
                image = {{uri : 'icon_pin'}}
            >
            <Callout
                alphaHitTest
                tooltip
                onPress={e => {
                if (
                    e.nativeEvent.action === 'marker-inside-overlay-press' ||
                    e.nativeEvent.action === 'callout-inside-press'
                ) {
                    return;
                }
                }
            }   style = {{height : 80}}
            >
                <CustomCallout>
                <Text style={{fontSize: 16, marginBottom: 5}}>{name}</Text>
                <View style={{flexDirection: 'row', justifyContent:"space-between", width:126}}>
                <Text style={{fontSize: 12}}>{theme}</Text>
                </View>
                </CustomCallout>
                </Callout>
            </Marker>
           </MapView>
       
           </View>
    )
}

const mapStateToProps = (state) => {
    return {
        latitude : state.Maps._root.entries[0][1].latitude,
        longitude : state.Maps._root.entries[0][1].longitude,
    }
}

export default connect(mapStateToProps)(StoreMap);