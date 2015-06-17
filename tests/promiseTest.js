/**
 * Created by songfei on 15/6/17.
 */
var should = require('should');
var Q = require('q');

var query = function(sql) {
    var deferred = Q.defer();
    if(sql) {
        deferred.resolve(1);
    } else {
        deferred.reject(-1);
    }
    return deferred.promise;
}

//原来代码缺少了 return；
describe('Testing Group', function() {
    it('should return 1', function() {
        return query('anything').then(function(data) {
            data.should.equal(2);
        });
    });
});

