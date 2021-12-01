import * as Freehand from "./Freehand";
import * as Rectangle from "./Rectangle";

export const loadStroke = (canvas, tool, data) => {
    console.log("loading", tool, data);
    switch (tool) {
        case "freehand":
            Freehand.load(canvas, data);
            break;
        case "rectangle":
            Rectangle.load(canvas, data);
            break;
        default:
            Freehand.load(canvas, data);
    }
};

export const use = (canvas, tool) => {
    switch (tool) {
        case "freehand":
            Freehand.render(canvas);
            break;
        case "rectangle":
            Rectangle.render(canvas);
            break;
        default:
            Freehand.render(canvas);
    }
};

// export const clearListeners = (canvas, tool) => {
//     switch (tool) {
//         case "freehand":
//             Freehand.render(canvas);
//             break;
//         case "rectangle":
//             Rectangle.render(canvas);
//             break;
//         default:
//             Freehand.render(canvas);
//     }
// };
