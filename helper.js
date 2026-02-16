// Simple rendereing functions used to have beautiful date on screen
function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
};