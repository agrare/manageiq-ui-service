/** @ngInject */

export function TemplatesEditorState(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return {
    'templates.editor': {
      url: '/edit/:templateId',
      template: '<template-editor existing-template="vm.template" page-action="Edit"></template-editor>',
      controller: StateController,
      controllerAs: 'vm',
      resolve: {
        template: resolveTemplate,
      },
    },
  };
}

/** @ngInject */
function resolveTemplate($stateParams, TemplatesService) {
  return $stateParams.templateId ? TemplatesService.getTemplate($stateParams.templateId) : {};
}

/** @ngInject */
function StateController($stateParams, template) {
  var vm = this;
  if ($stateParams.templateId) {
    vm.title = 'Edit Template';
    vm.template = template;
  } else {
    vm.title = 'Add Template';
  }
}