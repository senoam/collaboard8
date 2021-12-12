// rounds numbers for saving coordinates into database
const round = (number, precision = 2) => {
    return Math.round(number * 10 * precision + Number.EPSILON) / (10 * precision);
};

// get current mouse position
export const getMousePos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();

    return {
        x:
            (((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) /
                (rect.right - rect.left)) *
            canvas.width,
        y:
            (((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) /
                (rect.bottom - rect.top)) *
            canvas.height
    };
};

// add x y coordinate to data string
export const logData = (data_string, x, y) => {
    return data_string + round(x) + "," + round(y) + ";";
};
