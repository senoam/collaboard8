import { loadFreehand } from "./drawFreehand";

// deals with all stroke database interactions

export const sendStroke = (shape, data_string) => {
  var formData = new FormData();
  formData.append('shape', shape);
  formData.append('data', data_string);
  // TODO(jen): send stroke to database and sockets
  console.log("sending stroke", formData.getAll('data'))
};

export const retrieveStroke = (canvas) => {
  // TODO(jen): get strokes from database and sockets

  // hardcoded stroke for example purposes
  var stroke_shape = "freehand"
  var data_string = "727.9,185.55;730.15,185.55;732.4,185.55;734.65,185.55;736.9,185.55;739.15,185.55;741.4,185.55;743.65,185.55;745.9,185.55;748.15,185.55;750.4,185.55;750.4,184.3;752.7,184.3;752.7,183.05;754.95,183.05;757.2,183.05;759.45,183.05;761.7,181.8;763.95,181.8;766.2,181.8;768.45,180.55;770.7,180.55;772.95,180.55;772.95,179.3;775.2,179.3;775.2,178.05;"
  loadFreehand(canvas, data_string)
};
