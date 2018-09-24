import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { SafeAreaView, View, Text, TouchableHighlight } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { string, func, object } from 'prop-types';
import { startCase } from 'lodash';

import { setModal, setConfig } from '../../store/actions';
import { colors as colorScapeColors } from '../../screens/ColorScape';
import { init } from '../../store/reducers/configs';
import styles from './styles';

const sliderDefaults = (configs, dispatch, section, name) => {
  const initValue = init.getIn([section, name]);
  const steps = [10000, 1000, 100, 50, 10, 5, 3, 2, 1, 0.2, 0.1, 0.01];
  const stepIndex = steps.findIndex(step => initValue % step === 0);
  const step = steps[stepIndex];

  return {
    step,
    minimumValue: 0,
    maximumValue: steps.reverse().find(s => s > initValue * 2),
    value: configs.getIn([section, name]),
    onValueChange: val => dispatch(setConfig(section, name, val))
  };
};

const slidersForSection = (section, configs, dispatch) => {
  return (<View style={ { padding: 20 } }>
    {
      Object.keys(init.get(section).toJS()).map((key, ind) => {
        const defaults = sliderDefaults(configs, dispatch, section, key);
        return (<View key={ ind }>
          <Text style={ { fontSize: 18, color: 'white' } }>{ startCase(key) }</Text>
          <Slider
            { ...defaults }
          />
          <Text style={ { fontSize: 14, color: 'white', marginBottom: 10 } }>Value: { defaults.value }</Text>
        </View>);
      })
    }
  </View>);
};

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
  'Elastic ball / Event example': (configs, dispatch) =>
    slidersForSection('Elastic ball / Event example', configs, dispatch),
  'Stagger / Spring example': (configs, dispatch) =>
    slidersForSection('Stagger / Spring example', configs, dispatch)
};

const getContent = (modal, configs, dispatch) => (modalContent[modal](configs, dispatch) || null);

const ConfigModal = ({ modal, dispatch, configs }) => {
  const content = getContent(modal, configs, dispatch);

  return (
    <SafeAreaView style={ styles.modal }>
      <TouchableHighlight
        style={ styles.close }
        onPress={ () => { dispatch(setModal(null)); } }>
        <FontAwesome style={ styles.closeIcon }>{ Icons.close }</FontAwesome>
      </TouchableHighlight>

      { content &&
        <View style={ styles.content }>
          <Text style={ styles.title }>{ modal } Config</Text>
          { content }
        </View>
      }
    </SafeAreaView>
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
