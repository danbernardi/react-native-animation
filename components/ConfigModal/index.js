import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { View, Text, TouchableHighlight } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { string, func, object } from 'prop-types';

import { setModal, setConfig } from '../../store/actions';
import { colors as colorScapeColors } from '../../screens/ColorScape';
import styles from './styles';

export const modalContent = {
  'Color swipe example': (configs, dispatch) => colorScapeColors.map((color, index) => {
    const checked = configs.getIn(['Color swipe example', color]) !== false;

    return (
      <CheckBox
        key={ index }
        center={ true }
        checked={ checked }
        containerStyle={ { backgroundColor: color, borderRadius: 0, borderColor: 'black' } }
        onPress={ () => dispatch(setConfig('Color swipe example', color, !checked)) }
        checkedColor={ 'black' }
        title={ color }
      />
    );
  }),
  'Elastic ball / Event example': (configs, dispatch) => (
    <View style={ { padding: 20 } }>
      <Text style={ { fontSize: 18, color: 'white' } }>Friction</Text>
      <Slider
        value={ configs.getIn(['Elastic ball / Event example', 'friction']) }
        step={ 0.2 }
        minimumValue={ 0 }
        maximumValue={ 10 }
        onValueChange={ (value) => dispatch(setConfig('Elastic ball / Event example', 'friction', value)) }
      />
      <Text style={ { fontSize: 18, color: 'white' } }>Expanded Size</Text>
      <Slider
        value={ configs.getIn(['Elastic ball / Event example', 'expandSize']) }
        step={ 0.1 }
        minimumValue={ 0.5 }
        maximumValue={ 3 }
        onValueChange={ (value) => dispatch(setConfig('Elastic ball / Event example', 'expandSize', value)) }
      />
    </View>
  )
};

const getContent = (modal, configs, dispatch) => (modalContent[modal](configs, dispatch) || null);

const ConfigModal = ({ modal, dispatch, configs }) => {
  const content = getContent(modal, configs, dispatch);

  return (
    <View style={ styles.modal }>
      <TouchableHighlight
        style={ styles.close }
        onPress={ () => { dispatch(setModal(null)); } }>
        <FontAwesome style={ styles.closeIcon }>{ Icons.close }</FontAwesome>
      </TouchableHighlight>
      {
        content
          ? <View style={ styles.content }>
            <Text style={ styles.title }>{ modal } Config</Text>
            { content }
          </View>
          : null
      }
    </View>
  );
};

const mapStateToProps = state => ({
  modal: state.modal,
  configs: state.configs
});

ConfigModal.propTypes = {
  modal: string,
  dispatch: func,
  configs: object
};

export default connect(mapStateToProps)(ConfigModal);
