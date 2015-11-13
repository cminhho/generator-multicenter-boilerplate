angular.module("##app.name##-example",
    ['##app.name##','pascalprecht.translate','ngCookies'])
    .config(['$translateProvider',
        function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'assets/locales/',
                suffix: '.json'
            }).preferredLanguage('english')
                .fallbackLanguage(['vietnamese']).useLocalStorage();
        }]);