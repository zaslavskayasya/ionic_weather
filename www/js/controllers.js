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


        API.getMostPopularVideos().then(function (dataOb) {  /* dataOb видно только тут. Благодаря $scope. оно выводится из этой области видимости и доступно во всем контроллере */

            $scope.videos = dataOb.my_videos;
            $scope.next_Token = dataOb.next_Token;
            /* $scope. использовать дальше в такой же форме либо через var next_...*/
            console.log($scope.next_Token);
        })
        $scope.next = function () {
           console.log($scope.next_Token)
            API.getMostPopularVideos($scope.next_Token).then(function (dataOb) {
                $scope.videos = dataOb.my_videos;
                $scope.next_Token = dataOb.next_Token;
            });

            /* */
        }


})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('OpenVideoController',function ($routeParams, $scope, $sce) {
    console.log($routeParams.id);
    alert("111");   /* даже просто это не работает, значит эту часть не видно?*/
    console.log($routeParams.id);
    $scope.url= $sce.trustAsResourceUrl('https://www.youtube.com/embed/w4y2FT7P4ek')    /* пока что полная ссылка просто для теста */
})