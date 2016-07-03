var mod = angular.module('myApp.view1', ['ngRoute', 'ui.calendar']);
mod.controller('View1Ctrl', View1Ctrl);

mod.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}]);

function View1Ctrl($scope, $compile, uiCalendarConfig) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.eventSources = [
        {
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    editable: true,
                    durationEditable: true,
                    startEditable: true
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    editable: true,
                    durationEditable: true,
                    startEditable: true
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 3, 16, 0),
                    allDay: false,
                    editable: true,
                    durationEditable: true,
                    startEditable: true
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 4, 16, 0),
                    allDay: false,
                    editable: true,
                    durationEditable: true,
                    startEditable: true
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    editable: true,
                    durationEditable: true,
                    startEditable: true
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/',
                    editable: true,
                    durationEditable: true,
                    startEditable: true
                }
            ]
        }
    ];


    $scope.setCalDate = function (date, jsEvent, view) {
        var selectedDate = moment(date).format('YYYY-MM-DD');
        $scope.eventSources[0].events[0].start = selectedDate;
        //$scope.selectedDate = $filter('date')(selectedDate, 'yyyy-MM-dd');;
        $scope.selectedDate = selectedDate;
        console.log('$scope.uiConfig', $scope.uiConfig);
        console.log('uiCalendarConfig', uiCalendarConfig);
        console.log('Unit test');

    };

    $scope.alertOnEventClick = function (date, jsEvent, view) {
        console.log(date.title + ' was clicked ');
    };


    $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log('Event Droped to make dayDelta ' + delta);
    };


    $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log('Event Resized to make dayDelta ' + delta);
    };

    $scope.dayClick = function (date, allDay, jsEvent, view) {
        $scope.$apply(function () {
            console.log('Day Clicked ' + date);
        });
    };

    $scope.eventRender = function (event, element, view) {
        element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };

    $scope.selectHandler = function (start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
            eventData = {
                title: title,
                start: start,
                end: end
            };
        }
        $scope.eventSources[0].events.push(eventData);
        uiCalendarConfig.calendars.myCalendar.fullCalendar('unselect');

    };

    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            header: {
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today,prev,next'
            },
            /*dayClick: $scope.setCalDate,
             eventClick: $scope.alertOnEventClick,
             eventDrop: $scope.alertOnDrop,
             eventResize: $scope.alertOnResize,
             eventRender: $scope.eventRender,*/
            selectable: true,
            selectHelper: true,
            select: $scope.selectHandler,
            editable: true,
            eventLimit: true, // allow "more" link when too many events
        }
    };
};