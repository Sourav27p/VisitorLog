import React from 'react';
import {TopNavigation, TopNavigationAction, Icon} from '@ui-kitten/components';

const Header = props => {
  const BackIcon = props => <Icon name="menu-outline" {...props} />;
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => props.toggleDrawer()} />
  );
  return (
    <TopNavigation
      accessoryLeft={renderBackAction}
      title={props.title}
      alignment="center"
    />
  );
};

export default Header;
