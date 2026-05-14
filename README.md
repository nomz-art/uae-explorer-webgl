# UAE Explorer WebGL MVP

This is a static local MVP inspired by the provided UAE Explorer concept image.

## Run

Run the local server so the browser can load the large GLB model and JSON fallback data:

```bash
node server.js
```

Then open:

```text
http://localhost:4173
```

The app uses the local `uae-map.glb` model as the primary WebGL map. If the GLB cannot load, it falls back to `uae-boundary-simplified.json`.

## Working MVP features

- Local WebGL UAE map using `uae-map.glb`, including embedded color textures and normal-map lighting where supported
- Simplified UAE boundary terrain fallback
- Rotate with mouse drag
- Zoom with mouse wheel
- Pan with `Shift` + drag or `W`, `A`, `S`, `D`
- Clickable attraction markers
- Category filter buttons
- Expandable category dropdowns for curated UAE camping sites, hiking trails, parks, BBQ areas, and attractions
- Selected-location detail panel
- Live current weather lookup on location click using Open-Meteo
- Search panel
- Fullscreen button
- Focus/filter button
- 3D and locked top-down satellite visual modes
- Idle/loading/ready states for the weather panel

## Good next upgrades

- Add real UAE attraction data from a CMS or JSON/API source
- Add detail pages for every location
- Add mobile-specific category controls
- Use generated/curated image assets for location thumbnails and richer markers

## Reference Files

Modeling and calibration helper files live in `reference/`. They are not required at runtime, but they are useful if the UAE model needs to be re-exported or recalibrated.
