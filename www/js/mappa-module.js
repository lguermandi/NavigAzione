(function () {
    const map = L.map('mappa-container').setView([40.5, 6.0], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);
    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

    let arrayWaypoint = [];
    let lineaRotta = null;
    let totaleMetri = 0;

    map.on('click', function (e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        arrayWaypoint.push([lat, lng]);

        L.circleMarker([lat, lng], {
            radius: 5,
            color: '#ef4444',
            fillOpacity: 1
        }).addTo(map);

        aggiornaDisegnoRotta();
    });

    function aggiornaDisegnoRotta() {
        if (lineaRotta) {
            map.removeLayer(lineaRotta);
        }

        lineaRotta = L.polyline(arrayWaypoint, {
            color: '#ef4444',
            weight: 3,
            dashArray: '5, 10'
        }).addTo(map);

        totaleMetri = 0;
        if (arrayWaypoint.length > 1) {
            for (let i = 0; i < arrayWaypoint.length - 1; i += 1) {
                const puntoA = L.latLng(arrayWaypoint[i]);
                const puntoB = L.latLng(arrayWaypoint[i + 1]);
                totaleMetri += map.distance(puntoA, puntoB);
            }
        }

        const migliaNautiche = totaleMetri / 1852;
        document.getElementById('distanza-totale').textContent = migliaNautiche.toFixed(2);
    }

    function cancellaRotta() {
        map.eachLayer((layer) => {
            if (layer instanceof L.Polyline || layer instanceof L.CircleMarker) {
                layer.remove();
            }
        });

        arrayWaypoint = [];
        lineaRotta = null;
        document.getElementById('distanza-totale').textContent = '0.00';
    }

    window.cancellaRotta = cancellaRotta;
})();
