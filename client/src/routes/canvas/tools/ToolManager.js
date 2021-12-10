import * as Freehand from "./Freehand";
import * as Rectangle from "./Rectangle";
import * as Circle from "./Circle";
import { sendStroke } from "./strokeData";
import { logData } from "./utils";

export class ToolManager {
    constructor(socketObj) {
        this.socketObj = socketObj;
        // Instance brushes only save data upon start and completion to create one instance of a stroke.
        this.instanceBrushes = ["rectangle", "circle"];
    }

    draw(context, start, previous, current) {
        switch (window.tool) {
            case "freehand":
                Freehand.draw(context, previous.x, previous.y, current.x, current.y);
                break;
            case "rectangle":
                Rectangle.draw(context, start.x, start.y, current.x, current.y);
                break;
            case "circle":
                Circle.draw(context, start.x, start.y, current.x, current.y);
                Circle.draw(context, current.x, current.y, start.x, start.y); // close the loop
                break;
            case "eraser":
                context.strokeStyle = "#FFFFFF";
                Freehand.draw(context, previous.x, previous.y, current.x, current.y);
                break;
            default:
                Freehand.draw(context, previous.x, previous.y, current.x, current.y);
        }
    }

    load(data, tool, colour, size) {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");
        const prev_colour = context.strokeStyle;
        const prev_size = context.lineWidth;
        context.strokeStyle = colour;
        context.lineWidth = size;
        switch (tool) {
            case "freehand":
                Freehand.load(canvas, data);
                break;
            case "rectangle":
                Rectangle.load(canvas, data);
                break;
            case "circle":
                Circle.load(canvas, data);
                break;
            case "eraser":
                context.strokeStyle = "#FFFFFF";
                Freehand.load(canvas, data);
                break;
            default:
                Freehand.load(canvas, data);
        }
        context.strokeStyle = prev_colour;
        context.lineWidth = prev_size;
    }

    log(stage, data_string, x, y) {
        if (stage === "start") return logData(data_string, x, y);

        if (stage === "continue" && this.saveAllStrokes) {
            data_string = logData(data_string, x, y);

            if (data_string.length > 2400) {
                // if continuing, add from last stroke for continuous redraw
                const last_stroke = data_string.split(";").slice(-2)[0];
                sendStroke(this.socketObj, window.tool, data_string);
                return last_stroke + ";";
            }

            return data_string;
        }

        if (stage === "end") {
            data_string = logData(data_string, x, y);
            sendStroke(this.socketObj, window.tool, data_string);
            return "";
        }

        return data_string;
    }

    get saveAllStrokes() {
        return !this.instanceBrushes.includes(window.tool);
    }
}
