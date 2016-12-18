angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


})


.controller('PlaylistsCtrl', function($scope, API, $ionicModal, $stateParams, $state , $sce) {
  $ionicModal.fromTemplateUrl('templates/video-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  })

  $scope.ModalVideo = function (video) {
    $scope.video = video;
    $scope.modal.show();

      alert($stateParams);
      console.log($stateParams);
      console.log('test');
      $scope.url = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + $stateParams.id)
  }
    $scope.videos = [];

        API.getMostPopularVideos().then(function (dataOb) {  /* dataOb видно только тут. Благодаря $scope. оно выводится из этой области видимости и доступно во всем контроллере */
            $scope.videos = dataOb.my_videos;
            $scope.next_Token = dataOb.next_Token;
            $scope.prev_Token = dataOb.prev_Token;
            /* $scope. использовать дальше в такой же форме либо через var next_...*/
            console.log($scope.next_Token);
            console.log($scope.prev_Token);

        })

        $scope.next = function () {
            console.log($scope.next_Token);
            API.getMostPopularVideos($scope.next_Token).then(function (dataOb) {
                $scope.videos = dataOb.my_videos;
                $scope.next_Token = dataOb.next_Token;
            });
        }
        $scope.prev = function () {
            console.log($scope.prev_Token);
            API.getMostPopularVideos($scope.prev_Token).then(function (dataOb) {
                $scope.videos = dataOb.my_videos;
                $scope.prev_Token = dataOb.prev_Token;
            });
        }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

/*.controller('OpenVideoController',function ($scope, $stateParams,  $sce) {
        console.log($stateParams.params);
        alert("111");

        console.log($stateParams.id);
        $scope.url = $sce.trustAsResourceUrl('//www.youtube.com/embed/w4y2FT7P4ek')

})*/