/*
 * A custom properties provider for the properties panel.
 */
export class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  getGroups() {
    return (groups) => {
      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = [ 'propertiesPanel' ];
