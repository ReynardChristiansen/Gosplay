//IMPORTS
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// IMPORT PAGES
import OngoingOrder from './OngoingOrder';
import DoneOrder from './DoneOrder';

export default function MyOrder() {

    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Ongoing" 
                component={OngoingOrder} 
            />
            <Tab.Screen
                name="Done" 
                component={DoneOrder} 
            />
        </Tab.Navigator>
    )
}