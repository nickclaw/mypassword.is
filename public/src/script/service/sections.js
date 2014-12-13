angular.module('app').factory('Sections', [
    '$http',
    '$timeout',
    function($http, $timeout) {
        var lastEntry = undefined;

        var manager = {
            sections: [],
            state: {
                loading: false,
                failed: false,
                done: false
            },

            $load: function(count, after) {
                if (manager.state.failed) return;
                if (manager.state.loading) return;
                if (manager.state.done) return;

                count = count || 5;
                after = after || lastEntry;

                manager.loading = true;
                return $http.get('/api', {
                    params: {
                        limit: count,
                        after: after
                    }
                }).success(function(data) {
                    manager.state.done = data.length < count;
                    data.forEach(handle.bind(null, 'entry'));
                    manager.sections.push.apply(manager.sections, data);

                    manager.sections.push(handle('form', {}));
                })
                .error(function() {
                    manager.state.done = true;
                    manager.state.failed = true;
                    manager.sections.push(handle('error', {
                        code: 500,
                        message: "Uhoh"
                    }));
                })
                .finally(function() {
                    $timeout(function() {
                        manager.state.loading = false;
                    })
                });
            },

            $replace: function(id, type, data) {

            },

            $clear: function() {
                manager.sections.splice(0, manager.sections.length);
                manager.state.done = false;
                manager.state.failed = false;
            }
        };

        return manager;

        //
        // Util
        //
        var count = 0;
        function handle(type, data) {
            data.$id = "section-" + count++;
            data.$type = type;
            return data;
        }
    }
]);
