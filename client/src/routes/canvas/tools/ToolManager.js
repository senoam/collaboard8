import * as Freehand from "./Freehand";
import * as Rectangle from "./Rectangle";
import { sendStroke } from "./strokeData";
import { logData } from "./utils";

export class ToolManager {
    constructor(socketObj) {
        this.socketObj = socketObj;
        // Instance brushes only save data upon start and completion to create one instance of a stroke.
        this.instanceBrushes = ["rectangle"];
    }

    draw(context, start, previous, current) {
        switch (window.tool) {
            case "freehand":
                Freehand.draw(context, previous.x, previous.y, current.x, current.y);
                break;
            case "rectangle":
                Rectangle.draw(context, start.x, start.y, current.x, current.y);
                break;
            default:
                Freehand.draw(context, previous.x, previous.y, current.x, current.y);
        }
    }

    load(tool, data) {
        const canvas = window.canvasRef.current;
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
    }

    log(stage, data_string, x, y) {
        if (stage === "start") return logData(data_string, x, y);

        if (stage === "continue" && this.saveAllStrokes) {
            data_string = logData(data_string, x, y);

            if (data_string.length > 900) {
                sendStroke(this.socketObj, window.tool, data_string);
                return "";
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