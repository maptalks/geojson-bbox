export default function bbox(geojson) {
  let b = [
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];
  switch (geojson.type) {
    case 'FeatureCollection':
      const len = geojson.features.length;
      for (let i = 0; i < len; i++) {
        feature(geojson.features[i], b);
      }
      break;
    case 'Feature':
      feature(geojson, b);
      break;
    default:
      geometry(geojson, b);
      break;
  }
  return b;
}

function feature(f, b) {
  geometry(f.geometry, b);
}

function geometry(g, b) {
  if (!g) {
    return;
  }
  switch (g.type) {
    case 'Point':
      point(g.coordinates, b);
      break;
    case 'MultiPoint':
      line(g.coordinates, b);
      break;
    case 'LineString':
      line(g.coordinates, b);
      break;
    case 'MultiLineString':
      multiline(g.coordinates, b);
      break;
    case 'Polygon':
      polygon(g.coordinates, b);
      break;
    case 'MultiPolygon':
      multipolygon(g.coordinates, b);
      break;
    case 'GeometryCollection':
      const len = g.geometries.length;
      for (let i = 0; i < len; i++) {
        geometry(g.geometries[i], b);
      }
      break;
  }
}

function point(p, b) {
  b[0] = Math.min(b[0], p[0]);
  b[1] = Math.min(b[1], p[1]);
  b[2] = Math.max(b[2], p[0]);
  b[3] = Math.max(b[3], p[1]);
}

function line(l, b) {
  for (let i = 0, len = l.length; i < len; i++) {
    point(l[i], b);
  }
}

function multiline(ml, b) {
  for (let i = 0, len = ml.length; i < len; i++) {
    line(ml[i], b);
  }
}

function polygon(p, b) {
  //Just calculate the outer ring,Don't participate in the calculation of holes
  //测试10000个鄱阳湖的数据,表现为性能可以提高25%
  if (p.length) {
    line(p[0], b);
  }
}

function multipolygon(mp, b) {
  for (let i = 0, len = mp.length; i < len; i++) {
    polygon(mp[i], b);
  }
}
