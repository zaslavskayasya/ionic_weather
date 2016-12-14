angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


})

.controller('PlaylistsCtrl', function($scope, API, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/video-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.ModalVideo = function (video) {
    $scope.video = video;
    $scope.modal.show();

  }

  $scope.videos = [];
  $scope.searched = [];

  API.getMostPopularVideos().then(function (data) {
    console.log(data);
    $scope.videos = data;
  })






})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SearchController', function ($scope, API) {
  $scope.searchSettings = {
    query: null,
    regions: 'US'
  };

  $scope.regions = [{
    title: 'Рос',
    value: 'RU'
  }, {
    title: 'USA',
    value: 'US'
  }];

  $scope.searchVideos = function () {
    API.SearchVideos($scope.searchSettings).then(function (videos) {
      console.log(videos);
      $scope.searched = videos;
    });
  };
  $scope.searched = [];
});
