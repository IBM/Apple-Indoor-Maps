/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Main script responsible for creating the map.
*/
"use strict";

//window.addEventListener("load", function() {
    /*
    mapkit.init({
        authorizationCallback: function(done) {
            var xhr = new XMLHttpRequest();
            // You must have a valid MapKit JS token in the `jwtoken` file.
            xhr.open("GET", "/jwtoken");
            xhr.addEventListener("load", function() {
                done(xhr.responseText);
            });
            xhr.send();
        }
    });

    var map = new mapkit.Map("map", {
        showsPointsOfInterest: false,
        showsMapTypeControl: false
    });
    var Cupertino = new mapkit.CoordinateRegion(
            //-71.47072500506123, 42.54970255834927
            //new mapkit.Coordinate(42.54965133481393, -71.47128903037215),
            //new mapkit.CoordinateSpan(0.000167647972, 0.0054985255)
            new mapkit.Coordinate(37.32901686868525315, -121.88879221003019),
            new mapkit.CoordinateSpan(0.0024, 0.0024)
        );
    console.log("here");
    map.region = Cupertino;
*/
console.log("IMDF");
    ImdfArchive.load(function(archive) {

        function createItemsForOrdinal(ordinal) {
            var mapItems = [];

            // According to the IMDF specification, multiple levels may have the same ordinal.
            var levels = archive.levels(ordinal),
                units = [],
                openings = [],
                amenities = [],
                occupantsWithAnchor = [];

            levels.forEach(function(level) {
                units = units.concat(archive.unitsOnLevel(level.id));
                openings = openings.concat(archive.openingsOnLevel(level.id));
                amenities = amenities.concat(archive.amenitiesOnLevel(level.id));
                occupantsWithAnchor = occupantsWithAnchor.concat(archive.occupantsWithAnchorsOnLevel(level.id));
            });

            levels.concat(units, openings, amenities).forEach(feature => {
                mapkit.importGeoJSON(feature, {
                    /* The IMDF archive does not contain style information.
                     * Provide the style characteristics for displaying the features, depending on their type
                     * and properties.
                     */
                    styleForOverlay: function(overlay) {
                        if (feature.feature_type === "opening") {
                            overlay.style.strokeColor = "rgb(255, 255, 255)";
                        }
                        if (feature.feature_type === "unit") {
                            overlay.style.fillOpacity = 1;
                            overlay.style.strokeColor = "rgb(190, 190, 190)";
                            // if non public, show units in gray
                            if (feature.properties.category === "nonpublic")
                                overlay.style.fillColor = "rgb(210, 210, 210)";
                            // if walkway, show units in white
                            else if (feature.properties.category === "walkway")
                                overlay.style.fillColor = "rgb(255, 255, 255)";
                            // if elevator, show units in light blue
                            else if (feature.properties.category === "elevator")
                                overlay.style.fillColor = "rgb(205, 220, 229)";
                            // if restroom, show units in light purple
                            else if (/^restroom/.test(feature.properties.category))
                                overlay.style.fillColor = "rgb(231, 220, 237)";
                            else if (feature.properties.category === "room")
                                overlay.style.fillColor = "rgb(238, 238, 238)";
                            else
                                overlay.style.fillColor = "rgb(230, 230, 230)";
                        }
                        return overlay.style;
                    },
                    itemForPoint: function(coordinate, geoJSON) {
                        var name = (feature.properties.name || {}).en || feature.properties.category || feature.id;
                        var options = {
                            title: name,
                            clusteringIdentifier: feature.properties.category,
                            displayPriority: feature.properties.category === "exhibit" ? 500 : 250,
                            anchorOffset: new DOMPoint(0, -6),
                            size: { width: 12, height: 12 },
                            // The `data` field allows custom data to be associated with the annotation.
                            data: { showTitle: false, category: feature.properties.category }
                        };

                        if (/t-rex/i.test(name))
                            options.subtitle = "🦖";
                        else if (/bone hall/i.test(name))
                            options.subtitle = "☠";
                        else if (/sauropod/i.test(name))
                            options.subtitle = "🦕";

                        return new mapkit.Annotation(coordinate, createAnnotationElement, options);
                    },
                    geoJSONDidComplete: function(itemCollection) {
                        if (itemCollection)
                            mapItems.push(itemCollection);
                    },
                    geoJSONDidError: function(err) {
                        console.error(err);
                    }
                });
            });

            /* An `Occupant` feature models a business in a building; it does not have a geometry and
             * therefore has no coordinates.
             * To locate an occupant on the indoor map, use the associated anchor to specify its location.
             */
            occupantsWithAnchor.forEach(function(occupantWithAnchor) {
                var anchor = occupantWithAnchor.anchor,
                    occupant = occupantWithAnchor.occupant;

                mapkit.importGeoJSON(anchor, {
                    itemForPoint: function(coordinate, geoJSON) {
                        var name = (occupant.properties.name || {}).en || occupant.properties.category || occupant.id;
                        var options = {
                            title: name,
                            clusteringIdentifier: occupant.properties.category,
                            anchorOffset: new DOMPoint(0, -6),
                            size: { width: 12, height: 12 },
                            displayPriority: 500,
                            data: { category: occupant.properties.category, showTitle: true }
                        }
                        if (occupant.properties.category === "restaurant")
                            options.subtitle = "🍲";
                        return new mapkit.Annotation(coordinate, createAnnotationElement, options);
                    },
                    geoJSONDidComplete: function(itemCollection) {
                        mapItems.push(itemCollection);
                    },
                    geoJSONDidError: function(err) {
                        console.error(err);
                    }
                });
            });

            return mapItems;
        }

        var itemsByOrdinal = {};
        function showOrdinal(ordinal, previousOrdinal) {
            console.log("next", itemsByOrdinal);
            if (ordinal === previousOrdinal)
                return;
            if (previousOrdinal in itemsByOrdinal)
                map.removeItems(itemsByOrdinal[previousOrdinal]);
            if ( !(ordinal in itemsByOrdinal) )
                itemsByOrdinal[ordinal] = createItemsForOrdinal(ordinal);

            if (previousOrdinal === undefined){
                /* The `showItems` function adds the MapKit items to the map and adjusts the region,
                 * so the venue is at the center of the map view.
                 */
                map.showItems(itemsByOrdinal[ordinal]);

              }
            else {
              var json = itemsByOrdinal[ordinal];
              console.log(json);
              map.addItems(itemsByOrdinal[ordinal]);
            }
        }

        var levelPicker = new LevelPicker(archive, showOrdinal);

        levelPicker.selectOrdinal(1);
        console.log("here", archive);
    });

    function createAnnotationElement(coordinate, options) {
        var div = document.createElement("div");
        div.className = "circle-annotation " + options.data.category + "-annotation";
        if (options.data.showTitle) {
            var title = document.createElement("div")
            title.className = "circle-annotation-title";
            title.textContent = options.title;
            div.appendChild(title);
        }
        return div;
    };
//});
