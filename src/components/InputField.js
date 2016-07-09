import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Constants from '../Constants';

export default class InputField extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    icon: PropTypes.number.isRequired,
    returnKeyType: PropTypes.string,
  };

  static defaultProps = {
    returnKeyType: 'go',
  };

  constructor(props, context) {
    super(props, context);

    this.state = { text: '' };
  }

  onChangeText = (text) => this.setState({ text });

  onSubmit = () => {
    const text = this.state.text.trim();
    if (text) {
      this.props.onSubmit(text);
      this.setState({ text: '' });
    }
  };

  render() {
    return (
      <View style={ styles.row }>
        <TextInput
          autoCapitalize="none"
          style={ [Constants.STYLES.input, styles.input] }
          onChangeText={ this.onChangeText }
          value={ this.state.text }
          returnKeyType={ this.props.returnKeyType }
          onSubmitEditing={ this.onSubmit }
        />
        <TouchableOpacity onPress={ this.onSubmit }>
          <Image
            source={ this.props.icon }
            style={ Constants.STYLES.icon }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Constants.GUTTER_MD,
  },
  input: {
    flex: 1,
    marginRight: Constants.GUTTER_SM,
  },
});
