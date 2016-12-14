angular.module('starter.services', [])

.service('API', function ($http, $q , apiKeys, youtubeFactory) {
    return {
        getMostPopularVideos: function () {

            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/videos',
                params: {
                    part: 'snippet',
                    maxResults: 50 ,
                    key : apiKeys.youtube,
                    chart: 'mostPopular'
                }
            }).then(function (data) {
                var y_videos = data.data.items;
                var my_videos = youtubeFactory.convertYoutubeToTamplate(y_videos);

                d.resolve(my_videos);
            });
            return d.promise;

        }, SearchVideos: function (params) {

            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/search',
                params: {
                    part: 'snippet',
                    maxResults: 13 ,
                    key : apiKeys.youtube,
                    q: params.query,
                    regionCode: params.regions
                }
            }).then(function (data) {
                var y_videos = data.data.items;
                var my_videos = youtubeFactory.convertYoutubeToTamplate(y_videos);
                d.resolve(my_videos);
            });
            return d.promise;
        }
    }
})
.factory('youtubeFactory', function () {
    return {
        convertYoutubeToTamplate: function (videos) {
            return videos.map(function (video , index) {
                return {
                    id : video.id,
                    title: video.snippet.title,
                    descript: video.snippet.description,
                    image: video.snippet.thumbnails.high.url,
                    author: video.snippet.channelTitle
                }
            });
        }
    }
})
.constant('apiKeys',
    {

        youtube: 'AIzaSyDnHWkrm1UcqjHXw87mfHhZhXIgax7F-Fk'

    });

