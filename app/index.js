import { FormPlayground } from '@bpmn-io/form-js';

import TooltipExtension from './extension/render';
import TooltipPropertiesExtension from './extension/propertiesPanel';

import '@bpmn-io/form-js/dist/assets/form-js.css';
import '@bpmn-io/form-js/dist/assets/form-js-editor.css';
import '@bpmn-io/form-js/dist/assets/form-js-playground.css';

import './style.css';

import schema from './empty.json';

new FormPlayground({
  container: document.querySelector('#form'),
  schema: schema,
  data: {},
  additionalModules: [TooltipExtension],
  editorAdditionalModules: [TooltipPropertiesExtension]
});