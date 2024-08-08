import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';
import { UrlEditor } from './CustomEditor'; // Import the SimpleEditor component
// Register the plugin
export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      id: 'url',
      path: 'url',
      name: 'Image backend URL',
      editor: UrlEditor,
    });
});