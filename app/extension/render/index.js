import { TooltipRenderer, tooltipType } from './Tooltip';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(tooltipType, TooltipRenderer);
  }
}

export default {
  __init__: ['tooltipField'],
  tooltipField: ['type', CustomFormFields]
};