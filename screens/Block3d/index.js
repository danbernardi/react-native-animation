import React, { Component } from 'react';
import { object } from 'prop-types';
import { View } from 'react-native';
import AppWrapper from '../../containers/AppWrapper';
import { GLView } from 'expo';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';

class Block3d extends Component {
  async _onGLContextCreate (gl) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000
    );
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(0, 20, 10);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(0, -20, 10);

    // const ambientLight = new THREE.ambientLight(0xffffff, 0.5);

    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const material = new THREE.MeshPhongMaterial({ color: 0x006E90 });

    const cube = new THREE.Mesh(geometry, material);
    camera.position.z = 2;
    scene.add(cube);
    scene.add(directionalLight1);
    scene.add(directionalLight2);

    const render = () => {
      requestAnimationFrame(render); // eslint-disable-line no-undef
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  }

  render() {
    const { navigation } = this.props;

    return (
      <AppWrapper navigation={ navigation }>
        <View
          style={ { flex: 1, backgroundColor: '#B9D7E0' } }
        >
          <GLView
            style={ { flex: 1, width: '100%' } }
            onContextCreate={ this._onGLContextCreate }
          />
        </View>
      </AppWrapper>
    );
  }
}

Block3d.propTypes = {
  navigation: object
};

export default Block3d;
