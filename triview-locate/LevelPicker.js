/*
See LICENSE folder for this sample’s licensing information.

Abstract:
A level picker control that lets users choose the floor to display on the map.
*/
"use strict";

function LevelPicker(archive, onSelectedOrdinal) {
    this.element = document.createElement("ul");
    this.element.id = "levelpicker";

    document.body.appendChild(this.element);

    this.currentOrdinal = undefined;
    this.onSelectedOrdinal = onSelectedOrdinal;

    /* Multiple levels may be related to the same ordinal and are represented by one level picker entry.
     * This sample code uses one short name and full name for each ordinal for simplicity.
     */
    var levelNames = [];
    var shortNameByOrdinal = {};
    archive.featuresByType["level"].forEach(function(level) {
        var ordinal = level.properties.ordinal;
        if ( !(ordinal in shortNameByOrdinal) ) {
            // This example chooses to display the short name in the level picker.
            var shortName = (level.properties.short_name || {}).en || ordinal.toString();
            if (shortName) {
                var fullName = (level.properties.name || {}).en || shortName;
                levelNames.push({ ordinal: ordinal, fullName: fullName, shortName: shortName });
                shortNameByOrdinal[ordinal] = true;
            }
        }
    });

    /* Sort the levels in the picker so that the top floor appears at the top of the picker,
     * and the lowest floor at the bottom.
     */
    levelNames.sort(function(a, b) {
        if (a.ordinal < b.ordinal) return 1;
        if (a.ordinal > b.ordinal) return -1;
        return 0;
    });

    levelNames.forEach(function(levelName) {
        var levelElement = document.createElement("li");
        levelElement.textContent = levelName.shortName;
        levelElement.classList.add("level-" + levelName.ordinal);
        levelElement.setAttribute("title", levelName.fullName);
        this.element.appendChild(levelElement);
        var self = this;
        levelElement.addEventListener("click", function(e) {
            self.selectOrdinal(levelName.ordinal);
        });
    }, this);
}

LevelPicker.prototype.selectOrdinal = function(ordinal) {
    this.onSelectedOrdinal(ordinal, this.currentOrdinal);
    this.currentOrdinal = ordinal;
    var selected = this.element.querySelector(".selected")
    if (selected)
        selected.classList.remove("selected");
    this.element.querySelector(".level-" + ordinal).classList.add("selected");
};