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
      $scope.url =  $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + $scope.video.id)
      console.log($scope.url);
      $scope.videoUrl = $scope.url;
      console.log($scope.videoUrl);
    $scope.modal.show();


  }
    /*console.log($scope.videoUrl);*/
    $scope.videos = [];
        API.getMostPopularVideos().then(function (dataOb) {  /* dataOb видно только тут. Благодаря $scope. оно выводится из этой области видимости и доступно во всем контроллере */
            $scope.videos = dataOb.my_videos;
            $scope.next_Token = dataOb.next_Token;
            $scope.prev_Token = dataOb.prev_Token;
            /* $scope. использовать дальше в такой же форме либо через var next_...*/
            /*console.log($scope.next_Token);
            console.log($scope.prev_Token);*/

        })

        $scope.next = function () {

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

.controller('SearchVideoController', function ($scope , API) {
    console.log('test');
    $scope.searched = [];
    console.log($scope.searched)
    /*$scope.searchSettings = {
        query: 'cats',

    };
    console.log($scope.searchSettings.query);
    $scope.searchVideos = function () {
        console.log('test2')
        alert($scope.searchSettings.query)

        API.SearchVideos($scope.searchSettings.query).then(function (my_videos) {
            console.log(my_videos);
            console.log($scope.searchSettings);
            $scope.searched = my_videos;
        });
    };
    $scope.searched = [];*/


})

/*.controller('OpenVideoController',function ($scope, $stateParams,  $sce) {
        console.log($stateParams.params);
        alert("111");

        console.log($stateParams.id);
        $scope.url = $sce.trustAsResourceUrl('//www.youtube.com/embed/w4y2FT7P4ek')

})*/