'use strict';

const angular = require('angular');

import { AccountService, Registry } from '@spinnaker/core';

module.exports = angular
  .module('spinnaker.huaweicloud.pipeline.stage.scaleDownClusterStage', [])
  .config(function() {
    Registry.pipeline.registerStage({
      provides: 'scaleDownCluster',
      cloudProvider: 'huaweicloud',
      templateUrl: require('./scaleDownClusterStage.html'),
      accountExtractor: stage => [stage.context.credentials],
      configAccountExtractor: stage => [stage.credentials],
      validators: [
        { type: 'requiredField', fieldName: 'cluster' },
        {
          type: 'requiredField',
          fieldName: 'remainingFullSizeServerGroups',
          fieldLabel: 'Keep [X] full size Server Groups',
        },
        { type: 'requiredField', fieldName: 'regions' },
        { type: 'requiredField', fieldName: 'credentials', fieldLabel: 'account' },
      ],
      strategy: true,
    });
  })
  .controller('huaweicloudScaleDownClusterStageCtrl', [
    '$scope',
    function($scope) {
      var ctrl = this;

      let stage = $scope.stage;

      $scope.state = {
        accounts: false,
        regionsLoaded: false,
      };

      AccountService.listAccounts('huaweicloud').then(function(accounts) {
        $scope.accounts = accounts;
        $scope.state.accounts = true;
      });

      stage.regions = stage.regions || [];
      stage.cloudProvider = 'huaweicloud';

      if (!stage.credentials && $scope.application.defaultCredentials.huaweicloud) {
        stage.credentials = $scope.application.defaultCredentials.huaweicloud;
      }
      if (!stage.regions.length && $scope.application.defaultRegions.huaweicloud) {
        stage.regions.push($scope.application.defaultRegions.huaweicloud);
      }

      if (stage.remainingFullSizeServerGroups === undefined) {
        stage.remainingFullSizeServerGroups = 1;
      }

      if (stage.allowScaleDownActive === undefined) {
        stage.allowScaleDownActive = false;
      }

      ctrl.pluralize = function(str, val) {
        if (val === 1) {
          return str;
        }
        return str + 's';
      };

      if (stage.preferLargerOverNewer === undefined) {
        stage.preferLargerOverNewer = 'false';
      }
      stage.preferLargerOverNewer = stage.preferLargerOverNewer.toString();
    },
  ]);
