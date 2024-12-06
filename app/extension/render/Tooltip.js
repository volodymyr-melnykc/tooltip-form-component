import { useMemo } from 'preact/hooks';

import {
  FormContext,
  Text,
  useTemplateEvaluation,
  MarkdownRenderer,
  sanitizeHTML,
} from '@bpmn-io/form-js';

import {
  html,
  useContext
} from 'diagram-js/lib/ui';

import './styles.css';

import InfoIcon from './info-icon.svg';

export const tooltipType = 'tooltip';

const getInfoIconSVG = () => html`
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="white" fill-opacity="0.01" style="mix-blend-mode:multiply"/>
    <path d="M10 3.75C8.76387 3.75 7.5555 4.11656 6.52769 4.80331C5.49988 5.49007 4.6988 6.46619 4.22576 7.60823C3.75271 8.75027 3.62894 10.0069 3.87009 11.2193C4.11125 12.4317 4.70651 13.5453 5.58058 14.4194C6.45466 15.2935 7.56831 15.8887 8.78069 16.1299C9.99307 16.3711 11.2497 16.2473 12.3918 15.7742C13.5338 15.3012 14.5099 14.5001 15.1967 13.4723C15.8834 12.4445 16.25 11.2361 16.25 10C16.25 8.3424 15.5915 6.75268 14.4194 5.58058C13.2473 4.40848 11.6576 3.75 10 3.75ZM10 6.42857C10.1324 6.42857 10.2619 6.46784 10.372 6.54143C10.4822 6.61501 10.568 6.71959 10.6187 6.84195C10.6694 6.96431 10.6826 7.09896 10.6568 7.22885C10.6309 7.35875 10.5672 7.47807 10.4735 7.57172C10.3799 7.66537 10.2605 7.72915 10.1306 7.75499C10.0007 7.78083 9.8661 7.76757 9.74374 7.71688C9.62138 7.6662 9.5168 7.58037 9.44321 7.47025C9.36963 7.36012 9.33036 7.23066 9.33036 7.09821C9.33036 6.92061 9.40091 6.75029 9.52649 6.6247C9.65207 6.49912 9.8224 6.42857 10 6.42857ZM11.7857 13.6272H8.21429V12.6228H9.49777V10.0558H8.66072V9.05134H10.5022V12.6228H11.7857V13.6272Z" fill="#161616"/>
  </svg>
`;

export function TooltipRenderer(props) {
  const {
    field
  } = props;

  const {
    text,
    strict = false,
    id
  } = field;

  const { formId } = useContext(FormContext);

  const markdownRenderer = new MarkdownRenderer();

  // feelers => pure markdown
  const markdown = useTemplateEvaluation(text, { debug: true, strict });

  // markdown => html
  const htmlText = useMemo(() => markdownRenderer.render(markdown), [markdownRenderer, markdown]);

  const getSanitizedHtml = () => ({
    __html: sanitizeHTML(htmlText)
  })

  return html`
    <div class="fjs-tooltip-container">
      <div class="fjs-tooltip-icon info-icon" data-tooltip-id=${prefixId(id, formId)}>
        ${getInfoIconSVG()}
      </div>
      <div class="fjs-tooltip-text" id=${prefixId(id, formId)} dangerouslySetInnerHTML=${getSanitizedHtml()}/>
    </div>
  `;
}

// Component configuration
TooltipRenderer.config = {
    /* Extend the default configuration of existing fields */
  ...Text.config,
  type: tooltipType,
  label: 'Tooltip',
  iconUrl: `data:image/svg+xml,${encodeURIComponent(InfoIcon)}`,
  group: 'presentation',
  propertiesPanelEntries: [
    'text'
  ],
  create: (options = {}) => ({
    text: 'Tooltip',
    ...options,
  }),
};

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${ formId }-${ id }`;
  }

  return `fjs-form-${ id }`;
}