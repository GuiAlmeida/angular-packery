import controller from './packery.controller';

const packeryDirective = () => {
  return {
    scope: {},
    controller,
    restrict: 'E',
    compile: element => {
      let flag = false;
      const $obj = $(element).find('packery-item[ng-repeat], packery-item[data-ng-repeat], packery-item [ng-repeat], packery-item [data-ng-repeat]');

      if ($obj.length >= 1) {
        flag = true;
        $obj.attr('data-packery-after-render', '');
      }

      return {
        pre: (scope, elem, attr, ctrl) => {
          ctrl.config.packeryContainer = elem;
          ctrl.config.packeryOptions = JSON.parse(attr.packeryOptions || '{}');
        },

        post: (scope, elem, attributes, ctrl) => {
          if (!flag) {
            ctrl.initialize();
          }
        },
      };
    },
  };
};

export default packeryDirective;
