/*! 442e8c5d-b701-42d6-b451-5f0fea2f8e5a */
(function (w) {
    "use strict";

    w.ProxyVideoController = function ($scope, $http, $window, videoService, viewData, clipAjaxService, layoutAdapter, controlsAdapter, videoQualityService, settingsPersistenceService, diagnosticLogService, videoControlsService) {

        $scope.handleClipSelected = function () {
            var clip = viewData.moduleCollection.getSelectedClip();
            var offset = viewData.startOffset;

            viewData.startOffset = 0;
            layoutAdapter.showLoadingAnimation();
            diagnosticLogService.logClipSelected(clip);

            clipAjaxService.retrieveClipUrl(clip, $scope.playClip, offset);
        };
        //$scope.$on('clipSelected', $scope.handleClipSelected);


    w.ProxyVideoController.$inject = ['$scope', '$http', '$window', 'videoService', 'viewData', 'clipAjaxService', 'layoutAdapter', 'controlsAdapter', 'videoQualityService', 'settingsPersistenceService', 'diagnosticLogService', 'videoControlsService'];
} (window));