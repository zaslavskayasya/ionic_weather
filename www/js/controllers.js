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
  $scope.ModalClose = function () {
      $scope.modal.hide();
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

.controller('SearchVideoController', function ($scope , API , $ionicModal, $stateParams, $state , $sce) {
    console.log('test1');

    $scope.searchSet = {
        query: 'kittens'
    };
    $scope.SearchVideos = function () {
        API.SearchVideos($scope.searchSet).then(function (videos) {
            console.log(videos);
            $scope.searched = videos;

        });
    };

/* а это надо как-то вынести в отдельный файл/функцию, как повторяющийся кусочек...*/
    $ionicModal.fromTemplateUrl('templates/video-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    })

    $scope.searched = [];

    console.log( $scope.searched);
    $scope.ModalVideo = function (video) {
        $scope.video = video;
        $scope.url =  $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + $scope.video.id.videoId)
        console.log($scope.url);
        $scope.videoUrl = $scope.url;
        console.log($scope.videoUrl);
        $scope.modal.show();
    }
    $scope.ModalClose = function () {
        $scope.modal.hide();
    }
});
