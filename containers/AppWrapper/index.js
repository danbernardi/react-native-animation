import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import { string, node, func } from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import ConfigModal from '../../components/ConfigModal';
import Footer from '../../components/Footer';
import { setModal } from '../../store/actions';
import { updateNavigationState } from '../../store/actions';

class AppWrapper extends Component {
  componentWillUnmount () {
    this.props.dispatch(setModal(null));
  }

  render () {
    const { children, dispatch, modal } = this.props;

    return (
      <View style={ { flex: 1 } }>
        <Modal
          animationType="slide"
          transparent={ false }
          visible={ !!modal }
        >
          <ConfigModal page={ modal } />
        </Modal>

        <NavigationEvents
          onWillFocus={ payload => dispatch(updateNavigationState(payload)) }
        />
        { children }
        <Footer />
      </View>
    );
  }
}

AppWrapper.propTypes = {
  children: node,
  dispatch: func,
  modal: string
};

export default connect(state => ({ modal: state.modal }))(AppWrapper);
