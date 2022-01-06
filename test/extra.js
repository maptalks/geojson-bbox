var expect = require('chai').expect,
  bbox = require('../');
describe('Extra tests', function() {
  it('Feature with null Geometry', function() {
    expect(
      bbox({
        "type": "Feature",
        "geometry": null,
        "properties": null
      })
    ).to.be.instanceOf(Array)
      .that.to.have.length(4)
      .that.to.deep.equal([Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]);
  });

  it('GeometryCollection as Feature.Geometry', function() {
    expect(
      bbox({
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "GeometryCollection",
              "geometries": [
                {
                  "type": "LineString",
                  "coordinates": [
                    [
                      -122.4425587930444,
                      37.80666418607323,
                      0
                    ],
                    [
                      -122.4428379594768,
                      37.80663578323093,
                      0
                    ]
                  ]
                },
                {
                  "type": "LineString",
                  "coordinates": [
                    [
                      -122.4425509770566,
                      37.80662588061205,
                      0
                    ],
                    [
                      -122.4428340530617,
                      37.8065999493009,
                      0
                    ]
                  ]
                }
              ]
            },
            "properties": {
              "name": "SF Marina Harbor Master"
            }
          }
        ]
      })
    ).to.be.instanceOf(Array)
      .that.to.have.length(4)
      .that.to.deep.equal([-122.4428379594768, 37.8065999493009, -122.4425509770566, 37.80666418607323]);
  });
});
