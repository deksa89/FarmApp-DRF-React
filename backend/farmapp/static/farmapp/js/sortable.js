function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sortableTable");
    switching = true;
    dir = "asc";
    // Clear any existing arrows from all headers
    var headers = table.querySelectorAll('.sort-arrow');
    headers.forEach(header => header.textContent = '');
    
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            var comparison = x.innerHTML.toLowerCase().localeCompare(y.innerHTML.toLowerCase());
            if (dir == "asc" && comparison > 0 || dir == "desc" && comparison < 0) {
                shouldSwitch= true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;      
        } else if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
    }
    // Add arrow to the currently sorted column header
    var arrow = dir === 'asc' ? ' ▲' : ' ▼';
    table.getElementsByTagName("TH")[columnIndex].getElementsByClassName("sort-arrow")[0].textContent = arrow;
}