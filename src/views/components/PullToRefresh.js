import React from 'react';
import {ScrollView, RefreshControl} from 'react-native';

class PullToRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.onRefresh(); // Call the onRefresh prop function passed from the parent component
    this.setState({refreshing: false});
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            colors={['#1c6ba4', '#1c6ba4']}
            progressBackgroundColor="#ffffff"
          />
        }>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default PullToRefresh;
