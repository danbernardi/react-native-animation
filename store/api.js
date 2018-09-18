import { getSlug } from 'utils/formatters';
import data from './offline/data';

import {
  receiveProjects,
  receiveProject,
  changeProject,
  removeProject,
  receiveSingleUtterance,
  receiveTranscriptions,
  receiveSingleSpeaker,
  receiveTranscriptionDetails
} from './actions';

// HELPERS
const reqObj = (path, method, body) => {
  const obj = { path, method };
  if (body) {
    obj.body = body;
  }
  return obj;
};

const post = (path, body) => reqObj(path, 'POST', body);
const put = (path, body) => reqObj(path, 'PUT', body);
const del = (path, body) => reqObj(path, 'DELETE', body);
const get = path => reqObj(path, 'GET');

const randomId = () => Math.floor(Math.random() * 1000);

// API Functions
const getProjects = () => ({
  path: () => get('/projects'),
  offlineResponse: () => data.projects,
  onSuccess: (projects, dispatch) => {
    dispatch(receiveProjects(projects));
  }
});

const createProject = name => ({
  path: () => post('/projects', { name }),
  offlineResponse: getState => {
    const state = getState();
    const highestProject = state.projects.sortBy(p => p.get('id')).get(-1);

    return {
      name,
      id: (highestProject ? highestProject.get('id') : 0) + 1,
      slug: getSlug(name)
    };
  },
  onSuccess: (project, dispatch) => {
    dispatch(receiveProject(project));
  }
});

const updateProject = (projectId, name) => ({
  path: () => put(`/projects/${projectId}`, { name }),
  offlineResponse: () => ({
    id: projectId,
    name,
    slug: getSlug(name)
  }),
  onSuccess: (project, dispatch) => {
    dispatch(changeProject(project));
  }
});

const deleteProject = projectId => ({
  path: () => del(`/projects/${projectId}`),
  offlineResponse: () => ({}),
  onSuccess: (response, dispatch) => {
    dispatch(removeProject(projectId));
  }
});

const getTranscriptions = projectId => ({
  path: () => get(`/transcriptions${projectId ? `?projectId=${projectId}` : ''}`),
  offlineResponse: () => data.transcriptions,
  onSuccess: (transcriptions, dispatch) => {
    dispatch(receiveTranscriptions(transcriptions));
  }
});

const getTranscriptionDetails = transId => ({
  path: () => get(`/transcriptions/${transId}`),
  offlineResponse: () => data.details,
  onSuccess: (transDetails, dispatch) => {
    dispatch(receiveTranscriptionDetails(transId, transDetails));
  }
});

const updateUtterance = (transId, utteranceId, body) => ({
  path: () => put(`/utterances/${transId}`, body),
  offlineResponse: getState => {
    const state = getState();
    const transcription = state.transcriptions.find(t => t.get('id') === transId);
    const utterances = transcription && transcription.getIn(['details', 'utterances']);
    const utterance = utterances.find(u => u.get('id') === utteranceId);

    return {
      ...(utterance ? utterance.toJS() : {}),
      ...body,
      id: utteranceId
    };
  },
  onSuccess: (utterance, dispatch) => {
    dispatch(receiveSingleUtterance(transId, utterance));
  }
});

const updateSpeaker = (transId, speakerId, body) => ({
  path: () => put(`/speakers/${speakerId}`, body),
  offlineResponse: () => ({
    ...body,
    id: speakerId
  }),
  onSuccess: (speaker, dispatch) => {
    dispatch(receiveSingleSpeaker(transId, speaker));
  }
});

const createSpeaker = (transId, body) => ({
  path: () => post('/speakers', body),
  offlineResponse: () => ({
    ...body,
    id: randomId()
  }),
  onSuccess: (speaker, dispatch) => {
    dispatch(receiveSingleSpeaker(transId, speaker));
  }
});

const startMultipartUpload = params => ({
  path: () => post('/speech-files', params),
  offlineResponse: () => ({ uploadId: 'somefile.mp3' }),
  onSuccess: () => {}
});

// BRING BACK AT SOME POINT
// const createTranscriptionJob = body => dispatch =>
//   requestAndTrack(
//     dispatch,
//     paths.createTranscriptionJob(body),
//     transcriptionDetails =>
//       dispatch(receiveTranscriptionJobDetails(transcriptionDetails))
//   );

// const syncTranscription = (transcriptionName, callback) => dispatch =>
//   requestAndTrack(dispatch, paths.syncTranscription(transcriptionName), job => {
//     if (callback instanceof Function) setTimeout(callback, 1500);
//     if (Object.keys(job).length) {
//       dispatch(updateTranscriptionJobDetails(job));
//     }
//   });

const apis = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getTranscriptions,
  getTranscriptionDetails,
  updateUtterance,
  updateSpeaker,
  createSpeaker,
  startMultipartUpload
};

export default apis;
