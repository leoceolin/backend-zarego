"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatterDate = void 0;
const formatterDate = (date) => {
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const formattedDate = `${currentDay < 10 ? '0' + currentDay : currentDay}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentYear}`;
    return formattedDate;
};
exports.formatterDate = formatterDate;
