import React from 'react';
import { Card, CardContent, CardHeader, CardMeta, CardDescription, Image, Icon } from 'semantic-ui-react';
import '../css/CarsFleet.css';

const FleetCard = (props) => (
  <Card>
    <Image src={props.image} wrapped ui={false} />
    <CardContent>
      <CardHeader>{props.title}</CardHeader>
      <CardMeta>{props.price}</CardMeta>
      <CardDescription>
        {props.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </CardContent>
  </Card>
);

export default FleetCard;
